import React from "react";
import { useContext } from "react";
import { context } from "..";
import { useState } from "react";
import { getDatabase, ref, child, get } from "firebase/database";
import { useDispatch, useSelector } from "react-redux";
import { changeCurrentTab, tabMode } from "../features/actions";
export { SideMenu };

function ButtonItem({ name }) {
  const currentButton = useSelector((state) => state.currentTab);
  const dispatch = useDispatch();
  const tabModeName = name.toUpperCase();
  function getClassName() {
    return currentButton === tabModeName ? "nav-btn active-div" : "nav-btn";
  }
  return (
    <div
      className={getClassName()}
      onClick={() => dispatch(changeCurrentTab(tabMode[tabModeName]))}
    >
      <div className="btn-name">{name}</div>
    </div>
  );
}

function NavigateButtons() {
  const buttons = ["Main", "Details", "Statistic"];
  const buttonsList = buttons.map((elem, index) => (
    <ButtonItem key={index} name={elem} />
  ));

  return <React.Fragment>{buttonsList}</React.Fragment>;
}

function SideMenu() {
  const { photoUrl, userName } = useSelector((state) => state.userConfig);

  return (
    <div className="side">
      <div className="side-wrapper">
        <div className="title-app">P L A N N E R</div>
        <div className="user-info">
          <img
            className="user-photo"
            src={photoUrl}
            width="60px"
            height="60px"
          />
          <div>{userName}</div>
        </div>
      </div>
      <NavigateButtons />
    </div>
  );
}
