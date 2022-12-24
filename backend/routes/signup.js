const express = require('express');
const User = require('../model/user');
const { handleFailure, handleSuccess } = require('../util/response_handler');


module.exports.signupRoutes = (req, res, next) => {
  const requestUser = {
    userName: req.body.userName,
    password: req.body.password
  };

  const user =  User.findOne({username:requestUser.userName}, (err, dbDoc)=>{
    if(dbDoc != null) {
        return handleFailure(req,res,next,400, 'user already exists!');
    }
    const dbUserObj = new User();
    dbUserObj.username = requestUser.userName;
    dbUserObj.setPassword(requestUser.password);

    dbUserObj.save((err, savedObj)=>{
        if(err) {
            console.log('error saving new user to db' + err);
            return handleFailure(500, 'unexpected error in saving your user');
        }
        return handleSuccess(req, res, next, 201, 'user created successfully', savedObj)
    })
  });

  

};