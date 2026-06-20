# 💼 Company Expense Management System

A full-stack **Company Expense Management System** built to help organizations manage expenses through a structured approval hierarchy.

The application supports four company roles:

> **CFO → Finance Manager → Manager → Employee**

Each role has a separate dashboard, permissions, responsibilities, and access to expense information based on the company hierarchy.

---

## ✨ Core Concept

In many companies, employee expenses require approval before they should be counted as official company spending.

This project solves that problem through a hierarchy-based workflow:

* Employees submit expense requests to their Manager.
* Managers approve or reject employee requests.
* Managers can also submit their own expenses to their Finance Manager.
* Finance Managers approve or reject manager expense requests.
* CFO monitors company-wide expenses, approvals, teams, and analytics.

Only approved requests are treated as approved spending in analytics and comparison views.

---

## 🏢 Organization Hierarchy

```mermaid
flowchart TD
    CFO["👨‍💼 CFO"]

    FM["💼 Finance Manager"]
    Manager["📊 Manager"]
    Employee["👩‍💻 Employee"]

    CFO --> FM
    FM --> Manager
    Manager --> Employee

    Employee -->|"Submits Expense Request"| Manager
    Manager -->|"Approves / Rejects Employee Expense"| Employee

    Manager -->|"Submits Own Expense Request"| FM
    FM -->|"Approves / Rejects Manager Expense"| Manager

    CFO -->|"Views Company-Wide Analytics"| FM
    CFO -->|"Views Company-Wide Analytics"| Manager
    CFO -->|"Views Company-Wide Analytics"| Employee
```

---

## 🔄 Expense Approval Workflow

### 👩‍💻 Employee Expense Flow

```text
Employee submits expense
        ↓
Status: Pending
        ↓
Manager reviews request
        ↓
Approved / Rejected
```

Employees can submit details such as:

* Expense title
* Amount
* Category
* Payment method
* Vendor name
* Description
* Expense date
* Bill attachment

---

### 📊 Manager Expense Flow

```text
Manager submits personal expense
        ↓
Status: Pending
        ↓
Finance Manager reviews request
        ↓
Approved / Rejected
```

Finance Managers and CFOs do not submit approval-based expense requests in the current application flow.

---

## 👥 Role-Wise Features

### 👨‍💼 CFO

The CFO has access to the complete company hierarchy.

* Register a company and create the initial CFO account
* Create Finance Managers
* Delete Finance Managers and their linked hierarchy data
* View combined employee and manager expense records
* View company-wide expense analytics
* Compare Finance Manager-wise approved expenses
* View Manager-wise expense aggregates
* View Employee-wise expense aggregates
* Monitor approved, pending, and rejected expense totals
* View top managers and employees based on approved spending

---

### 💼 Finance Manager

Each Finance Manager manages multiple Managers.

* Create Managers
* Delete Managers and linked employee expense data
* Review Manager expense requests
* Approve or reject Manager expenses
* View all employee expenses under assigned Managers
* View Manager-wise approved employee expense analytics
* View Manager and Employee aggregate expense reports
* View team spending under their hierarchy

---

### 📊 Manager

Each Manager manages multiple Employees.

* Create Employees
* Delete Employees and their expense records
* Submit personal expense requests to Finance Manager
* View personal expense request history
* Review Employee expense requests
* Approve or reject Employee expenses
* Filter employee requests by status
* View employee-wise aggregate expense information

---

### 👩‍💻 Employee

Employees can manage their own expense submissions.

* Submit expense requests
* Upload bill attachments
* Track expense status
* View total, approved, pending, and rejected expenses
* View personal expense history

---

## 📊 Analytics Dashboard

The system provides role-based analytics using **Chart.js**.

### CFO Analytics

* Total company expense
* Approved expense amount
* Pending expense amount
* Rejected expense amount
* Monthly expense trends
* Expense category distribution
* Expense status distribution
* Daily and monthly request trends
* Top Managers by approved expense
* Top Employees by approved expense
* Finance Manager-wise team expense comparison

### Finance Manager Analytics

* Total spending under assigned Managers
* Manager-wise employee expense comparison
* Employee count under each Manager
* Manager and Employee aggregate data

### Manager Analytics

* Employee expense aggregates
* Employee request history
* Pending, approved, and rejected employee expenses

---

## 🛠️ Tech Stack

