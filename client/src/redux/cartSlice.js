import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name: "cart",
    initialState: {
    products: [],
    quantity: 0,
    total: 0
    },
    reducers: {
        resetStateCart: (state) => {
            state.products = [];
            state.quantity = 0;
            state.total = 0
        },
        addProduct: (state,action) =>{
            state.quantity += 1;
            state.products.push(action.payload);
            state.total += action.payload.price * action.payload.quantity
        },
        deleteProduct: (state,action) =>{
            state.quantity -= 1;
            state.products.splice(state.products.findIndex((arrow) => arrow._id === action.payload),1)
            state.total = (action.payload.quantity-1) * action.payload.price
        }
    }
})

export const {addProduct, deleteProduct, resetStateCart} = cartSlice.actions
export default cartSlice.reducer