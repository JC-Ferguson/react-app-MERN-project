import { combineReducers } from "redux"
import authReducer from "./auth_reducer";
import searchResultReducer from "./search_result_reducer";

export default combineReducers({
    auth: authReducer,
    searchResult: searchResultReducer
});