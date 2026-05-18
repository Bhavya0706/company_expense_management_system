const multer = require('multer');
const path = require('path');

//multer configuration

const storage = multer.diskStorage({

destination: function(req,file,cb){
    cb(null, 'public/uploads');
},
filename: function(req,file,cb){
    cb(null, Date.now() + "-" + file.originalname);
}

});

const upload = multer({ storage });

module.exports = upload;  // used in routers where we uploaded files 
