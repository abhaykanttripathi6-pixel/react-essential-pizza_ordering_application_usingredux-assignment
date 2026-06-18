import React from 'react'
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { selectedSize } from '../app/pizzaSlice';


const PizzaSize = ({ currentStep, setCurrentStep }) => {

    const dispatch = useDispatch();
    const sizeInfo = useSelector((state) => state.pizzaData.size);

    const pizzaSizesData = [
        {
            id: 1,
            name: 'Regular',
            price: '5.99'
        },
        {
            id: 2,
            name: 'Small',
            price: '7.99'
        },
        {
            id: 3,
            name: 'Medium',
            price: '9.99'
        },
        {
            id: 4,
            name: 'Large',
            price: '12.99'
        },
        {
            id: 5,
            name: 'Extra Large',
            price: '15.99'
        },
    ];

    const handleInputData = (basesize, price) => {
        const isPremium = (basesize === 'Large' || basesize === 'Extra Large') ? true : false;
        return dispatch(selectedSize({ basesize, price, isPremium }));
    }

    return (
        <PizzaSizeWrapper>
            <div className='head'>
                <h3>Choose Pizza Size</h3>
                <p>Larger Size unlock premium toppings.</p>
            </div>

            <div>

                <div className='size-container'>
                    {
                        pizzaSizesData.map((size) => (
                            <div key={size.id}
                                onClick={() => handleInputData(size.name, size.price)}
                                style={{ border: size.name === sizeInfo.baseSize ? '2px solid black' : '2px solid var(--secondary-color)' }}>

                                <p>{size.name}</p>
                                <span>{size.price}</span>
                                {
                                    (size.name === 'Large' || size.name === 'Extra Large') && <div className='premium'>Premium</div>
                                }
                            </div>
                        ))
                    }

                </div>

                <div className="btnContainer">
                    <button className='selectCrust-btn' style={{ cursor: sizeInfo.baseSize !== '' ? 'pointer' : 'not-allowed' }} onClick={() => (sizeInfo.baseSize !== '') && setCurrentStep(2)}>Choose Size</button>
                </div>
            </div>

        </PizzaSizeWrapper>
    )
}

export default PizzaSize;

const PizzaSizeWrapper = styled.div`
    
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

    .size-container{
        padding: 2rem;
        margin: 1.5rem;
        display: grid;
        grid-template-columns: repeat(auto-fit, 100px);
        place-content: center;
        gap: 2rem;

        div{
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 0.3rem;

            padding: 0.7rem 0.3rem;
            background-color: wheat;
            border: 2px solid white;
            border-radius: 0.5rem;
            box-shadow: 1px 1px 1px 1px rgba(0,0,0,0.1);

            font-size: medium;
            font-weight: bold;
            color: black;

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
            right: -10%;

            animation: blink 0.5s ease-in-out infinite alternate;

        }

        @keyframes blink {
            0%{
                box-shadow: 0 0 5px gold;
                opacity: 0.6;
            }
            100%{
                box-shadow: 0 0 10px gold;
                opacity: 1;
            }
        }        
    }

    .btnContainer{

        display: flex;
        justify-content: end;

        .selectCrust-btn{
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

    @media (max-width: 62rem) {
        padding: 1rem;

    .size-container{
        padding: 1rem;
        margin: 1rem;
        gap: 1.5rem;
    }
}
    @media (max-width: 37rem) {
        padding: 1rem;

        .size-container{
            padding: 0;
            display: grid;
            grid-template-columns: repeat(3, 100px);
            gap: 0.6rem;

        div{
            gap: 0.3rem;
        }
    }
       
}
    
`
