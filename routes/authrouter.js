const express = require("express");
const authrouter = express.Router();
const authcontroller = require('../controllers/authcontroller')

authrouter.get('/' , authcontroller.home);
authrouter.get('/auth/login' , authcontroller.login);
authrouter.post('/auth/login' , authcontroller.postlogin);
authrouter.get('/auth/signup' , authcontroller.signup);
authrouter.post('/auth/signup' , authcontroller.postsignup);
authrouter.get('/logout' , authcontroller.logout);


module.exports = authrouter; 