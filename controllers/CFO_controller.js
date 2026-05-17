const employee_expense = require('../models/employee_expense');
const manager_expense = require('../models/manager_expense');
const users = require('../models/users')






exports.dashboard = async(req,res,next) =>{

    const companyid = req.session.USER.companyid;

  const employee_expenses = await employee_expense.find({companyid : companyid}).populate('employee').populate('manager');
  const manager_expenses = await manager_expense.find({companyid : companyid}).populate('manager').populate('finance_manager');


  const allexpenses = [
    ...employee_expenses,
    ...manager_expenses
  ]

  res.render('CFO/company_dashboard.ejs', {page : 'dashboard', allexpenses});
}

exports.financemanager_wise = async(req,res,next) =>{
    const companyid =  req.session.USER.companyid;
  

        // STEP 1
        // Get all approved manager expenses
    
        const manager_expenses = await manager_expense
            .find({ status: "approved" , companyid : companyid })
            .populate("finance_manager").populate('manager');
    

            // access the employee with populated manager and inside that also populating an financemanager to compare

            const employee_Expenses = await employee_expense
            .find({status : 'approved' , companyid : companyid})
            .populate({

                path: 'manager',

                populate : {
                    path: 'finance_manager'
                }

            })

            
  const managers = await users.find({companyid : companyid ,role : 'manager' });
  const employes = await users.find({companyid : companyid , role: 'employee'}).populate('manager');


            const expenses  = [

                ...manager_expenses,
                ...employee_Expenses
            ]



        // STEP 2
        // Create empty object for grouping
    
        const financemanagermap = {};
    
    
        // STEP 3
        // Loop through every expense
    
        expenses.forEach(exp => {
    
            // manager id
       
    let financeManager;

    // manager expense
    if (exp.finance_manager) {

        financeManager =
            exp.finance_manager;
    }

    // employee expense
    else {

        financeManager =
            exp.manager.finance_manager;
    }

    const finance_manager_id =
        financeManager._id.toString();
    
            if (!financemanagermap[finance_manager_id]) {
    
              financemanagermap[finance_manager_id] = {
                
                    finance_manager : financeManager.name,
                    expense: 0,
                   workers: 0,
                };
            }
    
            financemanagermap[finance_manager_id].expense += exp.amount;
    
        });

        employes.forEach(emp => {
            const finance_manager_id = emp.manager.finance_manager;

            if(financemanagermap[finance_manager_id]){
                financemanagermap[finance_manager_id].workers++;
            }
        })

        managers.forEach(emp => {
            const finance_manager_id = emp.finance_manager;

            if(financemanagermap[finance_manager_id]){
                financemanagermap[finance_manager_id].workers++;
            }
        })

       



    
    
        // STEP 6
        // Convert object into array
    
        const finance_manager_data = Object.values(financemanagermap)
            .map(item => {
    
                return {
    
                    finance_manager: item.finance_manager,
    
                    expense: item.expense,
    
                    manager: item.workers
                };
            });
    
    res.render('CFO/finance_manager_wise.ejs' , {page : 'finance_manager_wise' , finance_manager_data});
}


exports.create_finance_manager = (req,res,next) =>{


res.render('CFO/create_finance_manager.ejs' , {page : 'create_finance_manager'});


}
exports.post_create_finance_manager = async(req,res,next) =>{
    const {name ,email,phone} = req.body;
    const user = new users({
        name: name,
        email: email,
        phone: phone,
        role: 'finance_manager',
        CFO: req.session.USER.id,
        companyid : req.session.USER.companyid,
        password: 'bhavya' // it will generate randomly in real use and directly send to employee ans hashed passwprd save in database;
    
    })
   await user.save();

res.redirect('/CFO/finance_manager_list');

}




exports.manager_aggregate = async (req,res,next) =>{


     const company_id = req.session.USER.companyid;
        const expenses = await manager_expense.find({companyid : company_id}).populate('manager').populate('finance_manager');
    res.render('CFO/manager_aggregate.ejs' , {page : 'manager_aggregate',expenses});

}

 exports.employe_aggregate = async (req,res,next) =>{
    const company_id = req.session.USER.companyid;
  const expenses = await employee_expense.find({companyid : company_id}).populate('employee').populate('manager');
 

  res.render('CFO/employe_aggregate.ejs', {page : 'employe_aggregate' , expenses});

 }




exports.finance_manager_list = async(req,res,next) =>{
    const company_id = req.session.USER.companyid;

    const finance_managers = await users.find({role : 'finance_manager' , companyid : company_id});
    const managers = await users.find({role : 'manager', companyid : company_id});
    const employees = await users.find({role : 'employee' , companyid : company_id});

    const employee_expenses = await employee_expense.find({companyid : company_id, status : 'approved'}).populate('manager');
    const manager_expenses = await manager_expense.find({companyid : company_id ,status : 'approved' });

    const finance_manager_map = {};

    finance_managers.forEach(fm =>{
        finance_manager_map[fm._id] = {
            id: fm._id,
            name : fm.name,
            employecount : 0,
            managercount: 0,
            totalexpense : 0

        }

    })
    
    managers.forEach(man =>{
        const finance_manager_id = man.finance_manager;
        if(finance_manager_map[finance_manager_id]){
            finance_manager_map[finance_manager_id].managercount++;
        }
    })

    employees.forEach(emp =>{
        const manager = managers.find(m =>
            m._id.toString() ===
            emp.manager.toString()
        );
        if(!manager) return;

        const finance_manager_id = manager.finance_manager;

        if(finance_manager_map[finance_manager_id]){
            finance_manager_map[finance_manager_id].employecount++;
        }

    })

   
    employee_expenses.forEach(emp =>{
        const finance_manager_id = emp.manager.finance_manager;
        if(finance_manager_map[finance_manager_id]){
            finance_manager_map[finance_manager_id].totalexpense += emp.amount;
        }
    })

    manager_expenses.forEach(man =>{
        const finance_manager_id = man.finance_manager;
        if(finance_manager_map[finance_manager_id]){
            finance_manager_map[finance_manager_id].totalexpense += man.amount;
        }
    })


    res.render('CFO/finance_manager_list.ejs', {page:'finance_manager_list' , finance_manager_map});
}

exports.delete_finance_manager = async(req,res,next) =>{


const company_id = req.session.USER.companyid;
const finance_manager_id = req.params.id;
try{

    const managers = await users.find({companyid : company_id , role : 'manager',finance_manager : finance_manager_id});
    const manager_ids = managers.map(m => m._id);

    await users.findByIdAndDelete(finance_manager_id);
    await users.deleteMany({finance_manager : finance_manager_id , role : 'manager'});
    await manager_expense.deleteMany({finance_manager : finance_manager_id});
    await users.deleteMany({    manager : {$in :  manager_ids} , role: 'employee'});
    await employee_expense.deleteMany({ manager : {$in :  manager_ids}});

    
    res.json({
        success : true
    })
}catch(err){
console.log("err in deleting an finacial manager inside the cfo controller");
res.json({
    success : false
})
}

}