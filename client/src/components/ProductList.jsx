import { Box, Container, ListItem, Typography, Pagination } from '@mui/material'
import React, { useState, useEffect } from 'react'
import ProductItem from './ProductItem'
import BeatLoader from "react-spinners/BeatLoader";
import { useSelector } from 'react-redux';

const ProductList = ({products, category,singleProduct}) => {
  const auth = useSelector((state) => state.auth?.currentUser?._id) 
  const [filteredProducts, setFilteredProducts]  = useState([])
  const firstIndex = 0
  const [pageSize, setPageSize] = useState(10)
  const [page, setPage] = useState(1)
  const [data,setData] = useState(filteredProducts.slice(firstIndex, pageSize))

  const [loading, setLoading] = useState(true)

  useEffect(() =>{
    
    const isAvailable = products.filter((product) => product.quantity !== 0 & product.quantity !== null)
    let data = isAvailable.filter((item) =>{
      return (item?.seller_id?._id !== auth )       
    })
    setFilteredProducts(data)
    setLoading(false)
  },[pageSize,setFilteredProducts,category,setPageSize,setPage,singleProduct])




  useEffect(() =>{
    setData(filteredProducts.slice(0, pageSize))
  }, [filteredProducts, pageSize,singleProduct]);


  const handleChange = async (event, value) => {
    try {
      await setPage(value);
      setData(filteredProducts.slice(firstIndex + pageSize * (value - 1), pageSize * value));
      setLoading(false)

    } catch (error) {
      
    }
  };


  return (
    <>
    {loading ?
      <BeatLoader 
      color="#36d7b7" 
      loading={loading}
      size={50}
      aria-label="Loading Spinner"
      data-testid="loader"
      />
      :
      (
        <Box sx={{backgroundColor: '#f5f5f5', display:'flex', marginTop:2}}>
      <Container maxWidth="xl">
        <Typography sx={{textAlign: 'center', paddingY: '20px', fontWeight: 700, color: '#212121', typography: {xs: "h6", md: "h4"}}}>Products</Typography>
          <Box sx={{display: 'flex', alignItems:'center',justifyContent: 'space-evenly', flexWrap: 'wrap', gap: '10px'}}>
            {data.map((product) => (
              <ProductItem  key={product._id} product={product} />
              ))}
          </Box>
          <Pagination 
            sx={{display: 'flex', alignItems:'center',justifyContent:'center',margin: 4}}
            size="large"
            count={Math.ceil(filteredProducts.length/pageSize)}
            page={page}
            onChange={handleChange}
          />
      </Container>
    </Box>
    )
  }
  </>
  )
}

export default ProductList