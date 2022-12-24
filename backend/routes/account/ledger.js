const Company = require('../../model/company');
const Transcation = require('../../model/transcation');
const { handleFailure, handleSuccess } = require('../../util/response_handler');
// define the home page route

module.exports.createCompany = (req, res, next) => {
    Company.findOne({company_name:req.body.company_name}, (err, dbDoc)=>{
        if(dbDoc != null) {
            return handleFailure(req, res, next, 400, 'company already exists');
        }

    const company = new Company();
    company.company_name = req.body.company_name.toLowerCase();
    company.company_address = req.body.company_address;
    company.gst_id = req.body.gst_id;
    if(req.body.closing_balance != null) company.closing_balance = req.body.closing_balance;
    company.updateTs = new Date();

    company.save((err, savedDoc)=>{
        if(err) {
            console.log('error saving compnay doc with error : '+err);
            return handleFailure(req, res, next,500, 'Error creating the company');
        }

        return handleSuccess(req, res, next,201, 'company created successfully', savedDoc);
    })
    })
};


module.exports.updateCompanyBalance = (req, res, next) => {
    Company.findById(req.body.company_id, (err, dbDoc)=>{
        if(dbDoc == null) {
            return handleFailure(req, res, next, 404, 'company not found!');
        }
    
        dbDoc.closing_balance = req.body.closing_balance;

        dbDoc.save((err, savedDoc)=>{
            if(err) {
                console.log('error saving compnay doc with error : '+err);
                return handleFailure(req, res, next,500, 'Error creating the company');
            }

            return handleSuccess(req, res, next,201, 'company details updated successfully', savedDoc);
        })
    })
};


module.exports.getCompanyByNameLiteral = (req, res, next) => {
    Company.find({"company_name":{$regex:req.params.company_name}}, (err, dbDoc)=>{
        if(dbDoc == null) {
            return handleFailure(req, res, next, 404, 'company not found!');
        }
        return handleSuccess(req, res, next,200,'', dbDoc);
    })
};


module.exports.addTranscation = (req, res, next) => {
    Company.findOne({_id:req.body.company_id}, (err, companyDoc)=>{
        if(companyDoc == null) {
            return handleFailure(req, res, next, 400, 'invalid company id');
        }
        let currentClosingAmount = 0;
        if(companyDoc.closing_balance !=null) currentClosingAmount=companyDoc.closing_balance;
        let transcationListToSave = [];
        
        req.body.transactions.forEach(transcation=>{
            const trns = new Transcation();
            trns.company_id = companyDoc._id;
            trns.type = transcation.type;
            trns.amount = transcation.amount;
            trns.transcation_details = transcation.details;

            if(transcation.ts != null) {
                Transcation.find({company_id:companyDoc._id})
                .sort({updateTs:'asc'})
               .exec((err, oldTranscations) => {
                    if(err) {
                        console.log('error fetching history transcation with error : '+err);
                        return;
                    }

                    if(oldTranscations == null || oldTranscations.length == 0) {
                        if(trns.type == 'DEBIT') {
                            currentClosingAmount = currentClosingAmount - trns.amount;
                        } else {
                            currentClosingAmount = currentClosingAmount + trns.amount;
                        }
                        trns.closing_balance = currentClosingAmount;
                    } else {
                        let currOffset = 0;  
                        for(let t of oldTranscations) {
                        if(t.updateTs<transcation.ts) {
                            currOffset++;
                            continue;
                        }
                        else
                            break;
                        }
                        if(currOffset ==0) {
                            currentClosingAmount = 0;
                        } else {
                            currentClosingAmount = oldTranscations[currOffset-1].closing_balance;
                        }
                        if(trns.type == 'DEBIT') {
                            currentClosingAmount = oldTranscations[currOffset-1].closing_balance - trns.amount;
                        } else {
                            currentClosingAmount = oldTranscations[currOffset-1].closing_balance + trns.amount;
                        }
                        trns.closing_balance = currentClosingAmount;
                        
                        for(let i=currOffset;i<oldTranscations.length;i++) {
                            if(oldTranscations[i].type == 'DEBIT') {
                                currentClosingAmount = currentClosingAmount - trns.amount;
                            } else {
                                currentClosingAmount = currentClosingAmount+ trns.amount;
                            }
                            oldTranscations[i].closing_balance = currentClosingAmount;
    
                            transcationListToSave.push(oldTranscations[i]);
                        }
                    }
                    transcationListToSave.push(trns);
                    companyDoc.closing_balance = currentClosingAmount;
                    companyDoc.updateTs = new Date();
            
                    companyDoc.save((err,updatedComanyDoc)=>{
                        if(err) return handleFailure(req, res, next,500, 'Error saving the transcation');
                    })
            
                    Transcation.insertMany(transcationListToSave, (err, savedDocs)=>{
                        if(err) {
                            console.log('error saving a transcation doc with error : '+err);
                            return handleFailure(req, res, next,500, 'Error saving the transcation');
                        }
            
                        return handleSuccess(req, res, next,201, 'transcation created successfully', savedDocs);
                    })
                });
                
            }
            
        })

       
    })
};


module.exports.fetchTranscations = (req, res, next) => {
    Company.findOne({_id:req.params.company_id}, (err, companyDoc)=>{
        if(companyDoc == null) {
            return handleFailure(req, res, next, 400, 'invalid company id');
        }
        const skipOffset = (req.query.k == null) ? 0 : req.query.k;
        const limitDoc = (req.query.n == null) ? 1000 : req.query.n;

        // Transcation
        // .find({company_id: req.params.company_id})
        // .sort({'updateTs': -1})
        // .limit(20)
        // .exec(function(err, dbTrans) {
        //     return handleSuccess(req, res, next, 'success',dbTrans);
        // });

        let query;

        if(req.query.startDate != null) {
            query = Transcation.find({company_id:companyDoc._id,updateTs:{'$gte':new Date(req.query.startDate), '$lte':new Date(req.query.endDate)}});
        } else {
            query = Transcation.find({company_id:companyDoc._id});
        }
        
        query
        .sort({'updateTs': -1})
        .limit(limitDoc)
        .skip(skipOffset)
        .exec((err, dbDocs)=>{
            if(err) {
                console.log('error fetching transcaitons for company id '+ companyDoc._id+' with error : '+err);
                return handleFailure(req, res, next,500,'error fetching transcations');
            }
            return handleSuccess(req, res, next, 200,'success',dbDocs);
        });
    })
};


module.exports.fetchTranscationsByDate = (req, res, next) => {
    Company.findOne({_id:req.params.company_id}, (err, companyDoc)=>{
        if(companyDoc == null) {
            return handleFailure(req, res, next, 400, 'invalid company id');
        }

       
    })
};