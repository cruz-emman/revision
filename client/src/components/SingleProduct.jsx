import { Box, Button, Container, Grid, IconButton, TextField, Typography } from '@mui/material'
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import React, {useState} from 'react'
import item from '../assets/item.png'
import BeatLoader from "react-spinners/BeatLoader";
import { addProduct } from '../redux/cartSlice';
import { useDispatch, useSelector } from 'react-redux';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

const SingleProduct = ({singleProduct, quantity, setQuantity}) => {
    const cart = useSelector((state) => state.cart.products)
    



    const dispatch = useDispatch()
    const handleClick = () =>{
        if(quantity !== 0){
            dispatch(addProduct({...singleProduct, quantity }) )
            console.log("Added")

        }else if (quantity === 0){
            toast.error("Please add")
        }
    }

    const handleQuantity = (type) => {
        if (type === "dec") {
          quantity > 0 && setQuantity(quantity - 1);
        } else if(type ==="inc") {
          quantity < singleProduct.quantity && setQuantity(quantity + 1);
        }
      };

  return (
    <Box sx={{ height: '100%', width: '100%', marginTop: {xs: 2, md: 10}}}>
        <Container maxWidth="lg">
        <Grid container spacing={2}>
            <Grid item xs={12} md={4}>
                <Box sx={{height: {xs: 150, md: 300}, width: '300px', border:{xs: 0, md: 1}, padding: {xs: 0, md: 4}, borderRadius: '10px', display: {xs: 'flex'}}}>
                    <Box component="img" sx={{height: '100%', width: '100%', objectFit: 'contain'}} src={singleProduct.img}/>
                </Box>
            </Grid>

            <Grid container item xs={12} md={8}>
               <Box sx={{display:'flex', flexDirection: 'column', margin:'auto'}}>
                <Typography sx={{fontWeight: 'bold', textTransform: 'uppercase', fontSize: {xs: "20px", md: '30px'}}}> {singleProduct.title}</Typography>  
                <Box sx={{height: '40px', width: '100%', paddingY:  {xs: '0px', md: '20px'},paddingX: {xs: '0px', md: '20px'}, display:'flex', alignItems:'center', borderBottom: {xs: 0, md: 1}}}>
                   <Typography  sx={{color: '#00c853', fontWeight: 800, typography: {xs: 'h4', md:'h3'}}}> ₱ {singleProduct.price}.00</Typography>
                </Box>

                <Grid sx={{width: {xs: '100%', md: 500}}} container spacing={2} pt={4}>
                    <Grid item xs={4} sx={{lineHeight: 2}}>
                        <Typography variant="body1" fontWeight={600} color="#757575">Seller: </Typography>
                        <Typography variant="body1" fontWeight={600} color="#757575">StudentID: </Typography>
                        <Typography variant="body1" fontWeight={600} color="#757575">Dept: </Typography>
                        <Typography variant="body1" fontWeight={600} color="#757575">Qty: </Typography>
                        <Typography variant="body1" fontWeight={600} color="#757575">Contact No.: </Typography>
                        <Typography variant="body1" fontWeight={600} color="#757575">Desc: </Typography>
                    </Grid>
                    <Grid item xs={8} >
                        <Typography variant="body1" fontWeight={700} color="#212121">{singleProduct.seller_id?.firstname} {singleProduct.seller_id?.lastname} </Typography>
                        <Typography variant="body1" fontWeight={700} color="#212121">{singleProduct.seller_id?.studentId}</Typography>
                        <Typography variant="body1" fontWeight={700} color="#212121">{singleProduct.seller_id?.department}</Typography>
                        <Typography variant="body1" fontWeight={700} color="#212121">{(singleProduct.quantity - quantity)}</Typography>
                        <Typography variant="body1" fontWeight={700} color="#212121">{singleProduct.seller_id?.contactNumber}</Typography>

                        <Typography variant="body1" fontWeight={700} color="#212121"
                         sx={{overflowWrap: 'break-word', width: {xs: 150, md: '100%'}}}>{singleProduct.description}</Typography>
                        <Button component={Link} to={`/sellerProfile/${singleProduct.seller_id?._id}`} sx={{marginTop: 2}} variant="contained" size="small">View Seller</Button>

                        </Grid>



                </Grid>
                <Box py={4}>
                    
                  <Box sx={{display: 'flex', justifyContent: 'space-evenly'}}>
                      <Box sx={{display: 'flex', alignItems:'center', justifyContent:'center', gap: 2}} >
                            <IconButton onClick={() => handleQuantity('dec')} >
                                <RemoveCircleIcon fontSize="large"  color="error" />
                            </IconButton>
                                   <Typography variant='h6' component="div" sx={{width: 50, height: 50 , borderRadius: '50%', display: 'flex', alignItems:'center', justifyContent: 'center'}} fontWeight={400}> {quantity}</Typography>
                            <IconButton  onClick={() => handleQuantity('inc')} >
                                <AddCircleIcon fontSize="large"  color="success" />
                            </IconButton>
                        </Box>
                    <Button
                        sx={{
                            borderRadius: 10,
                            backgroundColor: "#00c853",
                            padding: "15px 25px",
                            fontSize: "18px"
                        }}
                        variant="contained"
                        onClick={handleClick}
                        >
                        BUY NOW
                    </Button>
                    </Box>
                   
                </Box>
               </Box>
            </Grid>
        </Grid>
        </Container>
    </Box>
  )
}

export default SingleProduct