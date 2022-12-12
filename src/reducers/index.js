import { combineReducers } from "redux";
import setPasswordReducer from "./SetPasswordReducer";
import setUserNameReducer from "./SetEmailReducer";
import setTokenReducer from "./SetTokenReducer";
import setRecordsReducer from "./setRecordsReducer";

export default combineReducers({
    email:setUserNameReducer,
    password:setPasswordReducer,
    token:setTokenReducer,
    records:setRecordsReducer
})