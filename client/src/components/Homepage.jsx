import { Typography } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'
import Header from '../assets/product.png'
import banner from '../assets/banner.jpg'
import { publicRequest } from '../publicRequest'
import { useEffect } from 'react'
import { useState } from 'react'


const Homepage = () => {


  return (
    <Box sx={{width:'100%', height: {xs:'0', md: '600px'}, marginTop: {xs: '0px', md: '30px'}, display: 'flex'}}>
      <Box component="img" src={banner} sx={{width: {xs: '100%', md: '100%'}, height: {xs: '100%', md: '100%'},objectFit: {xs: 'contain', md: 'cover'}, filter: 'brigtness(50%)'}} />
    </Box>
  )
}

export default Homepage