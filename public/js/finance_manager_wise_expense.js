
 // logic for the bar chart 


 const ctx = document
 .getElementById('managerExpenseChart');

new Chart(ctx, {

 type: 'bar',

 data: {

     labels: finance_manager_data.map(item => item.finance_manager),

     datasets: [{

         label: 'Approved Expense',

         data: finance_manager_data.map(item => item.expense),

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
                     finance_manager_data[context.dataIndex];

                     return [
                         `Approved Expense: ₹${item.expense.toLocaleString()}`,
                         `managers + employes: ${item.manager}`
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

finance_manager_data.forEach((finance_manager) => {



// Format currency
const formattedAmount = "₹" + finance_manager.expense.toLocaleString("en-IN");

const row = `
 <tr>

   <td>
     <div class="manager-info">

       ${finance_manager.finance_manager}

     </div>
   </td>

   <td class="amount">
     ${formattedAmount}
   </td>

   <td>
     ${finance_manager.manager} 
   </td>

 </tr>
`;

tableBody.innerHTML += row;
});
