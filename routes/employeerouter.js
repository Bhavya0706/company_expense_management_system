const express =  require('express');
const employeerouter = express.Router();
const employeecontroller = require('../controllers/employeecontroller');
const { isauth, allowroles } = require('../controllers/authcontroller');

employeerouter.get('/employee/dashboard',isauth , allowroles(['employee']), employeecontroller.getdashboard);
employeerouter.get('/employee/request',isauth , allowroles(['employee']), employeecontroller.getemployeerequesst);
employeerouter.post('/employee/request',isauth , allowroles(['employee']), employeecontroller.postemployeerequesst);

module.exports = employeerouter;