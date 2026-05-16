const express =  require('express');
const employeerouter = express.Router();
const employeecontroller = require('../controllers/employeecontroller');

employeerouter.get('/employee/dashboard', employeecontroller.getdashboard);
employeerouter.get('/employee/request', employeecontroller.getemployeerequesst);
employeerouter.post('/employee/request', employeecontroller.postemployeerequesst);

module.exports = employeerouter;