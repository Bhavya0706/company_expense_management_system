

const history = typeof expenses !== "undefined" ? expenses : [];

var total = 0;
var pendigamount = 0;
var approvedamount = 0;
var rejectedamount = 0;

history.forEach(ele =>{
    total += ele.amount;
});


history.forEach(ele =>{
    if(ele.status == 'pending'){
        pendigamount += ele.amount;
    }else if(ele.status == 'approved'){
        approvedamount += ele.amount;
    }else{
        rejectedamount += ele.amount;
    }   
})


document.getElementById('total').textContent = total;
document.getElementById('pendigamount').textContent = pendigamount;
document.getElementById('approvedamount').textContent = approvedamount;
document.getElementById('rejectedamount').textContent = rejectedamount;





// console.log("this is history",history);
/** bar chart preparationn*/

const monthlyTotals = new Array(12).fill(0);

history.forEach(exp => {
    const date = new Date(exp.date);
    const monthIndex = date.getMonth(); // 0 = Jan, 11 = Dec
    if(exp.status == 'approved'){
    
        monthlyTotals[monthIndex] += Number(exp.amount);
    }
  });

// console.log(monthlyTotals);
 

    /* ── Bar Chart ── */
    new Chart(document.getElementById('barChart'), {
        type: 'bar',
        data: {
            labels:  [
                "Jan","Feb","Mar","Apr","May","Jun",
                "Jul","Aug","Sep","Oct","Nov","Dec"
              ],
            datasets: [{
                label: 'Spent (₹)',
                data: monthlyTotals,
                backgroundColor: 'rgba(48, 185, 227, 0.25)',
                borderColor: '#30b9e3',
                borderWidth: 2,
                borderRadius: 8,
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: { legend: { display: false } },
            scales: {
                x: { grid: { display: false }, ticks: { font: { size: 12 } } },
                y: {
                    grid: { color: 'rgba(0,0,0,0.05)' },
                    ticks: {
                        font: { size: 11 },
                        callback: function(v) { return '₹' + (v/1000).toFixed(0) + 'k'; }
                    }
                }
            }
        }
    });
 /** preparation for the doughnut chart */

 const categorytotal = {};

 history.forEach(exp => {
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






    
/* ── Doughnut Chart ── */

new Chart(document.getElementById('doughnutChart'), {
    type: 'doughnut',
    data: {
        labels:labels,
        datasets: [{

            data: data,
           
            backgroundColor: ['#30b9e3','#27ae60','#f39c12','#9b59b6','#e74c3c','#84d0f0'],
            borderWidth: 2,
            borderColor: '#fff',
        }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        cutout: '68%',
        plugins: {
            legend: {
                position: 'right',
                labels: { font: { size: 11 }, boxWidth: 12, padding: 10 }
            }
        }
    }
});


/** pie chart for */


const approvedTotal = expenses
  .filter(exp => exp.status === "approved")
  .reduce((total, exp) => total + exp.amount, 0);

const pendingTotal = expenses
  .filter(exp => exp.status === "pending")
  .reduce((total, exp) => total + exp.amount, 0);

const rejectedTotal = expenses
  .filter(exp => exp.status === "rejected")
  .reduce((total, exp) => total + exp.amount, 0);


new Chart(document.getElementById('statusChart'), {
    type: 'pie',
    data: {
        labels: ['Approved', 'Pending', 'Rejected'],
        datasets: [{
            data: [
                approvedTotal,
                pendingTotal,
                rejectedTotal
            ],
            backgroundColor: [
                '#27ae60',
                '#f39c12',
                '#e74c3c'
            ],
            borderWidth: 2
        }]
    },

    options: {
        responsive: true,
        plugins: {
            legend: {
                position: 'bottom'
            }
        }
    }
});


/** employee tableee */


/** preparation for table it will make javascript object by employee id like ' id ( name : ; total : ; total : ;) ' */
const employeeSummary = {};

expenses.forEach(exp => {

    const employeeId = exp.employee._id;

    // if employee not already added
    if (!employeeSummary[employeeId]) {

        employeeSummary[employeeId] = {
            name: exp.employee.name,
            manager : exp.manager.name,
            totalExpense: 0,
            totalRequests: 0
        };
    }

    if (exp.status === "approved") {
        employeeSummary[employeeId].totalExpense += exp.amount;
    }

    // increase request count
    if (exp.status === "approved") {
    employeeSummary[employeeId].totalRequests += 1; }   
});

// console.log(employeeSummary);

/** rendering the table  */

const tableBody = document.getElementById("employeeTableBody");

tableBody.innerHTML = Object.values(employeeSummary).map(emp => {

 

    return `
        <tr>

            <td>
                <div class="emp-info">
                  
                    ${emp.name}
                </div>
            </td>

            <td>
                ${emp.manager}
            </td>

            <td class="amount">
                ₹${emp.totalExpense.toLocaleString()}
            </td>

            <td>
                ${emp.totalRequests} Requests
            </td>

        </tr>
    `;

}).join("");