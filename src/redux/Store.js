import { configureStore } from "@reduxjs/toolkit";
import authReducer from './slice/Auth/LoginSlice/Login.jsx';
import registerReducer from './slice/Auth/RegisterSlice/Register.jsx';
import categoriesReducer from './slice/CategoriesSlice/Categories.jsx';

const store = configureStore({
    reducer: {
        auth: authReducer,
        register: registerReducer,
        categories: categoriesReducer,
    },
});

export default store;