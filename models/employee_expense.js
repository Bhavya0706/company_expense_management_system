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

    employee: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: true
    },
    manager: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: true
    },
    companyid: {
        type: mongoose.Schema.Types.ObjectId
     }, 
     billname : {
        type : String
     }
    

}, { timestamps: true });

module.exports = mongoose.model("employee_Expense", expenseSchema);