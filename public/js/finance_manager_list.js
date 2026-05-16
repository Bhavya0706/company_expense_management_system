const finance_manager_list = typeof finance_manager_map !== 'undefined'? finance_manager_map : [];


/* ── Render Table ── */
const body = document.getElementById('fmlist');
   
Object.values(finance_manager_list).forEach(emp =>{

     
         body.innerHTML +=  `
             <tr>
               
                 <td>${emp.name}</td>
                 <td>${emp.managercount}</td>

                 <td>${emp.employecount}</td>
                 <td>${emp.totalexpense}</td>
              
                 <td>
                   <button onclick="deletee('${emp.id}')" class="btn-delete">
    DELETE
  </button>
                 </td>
             </tr>
         `});

         function deletee(id){
            fetch(`/CFO/delete-finance_manager/${id}`,{method : 'DELETE'})
            .then(res => res.json)
            .then(data => {
                location.reload();
            })
            .catch(err =>{
                console.log("error in deleting an finacial manager in finacial manager list.js > public");
            } );

         }

 


