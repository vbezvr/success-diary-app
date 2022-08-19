import { combineReducers } from "@reduxjs/toolkit";
import {CHANGE_STATUS, tabMode, CHANGE_TAB} from "./actions"

const {MAIN} = tabMode;

function isAuth(state = false, action) {
    switch(action.type) {
        case CHANGE_STATUS:
            return !state;
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

const diaryApp = combineReducers({isAuth, currentTab});

export default diaryApp; 