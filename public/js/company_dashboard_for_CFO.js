
// ─────────────────────────────────────
// PIE CHART DATA
// ─────────────────────────────────────

let approvedTotal = 0;
let pendingTotal = 0;
let rejectedTotal = 0;

allexpenses.forEach(exp => {

    if (exp.status === "approved") {
        approvedTotal += exp.amount;
    }

    else if (exp.status === "pending") {
        pendingTotal += exp.amount;
    }

    else if (exp.status === "rejected") {
        rejectedTotal += exp.amount;
    }

});
let total = approvedTotal + pendingTotal + rejectedTotal;

document.getElementById('total').textContent = total.toLocaleString('en-IN');
document.getElementById('approved').textContent = approvedTotal.toLocaleString('en-IN');
document.getElementById('pending').textContent = pendingTotal.toLocaleString('en-IN');
document.getElementById('rejected').textContent = rejectedTotal.toLocaleString('en-IN');



// ─────────────────────────────────────
// PIE CHART
// ─────────────────────────────────────

new Chart(document.getElementById("statusChart"), {

    type: "pie",

    data: {

        labels: ["Approved", "Pending", "Rejected"],

        datasets: [{

            data: [
                approvedTotal,
                pendingTotal,
                rejectedTotal
            ],backgroundColor: [
                '#27ae60',
                '#f39c12',
                '#e74c3c'
            ],
            borderWidth: 2

        }]
    }
});



// ─────────────────────────────────────
// CATEGORY CHART
// ─────────────────────────────────────


 /** preparation for the doughnut chart */

 const categorytotal = {};

 allexpenses.forEach(exp => {
  const cat = exp.category || "other";

  if(!categorytotal[cat]){
    categorytotal[cat] = 0;
  }
  if(exp.status == 'approved'){
      
        categorytotal[cat] += Number(exp.amount);

  }

 })

 /** this for each loop will give us object like {food : 100000,  other: 51002} */


 const labels = Object.keys(categorytotal);  // array of keys 
 const data = Object.values(categorytotal);  // array of values 




new Chart(document.getElementById("categoryChart"), {

    type: "doughnut",

    data: {

        labels:labels,

        datasets: [{

            label: "Category Expense",

            data: data,

            borderWidth: 1
        }]
    },

    options: {

        responsive: true,

        plugins: {

            legend: {
                position: "bottom"
            }
        }
    }
});



// ─────────────────────────────────────
// MONTHLY TREND CHART
// ─────────────────────────────────────



const monthlyData = {

    Jan: 0,
    Feb: 0,
    Mar: 0,
    Apr: 0,
    May: 0,
    Jun: 0,
    Jul: 0,
    Aug: 0,
    Sep: 0,
    Oct: 0,
    Nov: 0,
    Dec: 0
};


// ONLY APPROVED EXPENSES

allexpenses.forEach(exp => {

    const month =
        new Date(exp.date)
        .toLocaleString('default', {

            month: 'short'
        });

    if (exp.status === 'approved') {

        monthlyData[month] += exp.amount;
    }
});


// ─────────────────────────────────────
// BAR CHART
// ─────────────────────────────────────

new Chart(

    document.getElementById("trendChart"),

    {

        type: "bar",

        data: {

            labels: Object.keys(monthlyData),

            datasets: [

                {

                    label: "Approved Expenses",

                    data: Object.values(monthlyData),

                    borderWidth: 1,

                    borderRadius: 8,

                    barThickness: 35
                }
            ]
        },

        options: {

            responsive: true,

            maintainAspectRatio: false,

            plugins: {

                legend: {

                    display: true,

                    position: "top"
                },

                tooltip: {

                    callbacks: {

                        label: function(context) {

                            return " ₹" +
                                context.raw;
                        }
                    }
                }
            },

            scales: {

                y: {

                    beginAtZero: true,

                    ticks: {

                        callback: function(value) {

                            return "₹" + value;
                        }
                    }
                }
            }
        }
    }
);


// ─────────────────────────────────────
// TLINE CHART FOR THE MONTHLY REQUESTS
// ─────────────────────────────────────




const monthlyRequests = Array(12).fill(0);

allexpenses.forEach(exp => {

    const month = new Date(exp.date).getMonth();
if(exp.status == 'approved'){
    monthlyRequests[month]++;
}
 

});

const monthLabels = [
    "Jan", "Feb", "Mar", "Apr",
    "May", "Jun", "Jul", "Aug",
    "Sep", "Oct", "Nov", "Dec"
];

