const express = require('express');
const centroidrouter = express.Router();
const centroidcontroller = require('../controllers/centroidcontroller');
const { isauth } = require('../controllers/authcontroller');

centroidrouter.get('/dashboard',isauth,centroidcontroller.backtohome);
centroidrouter.get('/profile', centroidcontroller.profile);

module.exports = centroidrouter;