import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { addUserDetails, authentication, clearData } from '../app/userSlice';

const SignupForm = () => {

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    phone: '',
    gender: '',
    password: '',
    confirmPassword: '',
    termsNconditions: false
  });

  const [error, setError] = useState({});
  const [show, setShow] = useState(false);

  const dispatch = useDispatch();
  const {isAuthenticated, userDetails} = useSelector((state) => state.userData);

  const {userName, emailAddress, phoneNumber, gender} = userDetails;

  const validation = () => {
    const err = {};

    //username
    if (!formData.username.trim()) err['username'] = 'Full name is required.';

    //emailaddress
    if (!formData.email.trim()) {
      err['email'] = 'emailaddress is required.';
    } else if (!(/^[a-z]+-?[0-9]*(@gmail\.com){1}$/).test(formData.email.trim())) {
      err['email'] = 'Please enter correct emailaddress.';
    }

    //phone number
    if (!formData.phone.trim()) {
      err['phone'] = 'phone number is required.'
    } else if (!/^[0-9]{10}$/.test(formData.phone.trim())) {
      err['phone'] = 'Invalid phone number.'
    }

    //password
    if (!formData.password.trim()) {
      err['password'] = 'password is required.'
    } else {
      if (!/[a-z]+/.test(formData.password)) err['password'] = 'There should be atleast one lower case';
      if (!/[A-Z]+/.test(formData.password)) err['password'] = 'There should be atleast one upper case';
      if (!/[@_&*$%?!]+/.test(formData.password)) err['password'] = 'There should be atleast one special characters';
      if (formData.password.length < 8) err['password'] = 'There should be atleast 8 characters';
    }

    if (!formData.password.trim() || !(formData.password.trim() === formData.confirmPassword.trim())) err['confirmPassword'] = 'your password is not matching.'

    if (!formData.termsNconditions) err['termsNconditions'] = 'You must accept the terms and conditions to continue.'

    return err;
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((state) => ({
      ...state,
      [name]: value
    }))

  };

  const handleOnSubmit = (e) => {
    e.preventDefault();

    const err = validation();
    setError(err); 

    if (Object.keys(err).length === 0) {
      dispatch(authentication(true));
      dispatch(addUserDetails(formData));
      setShow(true);
    }
  }

  const handleSignOut = () => {
    dispatch(authentication(false));
    dispatch(clearData());
    setFormData({
      username: '',
      email: '',
      phone: '',
      gender: '',
      password: '',
      confirmPassword: '',
      termsNconditions: false
    });
    setShow(false);
  }

  useEffect(() => {
    console.log(formData);
    console.log('err', error);

  }, [formData])


  return (
    <SignupWrapper>
      {!isAuthenticated ? <div className='form-wrapper'>
        <h2>Create Account</h2>
        <form onSubmit={(e) => handleOnSubmit(e)}>

          <div className='form-group'>
            <label htmlFor='username'>Full Name</label>
            <input id='username' type="text" placeholder='Enter your full name' name='username' value={formData.username} onChange={handleInputChange} />
            {error.username && <span>{error.username}</span>}
          </div>

          <div className='form-group'>
            <label htmlFor='emailAddress'>Email</label>
            <input id='emailAddress' type="email" placeholder='Enter your email address' name='email' value={formData.email} onChange={handleInputChange} />
            {error.email && <span>{error.email}</span>}
          </div>

          <div className='form-group'>
            <label htmlFor='phoneNumber'>Phone</label>
            <input id='phoneNumber' type="tel" placeholder='Enter your phone number' name='phone' value={formData.phone} onChange={handleInputChange} />
            {error.phone && <span>{error.phone}</span>}
          </div>

          <div className='form-group'>
            <div>
              <label>Gender (optional) : </label>
              <input id='male' type="radio" name='gender' value='male' onChange={handleInputChange} />
              <label htmlFor='male'>Male</label>
              <input id='female' type="radio" name='gender' value='female' onChange={handleInputChange} />
              <label htmlFor='female'>Female</label>
              <input id='others' type="radio" name='gender' value='others' onChange={handleInputChange} />
              <label htmlFor='others'>Others</label>
            </div>
          </div>

          <div className='form-group'>
            <label htmlFor='password'>Password</label>
            <input id='password' type="password" placeholder='eg:akT@123' name='password' value={formData.password} onChange={handleInputChange} />
            {error.password && <span>{error.password}</span>}
          </div>

          <div className='form-group'>
            <label htmlFor='confirm Password'>Confirm Password</label>
            <input id='confirm Password' type="password" placeholder='eg:akT@123' name='confirmPassword' value={formData.confirmPassword} onChange={handleInputChange} />
            {error.confirmPassword && <span>{error.confirmPassword}</span>}
          </div>

          <div className='form-group'>
            <div className='termsNcondtion-wrapper'>
              <input id='terms&condition' type="checkbox" name='termsNconditions' value={formData.termsNconditions} onChange={(e) => (setFormData((state) => ({ ...state, termsNconditions: e.target.checked })))} />
              <label htmlFor='terms&condition'> I agree to the <span>terms of service</span> and <span>Privacy Policy</span>.</label>
            </div>
            {error.termsNconditions && <span>{error.termsNconditions}</span>}
          </div>

          <button>Submit</button>

        </form>

      </div>
        :
        <div className='userProfile'>
          <div className='logo'>{userName[0]}</div>
          <div className='userDetails'>
            <div>
              <span>Username:</span>
              <span>{userName}</span>
            </div>
            <div>
              <span>Email:</span>
              <span>{emailAddress}</span>
            </div>
            <div>
              <span>Phone Number:</span>
              <span>{phoneNumber}</span>
            </div>
            {gender && <div>
              <span>Gender:</span>
              <span>{gender}</span>
            </div>}
          </div>
          <div className='logout-btn'>
            <button onClick={handleSignOut}>Sign Out</button>
          </div>
        </div>
      }

    </SignupWrapper>
  )
}

