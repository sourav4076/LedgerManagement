const mongoose = require('mongoose');

const companySchema = new mongoose.Schema({
    company_name:{ type: String, required: true,maxlength: 100,trim: true , index: true} ,
    company_address:{ type: String, required: true,maxlength: 100,trim: true},
    gst_id:{ type: String, required: true,maxlength: 30},
    closing_balance:{ type: Number, default:0},
    createTs:{ type: Date, default: Date.now}, 
    updateTs:{ type: Date, default: Date.now }   
});


module.exports = mongoose.model("company", companySchema);