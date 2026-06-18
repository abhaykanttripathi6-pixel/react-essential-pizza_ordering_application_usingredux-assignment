import React from 'react';
import styled from 'styled-components';

const Stepper = ({currentStep}) => {
    const steps = [
        {
            stepNum: 1,
            stepName: 'Size'
        },
        {
            stepNum: 2,
            stepName: 'Crust'
        },
        {
            stepNum: 3,
            stepName: 'Toppings'
        },
        {
            stepNum: 4,
            stepName: 'Extras'
        },
        {
            stepNum: 5,
            stepName: 'Review'
        }
    ];

    return (
        <StepperWrapper>
            {
                steps.map((step) => (
                    <span key={step.stepNum} className='step' style={{background : step.stepNum <= currentStep?' var(--primary-color)':'gray'}}>{step.stepName}</span>
                ))
            }
        </StepperWrapper>
    )
}

export default Stepper;


const StepperWrapper = styled.div`

    display: flex;
    justify-content: center;
    
    .step{
        display: inline-block;
        padding: 1rem;
        border: 1px solid rgba(255, 255, 255, 0.15);
        color: white;
        font: medium;
        font-weight: 500;
        box-shadow: 1px 1px 2px 1px rgba(0,0,0,0.18);

    }

    @media (max-width: 37rem){
    
    .step{
        display: inline-block;
        padding: 0.9rem;
        border: 1px solid rgba(255, 255, 255, 0.15);
        color: white;
        font: medium;
        font-weight: 500;
    }
    }
`