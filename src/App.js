import React, { useContext, useEffect } from 'react';
import './App.css';
// import {db, auth} from "./server.js";
import {SideMenu} from "./components/SideMenu"
import { useDispatch, useSelector } from 'react-redux';
import {LoginForm} from "./components/LoginForm"
import { useAuthState } from "react-firebase-hooks/auth";
import { getAuth, signOut } from "firebase/auth";
import { setUserConfig } from './features/actions';
import { context } from '.';
import { Loader } from './components/Loader';
import {Main} from "./components/Main"
import { listenHabitsValue } from './server';

function MainPage() {
  return (
    <React.Fragment>
      <SideMenu />
      <Main />
    </React.Fragment>
  );
}

function App() {
  const {auth} = useContext(context)
  const [user, loading] = useAuthState(auth);
  const dispatch = useDispatch()

  // useEffect(() => {
  //   signOut(auth)
  // })

  if (loading) {
    return <Loader/>
  }

  if (user) {
    dispatch(setUserConfig(user));
  }

  return (
    <div className='wrapper'>
      {user ? 
      <MainPage/> : <LoginForm />}
    </div>
  );
}

export default App;
