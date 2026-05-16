const express =  require('express');
const managerrouter = express.Router();
const managercontroller = require('../controllers/managercontroller');

managerrouter.get('/manager/dashboard', managercontroller.getdashboard);
managerrouter.get('/manager/employee_aggregate', managercontroller.employee_aggregate);
managerrouter.get('/manager/request', managercontroller.getmanagerrequest);
managerrouter.get('/manager/employee_requests', managercontroller.employee_requets);
managerrouter.get('/manager/employee_requests/:id', managercontroller.employee_detail);
managerrouter.get('/manager/requests-data', managercontroller.getRequestsAPI);
managerrouter.get('/manager/employe_creation', managercontroller.employe_creation);
managerrouter.get('/manager/employe_list', managercontroller.employe_list);
managerrouter.post('/manager/employe_creation', managercontroller.postemploye_creation);
managerrouter.post('/manager/request', managercontroller.postmanagerrequest);
managerrouter.post('/manager/update-status/:id', managercontroller.updateStatus);
managerrouter.delete('/manager/delete-employee/:id', managercontroller.delete_employee)
module.exports = managerrouter;