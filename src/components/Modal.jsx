import React from 'react';
import PizzaDeliver from '../assets/pizzaDeliver.png';
import PartyPopper from '../assets/partyPopper.png';
import AddUser from '../assets/addUser.png';
import styled from 'styled-components';
import { createPortal } from 'react-dom';
import { useDispatch, useSelector } from 'react-redux';
import { clearAll } from '../app/cartSlice';


const container = document.getElementById('modal-root');
const Modal = ({ setModalShow, setShow }) => {

    const dispatch = useDispatch();
    const isUserAuthenticated = useSelector((state) => state.userData.isAuthenticated);

    const handleOrderAgainbtn = () => {
        setModalShow(false);
        setShow('Menu');
        dispatch(clearAll());
    }

    return createPortal(
        <ModalWrapper>
            <div className='modal-wrapper'>
                {isUserAuthenticated ?
                    <>
                        <div className='img-wrapper'>
                            <figure>
                                <img src={PizzaDeliver} alt="pizzaDeliery-logo" />
                            </figure>
                        </div>
                        <div className='msg-wrapper'>
                            <p>
                                <span>Congratulations!!</span>
                                <img src={PartyPopper} alt='party-popper' />
                            </p>
                            <p>Your order has been placed successfully.</p>
                            <p>Enjoy your pizza!!</p>
                        </div>
                        <div className='btn-wrapper'>
                            <button onClick={handleOrderAgainbtn}>Order Again</button>
                        </div>
                    </>
                    :
                    <div className='signup-popup'>
                        <div className='img-wrapper'>
                            <figure>
                                <img src={AddUser} alt="addUser-logo" />
                            </figure>
                        </div>
                        <div className='msg'>
                            <p>Please create an account to proceed to checkout.</p>
                        </div>
                        <div className='btn-wrapper'>
                            <button onClick={()=>setModalShow(false)}>Cancel</button>
                            <button onClick={()=>setShow('SignUp')}>Signup</button>
                        </div>
                    </div>
                }
            </div>
        </ModalWrapper>,
        container)
}

export default Modal;

const ModalWrapper = styled.div`
    height: 100%;
    width: 100%;

    display: grid;
    place-content: center;
    
    position: fixed;
    top: 0;
    left: 0;
    backdrop-filter: blur(5px);

    .modal-wrapper{
        height: 20rem;
        width: 40rem;
        padding: 2rem;
        background: var(--secondary-color);
        border-radius: 1rem;

        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: 2rem;

        text-align: center;
        box-shadow: 1px 1px 5px 3px rgba(0,0,0,0.18);

        .msg-wrapper{
            font-size: medium;
            font-weight: 500;

            p:first-child{
                display: flex;
                justify-content: center;
                align-items: center;
                gap: 0.5rem;

                font-size: x-large;
                font-weight: 600;
            }

            img{
                height: 1.5rem;
                width: 1.5rem;
                object-fit: contain;
            }
        }

        .img-wrapper figure img{
            height: 7rem;
            width: 7rem;
            object-fit: cover;
        }

        .btn-wrapper{
            width: 100%;

            button{
                width: 100%;
                flex: 1;
                padding: 0.5rem 0;
                background-color: var(--primary-color);
                color: var(--secondary-color);
                border: none;
                outline: none;
                border-radius:1rem;
                cursor: pointer;
            }
        }

        .signup-popup {
            width: 100%;
            height: 100%;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            gap: 2rem;
        }

        .signup-popup .msg{
            font-size: medium;
            font-weight: 500;
        }

        .signup-popup .btn-wrapper{
            display: flex;
            gap: 1rem;
            button{
                flex:1;
                padding:0.5rem;
                background: var(--primary-color);
                border: none;
                border-radius: 1rem;
            }
        }

    }

@media (max-width: 40rem){

    .modal-wrapper{
        height: 20rem;
        width: 25rem;
        padding: 1rem;
    }
}       
`
