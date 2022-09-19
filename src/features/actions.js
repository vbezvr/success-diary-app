export const CHANGE_STATUS = "CHANGE_STATUS";
export const CHANGE_TAB = "CHANGE_TAB";
export const SET_USER_CONFIG = "SET_USER_CONFIG";
export const SET_USER_DATA = "SET_USER_DATA";

export const tabMode = {
  MAIN: "MAIN",
  DETAILS: "DETAILS",
  STATISTIC: "STATISTIC",
};

export function changeStatus() {
    return {
        type: CHANGE_STATUS,
    }
}

export function changeCurrentTab(tab) {
  return {
    type: CHANGE_TAB,
    tab
  }
}

export function setUserConfig({displayName, photoURL, uid}) {
  return {
    type: SET_USER_CONFIG,
    displayName,
    photoURL,
    uid
  }
}

function setUserData(categories) {
  return {
    type: SET_USER_DATA,
    categories
  }

}

export {setUserData}
