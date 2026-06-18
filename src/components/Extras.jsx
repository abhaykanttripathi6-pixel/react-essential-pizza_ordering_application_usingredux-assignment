import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { selectedMeal, selectedDrinks } from '../app/pizzaSlice';

const Extras = ({ setCurrentStep }) => {

  const dispatch = useDispatch();
  const mealInfo = useSelector((state) => state.pizzaData.extraMeal);
  const drinksInfo = useSelector((state) => state.pizzaData.drinks);

  const extraMeal = [
    {
      id: 1,
      meal: 'Garlic Bread',
      drink: 'Coca-Cola',
      price: {
        mealCost: '3.99',
        drinkCost: '1.99'
      }
    },
    {
      id: 2,
      meal: 'French Fries',
      drink: 'Mineral Water',
      price: {
        mealCost: '2.99',
        drinkCost: '0.99'
      }
    },
    {
      id: 3,
      meal: 'Potato Wedges',
      drink: 'Iced Tea',
      price: {
        mealCost: '3.49',
        drinkCost: '2.49'
      }
    },
    {
      id: 4,
      meal: 'Mozzarella Sticks',
      drink: 'Cold Coffee',
      price: {
        mealCost: '4.99',
        drinkCost: '3.49'
      }
    },
  ];

  const handleInput = (item, price, param) => {
    if (param === 'meal') {
      return dispatch(selectedMeal({ meal: item, price }));
    } else {
      return dispatch(selectedDrinks({ drink: item, price }));
    }
  }


  return (
    <ExtrasWrapper>
      <div className='head'>
        <h3>Sides & Drinks</h3>
        <p>Complete Your Meal</p>
      </div>

      <div className='side-Meals'>

        <div className='sideMeal-container'>
          {
            extraMeal.map((crust) => {
              const { id, meal, price: { mealCost } } = crust;
              return <div key={id}
                style={{ background: mealInfo.some((item) => item.meal === meal) ? 'var(--accent-color)' : 'var(--secondary-color)' }}
                onClick={() => handleInput(meal, mealCost, 'meal')}>
                <p>{meal}</p>
                <span>{new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(mealCost)}</span>
              </div>
            })
          }
        </div>

        <div className='drink-container'>
          {
            extraMeal.map((crust) => {
              const { id, drink, price: { drinkCost } } = crust;
              return <div key={id}
                style={{ background: drinksInfo.some((item) => item.drink === drink) ? 'var(--accent-color)' : 'var(--secondary-color)' }}
                onClick={() => handleInput(drink, drinkCost, 'drink')}>
                <p>{drink}</p>
                <span>{new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(drinkCost)}</span>
              </div>
            })
          }
        </div>

      </div>
      <div className="btnContainer">
        <button className='btn-back' onClick={() => setCurrentStep(3)}>Back</button>
        <button className='selectCrust-btn' onClick={() => setCurrentStep(5)}>Summary</button>
      </div>
    </ExtrasWrapper >
  )
}

export default Extras;

const ExtrasWrapper = styled.div`
  
  padding: 2rem;
  background-color: var(--primary-color);
  border-radius: 1rem;
  box-shadow: 1px 1px 5px 3px rgba(0,0,0,0.18);

    .head{

      h3{
        font-size: x-large;
        font-weight: bold;
        color: white;
      }

      p{
        font-size: small !important;
        font-weight: 500;
        color: var(--secondary-color) !important;
        padding: 0 !important;
      }
    }

    .side-Meals{
      margin: 2rem 0;
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      place-content: center;
      gap: 2rem;
    }

    .sideMeal-container, .drink-container{
      padding: 2rem;
      
        div{
            padding: 0.5rem;
            
            border: 2px solid white;

            display: flex;
            justify-content: space-between;
            align-items: center;
            gap: 1rem; 

            font-size: 14px;
            font-weight: bold;
            color: black;
            text-align: center;

            position: relative;

            &:hover{
              background-color: #ffbd44 !important;
            }
        }
    }

    .btnContainer{

        display: flex;
        justify-content: space-between;

        button{
        padding: 0.5rem;
        background-color: var(--accent-color);
        
        border: none;
        outline: none;
        border-radius: 0.3rem;
        box-shadow: 1px 1px 1px 1px rgba(0,0,0,0.1);
        
        font-size: small;
        font-weight: bold;
        color: black;
    }

    }

    @media (max-width: 62rem){
    padding: 1rem;

    .side-Meals{
      margin: 2rem 0;
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      place-content: center;
      gap: 0.5rem;
    }

    .sideMeal-container, .drink-container{
      padding: 1rem;

    }
    }

    @media (max-width: 62rem){
    padding: 1rem;

    .side-Meals{
      margin: 2rem 0;
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      place-content: center;
      gap: 1.5rem;
    }

    }

`

