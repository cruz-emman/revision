import { Box } from '@mui/material'
import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import Navbar from '../components/Navbar'
import ProductList from '../components/ProductList'
import { publicRequest } from '../publicRequest'
import BeatLoader from "react-spinners/BeatLoader";


const CategoryPage = () => {
  const location = useLocation()
  const [products, setProducts] = useState([])
  const category = location.pathname.split('/')[2]
  const [loading, setLoading] = useState(true)

  useEffect(()=>{
      const getProductsCategory = async () =>{
        let res = await publicRequest.get(category ? `/products?category=${category}`: '/products/' )
        if(res.data.length === 0) {
          res = await publicRequest.get('/products/');
       }
        setProducts(res.data)
        setLoading(false)
      }
      getProductsCategory()
  },[setProducts,category])

  
  return (
    <Box>
      <Navbar />
      {loading ?
          <BeatLoader 
              color="#36d7b7" 
              loading={loading}
              size={50}
              aria-label="Loading Spinner"
              data-testid="loader"
            />
        :
        <>
        <ProductList products={products} category={category} />
        </>
      }
    </Box>
  )
}

export default CategoryPage