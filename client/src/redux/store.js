import { configureStore } from "@reduxjs/toolkit";
import loadersReducers from "./loadersSlice";
import userReducers from "./usersSlice";

const store= configureStore({
    reducer: {
        loaders: loadersReducers,
        users :userReducers,
    },
});

export default store;