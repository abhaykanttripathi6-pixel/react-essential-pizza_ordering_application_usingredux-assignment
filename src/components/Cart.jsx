import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import totalPrice from '../utils/totalPrice';
import { counter, remove, clearAll } from '../app/cartSlice';
import Modal from './Modal';

const Cart = ({setShow}) => {

  const [modalShow, setModalShow] = useState(false);

  const dispatch = useDispatch();
  const data = useSelector((state) => state.cartData);

  const handleCounterButton = (id, param) => {
    return dispatch(counter({ id, param }));
  }

  const orderAmount = data.reduce((sum, initialVal) => {
    sum = sum + totalPrice(initialVal)
    return sum;
  }, 0)


  return (
    <CartWrapper>
      <div className='cart-wrapper'>
        <div className='heading'>
          <div className='left'>
            <h2>Your Cart</h2>
            <p>{data.length} item in your order.</p>
          </div>

          <div className='right'>
            <button onClick={() => dispatch(clearAll())}>Clear all</button>
          </div>
        </div>

        {
          data.map((item) => {
            const { id, size: { baseSize, basePrice }, crust: { crustType, crustPrice }, toppings, extraMeal, drinks, quantity } = item;
            return <div key={id}>
              <div className='pizzaCard-Wrapper'>
                <div className='name-price'>
                  <h3>{baseSize}-{crustType}</h3>
                  <span>{new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(totalPrice(item))}</span>
                </div>

                <div className='info-btn'>
                  <div className='info'>
                    <p><span>Toppings: </span> {toppings.map(item => item.topping).join(', ')}</p>
                    {(extraMeal.length !== 0) && <p><span>Side Meal: </span> {extraMeal.map(item => item.meal).join(', ')}</p>}
                    {(drinks.length !== 0) && <p><span>Drinks: </span> {drinks.map(item => item.drink).join(', ')}</p>}
                  </div>
                  <div className='btn-wrapper' onClick={() => dispatch(remove(id))}>
                    <button>Remove</button>
                  </div>
                </div>

                <div className="counter">
                  <button className="increment" onClick={() => handleCounterButton(id, 'decrement')}>-</button>
                  <span>{quantity}</span>
                  <button className="decrement" onClick={() => handleCounterButton(id, 'increment')}>+</button>
                </div>
              </div>
            </div>
          })
        }

        {(data.length !== 0) && <div className='checkoutBtn-Wrapper'>
          <button onClick={()=>setModalShow(true)}>Checkout - {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(orderAmount)}</button>
        </div>
        }

        {(data.length === 0) &&
          <div className='empty'>
            Your Cart is Empty.
          </div>
        }
      </div>
      {modalShow &&
        <Modal setModalShow={setModalShow} setShow={setShow}/>
      }
    </CartWrapper>
  )
};

export default Cart;

