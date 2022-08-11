//This will manipulates the information added by user
import {
  saveTask,
  getTasks,
  onGetTasks,
  deleteTask,
  getTask,
  updateTask,
} from "./firebase.js";

const taskForm = document.getElementById("task-form");
const tasksContainer = document.getElementById("tasks-container");

let editStatus = false;
let id ='';

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
                <button class='btn-edit' data-id="${doc.id}">Edit</button>
                </div>
            `;
    });

    tasksContainer.innerHTML = html;

    const btnsDelete = tasksContainer.querySelectorAll(".btn-delete");

    btnsDelete.forEach((btn) => {
      btn.addEventListener("click", ({ target: { dataset } }) => {
        deleteTask(dataset.id);
      });
    });

    //list of edit buttons
    const btnsEdit = tasksContainer.querySelectorAll(".btn-edit");
    btnsEdit.forEach((btn) => {
      btn.addEventListener("click", async (e) => {
        const doc = await getTask(e.target.dataset.id);
        const task = doc.data();

        taskForm["task-title"].value = task.title;
        taskForm["task-description"].value = task.description;

        editStatus = true;
        id = e.target.dataset.id;
        taskForm['btn-task-save'].innerText= 'Update';
      });
    });
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
  if (!editStatus) {
    if (title.value !== "" || description.value !== "") {
      saveTask(title.value, description.value);
    }else{
        alert('To add a new task is necessary some information in title and description')
    }
  } else {
      updateTask(id, {title: title.value, description: description.value});    
  }

  //makes the textbox empty again
  taskForm.reset(id);
});
