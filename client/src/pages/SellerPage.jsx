import { Box, Grid, Paper, Typography } from '@mui/material';
import { Container } from '@mui/system';
import React, {useState, useEffect} from 'react'
import { useParams } from 'react-router-dom';
import BeatLoader from "react-spinners/BeatLoader";
import Navbar from '../components/Navbar';
import ProductItem from '../components/ProductItem';
import { publicRequest } from '../publicRequest';
import avatarImage from './../assets/avatar.png'

const SellerPage = () => {
  const [sellerInfo, setSellerInfo] = useState()
  const [getCustomerProducts, setCustomerProducts] = useState([])
  const [loading, setLoading] = useState(true)

  const {id} = useParams()


  useEffect(() =>{
    const getSellerInfo = async() =>{
      try {
        const res = await publicRequest.get(`/users/find/${id}`)
        setSellerInfo(res.data)
        setLoading(false)
      } catch (error) {
        
      }
    }
    getSellerInfo()
  },[id, setSellerInfo])

  useEffect(() => {
    const getProductCustomers = async () =>{
      try {
        const res = await publicRequest.get(`/products/customerproduct/${id}`)
        const filt = res.data.filter((product) => product.quantity !== 0)
        setCustomerProducts(filt)
        setLoading(false)

      } catch (error) {
        
      }
    }
    getProductCustomers()
  })

  return (
   <Box>
    <Navbar />
    <Container maxWidth="xl">
    {loading ? (
          <BeatLoader 
          color="#36d7b7" 
          loading={loading}
          size={50}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
    ): (
      <Box sx={{display: 'flex', justifyContent:'center', alignItems:'center', width: '100%', height: '100%', flexDirection: 'column',}}>
        
        <Box sx={{height: 200, width: '100%', boxShadow: 2, marginTop: 5, display: 'flex',    justifyContent:'center', alignItems:'center'}}>
            <Grid container  direction="row"
              alignItems="center"
              justifyContent="center">
            <Grid item xs={12} md={6}>
              <Box sx={{padding: 4, height: 200, width:'100%'}}>
                <Box src={sellerInfo?.img || avatarImage} sx={{display: 'flex', alignItems:'center', justifyContent: 'center',height: '100%', width: '100%', objectFit: 'contain', borderRadius: '50%'}} component="img" />
              </Box>          
            </Grid>
            <Grid item xs={12} md={6}>
              <Box sx={{dispay: 'flex'}}>
                <Typography variant="h5" sx={{fontWeight: 700}}>{sellerInfo?.firstname} {sellerInfo?.lastname}</Typography>
                <Typography variant="h6" color="text.secondary">{sellerInfo?.studentId} </Typography>
                <Typography variant="h6" color="text.secondary">{sellerInfo?.contactNumber} </Typography>
                <Typography variant="h6" color="text.secondary">{sellerInfo?.department} </Typography>
              </Box>
            </Grid>
          </Grid>
        </Box>


        <Box sx={{display: 'flex', alignItems:'center', flexDirection: 'column',marginTop: 5}}>
         <Paper sx={{padding: 4}} elevation={4}>
          <Typography variant="h3"sx={{textTransform: 'uppercase'}} color="text.secondary">{sellerInfo?.firstname}'s products</Typography>
         </Paper>

         <Box  sx={{display: 'flex', alignItems:'center',justifyContent: 'space-evenly', flexWrap: 'wrap', gap: '10px', marginTop: 2}}>
          {getCustomerProducts.map((product) => (
              <ProductItem  key={product._id} product={product} />
          ))}
         </Box>
        </Box>

      </Box>
    )
    }

    </Container>
   </Box>
  )
}

export default SellerPage