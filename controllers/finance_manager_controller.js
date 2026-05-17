const employee_expense = require('../models/employee_expense');
const manager_expense = require('../models/manager_expense');
const users = require('../models/users')






exports.dashboard = async(req,res,next) =>{

  const finance_manager_id = req.session.USER.id;
  const managers = await users.find({finance_manager : finance_manager_id ,   role: "manager"});
  const managerIds =  managers.map(m => m._id);


  const employee_expenses = await employee_expense.find({ manager : {$in : managerIds}}).populate('employee').populate('manager');
  const manager_expenses = await manager_expense.find({finance_manager : finance_manager_id}).populate('manager');

  const allexpenses = [
    ...employee_expenses,
    ...manager_expenses
  ]

  res.render('finance manager/total_expenses.ejs', {page : 'dashboard', allexpenses});
}

exports.manager_wise = async(req,res,next) =>{

  const finance_manager_id = req.session.USER.id;

  const managers = await users.find({finance_manager : finance_manager_id ,   role: "manager"});

  const managerIds =  managers.map(m => m._id);




        // STEP 1
        // Get all approved employee expenses
    
      const expenses =
    await employee_expense.find({

        manager: { $in: managerIds },

        status: "approved"

    })
    .populate('employee')
    .populate('manager');
    
    
        // STEP 2
        // Create empty object for grouping
    
        const managerMap = {};
    
    
        // STEP 3
        // Loop through every expense
    
        expenses.forEach(exp => {
    
            // manager id
            const managerId = exp.manager._id.toString();
    
    
            // if manager not already exists in object
            // create new entry
    
            if (!managerMap[managerId]) {
    
                managerMap[managerId] = {
    
                    manager: exp.manager.name,
    
                    expense: 0,
    
                    employeesSet: new Set()
                };
            }
    
    
            // STEP 4
            // Add expense amount
    
            managerMap[managerId].expense += exp.amount;
    
    
            // STEP 5
            // Add unique employee id
    
            managerMap[managerId]
                .employeesSet
                .add(exp.employee.toString());
    
        });
    
    
        // STEP 6
        // Convert object into array
    
        const managerData = Object.values(managerMap)
            .map(item => {
    
                return {
    
                    manager: item.manager,
    
                    expense: item.expense,
    
                    employees: item.employeesSet.size
                };
            });
    
    res.render('finance manager/manager_wise_expenses.ejs' , {page : 'manager-wise' , managerData});
}


exports.manager_aggregate = async (req,res,next) =>{


     const finance_manager_id = req.session.USER.id;
    
        const expenses = await manager_expense.find({finance_manager : finance_manager_id}).populate('manager');
    
    
    
    

    res.render('finance manager/manager_aggregate.ejs' , {page : 'manager_aggregate',expenses});
}

exports.manager_requests = (req,res,next) =>{

    res.render('finance manager/manager_requests' , {page: 'manager_requests'});
}

exports.getRequestsAPI = async (req, res) => {
    const finance_manager_id = req.session.USER.id;

    const status = req.query.status;
  
  
    let filter = { finance_manager: finance_manager_id };
  
    if (status && status !== "all") {
      filter.status = status;
    }
  
    const expenses = await manager_expense
      .find(filter)
      .populate('manager');

      res.json(expenses);
  };     


 exports.manager_request_detail = async(req,res,next) =>{


    const managerid = req.params.id;
 
  
  
    const expense = await manager_expense
    .findById(managerid)
      .populate('manager');



    res.render('finance manager/manager_request_detail.ejs' , {expense , page: 'manager_requests'});



 }

 exports.update_status = async (req,res,next) =>{

    const id = req.params.id;
    const status = req.body.status;

    try {
      await manager_expense.findByIdAndUpdate(id, { status });
  
      res.json({ message: "Updated" });
  
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: "Failed" });
    }


 }

 exports.employe_aggregate = async (req,res,next) =>{

 const finance_manager_id = req.session.USER.id;

 const managers = await users.find({ finance_manager : finance_manager_id ,   role: "manager"});

 const managerid = managers.map(m => m._id);



  const expenses = await employee_expense.find({manager : {$in : managerid}}).populate('employee').populate('manager');

  res.render('finance manager/employee_aggregate', {page : 'employe_aggregate' , expenses});

 }

 exports.create_manager = (req,res,next) =>{
  res.render('finance manager/create_manager' , {page: 'create_manager'});
 }

 exports.post_create_manager = async (req,res,next) =>{
  
  const {name , email , phone} = req.body;

   const user = new users({
    name: name,
    email: email,
    phone: phone,
    role: 'manager',
    finance_manager : req.session.USER.id,
     companyid: req.session.USER.companyid,
    password: 'bhavya' // it will generate randomly in real use and directly send to employee ans hashed passwprd save in database;

   });

   await user.save();

  res.redirect('/finance_manager/manager_list');
 }

 exports.manager_list = async(req,res,next) =>{
const finance_manager_id = req.session.USER.companyid;
const company_id = req.session.USER.companyid;
  const expenses = await manager_expense.find({finance_manager : finance_manager_id}).populate('manager');
  const managers = await users.find({finance_manager : finance_manager_id});
  const employes = await users.find({ role : 'employee' , companyid : company_id });



  res.render('finance manager/manager_list.ejs', {page : 'manager_list', expenses , managers , employes});
 }


 exports.delete_manager = async(req,res,next) =>{
try{
  const manager_id = req.params.id;

  await users.findByIdAndDelete(manager_id);
  await users.deleteMany({manager : manager_id})
  await employee_expense.deleteMany({manager : manager_id});
  await manager_expense.deleteMany({manager : manager_id});

  res.json({
    success : true
  })
}catch(err){
  console.log("error in deleting a manager in finance manager controller");
  res.json({
    success : false
  })

}




 }