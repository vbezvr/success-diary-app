import { combineReducers } from "@reduxjs/toolkit";
import {CHANGE_STATUS, tabMode, CHANGE_TAB, SET_USER_CONFIG, SET_USER_DATA, SET_ACTIVE_CATEGORY,} from "./actions"

const {MAIN} = tabMode;
const categoryData = {
  categories: [],
  activeCategory: ""
};

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
            return action.tab;
    }
    return state;
}

function userData(state = categoryData, action) {
  switch (action.type) {
    case SET_USER_DATA:
      return Object.assign({}, state, { categories: action.categories });
    case SET_ACTIVE_CATEGORY:
      return Object.assign({}, state, { activeCategory: action.category });
  }
  return state;
}

const diaryApp = combineReducers({userConfig, currentTab, userData});

export default diaryApp; 