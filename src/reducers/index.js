import { combineReducers } from "redux"
import authReducer from "./auth_reducer";
import searchResultReducer from "./search_result_reducer";
import mostRecentSearchReducer from "./most_recent_search_reducer";
import lastViewedReducer from "./last_viewed_reducer";
import userReducer from './user_reducer';

export default combineReducers({
    auth: authReducer,
    searchResult: searchResultReducer,
    mostRecentSearch: mostRecentSearchReducer,
    lastViewed: lastViewedReducer,
    currentUser: userReducer
});