import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice"
import profileReducer from './profileSlice'
import adminReducer from './adminSlice'

const store = configureStore({
    reducer:{
        auth:authReducer ,
        profile:profileReducer,
        admin:adminReducer,
        
    }
})

export default store 