const employee_Expense = require("../models/employee_expense");
const users = require("../models/users");

exports.getdashboard = async (req,res,next) =>{

 const userid = req.session.USER.id;
 const expenses = await employee_Expense.find({employee : userid});

    res.render('employee/employee_dashboard.ejs', {expenses , page : 'dashboard'});
}



exports.getemployeerequesst = (req,res,next) =>{
    res.render('employee/employee_form.ejs' ,{page : 'form'});
}




exports.postemployeerequesst = async (req,res,next) =>{
  
try {
  const employe = await users.findById(req.session.USER.id);
  const managerid = employe.manager;

    const expense = new employee_Expense({
        title: req.body.exprence_title,
        amount: req.body.ammount,
        category: req.body.category,
        paymentMethod: req.body.payment_method,
        vendor: req.body.vender_name,
        description: req.body.Description,
        date: req.body.date,
    
        employee: req.session.USER.id ,
        manager: managerid,
       companyid : req.session.USER.companyid
    });

    await expense.save();

    res.redirect('/employee/dashboard');}catch(err){
        console.log("error in saving the expense data in the database")
    }

}