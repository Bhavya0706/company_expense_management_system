/* ── Use backend data ── */
const history = typeof expenses !== "undefined" ? expenses : [];



let total = 0;
let approved = 0;
let pending = 0;
let rejected = 0;

history.forEach(exp => {
  const amt = Number(exp.amount) || 0;
  total += amt;

  if (exp.status === "approved") {
    approved += amt;
  } else if (exp.status === "pending") {
    pending += amt;
  } else if (exp.status === "rejected") {
    rejected += amt;
  }
});

function formatINR(val) {
    return "₹" + val.toLocaleString("en-IN");
  }
  
  document.getElementById("totalSpent").textContent = formatINR(total);
  document.getElementById("approvedTotal").textContent = formatINR(approved);
  document.getElementById("pendingTotal").textContent = formatINR(pending);
  document.getElementById("rejectedTotal").textContent = formatINR(rejected);




/* ── Render Table ── */
function renderHistory() {
    const body = document.getElementById('historyBody');
    if (!body) return;

    body.innerHTML = history.map(r => `
        <tr>
            <td>${formatDate(r.date)}</td>
            <td>${r.title}</td>
            <td>${r.category}</td>
            <td class="amount-cell">₹${Number(r.amount).toLocaleString('en-IN')}</td>
            <td>
                <span class="status-pill ${r.status}">
                    ${capitalize(r.status)}
                </span>
            </td>
        </tr>
    `).join('');
}

function formatDate(d) {
    return new Date(d).toLocaleDateString('en-IN', {
        day: '2-digit',
        month: 'short',
        year: 'numeric'
    });
}

function capitalize(s) {
    return s.charAt(0).toUpperCase() + s.slice(1);
}

renderHistory();

/** bar chart preparationn*/

const monthlyTotals = new Array(12).fill(0);

history.forEach(exp => {
    const date = new Date(exp.date);
    const monthIndex = date.getMonth(); // 0 = Jan, 11 = Dec
  
    monthlyTotals[monthIndex] += Number(exp.amount);
  });


 

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

  categorytotal[cat] += Number(exp.amount);

 })

 /** this for each loop will give us object like {food : 100000,  other: 51002} */


 const labels = Object.keys(categorytotal);  // array of keys 
 const data = Object.values(categorytotal);  // array of values 

console.log(labels);
console.log(data);




    
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