/* ── Use backend data ── */
const history = typeof expenses !== "undefined" ? expenses : [];
const manager = typeof managers !== "undefined" ? managers : [];
const employess = typeof employes !== "undefined" ? employes : [];


const body = document.getElementById('historyBody');

const employe_count = {};

employess.forEach(ele =>{

const manager_id = ele.manager;

if(!employe_count[manager_id]){

employe_count[manager_id] = 0;

}

employe_count[manager_id]++;



})




const expense_map = {};
history.forEach(r => {
    let manager_id = r.manager._id;

 if(! expense_map[manager_id]){
    expense_map[manager_id]={
      
        approvedexpense: 0,
        rejectedexpense: 0
    }

 }

if(r.status == 'approved'){
    expense_map[manager_id].approvedexpense += r.amount ; 
}
if(r.status == 'rejected'){
    expense_map[manager_id].rejectedexpense += r.amount ;
}
    
});
console.log(expense_map);
const manager_list = {};
manager.forEach(r => {
 manager_list[r._id] = {
    id : r._id,
    name : r.name,
    employe_count : employe_count[r._id]|| 0,
    approvedexpense : expense_map[r._id] ?.approvedexpense || 0,
    rejectedexpense : expense_map[r._id] ?.rejectedexpense || 0 

 }

})



/* ── Render Table ── */

   
Object.values(manager_list).forEach(emp =>{

     
         body.innerHTML +=  `
             <tr>
               
                 <td>${emp.name}</td>
                 <td>${emp.employe_count}</td>

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
            fetch(`/finance_manager/delete-manager/${id}`,{method : 'DELETE'})
            .then(res => res.json)
            .then(data => {
                location.reload();
            })
            .catch(err =>{
                console.log("error in deleting an manager in manager list.js > public");
            } );

         }

 


