import React from 'react'

const totalPrice = (data) => {  
    const { size: {basePrice }, crust:{crustPrice}, toppings, extraMeal, drinks, quantity } = data;
    
    const sizeAmt = Number(basePrice) || 0;
    
    const crustAmt = Number(crustPrice) || 0;
    
    const toppingsAmt = toppings.reduce((preVal, initialVal)=>preVal+Number(initialVal.price),0)
    
    const extraMealAmt = extraMeal.reduce((preVal, initialVal)=>preVal+Number(initialVal.price),0)
    
    const drinksAmt = drinks.reduce((preVal, initialVal)=>preVal+Number(initialVal.price),0);
    
    const TotalPrice = (sizeAmt+crustAmt+toppingsAmt+extraMealAmt+drinksAmt)*quantity;

    return TotalPrice;
}

export default totalPrice;
