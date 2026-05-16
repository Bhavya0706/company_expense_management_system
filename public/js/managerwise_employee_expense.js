
 // logic for the bar chart 


const ctx = document
    .getElementById('managerExpenseChart');

new Chart(ctx, {

    type: 'bar',

    data: {

        labels: managerData.map(item => item.manager),

        datasets: [{

            label: 'Approved Expense',

            data: managerData.map(item => item.expense),

            borderRadius: 10,
            borderSkipped: false

        }]
    },

    options: {

        responsive: true,

        maintainAspectRatio: false,

        indexAxis: 'y',

        plugins: {

            legend: {
                display: false
            },

            tooltip: {

                callbacks: {

                    label: function(context) {

                        const item =
                            managerData[context.dataIndex];

                        return [
                            `Approved Expense: ₹${item.expense.toLocaleString()}`,
                            `Employees: ${item.employees}`
                        ];
                    }
                }
            }
        },

        scales: {

            x: {

                beginAtZero: true,

                grid: {
                    color: '#eef5f8'
                },

                ticks: {

                    callback: function(value) {
                        return '₹' + (value / 1000) + 'k';
                    }
                }
            },

            y: {

                grid: {
                    display: false
                }
            }
        }
    }
});

// table logic


const tableBody = document.getElementById("managerTableBody");

managerData.forEach((manager) => {

  

  // Format currency
  const formattedAmount = "₹" + manager.expense.toLocaleString("en-IN");

  const row = `
    <tr>

      <td>
        <div class="manager-info">

          ${manager.manager}

        </div>
      </td>

      <td class="amount">
        ${formattedAmount}
      </td>

      <td>
        ${manager.employees} Employees
      </td>

    </tr>
  `;

  tableBody.innerHTML += row;
});
