import { Box, Button, Container, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material'
import React, {useRef, useState} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import login from '../assets/banner.jpg'
import TuaLogo from '../assets/tua.png'
import {useForm} from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { registerUser } from '../redux/apiCalls'
import { useEffect } from 'react'
import { toast } from 'react-toastify'
import { resetState } from '../redux/authSlice'
import emailjs from '@emailjs/browser';




const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const ID_REGEX = /^[0-9]{10}$/;
const CONTACT_REGEX = /^[0-9]{1,10}$/;

const Register = () => {
  const {isError, isSuccess} = useSelector((state) =>  state.auth)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const form = useRef()

  useEffect(() =>{
  
    if(isError){
      toast.error("Username, Email or Student ID already exists")
    }

  },[isError, dispatch])

  useEffect(() =>{
      if(isSuccess){
        toast.success("Successfully created")
        setTimeout(() =>{
          navigate('/login')
        }, "1000")
      }
      dispatch(resetState())
  },[dispatch, isSuccess])

  

  const {register, handleSubmit, watch , unregister, formState: {errors}} = useForm({
    firtname: '',
    middlename: '',
    lastname: '',
    email: '',
    department: '',
    contactNumber: '',
    password: '',
    studentId: ''
  })
    

  const onSubmit =  ({firstname, middlename, lastname, email, password, studentId, department,contactNumber}) => {
    let user = {firstname, middlename, lastname, email, password, studentId, department,contactNumber}
    registerUser(user,dispatch)
    
    emailjs.sendForm('gmail','template_3ju5i3p', form.current,'Qzg9HMQGgYrGO_WPM')
      .then((result) =>{
        console.log("Success", result.status, result.text)
      },(error) =>{
        console.log("Failed", error)
      })
    
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
                    height:'800px', width: '600px', backgroundColor:"white", padding:'20px', gap: "5px",
                    boxShadow: 3,
                    borderRadius: '15px'}}>
                    <Box sx={{display: 'flex', alignItems:'center', justifyContent:'center', padding: '20px',width: '150px' }}>
                      <Box component="img" sx={{width: '100%', height: '100%', objectFit: 'contain'}} src={TuaLogo}></Box>
                    </Box>
                    <Typography my={2} sx={{ typography: {xs: 'body1', md: 'h5'}}}>E-Benta || TUA-MARKETPLACE</Typography>

                    <form ref={form} onSubmit={handleSubmit(onSubmit)} style={{display: "flex", flexDirection: 'column',gap: '10px', width: '100%'}}>
                        <Box sx={{display:'flex', alignItems:'center', justifyContent:'space-between', gap: '5px'}}>
                          <TextField   
                              variant="outlined"
                              name="Firstname"
                              required
                              label="First name"
                              autoComplete='Firstname'
                              autoFocus
                              {...register('firstname', {required: "Required"})}
                              error={!!errors?.firstname}
                              helperText={errors?.firstname ?errors.firstname.message: null}
                          />
                          <TextField   
                              variant="outlined"
                              name="Middlename"
                              label="Middle name"
                              {...register('middlename')}
                          />
                          <TextField   
                              variant="outlined"
                              name="Lastname"
                              required
                              label="Last name"
                              autoComplete='Lastname'
                              {...register('lastname', {required: "Required"})}
                              error={!!errors?.lastname}
                              helperText={errors?.lastname ?errors.lastname.message: null}
                          />
                        </Box>
                        <TextField   
                            variant="outlined"
                            name="email"
                            label="Email"
                            required
                            fullWidth
                            type="email"
                            autoComplete='email'
                            {...register('email', {required: "Required", pattern: { message: "It should be a valid email address!" }})}
                            error={!!errors?.email}
                            helperText={errors?.email ?errors.email.message: null}
                        />
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
                        <Box sx={{display: 'flex', alignItems:'center', gap: 1}}>
                          <TextField sx={{width: "12%"}} value="+63" variant='outlined' disabled />
                        <TextField   
                            variant="outlined"
                            name="contactNumber"
                            label="Contact Number"
                            required
                            fullWidth
                            type="text"
                            autoComplete='password'
                            {...register('contactNumber', {required: "Required", pattern: {value: CONTACT_REGEX,  message: "Please input your contact number properly" }})}
                            error={!!errors?.contactNumber}
                            helperText={errors?.contactNumber ? errors.contactNumber.message: null}
                        />
                        </Box>
                          <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">Department</InputLabel>
                              <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                defaultValue=""
                                label="Department"
                                required
                                {...register('department')}
                              >
                                <MenuItem value="CAHS">College of Allied Health and Sciences</MenuItem>
                                <MenuItem value="CASE">College of Arts, Sciences and Education </MenuItem>
                                <MenuItem value="CBMA">College of Business Management and Accountancy</MenuItem>
                                <MenuItem value="CEIS">College of Engineering and Information Sciences</MenuItem>
                                <MenuItem value="CHTM">College of Hospitality and Tourism Management </MenuItem>
                                <MenuItem value="CMT">College of Medical Technology</MenuItem>
                                <MenuItem value="SLCN">St. Lukes College of Nursing</MenuItem>
                              </Select>
                          </FormControl>
                         
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
                          <TextField   
                            variant="outlined"
                            name="password1"
                            label="Confirm Password"
                            required 
                            fullWidth 
                            type="password"
                            autoComplete='password'
                            autoFocus
                            {...register('password1', {
                              required: "Required",
                              validate: (value) => {
                                return value === watch('password') || 'Password does not match'
                              }
                            })}                   
                            error={!!errors?.password1}
                            helperText={errors?.password1 ? errors.password1.message: null}
                          />
                        <Button fullWidth type="submit" variant="contained">Register</Button>

                      </form>

                      <Box mt={5} sx={{width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                        <Typography variant="body2">Not a user yet?</Typography>
                            <Link to="/login">
                                <Button  variant="text">Login Here</Button>
                            </Link>
                      </Box>
              </Box>
            </Box>
        </Container>
    </Box>
  )
}

export default Register