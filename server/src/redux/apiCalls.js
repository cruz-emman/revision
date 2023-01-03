import { publicRequest, userRequest } from "../publicRequest"
import { loginFailure, loginStart, loginSuccess, registerFailure, registerStart, registerSuccess, updateStart, updateFailure, updateSuccess, resetState } from "./authSlice"
import { getorderFailure, getorderStart, getorderSuccess } from "./orderSlice"
import { addProductFailure, addProductStart, addProductSuccess, deleteProductFailure, deleteProductStart, deleteProductSuccess, getProductFailure, getProductStart, getProductSuccess, updateProductStart } from "./productSlice"
import {deleteuserFailure, deleteuserStart, deleteuserSuccess, getuserFailure, getuserStart, getuserSuccess} from './userSlice'

//AUTH SECTIOn
export const registerUser = async (user, dispatch) => {
    dispatch(registerStart())
  
    try {
      const res = await publicRequest.post('/auth/register', user)
      dispatch(registerSuccess(res.data))
    } catch (error) {
      dispatch(registerFailure())
    }

  }

  export const loginUser = async (user, dispatch) => {
    dispatch(loginStart());
    try {
      const res = await userRequest.post("/auth/login", user);
      dispatch(loginSuccess(res.data));
    } catch (err) {
      dispatch(loginFailure());
    }
  };

  export const logoutUser = async (dispatch) =>{
    localStorage.removeItem('user')
  }



///PRODUCT SECTION 

  export const addProduct = async (product, dispatch) => {
    dispatch(addProductStart())

    try {
        const res = await userRequest.post('/products/',product)
        dispatch(addProductSuccess(res.data))
    } catch (error) {
        dispatch(addProductFailure())
    }
}

export const deleteProduct = async (id, dispatch) => {
  dispatch(deleteProductStart());
  try {
    const res = await userRequest.delete(`/products/${id}`);
    dispatch(deleteProductSuccess(id));
  } catch (err) {
    dispatch(deleteProductFailure());
  }
};

export const getProduct = async (dispatch) =>{
  dispatch(getProductStart())
  
  try {
    const res = await userRequest.get(`/products`)
    dispatch(getProductSuccess(res.data))
  } catch (error) {
    dispatch(getProductFailure())
  }
}




//USER SECTION
export const getUsers = async (dispatch) =>{
  dispatch(getuserStart())
  
  try {
    const res = await userRequest.get(`/users`)
    let filterdAdmin =  res.data.filter((admin) => admin.isAdmin === !true)
    dispatch(getuserSuccess(filterdAdmin))
  } catch (error) {
    dispatch(getuserFailure())
  }
}

export const searchUser = async (id,dispatch) =>{
  dispatch(getuserStart())
  
  try {
    const res = await userRequest.get(`/users/find/${id}`)
    dispatch(getuserSuccess(res.data))
  } catch (error) {
    dispatch(getuserFailure())
  }
}


export const updateUser = async (id, user, dispatch) =>{
  dispatch(updateStart())

  try {
    const res = await userRequest.put(`/users/${id}`, user)
    dispatch(updateSuccess(res.data))
    console.log(res.data)
  } catch (error) {
    dispatch(updateFailure())
  }
}


export const deleteUser = async (id, dispatch) => {
  dispatch(deleteuserStart());
  try {
    const res = await userRequest.delete(`/users/${id}`);
    dispatch(deleteuserSuccess(id));
  } catch (err) {
    dispatch(deleteuserFailure());
  }
};









//ORDER OBJECT


export const getOrder = async (dispatch) =>{
  dispatch(getorderStart())
  
  try {
    const res = await userRequest.get(`/order`)
    dispatch(getorderSuccess(res.data))
  } catch (error) {
    dispatch(getorderFailure())
  }
}
