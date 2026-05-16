
function loadData(status) {

  fetch(`/finance_manager/requests-data?status=${status}`)
    .then(res => res.json()) // Converts response into JavaScript object
    .then(data => {
      renderTable(data);
    });
}


   
function renderTable(expenses) {

  const body = document.getElementById("tablebody");

  body.innerHTML = expenses.map(exp => {
    return `
      <tr>
        <td>${exp._id.slice(-5).toUpperCase()}</td>
    <td>${exp.manager?.name || 'Unknown'}</td>
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
    window.location.href = `/finance_manager/manager_request/${id}`;
  }

// load all data initially
loadData('all');
