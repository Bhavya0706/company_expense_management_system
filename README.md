# Expense Management System

A full-stack Expense Management System built using Node.js, Express.js, MongoDB, EJS, and JavaScript.

The system allows companies to manage employee expenses through a role-based approval workflow.

---

# Features

- Company registration
- Role-based authentication and authorization
- Employee expense submission
- Expense approval/rejection workflow
- Expense analytics dashboard
- Monthly expense charts
- Manager-wise and finance-manager-wise expense tracking
- Secure password hashing using bcrypt
- Form validation using express-validator

---

# User Hierarchy

```
CFO
 ↓
Finance Manager
 ↓
Manager
 ↓
Employee
```

---

# Tech Stack

## Backend
- Node.js
- Express.js
- MongoDB
- Mongoose

## Frontend
- EJS
- HTML
- CSS
- JavaScript
- Chart.js

---

# Installation

## Clone Repository

```bash
git clone https://github.com/Bhavya0706/company_expense_managemenr_system.git
```

## Navigate to Project

```bash
cd expense-management
```

## Install Dependencies

```bash
npm install
```

## Start Server

```bash
npm start
```

---



# Folder Structure

```text
controllers/
models/
routes/
views/
public/
```

---

# Security Features

- Password hashing with bcrypt
- Session-based authentication
- Role-based authorization
- Input validation and sanitization

---

# Author

Bhavya Suthar
