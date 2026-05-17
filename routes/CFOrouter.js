const express = require('express');
const CFOrouter = express.Router();
const CFO_controller = require('../controllers/CFO_controller');
const { isauth, allowroles } = require('../controllers/authcontroller');


CFOrouter.get('/CFO/dashboard', isauth , allowroles(['chief_financial_officer']),CFO_controller.dashboard);
CFOrouter.get('/CFO/financemanager_wise', isauth , allowroles(['chief_financial_officer']),CFO_controller.financemanager_wise);
CFOrouter.get('/CFO/create_finance_manager', isauth , allowroles(['chief_financial_officer']),CFO_controller.create_finance_manager);
CFOrouter.get('/CFO/finance_manager_list', isauth , allowroles(['chief_financial_officer']),CFO_controller.finance_manager_list);
CFOrouter.get('/CFO/manager_aggregate', isauth , allowroles(['chief_financial_officer']),CFO_controller.manager_aggregate);
CFOrouter.get('/CFO/employe_aggregate', isauth , allowroles(['chief_financial_officer']),CFO_controller.employe_aggregate);
CFOrouter.post('/CFO/create_finance_manager', isauth , allowroles(['chief_financial_officer']),CFO_controller.post_create_finance_manager);
CFOrouter.delete('/CFO/delete-finance_manager/:id', isauth , allowroles(['chief_financial_officer']),CFO_controller.delete_finance_manager);







module.exports = CFOrouter;