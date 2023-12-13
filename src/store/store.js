import { configureStore } from "@reduxjs/toolkit";
import auth from "./authSlice.js"
import postsSlice from "./postsSlice.js";
const store = configureStore({
    reducer:{
        auth,
        postsSlice
    }
})

export default store 