import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        currentUser: null,
        isFetching : false,
        isStatus : false,
        isError: false,
        isSuccess: false,
        isUpdated: false,
        isMessage: ""
    },
    reducers: {
        resetState: (state) =>{
            state.currentUser = null;
            state.isFetching = false
            state.isError = false
            state.isSuccess = false
            state.isUpdated = false
            state.isMessage = ""

        },
        registerStart: (state)=>{
            state.isFetching = true;
            state.isError = false;
        },
        registerSuccess: (state, action) =>{
            state.isFetching = true;
            state.isSuccess = true;
            state.currentUser = action.payload
        },
        registerFailure: (state) =>{
            state.isFetching = false;
            state.isError = true;
        },
        loginStart: (state)=>{
            state.isFetching = true;
            state.isError = false;
        },
        loginSuccess: (state, action) =>{
            state.isFetching = true;
            state.isSuccess = true;
            state.isStatus = true;
            state.currentUser = action.payload;
            state.isMessage = "Login Success!";
        },
        loginNotActive: (state, action) =>{
            state.isFetching = true;
            state.isStatus = false;
            state.isSuccess = true;
            state.currentUser = action.payload;
            state.isMessage = "Account is still pending...";
        },
        loginFailure: (state) =>{
            state.isSuccess = false;
            state.isFetching = false;
            state.isError = true;
            state.isMessage = "Wrong Username or Password!";

        }, 
        logOut: (state) =>{
            state.currentUser = null;
        },
    }

})

export const {registerStart,loginNotActive, registerSuccess, registerFailure, resetState, loginStart, loginSuccess, loginFailure, logOut} = authSlice.actions;
export default authSlice.reducer