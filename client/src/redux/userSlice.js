import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        currentUser: null,
        isFetching : false,
        isError: false,
        isSuccess: false,
        isUpdated: false,
        isMessage: ""
    },
    reducers: {
        userResetState: (state) =>{
            state.currentUser = null;
            state.isFetching = false
            state.isError = false
            state.isSuccess = false
            state.isMessage = ""

        },
        updateStart: (state)=>{
            state.isFetching = true;
            state.isError = false;
        },
        updateSuccess: (state, action) =>{
            state.isFetching = true;
            state.isSuccess = true;
            state.currentUser = action.payload
            state.isMessage = "Information updated, please Re-login"
        },
        updateFailure: (state) =>{
            state.isFetching = false;
            state.isSuccess = false;
            state.isError = true;
            state.isMessage = "Please input information properly"
        }, 
    }

})

export const { updateStart, updateSuccess, updateFailure,userResetState} = userSlice.actions;
export default userSlice.reducer