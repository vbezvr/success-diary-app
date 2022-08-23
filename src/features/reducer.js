import { combineReducers } from "@reduxjs/toolkit";
import {CHANGE_STATUS, tabMode, CHANGE_TAB, SET_USER_CONFIG,} from "./actions"

const {MAIN} = tabMode;

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

const diaryApp = combineReducers({userConfig, currentTab});

export default diaryApp; 