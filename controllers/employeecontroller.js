const employee_Expense = require("../models/employee_expense");

exports.getdashboard = async (req,res,next) =>{

 const userid = "6a080ab915db5176530330e5";
 const expenses = await employee_Expense.find({employee : userid});

    res.render('employee/employee_dashboard.ejs', {expenses , page : 'dashboard'});
}



exports.getemployeerequesst = (req,res,next) =>{
    res.render('employee/employee_form.ejs' ,{page : 'form'});
}




exports.postemployeerequesst = async (req,res,next) =>{
  
try {
    const expense = new employee_Expense({
        title: req.body.exprence_title,
        amount: req.body.ammount,
        category: req.body.category,
        paymentMethod: req.body.payment_method,
        vendor: req.body.vender_name,
        description: req.body.Description,
        date: req.body.date,
    
        employee: "6a080ab915db5176530330e5" ,
        manager: "6a0808ec745e766b5a5459ba",
       companyid : '69ff99999999999999999999'
    });

    await expense.save();

    res.redirect('/employee/dashboard');}catch(err){
        console.log("error in saving the expense data in the database")
    }

}