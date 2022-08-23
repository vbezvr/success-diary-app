import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './app/store';
import App from './App';
import reportWebVitals from './reportWebVitals';
import './index.css';
import { initializeApp } from "firebase/app";
import { getDatabase, set, ref, onValue } from "firebase/database";
import { getAuth } from "firebase/auth";
import { setFirebaseConfig } from './features/actions';

export const context = React.createContext(null)

const firebaseConfig = {
  apiKey: "AIzaSyCgOsSAPRy_8T27r7QQaaRrrLImUkXcAI8",
  authDomain: "success-book.firebaseapp.com",
  projectId: "success-book",
  storageBucket: "success-book.appspot.com",
  messagingSenderId: "803229899518",
  appId: "1:803229899518:web:a267ef56296b36b35063af",
  databaseURL: "https://success-book-default-rtdb.firebaseio.com/",
};

const appFirebase = initializeApp(firebaseConfig);
export const db = getDatabase(appFirebase);
const auth = getAuth();


const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <context.Provider value={{appFirebase, db, auth}}>
        <App />
      </context.Provider>
    </Provider>
  </React.StrictMode>
);


reportWebVitals();
