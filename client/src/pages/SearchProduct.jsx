import { Box } from '@mui/material'
import React, { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import ProductList from '../components/ProductList'
import { publicRequest } from '../publicRequest'
import BeatLoader from "react-spinners/BeatLoader";
import { useSelector } from 'react-redux'

const SearchProduct = () => {
  const auth = useSelector((state) => state.auth?.currentUser?._id) 
  const location = useLocation()
  const navigate = useNavigate()
  const [products, setProducts] = useState([])
  const search = location.pathname.split('/')[2]
  const [loading, setLoading] = useState(true)

  useEffect(()=>{
      const getProductsCategory = async () =>{
       try {
         let res = await publicRequest.get(search ? `/products/search?searchQuery=${search}` : '/products/')
         let filterProduct = res.data.filter((item) => item?.seller_id !== auth)
         console.log(filterProduct)
        if(res.data.length === 0) {
          res = await publicRequest.get('/products/');
       }
        setProducts(res.data)
        setLoading(false)
       } catch (error) {
        
       }
      }
      getProductsCategory()

  },[search,setProducts,location, setLoading])

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
        <ProductList products={products} />
        </>
      }
    </Box>
  )
}

export default SearchProduct