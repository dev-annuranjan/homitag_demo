import { SET_LOGGEDIN_USER_NAME } from "./actionTypes"

export const setLoggedInUserName = (name) => {
    debugger;
    return {
        type: SET_LOGGEDIN_USER_NAME,
        name
    }
}

export const resetLoggedInUserName = () => {
    return setLoggedInUserName();
}