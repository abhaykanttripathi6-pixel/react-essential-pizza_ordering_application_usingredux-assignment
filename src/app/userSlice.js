import { createSlice } from '@reduxjs/toolkit';
import React from 'react';

const userSlice = createSlice({
    name: 'userAccount',
    initialState: {
        isAuthenticated:false,
        userDetails:''
    },
    reducers: {
        addUserDetails: (state, action) => {
            
            const { username, email, phone, gender, password, confirmPassword, termsNconditions } = action.payload;
            state.userDetails = {
                userName: username,
                emailAddress: email,
                phoneNumber: phone,
                gender: gender,
                password: password,
                confirmPassword: confirmPassword,
                termsNcondtions: termsNconditions
            }
        },

        authentication: (state, action) => {
            state.isAuthenticated = action.payload;
        } 
,
        clearData: (state)=>{
            state.userDetails = '';
        }    
    }
})

export const {addUserDetails, clearData, authentication} = userSlice.actions;
export default userSlice.reducer;
