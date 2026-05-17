const express = require('express');
const app = express();
const parser = require("body-parser");
const path = require('path');
const rootdir = require('./utils/pathutils')
const { default: mongoose } = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo').default;
app.set('view engine' , 'ejs');
app.set('views', path.join(rootdir, 'views'));
const db_path = "mongodb+srv://bhavya:bh%40vy%40@bhavya.g1kwbuj.mongodb.net/expense_management?appName=bhavya";

const authrouter = require('./routes/authrouter');
const employeerouter = require('./routes/employeerouter');
const managerrouter = require('./routes/managerrouter');
const finance_manager_router = require('./routes/finance_manager_router');
const CFOrouter = require('./routes/CFOrouter');
const centroidrouter = require('./routes/centroidrouter')
const errorcontroller = require('./controllers/centroidcontroller');



app.use(express.static(path.join(rootdir , 'public')));
app.use(express.json());

app.use(session ({
    name : 'expense.sid',  // this will be cookie name in browser
    secret : 'bhavya suthar',
    resave : false,
    saveUninitialized : false,
    store: MongoStore.create({
        mongoUrl : db_path,
        collectionName : 'sessions'
    }),
    cookie : {
        maxAge : 1000 * 60 * 60 * 24
    }
}))

app.use(parser.urlencoded());

app.use(authrouter);
app.use(managerrouter);
app.use(employeerouter);
app.use(CFOrouter);
app.use(finance_manager_router);
app.use(centroidrouter);

app.use(errorcontroller.page_not_found);

const port = 3000;


mongoose.connect(db_path).then(()=>{

    console.log("connected to mongo");
    app.listen(port , ()=>{

        console.log(`server is running on http://localhost:${port}`)
    })

}).catch(err =>{
    console.log("error in connnecting to mongo");
})

