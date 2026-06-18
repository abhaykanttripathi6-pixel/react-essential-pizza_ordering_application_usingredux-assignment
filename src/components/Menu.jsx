import React from 'react'
import styled from 'styled-components';
import Stepper from './Stepper';
import PizzaSize from './PizzaSize';
import Preview from './Preview';
import PizzaCrust from './PizzaCrust';
import Toppings from './PizzaToppings';
import Extras from './Extras';
import Summary from './Summary';

const Menu = ({ currentStep, setCurrentStep, setShow }) => {


    return (
        <MenuWrapper>
            <div className='head'>
                <h2>Build Your Pizza</h2>
                <p>- Authentic Taste • Made To Order • Step {currentStep} of 5</p>
            </div>

            <div className='stepper'>
                <Stepper currentStep={currentStep} />
            </div>

            <div className={currentStep === 5 ? 'summary-main' : 'main'}>
                {currentStep === 1 && <PizzaSize currentStep={currentStep} setCurrentStep={setCurrentStep} />}
                {currentStep === 2 && <PizzaCrust currentStep={currentStep} setCurrentStep={setCurrentStep} />}
                {currentStep === 3 && <Toppings currentStep={currentStep} setCurrentStep={setCurrentStep} />}
                {currentStep === 4 && <Extras currentStep={currentStep} setCurrentStep={setCurrentStep} />}
                {currentStep === 5 && <Summary currentStep={currentStep} setCurrentStep={setCurrentStep} setShow={setShow} />}
                {currentStep !== 5 && <Preview />}
            </div>

        </MenuWrapper>
    )
}

export default Menu;

const MenuWrapper = styled.section`

    min-height: 40rem;
    padding: 3rem;

    .head{

        h2{
            font-size: 3rem;
            font-weight: bolder;
            color: var(--primary-color);
        }

        p{
            font-size: medium;
            font-weight: 500;
            color: gray;
            padding-left: 1.4rem;
        }
    }

    .stepper{
        margin: 2rem 0;
    }

    .main{
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 3rem;
    }

    .summary-main{
        display: grid;
        grid-template-columns: 45rem;
        place-content: center;
    }

    @media (max-width: 50rem){
        padding: 2rem;

        .head{

            h2{
            font-size: 3rem;
            font-weight: bolder;
            color: var(--primary-color);
            }

            p{
            font-size: small;
            font-weight: 700;
            color: #555555;
            padding-left: 0;
            }
        }

    .stepper{
        margin: 3rem 0;
    }

    .main{
        display: grid;
        grid-template-columns: 1fr;
        gap: 3rem;
    }

    .summary-main{
        display: grid;
        grid-template-columns: 30rem;
        place-content: center;
    }
    }

    @media (max-width: 37rem){
        padding: 1rem;

        .head{

        h2{
            font-size: xx-large;
            font-weight: bold;
        }

        p{
            font-size: small;
            font-weight: 500;
        }
    }

    .stepper{
        margin: 2rem 0;
    }

    .main{
        gap: 2rem;
    }

    .summary-main{
        display: grid;
        grid-template-columns: 25rem;
        place-content: center;
    }
    }

    

`