new Chart(document.getElementById("requestTrendChart"), {

    type: "line",

    data: {

        labels: monthLabels,

        datasets: [{

            label: "Monthly Requests",

            data: monthlyRequests,

            tension: 0.4,
            fill: false
        }]
    },

    options: {

        responsive: true,

        plugins: {

            legend: {
                display: true
            }
        },

        scales: {

            y: {
                beginAtZero: true
            }
        }
    }
});



// ─────────────────────────────────────
// day-wise request trend
// ─────────────────────────────────────


const dailyRequests = Array(31).fill(0);

allexpenses.forEach(exp => {

    const day = new Date(exp.date).getDate();
    if(exp.status == 'approved'){
        dailyRequests[day - 1]++;
    }

    

});

const dayLabels = Array.from(
    { length: 31 },
    (_, i) => i + 1
);

new Chart(document.getElementById("dailyRequestChart"), {

    type: "line",

    data: {

        labels: dayLabels,

        datasets: [{

            label: "Requests Per Day",

            data: dailyRequests,

            tension: 0.4,
            fill: false
        }]
    },

    options: {

        responsive: true,

        plugins: {

            legend: {
                display: true
            }
        },

        scales: {

            y: {
                beginAtZero: true
            }
        }
    }
});
 

// ─────────────────────────────────────
// EMPLOYEE SUMMARY
// ─────────────────────────────────────

const employeeSummary = {};

allexpenses.forEach(exp => {

    // only employee expenses
    if (!exp.employee) return;

    const employeeId = exp.employee._id;

    // create object if not exists
    if (!employeeSummary[employeeId]) {

        employeeSummary[employeeId] = {

            name: exp.employee.name,

            managerName: exp.manager?.name || "Unknown",

            totalRequests: 0,

            approvedExpense: 0
        };
    }

    // increase request count
    if (exp.status === "approved") {
    employeeSummary[employeeId].totalRequests++;}

    // only approved expenses
    if (exp.status === "approved") {

        employeeSummary[employeeId]
            .approvedExpense += exp.amount;
    }
});



// ─────────────────────────────────────
// CONVERT OBJECT → ARRAY
// ─────────────────────────────────────

const employeeArray =
    Object.values(employeeSummary);



// ─────────────────────────────────────
// SORT DESCENDING
// ─────────────────────────────────────

employeeArray.sort((a, b) => {

    return b.approvedExpense - a.approvedExpense;
});



// ─────────────────────────────────────
// TAKE TOP 3
// ─────────────────────────────────────

const topEmployees =
    employeeArray.slice(0, 3);



// ─────────────────────────────────────
// RENDER TABLE
// ─────────────────────────────────────

const topEmployeeBody =
    document.getElementById("topEmployeeBody");


topEmployees.forEach(emp => {

    topEmployeeBody.innerHTML += `

        <tr>

            <td>
                ${emp.name}
            </td>
            
              <td>${emp.managerName}</td>

            <td>
                ${emp.totalRequests}
            </td>

            <td class="amount">
                ₹${emp.approvedExpense}
            </td>

        </tr>
    `;
});
// ─────────────────────────────────────
// manager SUMMARY
// ─────────────────────────────────────

const managersummery = {};

allexpenses.forEach(exp => {

    // only manager expenses
    if (!exp.finance_manager) return;

    const managerid = exp.manager._id;

    // create object if not exists
    if (!managersummery[managerid]) {

        managersummery[managerid] = {

            name: exp.manager.name,

            finance_manager : exp.finance_manager.name,

            totalRequests: 0,

            approvedExpense: 0
        };
    }

    // increase request count
    if (exp.status === "approved") {
    managersummery[managerid].totalRequests++;   }

    // only approved expenses
    if (exp.status === "approved") {

        managersummery[managerid]
            .approvedExpense += exp.amount;
    }
});



// ─────────────────────────────────────
// CONVERT OBJECT → ARRAY
// ─────────────────────────────────────

const managerarray =
    Object.values(managersummery);



// ─────────────────────────────────────
// SORT DESCENDING
// ─────────────────────────────────────

managerarray.sort((a, b) => {

    return b.approvedExpense - a.approvedExpense;
});



// ─────────────────────────────────────
// TAKE TOP 3
// ─────────────────────────────────────

const topmanager =
    managerarray.slice(0, 3);

console.log(topmanager);

// ─────────────────────────────────────
// RENDER TABLE
// ─────────────────────────────────────

const topmanagerbody =
    document.getElementById("topmanagerbody");


topmanager.forEach(emp => {

    topmanagerbody.innerHTML += `

        <tr>

            <td>
                ${emp.name}
            </td>  
            <td>
                ${emp.finance_manager}
            </td>  

            <td>
                ${emp.totalRequests}
            </td>

            <td class="amount">
                ₹${emp.approvedExpense}
            </td>

        </tr>
    `;
});

 


