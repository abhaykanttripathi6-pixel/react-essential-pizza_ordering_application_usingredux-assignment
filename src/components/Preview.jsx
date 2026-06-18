import React from 'react'
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { increment, decrement } from '../app/pizzaSlice';
import totalPrice from '../utils/totalPrice';

const Preview = () => {
    
    const dispatch = useDispatch();

    const data = useSelector((state)=>state.pizzaData)
    const { size: { baseSize, basePrice }, crust:{crustType, crustPrice}, toppings, extraMeal, drinks, quantity } = data;

    return (
        <PreviewWrapper>
            <h3>Live Preview</h3>

            <div className='info-container'>
                <div>
                    <span>Size</span>
                    <p>{baseSize || '-'}</p>
                </div>

                <div>
                    <span>Crust-Type</span>
                    <p>{crustType || '-'}</p>
                </div>

                <div>
                    <span>Toppings</span>
                    <p >{toppings.map(item=>item.topping).join(', ') || '-'}</p>
                </div>

                <div>
                    <span>Extra Meal</span>
                    <p>{extraMeal.map(item=>item.meal).join(', ') || '-'}</p>
                </div>

                <div>
                    <span>Drink</span>
                    <p>{drinks.map(item=>item.drink).join(', ') || '-'}</p>
                </div>

                <div className='total'>
                    <p>Total</p>
                    <span>{new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(totalPrice(data))}</span>
                </div>

                <div className='quantityContainer'>
                    <span>Qty</span>
                    <div>
                        <button className="increment" onClick={()=>dispatch(decrement())}>-</button>
                        <p>{quantity}</p>
                        <button className="decrement" onClick={()=>dispatch(increment())}>+</button>
                    </div>
                </div>

            </div>

        </PreviewWrapper>
    )
}

export default Preview;

const PreviewWrapper = styled.div`
    
    padding: 2rem;
    background-color: var(--primary-color);
    border-radius: 1rem;
    box-shadow: 1px 1px 5px 3px rgba(0,0,0,0.18);

     h3{
        font-size: x-large;
        font-weight: bold;
        color: white;
    }

    .info-container{
        font-size: medium;
        font-weight: 600;

        div{
            margin: 0.5rem 0;
            display: flex;
            justify-content: space-between;

            span{
                color: wheat;
            }

            p{  
                width: 60%;
                color: whitesmoke;
                
                display: flex;
                justify-content: end;
                word-break: break-all;
            }
        }

        .total {
            margin: 1rem 0;
            padding: 0.5rem 0;
            border-top: 1px solid wheat;
            font-size: x-large;

            p{
                color: white;
                display: flex;
                justify-content: space-between;
            }

            span{
                color: white;
            }
        }

        .quantityContainer{
            display: flex;
            justify-content: space-between;

            div{
                display: flex;
                gap: 1rem;
            }

            .increment, .decrement{
                padding: 0.3rem 0.5rem;
                background: transparent;
                border: 1px solid wheat;
                outline: none;
                border-radius: 0.5rem;
                color: wheat;
                font-size: large;
                cursor: pointer;
            }
        }

        .addBtn{
            width: 100%;
            margin: 0.5rem 0;
            padding: 0.8rem;
            background: #ffbd44;
            border:none;
            outline:none;

            font-size: medium;
            font-weight: 600;

            border-radius: 1.5rem 0 1.5rem 0;
        }
    }


`
