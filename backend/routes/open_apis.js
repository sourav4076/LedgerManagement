
const { signInRoutes } = require("./signin");
const { signupRoutes } = require("./signup")

const express = require('express');
const { signOutRoutes } = require("./signout");
const { testOpenAPI } = require("./testeopn_apis")
const openRoutes = express.Router()

openRoutes.post('/signup',signupRoutes);
openRoutes.post('/signIn',signInRoutes);
openRoutes.post('/signOut',signOutRoutes);
openRoutes.get('/test',testOpenAPI);


module.exports = openRoutes;