import { configureStore } from '@reduxjs/toolkit'

// import rootReducer from './reducers'
import  authReducer  from '../features/auth/authSlice';
import productReducer from '../features/product/ProductSlice'
import cartReducer from '../features/cart/cartSlice'
import orderReducer from '../features/order/orderSlice'
import userReducer from '../features/user/UserSlice'
export const store = configureStore({ reducer: {
        product : productReducer,
        auth: authReducer,
        cart: cartReducer,
        order: orderReducer,
        user:userReducer,
    },
});