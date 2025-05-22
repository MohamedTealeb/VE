import { configureStore } from "@reduxjs/toolkit";
import authReducer from './slice/Auth/LoginSlice/Login.jsx';
import categoriesReducer from './slice/CategoriesSlice/Categories.jsx';
import usersReducer from './slice/UsersSlice/Users.jsx';
import addAdminReducer from './slice/UsersSlice/AddAdminSlice.jsx';
import colorsReducer from './slice/ColorsSlice/Colors.jsx';
import productsReducer from './slice/ProductsSlice/Products.jsx';
import sizesReducer from './slice/SizesSlice/Sizes.jsx';
// import ordersReducer from './slice/OrdersSlice/Orders.jsx';

const store = configureStore({
    reducer: {
        auth: authReducer,
        categories: categoriesReducer,
        users: usersReducer,
        addAdmin: addAdminReducer,
        colors: colorsReducer,
        products: productsReducer,
        sizes: sizesReducer,
        // orders: ordersReducer
    },
});

export default store;