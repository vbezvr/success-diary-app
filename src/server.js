import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
export {app, db};

const firebaseConfig = {
  apiKey: "AIzaSyCgOsSAPRy_8T27r7QQaaRrrLImUkXcAI8",
  authDomain: "success-book.firebaseapp.com",
  projectId: "success-book",
  storageBucket: "success-book.appspot.com",
  messagingSenderId: "803229899518",
  appId: "1:803229899518:web:a267ef56296b36b35063af",
  databaseURL: "https://success-book-default-rtdb.firebaseio.com/",
};


const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
