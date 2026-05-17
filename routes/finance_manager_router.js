const express = require('express');
const finance_manager_router = express.Router();
const finance_manager_controller = require('../controllers/finance_manager_controller');
const { isauth, allowroles } = require('../controllers/authcontroller');


finance_manager_router.get('/finance_manager/dashboard',isauth, allowroles(['finance_manager']),finance_manager_controller.dashboard);
finance_manager_router.get('/finance_manager/create_manager',isauth, allowroles(['finance_manager']),finance_manager_controller.create_manager);
finance_manager_router.get('/finance_manager/manager_list',isauth, allowroles(['finance_manager']),finance_manager_controller.manager_list);
finance_manager_router.get('/finance_manager/manager-wise',isauth, allowroles(['finance_manager']),finance_manager_controller.manager_wise);
finance_manager_router.get('/finance_manager/manager_aggregate',isauth, allowroles(['finance_manager']),finance_manager_controller.manager_aggregate);
finance_manager_router.get('/finance_manager/employe_aggregate',isauth, allowroles(['finance_manager']),finance_manager_controller.employe_aggregate);
finance_manager_router.get('/finance_manager/manager_requests',isauth, allowroles(['finance_manager']),finance_manager_controller.manager_requests);
finance_manager_router.get('/finance_manager/requests-data',isauth, allowroles(['finance_manager']),finance_manager_controller.getRequestsAPI);
finance_manager_router.get('/finance_manager/manager_request/:id',isauth, allowroles(['finance_manager']),finance_manager_controller.manager_request_detail);
finance_manager_router.post('/finance-manager/update-status/:id',isauth, allowroles(['finance_manager']),finance_manager_controller.update_status);
finance_manager_router.post('/finance-manager/create_manager',isauth, allowroles(['finance_manager']),finance_manager_controller.post_create_manager);
finance_manager_router.delete('/finance_manager/delete-manager/:id',isauth, allowroles(['finance_manager']),finance_manager_controller.delete_manager)

module.exports = finance_manager_router;