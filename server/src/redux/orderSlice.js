import { createSlice } from "@reduxjs/toolkit";

export const orderSlice = createSlice({
    name: 'order',
    initialState: {
        orders: [],
        isSuccess: false,
        isFetching: false,
        isError: false,
    },
    reducers: {
        getorderStart: (state) => {
            state.isFetching = true
            state.isError = false
          },
          getorderSuccess: (state, action) => {
            state.isFetching = true
            state.orders = action.payload

          },
          getorderFailure: (state) => {
            state.isFetching = false
            state.isError = true
          },
          addorderStart: (state) => {
            state.isFetching = true
            state.isError = false
          },
          addorderSuccess: (state, action) => {
            state.isFetching = true
            state.orders.push(action.payload)
          },
          addorderFailure: (state) => {
            state.isFetching = false
            state.isError = true
          },
          deleteorderStart: (state) => {
            state.isFetching = true
            state.isError = false
          },
          deleteorderSuccess: (state, action) => {
            state.isFetching = true
            state.orders = state.orders.filter(
              (item) => item._id !== action.payload
            )
            state.isSuccess = true
          },
          deleteorderFailure: (state) => {
            state.isFetching = false
            state.isError = true
          },
          updateorderStart: (state) => {
            state.isFetching = true
            state.isError = false
          },
          updateorderSuccess: (state, action) => {
            state.isFetching = false;
            state.orders[
              state.orders.findIndex((item) => item._id === action.payload.id)
            ] = action.payload.order;
          },
          updateorderFailure: (state) => {
            state.isFetching = false
            state.isError = true
          },
          searchorderStart: (state) =>{
            state.isFetching = true
            state.isError = false
          },
          searchorderSuccess: (state,action) =>{
            state.isFetching = true
            state.orderName = action.payload
          },
          searchorderFailure: (state) => {
            state.isFetching = false
            state.isError = true
          },
          sellorderStart: (state) =>{
            state.isFetching = true
            state.isError = false
          },
          sellorderSuccess: (state,action) =>{
            state.isFetching = true
            state.orderName = action.payload
          },
          sellorderFailure: (state) => {
            state.isFetching = false
            state.isError = true
          },
    }
})

export const {
    getorderStart,
    getorderSuccess,
    getorderFailure,
    addorderStart,
    addorderSuccess,
    addorderFailure,
    deleteorderStart,
    deleteorderSuccess,
    deleteorderFailure,
    updateorderStart,
    updateorderSuccess,
    updateorderFailure,
    searchorderStart,
    searchorderSuccess,
    searchorderFailure,
   sellorderStart,
   sellorderSuccess,
   sellorderFailure,
  } = orderSlice.actions
  
  export default orderSlice.reducer
  