const manager_expenses = require("../models/manager_expense");
const employee_expense = require('../models/employee_expense');
const users = require('../models/users');
exports.getdashboard = async (req,res,next) =>{

 const userid = req.session.USER.id;
 const expenses = await manager_expenses.find({manager : userid});

    res.render('manager/manager_dashboard.ejs', {expenses, page : 'dashboard' });
}



exports.getmanagerrequest = (req,res,next) =>{
    res.render('manager/manager_form.ejs' , {page : 'form'});
}




exports.postmanagerrequest = async (req,res,next) =>{
   
try {

  const manager = await users.findById(req.session.USER.id);
  const finance_manager_id = manager.finance_manager;

    const expense = new manager_expenses({
        title: req.body.exprence_title,
        amount: req.body.ammount,
        category: req.body.category,
        paymentMethod: req.body.payment_method,
        vendor: req.body.vender_name,
        description: req.body.Description,
        date: req.body.date,
    
        manager: req.session.USER.id,
        finance_manager: finance_manager_id,
         companyid : req.session.USER.companyid  });

    await expense.save();



    res.redirect('/manager/dashboard');}catch(err){
        console.log("error in saving the expense data in the database",err)
    }

}

exports.employee_requets = (req,res,next) =>{
    res.render('manager/employee_requests.ejs', {page: 'employee_requests'})
}


exports.getRequestsAPI = async (req, res) => {
    const managerId = req.session.USER.id;

    const status = req.query.status;
  
  
    let filter = { manager: managerId };
  
    if (status && status !== "all") {
      filter.status = status;
    }
  
    const expenses = await employee_expense
      .find(filter)
      .populate('employee');

      res.json(expenses);
  };     


  exports.employee_detail = async (req,res,next) =>{
    const id = req.params.id;

    const expense = await employee_expense
    .findById(id)
    .populate('employee', 'name email');
  

  res.render('manager/employee_request_detail', { expense , page: 'employee_requests'});

  }

  exports.updateStatus = async (req, res) => {

    const id = req.params.id;
    const status = req.body.status;
  
    try {
      await employee_expense.findByIdAndUpdate(id, { status });
  
      res.json({ message: "Updated" });
  
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: "Failed" });
    }
  };

  exports.employee_aggregate = async(req,res,next) =>{
    const managerid = req.session.USER.id;

    const expenses = await employee_expense.find({manager : managerid}).populate('employee');




    res.render('manager/employee_aggregate' , {page: 'employee_aggregate',expenses});
  }

  exports.employe_creation = (req,res,next) =>{
    res.render('manager/create_employee', {page : "employe_creation"})



  }

  exports.postemploye_creation = async (req,res,next) =>{
    
    const {name , email , phone} = req.body;

   const user = new users({
    name: name,
    email: email,
    phone: phone,
    role: 'employee',
    manager: req.session.USER.id,
    companyid : req.session.USER.companyid,
    password: 'bhavya' // it will generate randomly in real use and directly send to employee ans hashed passwprd save in database;

   });
    
   await user.save();
   
   res.redirect('/manager/employe_list');


  }
  
  exports.employe_list = async (req,res,next) =>{
    managerid = req.session.USER.id;

    const employee =  await users.find({manager : managerid}).populate('manager');
    const expenses = await employee_expense.find({manager : managerid}).populate('employee');


   res.render('manager/employe_list.ejs' , {page : 'employe_list', expenses , employee});


  }
  exports.delete_employee = async (req,res,next) =>{

    const employe_id = req.params.id;

   try {
    await users.findByIdAndDelete(employe_id);
    await employee_expense.deleteMany({employee : employe_id});
    res.json({

      success: true
  });
   }catch(err){
    console.log("error in deleting the employee in delete eployee controller");
    res.status(500).json({

      success: false
  });
   }

  }