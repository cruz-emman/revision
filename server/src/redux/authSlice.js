import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        currentUser: null,
        isFetching : false,
        isError: false,
        isSuccess: false,
        isUpdated: false,
    },
    reducers: {
        resetState: (state) =>{
            state.currentUser = null;
            state.isFetching = false
            state.isError = false
            state.isSuccess = false
            state.isUpdated = false

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
            state.currentUser = action.payload
        },
        loginFailure: (state) =>{
            state.isSuccess = false;
            state.isFetching = false;
            state.isError = true;
        }, 
        logOut: (state) =>{
            state.currentUser = null;
        },
        updateStart: (state)=>{
            state.isFetching = true;
            state.isError = false;
        },
        updateSuccess: (state, action) =>{
            state.isUpdated = true;
            state.isFetching = true;
            state.currentUser = action.payload
        },
        updateFailure: (state) =>{
            state.isFetching = false;
            state.isError = true;
        }, 
    }

})

export const {registerStart, registerSuccess, registerFailure, resetState, loginStart, loginSuccess, loginFailure, logOut , updateStart, updateSuccess, updateFailure} = authSlice.actions;
export default authSlice.reducer