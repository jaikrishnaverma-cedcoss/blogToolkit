import { combineReducers, configureStore } from "@reduxjs/toolkit";
import BlogSlice from "./BlogSlice";
import UserSlice from "./UserSlice";
const rootReducer = combineReducers({users: UserSlice, posts: BlogSlice})
const Store = configureStore({
    reducer:rootReducer
})

export default Store