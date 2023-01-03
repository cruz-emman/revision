import { Box, Card, CardActionArea, CardContent, CardMedia, Container, Grid, Tooltip, Typography } from '@mui/material'
import {itemTables} from '../dataTables'
import BeatLoader from "react-spinners/BeatLoader";

import React from 'react'

import { Link } from 'react-router-dom'
import { publicRequest } from '../publicRequest'
import { useState } from 'react'
import { useEffect } from 'react'
import { useTheme } from '@mui/material/styles';

import  CEIS from '../assets/logos/CEIS.png'
import  CAHS from '../assets/logos/CAHS.jpg'
import  CASE from '../assets/logos/CASE.jpg'
import  CBMA from '../assets/logos/CBMA.jpg'
import  CHTM from '../assets/logos/CHTM.jpg'
import  SLCN from '../assets/logos/SLCN.png'
import  CMT from '../assets/logos/CMT.jpg'

const Category = () => {
  const theme = useTheme();

  const [topDepartment,setTopDepartment] = useState()
  const [topDepartmentImage,setTopDepartmentImage] = useState()

  const [topProductCategory,setTopProductCategory] = useState()
  const [topProductCategoryImage,setTopProductCategoryImage] = useState()

  

  const [loading,setLoading] = useState(true)


  useEffect(() =>{
    const getTotalDepartments = async () =>{
      try {
        const res = await publicRequest.get(`/order/`)
        res.data.map((list) => {          
          list.products.map((product) =>{
            setTopProductCategoryImage(product.productId.img)
          })
        })


        setLoading(false)
      } catch (error) {
        
      }
    }
    getTotalDepartments()
},[setTopDepartment,setTopDepartmentImage, setTopProductCategory, setTopProductCategoryImage])


  useEffect(() =>{
   
    const getTopDepartment = async () =>{ 
      try {
        const res = await publicRequest.get(`/order/departments`)
        const topDept = res.data[0]?.category
        setTopDepartment(topDept)

            if(topDept === "CEIS"){
              setTopDepartmentImage(CEIS)
            }
            else if(topDept === "CASE"){
              setTopDepartmentImage(CASE)
            }
            else if(topDept === "CBMA"){
              setTopDepartmentImage(CBMA)
            }
            else if(topDept === "CHTM"){
              setTopDepartmentImage(CHTM)
            }
            else if(topDept === "CMT"){
              setTopDepartmentImage(CMT)
            }
            else if(topDept === "SLCN"){
              setTopDepartmentImage(SLCN)
            }
            else if(topDept === "CAHS"){
              setTopDepartmentImage(CAHS)
            }
        setLoading(false)
      } catch (error) {
        
      }
    }
    getTopDepartment()

  },[setTopDepartment,setTopDepartmentImage, setTopProductCategory, setTopProductCategoryImage])


  useEffect(() =>{

    const getTopProductCategory = async ()  => {
      const res = await publicRequest.get(`/order/categories`)
      const topCategory = res.data[0]?.category
      setTopProductCategory(topCategory)


      
      setLoading(false)
    } 
    getTopProductCategory()

  },[setTopDepartment,setTopDepartmentImage, setTopProductCategory, setTopProductCategoryImage])


  return (
    <>
     {loading ? (
                    <BeatLoader 
                    color="#36d7b7" 
                    loading={loading}
                    size={50}
                    aria-label="Loading Spinner"
                    data-testid="loader"
                  />
          ):
  (
    <Box>
      <Box sx={{display: 'flex', alignItems:'center', justifyContent:'center', marginTop: 4, gap: 5, height: '100%', flexDirection: {xs: 'column', md: 'row'}}}>
          <Card sx={{ display: 'flex', padding: 8, boxShadow: 3,justifyContent: 'center', textAlign:'center', alignItems:'center', height: {xs: 100, md: 300}}}>
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <CardContent sx={{ flex: '1 0 auto' }}>
                <Typography component="div" sx={{typography: {xs: 'h5', md: 'h3'}}}>
                  {topDepartment}
                </Typography>
                <Typography sx={{typography: {xs: 'caption', md: 'subtitle1'}}} color="text.secondary" component="div">
                  Most Active Department
                </Typography>
              </CardContent>
            </Box>
            <CardMedia
              component="img"
              sx={{ width: {xs: 80, md: 151}, borderRadius: '50%' }}
              image={topDepartmentImage}
            />          
          </Card>

          <Card sx={{ display: 'flex', padding: 8, boxShadow: 3,justifyContent: 'center', textAlign:'center', alignItems:'center', height: {xs: 100, md: 300} }}>
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <CardContent sx={{ flex: '1 0 auto' }}>
              <Typography component="div" sx={{typography: {xs: 'h5', md: 'h3'}}}>
                {topProductCategory}
                </Typography>
                <Typography sx={{typography: {xs: 'caption', md: 'subtitle1'}}} color="text.secondary" component="div">
                  Trend products by category
                </Typography>
              </CardContent>
            </Box>
            <CardMedia
              component="img"
              sx={{ width: {xs: 80, md: 151} }}
              image={topProductCategoryImage}
            />          
          </Card>
        </Box>

      <Container maxWidth="xl">
        <Typography variant="h4" sx={{textAlign:'center', paddingY: '40px', textTransform: 'uppercase', fontWeight: 600, color: '#757575'}}>Courses</Typography>

        <Box sx={{display: 'flex', justifyContent: 'space-evenly', alingItems:'center', flexWrap: 'wrap', marginX: {xs: '20px', md: '0px'}, gap: 2, padding: {xs: 2, md: 4},  boxShadow: 2, marginY: 2 }}>
          {itemTables.map((data) => (
            <Link to={data.to} key={data.id}>
                      <Card sx={{height: {xs: 100, md: 150}, width: {xs: 100, md: 150}, borderRadius: '50%', boxShadow: 3}}>
                        <CardActionArea>
                          <Tooltip title={data.name}>
                            <CardMedia component='img'  
                                  image={data.img}
                              />
                          </Tooltip>
                        </CardActionArea>
                      </Card>
                  </Link>
            ))}
        </Box>

      </Container>
    </Box>
     )}
    </>
  )
}

export default Category