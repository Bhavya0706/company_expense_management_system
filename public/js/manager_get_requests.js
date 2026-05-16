console.log("entered in nanager_get_request");
function loadData(status) {
    console.log(status);
  fetch(`/manager/requests-data?status=${status}`)
    .then(res => res.json()) // Converts response into JavaScript object
    .then(data => {
      renderTable(data);
    });
}


   
function renderTable(expenses) {
   console.log("entered in rendertable", expenses);
  const body = document.getElementById("tablebody");

  body.innerHTML = expenses.map(exp => {
    return `
      <tr>
        <td>${exp._id.slice(-5).toUpperCase()}</td>
    <td>${exp.employee?.name || 'Unknown'}</td>
        <td>${exp.category}</td>
     
     <td>   <span class="status ${exp.status}">
    ${exp.status}
  </span></td>
      <td>
  <button onclick="goToDetails('${exp._id}')" class="btn-submit">
    Details
  </button>
</td>
      </tr>
    `;
  }).join("");
}

function goToDetails(id) {
    window.location.href = `/manager/employee_requests/${id}`;
  }

// load all data initially
loadData('all');
