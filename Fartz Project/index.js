//This will manipulates the information added by user
import { saveTask, getTasks, onSnapshot, collection, db } from "./firebase.js";

const taskForm = document.getElementById('task-form')
const tasksContainer = document.getElementById('tasks-container')

/*Once the program is open load the db data from Firebase async
*/
window.addEventListener('DOMContentLoaded', async () => {
    //const querySnapshot = await getTasks()

    onSnapshot(collection(db, "tasks"), (querySnapshot) => {
        let html = "";
        querySnapshot.forEach(doc => {
            const task = doc.data()
            html += `
            <div>
            <h3>${task.title}</h3>
            <p>${task.description}</p>
            </div>
            `;
        });

        tasksContainer.innerHTML = html;
    })
});






taskForm.addEventListener('submit', (e) => {
    //When it's loaded all information stop reading
    e.preventDefault()

    //this get the info input
    const title = taskForm['task-title']
    const description = taskForm['task-description']

    /*this print it in console
    console.log(title.value +' '+ description.value)*/

    saveTask(title.value, description.value)

    //makes the textbox empty again
    taskForm.reset()
})