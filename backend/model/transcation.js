const mongoose = require('mongoose')


const transcationSchema = new mongoose.Schema({
    company_id:{ type: String, required: false} ,
    type:{type: String, enum: ['DEBIT', 'CREDIT'],default: 'DEBIT'},
    amount:{ type: Number, required: true},
    transcation_details:{ type: String, required: false},
    closing_balance:{ type: Number, required: false},
    updateTs:{ type: Date, default: Date.now }   
});


module.exports = mongoose.model("transcation", transcationSchema);