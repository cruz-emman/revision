import { Box, Button, Container, TextField, Typography } from '@mui/material'
import React from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import login from '../assets/banner.jpg'
import TuaLogo from '../assets/tua.png'
import {useForm} from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { loginUser } from '../redux/apiCalls'
import { toast } from 'react-toastify'
import { useEffect } from 'react'
import { resetState } from '../redux/authSlice'


const Login = () => {
  
  const ID_REGEX = /^[0-9]{10}$/;
  const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
  const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const {isError, currentUser, isMessage,isSuccess,isStatus} = useSelector((state) => state.auth)

  const {register, handleSubmit, formState: {errors}} = useForm({
    studentId: '',
    password: ''
  })

  

  useEffect(() =>{
    if(isError){
      toast.error(isMessage)
      console.log("Error")

    }
    dispatch(resetState())
  },[dispatch, isError])


  useEffect(() =>{
    if(isSuccess){
      if(isStatus){
        if(currentUser){
          toast.success("Login Successfully")
          navigate('/')
        }
      }else{
        toast.info(isMessage)
        dispatch(resetState())
      }
    }

},[dispatch, currentUser,isStatus,isMessage,isSuccess])

  const onSubmit = ({studentId,password}) =>{
    let user ={studentId, password}
    loginUser(user, dispatch)
  }



  return (
    <Box sx={{display: 'flex', alignItems:'center', justifyContent:'center', 
      height: '100vh', width: '100vw', position: 'relative'}}>
      <Box component="img" sx={{height: '100%', width:'100%', objectFit:'cover', position: 'absolute', top: 0, left: 0, zIndex: 2}} src={login}  />
      <Box component="div" sx={{height: '100%', width: '100%', objectFit:'cover',
           position: 'absolute', top: 0, left: 0, 
           backgroundColor: 'rgba(122, 139, 120, 0.8)',zIndex: 3,
           }} /> 
        <Container maxWidth="xl" sx={{position: 'absolute', zIndex: 5}}>
            <Box sx={{display:'flex', alignItems:'center', justifyContent: 'center'}} >
              <Box sx={{display:'flex', alignItems:'center', justifyContent:'center', flexDirection: 'column',
                    height:'600px', width: '400px', backgroundColor:"white", padding:'20px', gap: "5px",
                    boxShadow: 3,
                    borderRadius: '15px'}}>
                    <Box sx={{display: 'flex', alignItems:'center', justifyContent:'center', padding: '20px',width: '150px' }}>
                      <Box component="img" sx={{width: '100%', height: '100%', objectFit: 'contain'}} src={TuaLogo}></Box>
                    </Box>
                    <Typography my={2} sx={{ typography: {xs: 'body1', md: 'h5'}}}>E-Benta || TUA-MARKETPLACE</Typography>

                    <form onSubmit={handleSubmit(onSubmit)} style={{display: "flex", flexDirection: 'column',gap: '10px', width: '100%'}}>
                    <TextField   
                            variant="outlined"
                            name="Student ID"
                            label="Student ID"
                            required
                            fullWidth
                            type="text"
                            autoComplete='password'
                            {...register('studentId', {required: "Required", pattern: {value: ID_REGEX,  message: "Please Enter your Student ID properly" }})}
                            error={!!errors?.studentId}
                            helperText={errors?.studentId ? errors.studentId.message: null}
                        />
                       <TextField   
                            variant="outlined"
                            name="password"
                            label="Password"
                            required
                            fullWidth
                            type="password"
                            autoComplete='password'
                            {...register('password', {required: "Required", pattern: {value: PWD_REGEX,  message: "Password should be 8-24 characters and include at least 1 letter, 1 number and 1 special character!" }})}
                            error={!!errors?.password}
                            helperText={errors?.password ? errors.password.message: null}
                        />
                        <Button fullWidth type="submit" variant="contained">Login</Button>

                      </form>

                      <Box mt={5} sx={{width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column'}}>
                        <Typography variant="body2">Not a user yet?</Typography>
                        <Link to="/register">
                          <Button  variant="text">Register Here</Button>
                        </Link>

                        <Typography>Forgot Password? email tua.ebentamarket@gmail.com</Typography>
                      </Box>
              </Box>
            </Box>
        </Container>
    </Box>
  )
}

export default Login