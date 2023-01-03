import { createSlice } from "@reduxjs/toolkit";

export const productSlice = createSlice({
    name: 'product',
    initialState: {
        products: [],
        productName: null,
        isSuccess: false,
        isFetching: false,
        isError: false,
    },
    reducers: {
        getProductStart: (state) => {
            state.isFetching = true
            state.isError = false
          },
          getProductSuccess: (state, action) => {
            state.isFetching = true
            state.products = action.payload
            state.productName = action.payload

          },
          getProductFailure: (state) => {
            state.isFetching = false
            state.isError = true
          },
          addProductStart: (state) => {
            state.isFetching = true
            state.isError = false
          },
          addProductSuccess: (state, action) => {
            state.isFetching = true
            state.products.push(action.payload)
          },
          addProductFailure: (state) => {
            state.isFetching = false
            state.isError = true
          },
          deleteProductStart: (state) => {
            state.isFetching = true
            state.isError = false
          },
          deleteProductSuccess: (state, action) => {
            state.isFetching = true
            state.products = state.products.filter(
              (item) => item._id !== action.payload
            )
            state.isSuccess = true
          },
          deleteProductFailure: (state) => {
            state.isFetching = false
            state.isError = true
          },
          updateProductStart: (state) => {
            state.isFetching = true
            state.isError = false
          },
          updateProductSuccess: (state, action) => {
            state.isFetching = false;
            state.products[
              state.products.findIndex((item) => item._id === action.payload.id)
            ] = action.payload.product;
          },
          updateProductFailure: (state) => {
            state.isFetching = false
            state.isError = true
          },
          searchProductStart: (state) =>{
            state.isFetching = true
            state.isError = false
          },
          searchProductSuccess: (state,action) =>{
            state.isFetching = true
            state.productName = action.payload
          },
          searchProductFailure: (state) => {
            state.isFetching = false
            state.isError = true
          },
          sellProductStart: (state) =>{
            state.isFetching = true
            state.isError = false
          },
          sellProductSuccess: (state,action) =>{
            state.isFetching = true
            state.productName = action.payload
          },
          sellProductFailure: (state) => {
            state.isFetching = false
            state.isError = true
          },
    }
})

export const {
    getProductStart,
    getProductSuccess,
    getProductFailure,
    addProductStart,
    addProductSuccess,
    addProductFailure,
    deleteProductStart,
    deleteProductSuccess,
    deleteProductFailure,
    updateProductStart,
    updateProductSuccess,
    updateProductFailure,
    searchProductStart,
    searchProductSuccess,
    searchProductFailure,
   sellProductStart,
   sellProductSuccess,
   sellProductFailure,
   resetStateProduct
  } = productSlice.actions
  
  export default productSlice.reducer
  