const express =  require('express');
const managerrouter = express.Router();
const managercontroller = require('../controllers/managercontroller');
const { isauth, allowroles } = require('../controllers/authcontroller');

managerrouter.get('/manager/dashboard',isauth,allowroles(['manager']), managercontroller.getdashboard);
managerrouter.get('/manager/employee_aggregate',isauth,allowroles(['manager']), managercontroller.employee_aggregate);
managerrouter.get('/manager/request',isauth,allowroles(['manager']), managercontroller.getmanagerrequest);
managerrouter.get('/manager/employee_requests',isauth,allowroles(['manager']), managercontroller.employee_requets);
managerrouter.get('/manager/employee_requests/:id',isauth,allowroles(['manager']), managercontroller.employee_detail);
managerrouter.get('/manager/requests-data',isauth,allowroles(['manager']), managercontroller.getRequestsAPI);
managerrouter.get('/manager/employe_creation',isauth,allowroles(['manager']), managercontroller.employe_creation);
managerrouter.get('/manager/employe_list',isauth,allowroles(['manager']), managercontroller.employe_list);
managerrouter.post('/manager/employe_creation',isauth,allowroles(['manager']), managercontroller.postemploye_creation);
managerrouter.post('/manager/request',isauth,allowroles(['manager']), managercontroller.postmanagerrequest);
managerrouter.post('/manager/update-status/:id',isauth,allowroles(['manager']), managercontroller.updateStatus);
managerrouter.delete('/manager/delete-employee/:id',isauth,allowroles(['manager']), managercontroller.delete_employee);
module.exports = managerrouter;