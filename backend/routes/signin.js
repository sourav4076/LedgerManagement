const express = require('express');
const User = require('../model/user');
const { handleFailure, handleSuccess } = require('../util/response_handler');

module.exports.signInRoutes = (req, res, next) => {
  const requestUser = {
    userName: req.body.userName,
    password: req.body.password
  };

  const user =  User.findOne({username:requestUser.userName}, (err, dbDoc)=>{
    if(dbDoc == null) {
        return handleFailure(req,res,next,400, 'user does not exists!');
    }
    const isValid = dbDoc.validatePassword(requestUser.password);
    if(!isValid) {
        return handleFailure(req,res,next,400, 'invalid username or password!');
    }

    req.session.user = dbDoc;
    return handleSuccess(req,res,next,200, 'loggined successfully');
  });

  

};