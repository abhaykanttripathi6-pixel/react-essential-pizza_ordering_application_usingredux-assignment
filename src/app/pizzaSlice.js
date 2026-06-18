import { createSlice } from "@reduxjs/toolkit";

const pizzaSlice = createSlice({
    name: 'pizzaData',
    initialState: {
        id: Date.now(),
        size: {
            baseSize: '',
            isPremium: false,
            basePrice: ''
        },
        crust: {
            crustType: '',
            crustPrice: ''
        },
        toppings: [],
        extraMeal: [],
        drinks: [],
        quantity: 1
    },
    reducers: {
        selectedSize: (state, action) => {
            state.size.baseSize = action.payload.basesize;
            state.size.isPremium = action.payload.isPremium;
            state.size.basePrice = action.payload.price;
        },

        selectedCrust: (state, action) => {
            state.crust.crustType = action.payload.crust;
            state.crust.crustPrice = action.payload.price;
        },

        selectedToppings: (state, action) => {
            if (state.toppings.some((item) => item.topping === action.payload.topping)) {
                state.toppings = state.toppings.filter((item) => item.topping !== action.payload.topping);
            } else {
                state.toppings.push(action.payload);
            }
        },

        selectedMeal: (state, action) => {
            if (state.extraMeal.some((item) => item.meal === action.payload.meal)) {
                state.extraMeal = state.extraMeal.filter((item) => item.meal !== action.payload.meal);
            } else {
                state.extraMeal.push(action.payload);
            }
        },

        selectedDrinks: (state, action) => {
            if (state.drinks.some((item) => item.drink === action.payload.drink)) {
                state.drinks = state.drinks.filter((item) => item.drink !== action.payload.drink);
            } else {
                state.drinks.push(action.payload);
            }
        },

        increment: (state) => {
            if (state.quantity >= 1 && state.quantity < 20) {
                state.quantity++;
            }
            else {
                alert("You can't order more than 20 at a time.")
            }
        },
        decrement: (state) => {
            if (state.quantity > 1) {
                state.quantity--;
            }
        },
        resetState: (state) => {
            return {
                id: Date.now(),
                size: {
                    baseSize: '',
                    isPremium: false,
                    basePrice: ''
                },
                crust: {
                    crustType: '',
                    crustPrice: ''
                },
                toppings: [],
                extraMeal: [],
                drinks: [],
                quantity: 1
            }
        }
    }
})

export const { selectedSize, selectedCrust, selectedToppings, selectedMeal, selectedDrinks, increment, decrement, resetState } = pizzaSlice.actions;
export default pizzaSlice.reducer;