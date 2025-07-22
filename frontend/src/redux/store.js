import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/Authslice";
import productReducer from "./slices/productSlice";

const store = configureStore({
    reducer: {
        auth: authReducer,
        products: productReducer,
    }
});

export default store;