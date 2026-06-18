import { configureStore } from "@reduxjs/toolkit";
import PizzaReducer from './pizzaSlice';
import CartReducer from './cartSlice';
import UserReducer from './userSlice';

const store = configureStore({
    reducer: {
        pizzaData: PizzaReducer,
        cartData: CartReducer,
        userData: UserReducer
    }
})

export default store;
