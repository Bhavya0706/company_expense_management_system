const mongoose = require('mongoose');


const expenseSchema = new mongoose.Schema({
    
    title: {
        type: String,
        required: true
    },

    amount: {
        type: Number,
        required: true
    },

    category: {
        type: String,
        required: true
    },

    paymentMethod: {
        type: String
    },

    vendor: {
        type: String
    },

    description: {
        type: String
    },

    date: {
        type: Date,
        required: true
    },

    status: {
        type: String,
        enum: ["pending", "approved", "rejected"],
        default: "pending"
    },

    manager: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: true
    }
    ,

    finance_manager: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: true
    },
    companyid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "companies"
     },
     billname : {
        type : String
     }

}, { timestamps: true });

module.exports = mongoose.model("manager_expenses", expenseSchema);