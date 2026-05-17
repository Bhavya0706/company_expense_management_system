const users = require("../models/users");

exports.page_not_found = (req, res, next) => {

    res.status(404).render('error/error404.ejs', { page: '404'});

};


exports.backtohome = (req,res,next) => {
    const role = req.session.USER.role;

    if(role === 'employee'){
        return res.redirect('/employee/dashboard');
    }

    if(role === 'manager'){
        return res.redirect('/manager/dashboard');
    }

    if(role === 'finance_manager'){
        return res.redirect('/finance_manager/dashboard');
    }

    if(role === 'chief_financial_officer'){
        return res.redirect('/CFO/dashboard');
    }

    res.redirect('/auth/login');


}

exports.profile = async(req,res,next) =>{
       try{

           const user = await users.findById(req.session.USER.id);
           res.render('profile.ejs', {user});

       }catch(err){

       }
 






}