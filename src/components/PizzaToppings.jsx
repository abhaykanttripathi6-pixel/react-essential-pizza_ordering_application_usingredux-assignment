import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components';
import { selectedToppings } from '../app/pizzaSlice';

const PizzaToppings = ({ setCurrentStep }) => {

    const dispatch = useDispatch();
    const { toppings, size } = useSelector(state => state.pizzaData);

    const toppingsData = [
        {
            id: 1,
            toppingName: 'Pepperoni',
            price: '1.5'
        },
        {
            id: 2,
            toppingName: 'Mushrooms',
            price: '1'
        },
        {
            id: 3,
            toppingName: 'Black Olives',
            price: '1.5'
        },
        {
            id: 4,
            toppingName: 'Caramelized Onion',
            price: '1.8'
        },
        {
            id: 5,
            toppingName: 'Bell Peppers',
            price: '1.3'
        },
        {
            id: 6,
            toppingName: 'Sweet Corn',
            price: '2'
        },
        {
            id: 7,
            toppingName: 'Capsicum',
            price: '0.75'
        },
        {
            id: 8,
            toppingName: 'Pineapple',
            price: '2.25'
        },
        {
            id: 9,
            toppingName: 'Jalapenos',
            price: '2.5'
        },
        {
            id: 10,
            toppingName: 'Paneer',
            price: '3'
        },
    ];

    const handleInputs = (topping, price) => {
        return dispatch(selectedToppings({ topping, price }));
    }


    return (
        <ToppingsWrapper>
            <div className='head'>
                <h3>Pick Toppings</h3>
                <p>Select as many as you like.</p>
            </div>

            <div>

                <div className='toppings-container'>
                    {
                        toppingsData.map((topping) => {

                            return <div key={topping.id}
                                style={{
                                    border: size.isPremium ? toppings.some((item) => item.topping === topping.toppingName) ? '2px solid black' : '2px solid white' : toppings.some((item) => item.topping === topping.toppingName) ? '2px solid black' : '2px solid white',
                                    opacity: (!size.isPremium) && (topping.toppingName === 'Pineapple' || topping.toppingName === 'Paneer' || topping.toppingName === 'Jalapenos') ? '0.5' : '1',
                                    cursor: (!size.isPremium) && (topping.toppingName === 'Pineapple' || topping.toppingName === 'Paneer' || topping.toppingName === 'Jalapenos') ? 'not-allowed' : 'pointer'
                                }}
                                onClick={() => (!size.isPremium && !(['Pineapple', 'Paneer', 'Jalapenos'].includes(topping.toppingName))) && handleInputs(topping.toppingName, topping.price) || (size.isPremium && handleInputs(topping.toppingName, topping.price))}>
                                <p>{topping.toppingName}</p>
                                <span>{new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(topping.price)}</span>

                                {
                                    (['Pineapple','Jalapenos','Paneer'].includes(topping.toppingName)) && <div className='premium'>Premium</div>
                                }
                            </div>

                        })
                    }

                </div>

                <div className="btnContainer">
                    <button className='btn-back' onClick={() => setCurrentStep(2)}>Back</button>
                    <button className='selectCrust-btn' style={{ cursor: toppings.length !== 0 ? 'pointer' : 'not-allowed' }} onClick={() => (toppings.length !== 0) && setCurrentStep(4)}>Sides & Drinks</button>
                </div>
            </div>
        </ToppingsWrapper>
    )
}

export default PizzaToppings;


const ToppingsWrapper = styled.div`
    
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

    .toppings-container{
        padding: 2rem;
        display: grid;
        grid-template-columns: repeat(auto-fit, 100px);
        place-content: center;
        gap: 2rem;
            
        div{
            padding: 0.4rem;
            background-color: wheat;
            border-radius: 0.5rem;
            box-shadow: 1px 1px 1px 1px rgba(0,0,0,0.1);

            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 0.3rem; 

            font-size: 14px;
            font-weight: bold;
            color: black;
            text-align: center;

            cursor: pointer;
            position: relative;
        }

        div .premium{
            padding: 0.1rem;
            font-size: x-small;
            font-weight: 600;
            color: black;

            background-color: gold;
            border: 1px solid black;
            border-radius: 0.4rem 0 0.4rem 0;

            position: absolute;
            top:0;
            right: -15%;

            animation: blink 0.5s ease-in-out infinite alternate;

        }

        @keyframes blink {
            0%{
                box-shadow: 0 0 5px gold;
                opacity: 0.4;
            }
            100%{
                box-shadow: 0 0 10px gold;
                opacity: 1;
            }
        }   

    }

    .btnContainer{

        display: flex;
        justify-content: space-between;

        button{
        padding: 0.5rem;
        background-color: #ffbd44;
        
        border: none;
        outline: none;
        border-radius: 0.3rem;
        box-shadow: 1px 1px 1px 1px rgba(0,0,0,0.1);
        
        font-size: small;
        font-weight: bold;
        color: black;
        cursor: pointer;
    }

    }

    @media (max-width: 88rem){

    .toppings-container{
        
        div{

            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 0.3rem; 

        }

    }
 }  

    @media (max-width: 72rem){

        padding: 1rem;


        .toppings-container{
            padding: 1rem;
            display: grid;
            grid-template-columns: repeat(2, 100px);
            place-content: center;
            gap: 1rem;
                
            div{
                padding: 0.4rem;
    
                display: flex;
                flex-direction: column;
                align-items: center;
                gap: 0.3rem; 
    
                font-size: 14px;
                font-weight: bold;
            }
    
        } 
    } 

    @media (max-width: 50rem){

        .toppings-container{
            display: grid;
            grid-template-columns: repeat(auto-fit, 100px);
            place-content: center;
        } 
    }

    @media (max-width: 37rem){

        padding: 1rem;

        .toppings-container{
            padding: 1rem 0.5rem;
            display: grid;
            grid-template-columns: repeat(3, 100px);
            place-content: center;
            gap: 1rem;
                
            div{
                padding: 0.4rem;
    
                display: flex;
                flex-direction: column;
                align-items: center;
                gap: 0.3rem; 
    
                font-size: 12px;
                font-weight: bold;
            }
    
        } 
    } 

`