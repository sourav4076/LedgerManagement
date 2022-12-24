
const { handleFailure, handleSuccess } = require('../util/response_handler');
const express = require('express')


const safeRoutes = express.Router()

const { testAPI } = require("./test_api")
const { createCompany, updateCompanyBalance, getCompanyByNameLiteral, addTranscation,fetchTranscations } = require("./account/ledger")

// safeRoutes.use((req,res,next)=>{
//     if(!req.session.user) {
//         return handleFailure(req, res, next, 401,'user not authorized');
//     }
//     next()
// })

safeRoutes.get('/test', testAPI);

safeRoutes.post('/company', createCompany);
safeRoutes.put('/company/balance', updateCompanyBalance);
safeRoutes.get('/company/name/:company_name', getCompanyByNameLiteral);

safeRoutes.post('/company/transcation', addTranscation);
safeRoutes.get('/company/transcation/:company_id', fetchTranscations);

 module.exports = safeRoutes;