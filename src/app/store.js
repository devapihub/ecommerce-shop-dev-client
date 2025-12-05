import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import productReducer from '../features/products/productSlice';
import shopReducer from '../features/shop/shopSlice';
import addressReducer from '../features/shop/addressSlice';

export const store = configureStore({
    reducer: {
        auth: authReducer,
        products: productReducer,
        shop: shopReducer,
        address: addressReducer,
    },
});