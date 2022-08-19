export const CHANGE_STATUS = "CHANGE_STATUS";
export const CHANGE_TAB = "CHANGE_TAB";
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