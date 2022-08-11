//This will manipulates the information added by user
import { saveTask, getTasks, onGetTasks, deleteTask} from "./firebase.js";

const taskForm = document.getElementById("task-form");
const tasksContainer = document.getElementById("tasks-container");

/*Once the program is open load the db data from Firebase async
 */
window.addEventListener("DOMContentLoaded", async () => {
  onGetTasks((querySnapshot) => {
    let html = "";

    querySnapshot.forEach((doc) => {
      const task = doc.data();
      html += `
            <div>
                <h3>${task.title}</h3>
                <p>${task.description}</p>
                <button class='btn-delete' data-id="${doc.id}">Delete</button>
            </div>
            `;
    });

    tasksContainer.innerHTML = html;

    const btnsDelete = tasksContainer.querySelectorAll('.btn-delete');

    btnsDelete.forEach((btn) => {
      btn.addEventListener("click", ({ target: { dataset } }) => {
        deleteTask(dataset.id)
      });
    })
  });
});


taskForm.addEventListener("submit", (e) => {
  //When it's loaded all information stop reading
e.preventDefault();

  //this get the info input
const title = taskForm["task-title"];
const description = taskForm["task-description"];

  /*this print it in console
    console.log(title.value +' '+ description.value)*/
if(title.value!=="" && description.value!==""){
    saveTask(title.value, description.value)
}
  //makes the textbox empty again
taskForm.reset();
});
