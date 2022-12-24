const express = require('express');
const { handleFailure, handleSuccess } = require('../util/response_handler');

module.exports.signOutRoutes = (req, res, next) => {
    if(req.session.user !=null){
        req.session.user = null;
    } 
    return handleSuccess(req,res,next,200, 'logged out successfully');
  };
