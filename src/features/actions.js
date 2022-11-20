export const CHANGE_STATUS = "CHANGE_STATUS";
export const CHANGE_TAB = "CHANGE_TAB";
export const SET_USER_CONFIG = "SET_USER_CONFIG";
export const SET_USER_DATA = "SET_USER_DATA";
export const SET_ACTIVE_CATEGORY = "SET_ACTIVE_CATEGORY";
export const SET_HABIT_DATA = "SET_HABIT_DATA";
export const SET_TIME_PERIOD = "SET_TIME_PERIOD";

export const tabMode = {
  MAIN: "MAIN",
  DETAILS: "DETAILS",
  STATISTIC: "STATISTIC",
};

const actionCreator = (type) => (payload) => {
  return { type, payload };
};

export const changeCurrentTab = actionCreator(CHANGE_TAB);
export const setUserData = actionCreator(SET_USER_DATA);
export const setActiveCategory = actionCreator(SET_ACTIVE_CATEGORY);
export const setHabitData = actionCreator(SET_HABIT_DATA);
export const setTimePeriod = actionCreator(SET_TIME_PERIOD);

export function changeStatus() {
  return {
    type: CHANGE_STATUS,
  };
}

export function setUserConfig({ displayName, photoURL, uid }) {
  return {
    type: SET_USER_CONFIG,
    displayName,
    photoURL,
    uid,
  };
}

