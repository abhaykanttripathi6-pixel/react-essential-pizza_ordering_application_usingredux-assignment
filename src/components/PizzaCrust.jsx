import React from 'react'
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { selectedCrust } from '../app/pizzaSlice';

const PizzaCrust = ({ currentStep, setCurrentStep }) => {

    const dispatch = useDispatch();
    const crustData = useSelector(state => state.pizzaData.crust);

    const crusts = [
        {
            id: 1,
            crustName: 'Classic Hand Tossed',
            price: '0'
        },
        {
            id: 2,
            crustName: 'Thin & Crispy',
            price: '1'
        },
        {
            id: 3,
            crustName: 'Cheese Burst',
            price: '2.5'
        },
        {
            id: 4,
            crustName: 'Fresh Pan Pizza',
            price: '1.5'
        },
        {
            id: 5,
            crustName: 'Stuffed Crust',
            price: '1'
        },
        {
            id: 6,
            crustName: 'Garlic Parmesan Crust',
            price: '1.5'
        },
        {
            id: 7,
            crustName: 'Italian Herb Crust',
            price: '1.5'
        },
        {
            id: 8,
            crustName: 'Butter Crust',
            price: '2'
        },
        {
            id: 9,
            crustName: 'Whole Wheat Crust',
            price: '1'
        },
        {
            id: 10,
            crustName: 'Double Cheese Crust',
            price: '3'
        },
    ];

    const handleInputData = (crust, price) => {
        return dispatch(selectedCrust({ crust, price }));
    }

    return (
        <PizzaCrustWrapper>
            <div className='head'>
                <h3>Choose Crust Type</h3>
                <p>The Foundation of every great pizza</p>
            </div>

            <div>

                <div className='crusts-container'>
                    {
                        crusts.map((crust) => (
                            <div
                                key={crust.id}
                                onClick={() => handleInputData(crust.crustName, crust.price)}
                                style={{ border: crust.crustName === crustData.crustType ? '2px solid black' : '2px solid var(--secondary-color)' }}>
                                <p>{crust.crustName}</p>
                                <span>{new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(crust.price)}</span>
                            </div>
                        ))
                    }

                </div>

                <div className="btnContainer">
                    <button className='btn-back' onClick={() => setCurrentStep(1)}>Back</button>
                    <button className='selectCrust-btn' style={{ cursor: crustData !== '' ? 'pointer' : 'not-allowed' }} onClick={() => (crustData !== '') && setCurrentStep(3)}>Choose Toppings</button>
                </div>
            </div>
        </PizzaCrustWrapper>
    )
}

export default PizzaCrust;

const PizzaCrustWrapper = styled.div`
    
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

    .crusts-container{
        margin: 1.5rem;
        display: grid;
        grid-template-columns: repeat(auto-fit, 100px);
        place-content: center;
        gap: 2rem;
            
        div{
            width:110%;
            padding: 0.3rem;
            
            border: 2px solid white;
            background-color: wheat;
            border-radius: 0.5rem;
            box-shadow: 1px 1px 1px 1px rgba(0,0,0,0.1);

            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 0.5rem; 

            font-size: 12px;
            font-weight: bold;
            color: black;
            text-align: center;

            cursor: pointer;
            position: relative;
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

    }

    }

    @media (max-width: 85rem){

        padding: 1rem;
        background-color: var(--primary-color);
        border-radius: 1rem;
        box-shadow: 1px 1px 5px 3px rgba(0,0,0,0.18);

    .crusts-container{
        margin: 1rem;
        display: grid;
        grid-template-columns: repeat(3, 100px);
        gap: 1.5rem;
            
        div{
            width:110%;
            padding: 0.3rem;
            
            border: 2px solid white;
            background-color: wheat;
            border-radius: 0.5rem;
            box-shadow: 1px 1px 1px 1px rgba(0,0,0,0.1);

            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 0.5rem; 

            font-size: 12px;
            font-weight: bold;
            color: black;
            text-align: center;

            cursor: pointer;
            position: relative;
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

    }

    }
    }
    @media (max-width: 62rem){

        padding: 1rem;
        background-color: var(--primary-color);
        border-radius: 1rem;
        box-shadow: 1px 1px 5px 3px rgba(0,0,0,0.18);

    .crusts-container{
        margin: 1rem;
        display: grid;
        grid-template-columns: repeat(auto-fit, 100px);
        gap: 1rem;
            
        div{
            width:100%;
            padding: 0.3rem 0;

            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 0.3rem; 

            font-size: x-small;
        }

    }

    }

    @media (max-width: 37rem){   

    .crusts-container{
        margin: 1rem;
        display: grid;
        grid-template-columns: repeat(3, 100px);
        gap: 0.5rem;

        div{
            font-size: 12px;
            font-weight: 700;
        }
    }
} 

`
