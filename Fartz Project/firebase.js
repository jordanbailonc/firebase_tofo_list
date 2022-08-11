
// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.9.2/firebase-app.js";
import { getFirestore, addDoc,collection, getDocs, onSnapshot} from "https://www.gstatic.com/firebasejs/9.9.2/firebase-firestore.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBqsIpLlQvEDOlfLmjjoY90nNc7Z4s8aeg",
    authDomain: "to-do-list-34fab.firebaseapp.com",
    projectId: "to-do-list-34fab",
    storageBucket: "to-do-list-34fab.appspot.com",
    messagingSenderId: "48625624949",
    appId: "1:48625624949:web:8e0d32cd9b96219de0d53c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore()


//This function can be moved and use by other parts from code
//by using export
export const saveTask = (title, description)=>
    addDoc(collection(db, "tasks"),{title,description})

//using get docs it recives all the colection from the db
//with name: 'tasks' from firebase
export const getTasks = () => getDocs(collection(db,'tasks'))

export const onGetTasks =(callback)=> onSnapshot(collection(db,'tasks'),callback)

