const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({

  name: {
    type: String,
    required: true
  },

  email: {
    type: String,
    required: true,
    unique: true
  },
  phone: {
    type: Number,
    required: true,
  },

  password: {
    type: String,
    required: true
  },

  role: {
    type: String,
    enum: ['employee', 'manager' , 'finance_manager' , 'chief_financial_officer'],
    required: true
  },

  // Only for employees (points to their manager)
  manager: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users',
    default: null
  },
  finance_manager : {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users',
    default: null
  },
  companyid: {
    type: mongoose.Schema.Types.ObjectId
 }

}, { timestamps: true });

module.exports = mongoose.model('users', userSchema);