export default SignupForm;

const SignupWrapper = styled.section`
  
  min-height: calc(100vh - 107px);
  padding: 2rem;
  display: flex;
  justify-content: center;
  align-items: center;

  .form-wrapper{
    width: 45rem;
    padding: 1rem 2rem;
    background: var(--accent-color);
    border-radius: 1rem;
    box-shadow: 1px 1px 5px 2px rgba(0,0,0,0.18);
  }

  .form-wrapper h2{
    font-weight: 600;
    color: whitesmoke;
    text-align: center;
  }

  .form-wrapper .form-group{
    margin: 1rem 0;
    display: flex;
    flex-direction: column;
    gap: 0.2rem;

    input{
      padding: 0.5rem;
      border-radius: 0.5rem;
      border: none;
    }

    span{
      color: red;
      font-size: small;
      font-weight: 500;
    }
  }

  .form-wrapper .form-group div{

    display: flex;
    align-items: center;
    gap: 0.5rem;

    input{
    height: 1rem;
    width: 1rem;
    }
 } 

  .form-wrapper .termsNcondtion-wrapper{
      font-size: small;

      span{
       color: red;
       font-weight: 500;
      }
  }

  .form-wrapper button{
    width: 100%;
    padding: 0.5rem;
    background-color: var(--primary-color);
    border: none;
    color: white;
    font-size: medium;
    font-weight: 500;
  }

  .userProfile{
    width: 36rem;
    padding: 2rem;
    background-color: var(--accent-color);
    border-radius: 1rem;
    box-shadow: 1px 1px 5px 2px rgba(0,0,0,0.18);

    .logo{
      height: 5rem;
      width: 5rem;
      margin: auto;
      background-color: var(--primary-color);
      border-radius: 50%;
      text-transform: capitalize;
      border: 2px solid white;
      font-size: xx-large;
      font-weight: 600;
      color: white;

      display: flex;
      justify-content: center;
      align-items: center;
    }

      .userDetails div{
        margin: 1rem 0;
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: medium;
        font-weight: 600;
      }

      .logout-btn button{
        width: 100%;
        padding: 0.5rem;
        background-color: var(--primary-color);
        border: none;
        color: white;
        border-radius: 1rem;
      }
  }

  @media (max-width: 30rem){

  padding: 1rem;

  .userProfile{
    padding: 1rem;
  }

  }

`