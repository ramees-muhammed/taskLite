import { configureStore } from "@reduxjs/toolkit";
import taskReducer from "./taskSlice";

const store = configureStore({
    reducer:{
        taskState: taskReducer,
    },
})

export default store;