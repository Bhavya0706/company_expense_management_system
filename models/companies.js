const mongoose = require('mongoose');

const company_schema = new mongoose.Schema({
company_name : {
    type: String,
    required: true

},
company_email :{
    type: String,
    required: true,
    unique: true
},
company_contact_number :{
    type: Number,
    required: true
},
company_address : {
  type: String,
  required:true

}
}, { timestamps: true });

module.exports = mongoose.model('companies', company_schema);