| Category              | Technologies                   |
| --------------------- | ------------------------------ |
| Backend               | Node.js, Express.js            |
| Database              | MongoDB, Mongoose              |
| Frontend              | EJS, HTML, CSS, JavaScript     |
| Charts                | Chart.js                       |
| Authentication        | Express Session, Connect Mongo |
| Validation            | Express Validator              |
| File Uploads          | Multer                         |
| Environment Variables | dotenv                         |
| Development Tool      | Nodemon                        |

---

## 🗂️ Project Structure

```text
company_expense_management_system/
│
├── controllers/
│   ├── authcontroller.js
│   ├── employeecontroller.js
│   ├── managercontroller.js
│   ├── finance_manager_controller.js
│   ├── CFO_controller.js
│   └── centroidcontroller.js
│
├── models/
│   ├── companies.js
│   ├── users.js
│   ├── employee_expense.js
│   └── manager_expense.js
│
├── routes/
│   ├── authrouter.js
│   ├── employeerouter.js
│   ├── managerrouter.js
│   ├── finance_manager_router.js
│   ├── CFOrouter.js
│   └── centroidrouter.js
│
├── utils/
│   ├── multer.js
│   └── pathutils.js
│
├── views/
│   ├── auth/
│   ├── employee/
│   ├── manager/
│   ├── finance manager/
│   ├── CFO/
│   ├── partials/
│   └── error/
│
├── public/
│   ├── css/
│   ├── js/
│   └── uploads/
│
├── app.js
├── package.json
└── README.md
```

---

## 🧩 Database Design

### Company

Stores company information.

```text
Company Name
Company Email
Company Contact Number
Company Address
```

### Users

Stores all user roles.

```text
Name
Email
Phone
Password
Role
Manager Reference
Finance Manager Reference
Company Reference
```

### Employee Expenses

```text
Title
Amount
Category
Payment Method
Vendor
Description
Date
Status
Employee Reference
Manager Reference
Company Reference
Bill Attachment
```

### Manager Expenses

```text
Title
Amount
Category
Payment Method
Vendor
Description
Date
Status
Manager Reference
Finance Manager Reference
Company Reference
```

---

## 🚀 Installation and Setup

### 1. Clone the Repository

```bash
git clone https://github.com/Bhavya0706/company_expense_management_system.git
```

### 2. Move into the Project Folder

```bash
cd company_expense_management_system
```

### 3. Install Dependencies

```bash
npm install
```

### 4. add `.env` variables

Create a file named `.env` in the project root.

```env
MONGO_URI=your_mongodb_connection_string
```

Example:

```env
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/company_expense_management
```

### 5. Start the Server

```bash
npm start
```

The application runs at:

```text
http://localhost:3000
```

---

## 🧪 How to Use the Application

1. Register a company using the signup page.
2. The registered user becomes the company CFO.
3. CFO creates Finance Managers.
4. Finance Managers create Managers.
5. Managers create Employees.
6. Employees submit expense requests.
7. Managers approve or reject employee requests.
8. Managers submit personal expense requests to Finance Managers.
9. Finance Managers approve or reject manager requests.
10. CFO monitors all analytics and company-wide expenses.

---

## 🔐 Authentication and Access Control

The project includes:

* Session-based authentication
* MongoDB session storage
* Role-based authorization middleware
* Role-specific dashboards
* Protected routes for each role
* Company-linked users and expense records
* Registration validation using Express Validator

---

## 📎 Bill Upload Support

Employees can attach bills while submitting expense requests.

Uploaded files are stored inside:

```text
public/uploads/
```

Multer is used to handle bill uploads and generate unique file names.

---

## 🌱 Future Improvements

* [ ] Hash passwords using bcrypt before saving to the database
* [ ] Send temporary login credentials through email
* [ ] Add forgot-password and reset-password functionality
* [ ] Add email notifications for approvals and rejections
* [ ] Add expense export to PDF and Excel
* [ ] Add pagination for large expense lists
* [ ] Add search and advanced filters
* [ ] Add cloud storage for bills
* [ ] Add audit logs for approvals and deletions
* [ ] Deploy the application online

---



---

## 👨‍💻 Author

**Bhavya Suthar**

* GitHub: [Bhavya0706](https://github.com/Bhavya0706)

---

## 📜 License

This project is created for educational and portfolio purposes.

---
