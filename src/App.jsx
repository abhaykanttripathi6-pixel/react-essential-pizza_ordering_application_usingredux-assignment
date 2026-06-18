import React, { useEffect, useState } from 'react'
import styled from 'styled-components';
import Menu from './components/Menu';
import Signup from './components/SignupForm';
import Cart from './components/Cart';
import { useSelector } from 'react-redux';

const App = () => {

  const [currentStep, setCurrentStep] = useState(1);

  const [show, setShow] = useState('Menu');

  const totalCartItems = useSelector((state) => state.cartData.length)

  const isUserAuthenticated = useSelector((state) => state.userData.isAuthenticated);

  return (
    <AppWrapper>
      <header>
        <div className='appName'>
          <span>PizzaVerse</span>
        </div>

        <div className='navs' onClick={(e) => e.target.tagName === 'DIV' ? setShow(e.target.textContent) : ''}>
          <div>Menu</div>
          <div>{isUserAuthenticated ? 'SignOut' : 'SignUp'}</div>
          <div>
            <div>Cart</div>
            <span>{totalCartItems}</span>
          </div>
        </div>
      </header>

      <main>
        {show === 'Menu' && <Menu currentStep={currentStep} setCurrentStep={setCurrentStep} setShow={setShow} />}
        {( show === 'SignUp' || show === 'SignOut') &&  <Signup />}
        {show === 'Cart' && <Cart setShow={setShow} />}
      </main>
    </AppWrapper>
  )
}

export default App;

const AppWrapper = styled.div`

  min-height: 100vh;
  background-color: #e5e5b0;

  header{
    padding: 2rem 4rem;
    background-color: #6d1b1b;
    background-color: var(--primary-color);
    display: flex;
    justify-content: space-between;
    align-items: center;

    .appName{
    font-size: xx-large;
    color: #ededbf;
    font-weight: bold;
  }

  .navs {
    display: flex;
    gap: 3rem;
    
    font-size: medium;
    font-weight: 500;
    color: #e5e5b0;
    cursor: default;
    position: relative;

    span{
      padding: 0.1rem 0.4rem;
      background-color: blue;
      border-radius: 50%;
      font-size: 13px;
      color: white;
      font-weight: 500;

      position: absolute;
      top: -40%;
      right: -7%;
    }
  }
}

@media (max-width:37rem){

  header{
    padding: 1rem 2rem;
    
    .appName{
    font-size: x-large;
    color: var(--secondary-color);
    /* font-weight: bold; */
  }

  .navs {
    /* display: flex; */
    gap: 1rem;
    
    font-size: small;
    /* font-weight: 500; */
    color: var(--secondary-color);
    /* cursor: default;
    position: relative; */

    span{
      padding: 0 0.3rem;
      font-size: small;

      position: absolute;
      top: -45%;
      right: -10%;
    }
  }
}
}

`
