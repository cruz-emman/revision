import React from 'react'
import { Box } from '@mui/material';
import Navbar from '../components/Navbar';
import Homepage from '../components/Homepage';
import Category from '../components/Category';
import ProductList from '../components/ProductList';
import { useEffect, useState, CSSProperties} from 'react';
import { publicRequest } from '../publicRequest';
import BeatLoader from "react-spinners/BeatLoader";



const Home = () => {
  const [products,setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  
  useEffect(() =>{
      const getProducts = async () =>{
        try {
          const res = await publicRequest.get('/products')
          setProducts(res.data)
          setLoading(false)
        } catch (error) {
          console.log({error: error.message})
        }
      }
      getProducts()
  },[products])
  
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
          <Homepage />
          <Category />
          <ProductList products={products} />  
        </>
        
        } 

    </Box>
  )
}

export default Home