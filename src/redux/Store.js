import { configureStore } from "@reduxjs/toolkit";
import authReducer from './slice/Auth/LoginSlice/Login.jsx';
import registerReducer from './slice/Auth/RegisterSlice/Register.jsx';
import categoriesReducer from './slice/CategoriesSlice/Categories.jsx';
import usersReducer from './slice/UsersSlice/Users.jsx';
// import ordersReducer from './slice/OrdersSlice/Orders.jsx';

const store = configureStore({
    reducer: {
        auth: authReducer,
        register: registerReducer,
        categories: categoriesReducer,
        users: usersReducer,
        // orders: ordersReducer
    },
});

export default store;