const CartWrapper = styled.section`
  
  padding: 3rem;
  display: flex;
  justify-content: center;

  .cart-wrapper{
    min-height: 75vh;
    width: 60%;
    padding: 1.5rem;
    background-color: var(--primary-color);
    border-radius: 0.6rem;
    box-shadow: 1px 1px 5px 3px rgba(0,0,0,0.18);

  .heading{
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: white;

    .left h2{
      font-size: xx-large;
    }

    .left p{
      font-weight: 500;
    }

    .right button{
      padding: 0.5rem 1rem;
      border: 2px solid white;
      background-color: rgba(255, 255, 255, 0.1);
      border-radius: 1rem;
      color: white;
      font-weight: bold;
      cursor: pointer;
      transition: 0.2s;

       &:hover{
          transform: scale(1.05);
      }

      &:active{
          transform: scale(1);
      }
    }
  }

    .pizzaCard-Wrapper{
      padding: 2rem;
      margin: 1rem;
      background-color: var(--accent-color);
      border-radius: 0.5rem;

    .name-price{
      display: flex;
      justify-content: space-between;

      h3{
        font-size: large;
      }

      span{
        font-size: 1.4rem;
        font-weight: 500;
        color: var(--primary-color);
      }
    }

      .info-btn{
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin: 0.5rem 0;

        .info{
          width: 70%;
          p{
            margin: 0.5rem 0;
          }
          span{
            font-weight: 500;
          }
        }

        .btn-wrapper button{
          padding: 0.5rem;
          background-color: var(--primary-color);
          border: 1px solid white;
          color: white;
          border-radius: 0.5rem;
          transform: scale(1);
          transition: transform 0.2s;

          &:active{
            transform: scale(0.9);
          }
        }
      }

      .counter{
        display: flex;
        align-items: center;
        gap: 0.5rem;

        .increment, .decrement{
        height: 1.5rem;
        width: 1.5rem;
        background: rgba(255, 0, 0,0.2);
        border: 2px solid white;
        border-radius: 50%;

        color: white;
        font-weight: 600;

        cursor: pointer;
      }

      span{
        font-size: large;
      }
    }
  }

   .checkoutBtn-Wrapper{
    padding: 0 1rem;

    button{
    width: 100%;
    padding: 0.7rem 0;
    border: none;
    background-color: var(--accent-color);
    font-size: medium;
    font-weight: 600;
    border-radius: 0.5rem;
    cursor: pointer;

    &:active{
      cursor: progress;
    }
    }
  }

  .empty{
    min-height: 25rem;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: xx-large;
    font-weight: bold;
    color: white;
  }

}

@media (max-width: 70rem){
  min-height: 90vh;
  padding: 3;
  display: flex;
  justify-content: center;
  align-items: center;

  .cart-wrapper{
    min-height: 75vh;
    width: 100%;
    padding: 1.5rem;
    background-color: var(--primary-color);
    border-radius: 0.6rem;
    box-shadow: 1px 1px 5px 3px rgba(0,0,0,0.18);

  .heading{
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: white;

    .left h2{
      font-size: xx-large;
    }

    .left p{
      font-weight: 500;
    }

    .right button{
      padding: 0.5rem 1rem;
      border: 2px solid white;
      background-color: rgba(255, 255, 255, 0.1);
      border-radius: 1rem;
      color: white;
      font-weight: bold;
      cursor: pointer;
      transition: 0.2s;

       &:hover{
          transform: scale(1.05);
      }

      &:active{
          transform: scale(1);
      }
    }
  }

    .pizzaCard-Wrapper{
      padding: 2rem;
      margin: 1rem;
      background-color: var(--accent-color);
      border-radius: 0.5rem;

    .name-price{
      display: flex;
      justify-content: space-between;

      h3{
        font-size: large;
      }

      span{
        font-size: 20px;
        font-weight: 500;
        color: var(--primary-color);
      }
    }

      .info-btn{
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin: 0.5rem 0;

        .info{
          width: 70%;
          p{
            margin: 0.5rem 0;
          }
          span{
            font-weight: 500;
          }
        }

        .btn-wrapper button{
          padding: 0.5rem;
          background-color: var(--primary-color);
          border: 1px solid white;
          color: white;
          border-radius: 0.5rem;
          transform: scale(1);
          transition: transform 0.2s;

          &:active{
            transform: scale(0.9);
          }
        }
      }

      .counter{
        display: flex;
        align-items: center;
        gap: 0.5rem;

        .increment, .decrement{
        height: 1.5rem;
        width: 1.5rem;
        background: rgba(255, 0, 0,0.2);
        border: 2px solid white;
        border-radius: 50%;

        color: white;
        font-weight: 600;

        cursor: pointer;
      }

      span{
        font-size: large;
      }
    }
  }

   .checkoutBtn-Wrapper{
    padding: 0;

    button{
    width: 100%;
    padding: 0.7rem 0;
    border: none;
    background-color: var(--accent-color);
    font-size: medium;
    font-weight: 600;
    border-radius: 0.5rem;
    cursor: pointer;

    &:active{
      cursor: progress;
    }
    }
  }

  .empty{
    min-height: 20rem;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: xx-large;
    font-weight: bold;
    color: white;
  }

}
}
@media (max-width: 40rem){
  padding:1rem;

  .cart-wrapper{
    min-height: 50vh;
    width: 100%;

    .pizzaCard-Wrapper{
      padding: 1rem;
      margin: 1rem 0;

    .name-price h3{
        width: 50%;
        font-size: medium;
      }
    }

      .info-btn .info{
          p{
            font-size: small;
          }
          span{
            font-weight: 700;
          }
        }

      }

  .empty{
    font-size: x-large;
  }
}

    
`