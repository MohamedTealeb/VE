import { configureStore } from "@reduxjs/toolkit";
import  authReducer  from './slice/Auth/LoginSlice/Login.jsx';


const store = configureStore({
    reducer :{
 auth: authReducer,
    },
});
export default store