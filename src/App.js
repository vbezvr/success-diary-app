import React, { useContext, useEffect } from "react";
import "./App.css";
// import {db, auth} from "./server.js";
import { SideMenu } from "./components/SideMenu";
import { useDispatch, useSelector } from "react-redux";
import { LoginForm } from "./components/LoginForm";
import { useAuthState } from "react-firebase-hooks/auth";
import { getAuth, signOut } from "firebase/auth";
import { setUserConfig } from "./features/actions";
import {setUserDatas} from "./server"
import { context } from ".";
import { Loader } from "./components/Loader";
import { Main } from "./components/Main";
import { DetailsPage } from "./components/details-tab/DetailsPage";
import { StatisticPage } from "./components/statistic-tab/StatisticPage";
import { listenHabitsValue } from "./server";
import { format } from "date-fns";
import calendar from "./img/calendar.svg";

function Content() {
  const currentTab = useSelector((state) => state.currentTab);
  const currentDate = format(new Date(), "do MMMM");
  const tabs = {
    MAIN: <Main />,
    DETAILS: <DetailsPage />,
    STATISTIC: <StatisticPage />,
  };

  return (
    <React.Fragment>
      <SideMenu />
      <div className="section-2">
        <div className="header">
          <img src={calendar} width="30px" />
          <h2 className="date">{currentDate}</h2>
        </div>
        {tabs[currentTab]}
      </div>
    </React.Fragment>
  );
}

function App() {
  const { auth } = useContext(context);
  const [user, loading] = useAuthState(auth);
  const dispatch = useDispatch();

  if (loading) {
    return <Loader />;
  }

  if (user) {
    dispatch(setUserConfig(user));
    setUserDatas(user)
  }

  return <div className="wrapper">{user ? <Content /> : <LoginForm />}</div>;
}

export default App;
