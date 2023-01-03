import React from 'react'
import {Outlet, Navigate} from 'react-router-dom'
import { useSelector } from 'react-redux'

const Protected = ({children, ...rest}) => {
  const user = JSON.parse(localStorage.getItem("persist:root"))?.auth;
  const currentUser = user && JSON.parse(user).currentUser;
  const ADMIN = currentUser?.isAdmin;
  const TOKEN = currentUser?.acessToken;

  return (
    ADMIN ? <Outlet /> : <Navigate to="/login" replace />
  )

}

export default Protected