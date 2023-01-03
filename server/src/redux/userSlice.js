import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        users: [],
        userName: null,
        isSuccess: false,
        isFetching: false,
        isError: false,
    },
    reducers: {
        getuserStart: (state) => {
            state.isFetching = true
            state.isError = false
          },
          getuserSuccess: (state, action) => {
            state.isFetching = true
            state.users = action.payload
            state.userName = action.payload

          },
          getuserFailure: (state) => {
            state.isFetching = false
            state.isError = true
          },
          adduserStart: (state) => {
            state.isFetching = true
            state.isError = false
          },
          adduserSuccess: (state, action) => {
            state.isFetching = true
            state.users.push(action.payload)
          },
          adduserFailure: (state) => {
            state.isFetching = false
            state.isError = true
          },
          deleteuserStart: (state) => {
            state.isFetching = true
            state.isError = false
          },
          deleteuserSuccess: (state, action) => {
            state.isFetching = true
            state.users = state.users.filter(
              (item) => item._id !== action.payload
            )
            state.isSuccess = true
          },
          deleteuserFailure: (state) => {
            state.isFetching = false
            state.isError = true
          },
          updateuserStart: (state) => {
            state.isFetching = true
            state.isError = false
          },
          updateuserSuccess: (state, action) => {
            state.isFetching = false;
            state.users[
              state.users.findIndex((item) => item._id === action.payload.id)
            ] = action.payload.user;
          },
          updateuserFailure: (state) => {
            state.isFetching = false
            state.isError = true
          },
          searchuserStart: (state) =>{
            state.isFetching = true
            state.isError = false
          },
          searchuserSuccess: (state,action) =>{
            state.isFetching = true
            state.userName = action.payload
          },
          searchuserFailure: (state) => {
            state.isFetching = false
            state.isError = true
          },
          selluserStart: (state) =>{
            state.isFetching = true
            state.isError = false
          },
          selluserSuccess: (state,action) =>{
            state.isFetching = true
            state.userName = action.payload
          },
          selluserFailure: (state) => {
            state.isFetching = false
            state.isError = true
          },
    }
})

export const {
    getuserStart,
    getuserSuccess,
    getuserFailure,
    adduserStart,
    adduserSuccess,
    adduserFailure,
    deleteuserStart,
    deleteuserSuccess,
    deleteuserFailure,
    updateuserStart,
    updateuserSuccess,
    updateuserFailure,
    searchuserStart,
    searchuserSuccess,
    searchuserFailure,
   selluserStart,
   selluserSuccess,
   selluserFailure,
  } = userSlice.actions
  
  export default userSlice.reducer
  