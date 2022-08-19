import React, { useEffect } from 'react';
import './App.css';
import {db} from "./server.js";
import {SideMenu} from "./components/SideMenu"
import { useSelector } from 'react-redux';

function App() {
  const isAuth = useSelector((state)=>state.isAuth)
  useEffect(()=> {
    console.log(db);
  })

  return (
    <div className='wrapper'>
      {isAuth ? 
      <SideMenu /> : <LoginForm />}
    </div>
  );
}

export default App;
