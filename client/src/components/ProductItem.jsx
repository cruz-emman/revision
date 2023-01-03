import React from 'react'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Box, CardActionArea } from '@mui/material';
import item1 from '../assets/item.png'
import { Link, useNavigate } from 'react-router-dom';
const ProductItem = ({product}) => {
  

  const navigate = useNavigate()
  const handleClick = (e) =>{
    navigate(`/view/${e}`)
  }

  return (
      <Card sx={{ width: {xs: 100, md: 250}, flexGrow: 1, boxShadow: 3 }} onClick={(e) => handleClick(product._id)}>
          <CardActionArea>
            <CardMedia
              component="img"
          
              image={product.img}
              sx={{objectFit: 'contain', padding: '10px', borderBottom: 1, height: {xs: 100, md: 200}}}
              />
              <Box pt={2} px={2}>
                  <Typography sx={{typography: {xs: "subtitle2", md: 'h6'}}} color="text.secondary">
                    {product.title}
                  </Typography>
                  <Typography gutterBottom sx={{typography: {xs: "subtitle", md: 'h5'}}} color="red" component="div">
                    ₱ {product.price}
                  </Typography>
                 <Box sx={{display:'flex', alignItems:'center', justifyContent:'space-between'}}>
                   <Typography sx={{fontSize: '12px', fontWeight:'light'}}  color="text.secondary">
                   {product.seller_id?.department || product?.category }  {product.seller_id?.studentId}
                  </Typography>
                   <Typography sx={{fontSize: '12px', fontWeight:'light'}}  color="text.secondary">
                    Quantity: {product.quantity || "0"}
                  </Typography>
                 </Box>
              </Box>
            <CardContent>
            </CardContent>
          </CardActionArea>
      </Card>
  )
}

export default ProductItem