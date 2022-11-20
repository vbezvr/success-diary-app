import { combineReducers } from "@reduxjs/toolkit";
import {CHANGE_STATUS, tabMode, CHANGE_TAB, SET_USER_CONFIG, SET_USER_DATA, SET_ACTIVE_CATEGORY, SET_HABIT_DATA, SET_TIME_PERIOD,} from "./actions"

const {MAIN} = tabMode;
const categoryData = {
  categories: [],
  activeCategory: ""
};

const initialHabitData = {
  data: {}
}

function userConfig(state = {}, action) {
    switch(action.type) {
        case SET_USER_CONFIG:
            return {
                userName: action.displayName,
                photoUrl: action.photoURL,
                uid: action.uid
            }
    }
    return state;
}

function currentTab(state = MAIN, action) {
    switch(action.type) {
        case CHANGE_TAB:
            return action.payload;
    }
    return state;
}

function userData(state = categoryData, action) {
  switch (action.type) {
    case SET_USER_DATA:
      return Object.assign({}, state, { categories: action.payload });
    case SET_ACTIVE_CATEGORY:
      return Object.assign({}, state, { activeCategory: action.payload });
  }
  return state;
}

function habitData(state=initialHabitData, action) {
  switch(action.type) {
    case SET_HABIT_DATA:
      return Object.assign({}, state, {data: action.payload});
    case SET_TIME_PERIOD:
      return Object.assign({}, state, {timePeriod: action.payload})
  }
  return state;
}

const diaryApp = combineReducers({userConfig, currentTab, userData, habitData});

export default diaryApp; 