const { check, validationResult } = require("express-validator");
const users = require('../models/users');
const companies = require('../models/companies');
const bcrypt = require('bcrypt')



exports.login = (req,res,next) =>{

    res.render('auth/login.ejs', {msg : false , oldinput : {email : ''}} , );
}


exports.postlogin = async (req,res,next) =>{
    const {role,email,password} = req.body;
   
 const USER = await users.findOne({role : role , email : email})
if(!USER){
   return res.status(422).render('auth/login.ejs', {msg : 'user does not exist' , oldinput : {email}});
}


//    const ismatch =
//    await bcrypt.compare( password,user.password);

   if(password != USER.password){
    return res.status(422).render('auth/login.ejs', {msg : 'incorrect password', oldinput : {email}});
   }

   req.session.isloggedin = true;
   req.session.USER = {
    id : USER._id,
    role : USER.role,
    email : USER.email,
    companyid : USER.companyid
   }

   req.session.save(err =>{
    if(err){
        console.log(err);
    }

    if(USER.role == 'chief_financial_officer'){
    return  res.redirect('/CFO/dashboard'); 
    }
    if(USER.role == 'finance_manager'){
     return res.redirect('/finance_manager/dashboard');
    }
    if(USER.role == 'manager'){
     return res.redirect('/manager/dashboard');
    }
    if(USER.role == 'employee'){
     return res.redirect('/employee/dashboard');
    }

   })


}



exports.signup = 
    (req,res,next) =>{
    res.render('auth/register_company.ejs', {errors : false , oldinput : {companyname : '',companyemail : '',companynumber : '',companyaddress : '',username : '',useremail : '',mobilenumber : ''}});
}
exports.postsignup = [
    


    check('companyname')
    .notEmpty()
    .withMessage('Company name is required')
    .trim()
    .isLength({ min: 3 })
    .withMessage(
        'Company name must contain minimum 3 letters'
    ),


    check('companyemail')

    .isEmail()

    .withMessage(
        'Enter valid company email'
    )

    .normalizeEmail()
    .custom(async (value) => {
    
        const existingUser =
            await companies.findOne({
    
                company_email: value
            });
    
        if (existingUser) {
    
            throw new Error(
                ' company Email already registered'
            );
        }
    
        return true;
    }),


 
    check('companynumber')

    .matches(/^[0-9]{10}$/)

    .withMessage(
        'Company number must contain 10 digits'
    ),

    check('companyaddress')

    .notEmpty()

    .withMessage(
        'Company address is required'
    ),


    check('username')

    .notEmpty()

    .withMessage(
        'Username is required'
    )

    .trim()

    .isLength({ min: 3 })

    .withMessage(
        'Username must contain minimum 3 letters'
    ),


    check('useremail')

    .isEmail()

    .withMessage(
        'Please enter valid email'
    )

    .normalizeEmail()
    
    .custom(async (value) => {

    const existingUser =
        await users.findOne({

            email: value
        });

    if (existingUser) {

        throw new Error(
            ' user Email  already registered'
        );
    }

    return true;
}),


    check('mobilenumber')

    .matches(/^[0-9]{10}$/)

    .withMessage(
        'Mobile number must contain 10 digits'
    ),

    check('password')

    .notEmpty()

    .withMessage(
        'Password is required'
    )

    .isLength({ min: 8 })

    .withMessage(
        'Password must contain minimum 8 characters'
    )

    .matches(/[a-z]/)

    .withMessage(
        'Password must contain lowercase letter'
    )

    .matches(/[A-Z]/)

    .withMessage(
        'Password must contain uppercase letter'
    )

    .matches(/[0-9]/)

    .withMessage(
        'Password must contain number'
    )

    .matches(/[!@#$%^&*()?~]/)

    .withMessage(
        'Password must contain special character'
    ),

    check('confirmpassword')

    .custom((value, { req }) => {

        if (
            value !== req.body.password
        ) {

            throw new Error(
                'password and confirm password must be same'
            );
        }

        return true;
    }),

 
    
   async (req,res,next) =>{


    try {
        const{companyname,companyemail,companynumber,companyaddress,username,useremail,mobilenumber,password} = req.body;
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            // if err
            return res.status(422).render('auth/register_company.ejs', {errors : errors.array().map(err => err.msg) , oldinput : {companyname,companyemail,companynumber,companyaddress,username,useremail,mobilenumber}});
    
        }

    
        const company =  new companies({
            company_name : companyname,
            company_email : companyemail,
            company_contact_number : companynumber,
            company_address : companyaddress
    
        });
    
        // const hashedpassword = await bcrypt.hash(password ,12); 
        const user =  new users({
            name : username,
            email : useremail,
            phone: mobilenumber,
            password : password,
            role : 'chief_financial_officer',
            companyid : company._id
        })
    
        await company.save();
        await user.save();
        res.redirect('/auth/login');
    }catch(err){
        console.log("err in registrering the company",err);
    res.status(500).send('server is busy');
    }


}]

exports.home = (req,res,next) =>{
    res.render('home.ejs');
}


module.exports.isauth = (req,res,next) =>{
    if(!req.session.isloggedin){
        return res.redirect('/auth/login');
    }
    next();
}

module.exports.allowroles = (role) => {
    return (req,res,next) =>{
        if(!req.session.isloggedin){
            return res.redirect('/auth/login');
        };
        if(!role.includes(req.session.USER.role)){
      return res.status(403).send("Access Denied");
        }
        next();
    }
}

exports.logout = (req,res,next) =>{
    req.session.destroy((err) =>{
        if(err){
             return next(err);
        }
        res.clearCookie('connect.sid');
        res.redirect('/');
    })
}