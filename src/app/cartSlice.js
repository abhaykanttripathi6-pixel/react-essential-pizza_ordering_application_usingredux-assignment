import { createSlice } from '@reduxjs/toolkit';
import React from 'react';

const cartSlice = createSlice({
    name: 'cart',
    initialState: [],
    reducers: {
        addtoCart: (state, action) => {
            const duplicateItem = (state.length === 0) || state.some((item) => item.id !== action.payload.id);

            if (duplicateItem) {
                state.push(action.payload);
            }
        },

        counter: (state, action) => {

            if (action.payload.param === 'increment') {
                if (state.some(item => item.quantity >= 1 && item.quantity < 20)) {
                    return state.map((item) => item.id === action.payload.id ? { ...item, quantity: item.quantity + 1 } : item);
                } else {
                    return alert("You can't order more than 20 at a time.");
                }
            }
            if (action.payload.param === 'decrement') {
                if (state.some((item) => item.quantity > 1)) {
                    return state.map((item) => item.id === action.payload.id ? { ...item, quantity: item.quantity - 1 } : item);
                }
            }
        },

        remove: (state,action) =>{
            const itemToRemove = state.find((item)=>item.id === action.payload)
            return state.filter((item)=>item.id !== itemToRemove.id)
        },

        clearAll: (state) =>{
            state.length = 0
        }
    }
})

export const { addtoCart, counter, remove, clearAll } = cartSlice.actions;
export default cartSlice.reducer;

