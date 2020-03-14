import { SET_LOGGEDIN_USER_NAME } from "./actionTypes";


const initState = { loggedInUserName: "" }
export const reducer = (state = initState, action) => {
    switch (action.type) {
        case SET_LOGGEDIN_USER_NAME:
            return { ...state, loggedInUserName: action.name }
        default:
            return state;
    }
} 