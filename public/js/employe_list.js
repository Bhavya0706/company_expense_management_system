/* ── Use backend data ── */
const history = typeof expenses !== "undefined" ? expenses : [];
const employe = typeof employee !== "undefined" ? employee : [];


const body = document.getElementById('historyBody');

const expense_map = {};
history.forEach(r => {
    let employe_id = r.employee._id;

 if(! expense_map[employe_id]){
    expense_map[employe_id]={
      
        approvedexpense: 0,
        rejectedexpense: 0
    }

 }

if(r.status == 'approved'){
    expense_map[employe_id].approvedexpense += r.amount ; 
}
if(r.status == 'rejected'){
    expense_map[employe_id].rejectedexpense += r.amount ;
}
    
});
console.log(expense_map);
const employe_list = {};
employe.forEach(r => {
 employe_list[r._id] = {
    id : r._id,
    name : r.name,
    approvedexpense : expense_map[r._id] ?.approvedexpense || 0,
    rejectedexpense : expense_map[r._id] ?.rejectedexpense || 0 

 }

})



/* ── Render Table ── */

   
Object.values(employe_list).forEach(emp =>{

     
         body.innerHTML +=  `
             <tr>
               
                 <td>${emp.name}</td>
                 <td>${emp.approvedexpense}</td>
                 <td>${emp.rejectedexpense}</td>
              
                 <td>
                   <button onclick="deletee('${emp.id}')" class="btn-delete">
    DELETE
  </button>
                 </td>
             </tr>
         `});

         function deletee(id){
            fetch(`/manager/delete-employee/${id}`,{method : 'DELETE'})
            .then(res => res.json)
            .then(data => {
                location.reload();
            })
            .catch(err =>{
                console.log("error in deleting an employee in employee list.js > public");
            } );

         }

 


