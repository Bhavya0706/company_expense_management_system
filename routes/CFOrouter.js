const express = require('express');
const CFOrouter = express.Router();
const CFO_controller = require('../controllers/CFO_controller');

CFOrouter.get('/CFO/dashboard',CFO_controller.dashboard);
CFOrouter.get('/CFO/financemanager_wise',CFO_controller.financemanager_wise);
CFOrouter.get('/CFO/create_finance_manager',CFO_controller.create_finance_manager);
CFOrouter.get('/CFO/finance_manager_list',CFO_controller.finance_manager_list);
CFOrouter.get('/CFO/manager_aggregate',CFO_controller.manager_aggregate);
CFOrouter.get('/CFO/employe_aggregate',CFO_controller.employe_aggregate);
CFOrouter.post('/CFO/create_finance_manager',CFO_controller.post_create_finance_manager);
CFOrouter.delete('/CFO/delete-finance_manager/:id',CFO_controller.delete_finance_manager);







module.exports = CFOrouter;