import React from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { addtoCart } from '../app/cartSlice';
import { resetState } from '../app/pizzaSlice';
import totalPrice from '../utils/totalPrice';

const Summary = ({setCurrentStep, setShow}) => {

    const dispatch = useDispatch();

    const data = useSelector((state) => state.pizzaData);   
    const { size: { baseSize, basePrice }, crust:{crustType, crustPrice}, toppings, extraMeal, drinks, quantity } = data;

    const handleAddToCart = () => {    
        dispatch(addtoCart(data));
        dispatch(resetState());
        setShow('Cart');
        setCurrentStep(1);
    };

    return (
        <SummaryWrapper>
            <h3>Summary</h3>

            <div className='info-container'>
                {baseSize && <div>
                    <span>Size</span>
                    <p>{baseSize}</p>
                </div>}

                {crustType && <div>
                    <span>Crust-Type</span>
                    <p>{crustType}</p>
                </div>}

                {(toppings.length !== 0) && <div>
                    <span>Toppings</span>
                    <p >{toppings.map(item=>item.topping).join(', ')}</p>
                </div>}

                {(extraMeal.length !== 0) && <div>
                    <span>Extra Meal</span>
                    <p>{extraMeal.map(item=>item.meal).join(', ')}</p>
                </div>}

                 {(drinks.length !== 0) && <div>
                    <span>Drink</span>
                    <p>{drinks.map(item=>item.drink).join(', ')}</p>
                </div>}

                 {quantity && <div>
                    <span>Quantity</span>
                    <p>{quantity}</p>
                </div>}

                <div className='total'>
                    <p>Order Total</p>
                    <span>{new Intl.NumberFormat('en-US', {style:'currency', currency:'USD'}).format(totalPrice(data))}</span>
                </div>

                <div className='btn-container'>
                    <button className='btn-back' onClick={()=>setCurrentStep(4)}>Back</button>
                    <button className='btn-atc' onClick={handleAddToCart}>Add To Cart</button>
                </div>
            </div>
        </SummaryWrapper>
    )
}

export default Summary;

const SummaryWrapper = styled.div`
    
    padding: 2rem;
    background-color: var(--primary-color);
    border-radius: 1rem;
    box-shadow: 1px 1px 5px 3px rgba(0,0,0,0.18);

     h3{
        font-size: xx-large;
        font-weight: bold;
        color: white;
        text-align: center;
        text-decoration: underline;
    }

    .info-container{
        font-size: medium;
        font-weight: 600;
        margin: 1rem 0;

        div{
            margin: 0.5rem 0;
            display: flex;
            justify-content: space-between;

            span{
                color: wheat;
            }

            p{
                width: 55%;
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

        .btn-container{
            display: flex;
            gap:5rem;

            .btn-back, .btn-atc{
            flex:1;
            margin: 0.5rem 0;
            padding: 0.7rem;
            background: #ffbd44;
            border:none;
            outline:none;

            font-size: medium;
            font-weight: 600;

            border-radius: 1rem;
            cursor: pointer;
         }
        }
        
    }

`
