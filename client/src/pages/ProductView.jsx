import { Box } from '@mui/material'
import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import Navbar from '../components/Navbar'
import ProductList from '../components/ProductList'
import SingleProduct from '../components/SingleProduct'
import { publicRequest } from '../publicRequest'
import BeatLoader from "react-spinners/BeatLoader";

const ProductView = () => {
  const location = useLocation();
  const id = location.pathname.split('/')[2]
  const [singleProduct,setSingleProduct] = useState()
  const [products,setProducts] = useState('')
  const [loading,setLoading] = useState(true)
  const [quantity, setQuantity] = useState(0)
  

  useEffect(() =>{
      const getGetProducts = async () =>{
        const res = await publicRequest.get(`/products/find/${id}`)
        const related = await publicRequest.get(`/products?category=${res.data?.category}`)
        const recommendedPost = related.data.filter((item) => item._id  !== id )
        setProducts(recommendedPost)
        setSingleProduct(res.data)
        setLoading(false)
      }
      getGetProducts()
  },[id])


  return (
    <Box>
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
          <Navbar />
            <SingleProduct quantity={quantity} setQuantity={setQuantity} singleProduct={singleProduct} />
            <ProductList id={id} products={products} singleProduct={singleProduct} />
        </>
        }

    </Box>
  )
}

export default ProductView