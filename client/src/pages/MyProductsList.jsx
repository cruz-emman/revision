import { Box, Button, Container, Modal, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from '@mui/material'
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate, useParams } from 'react-router-dom'
import Navbar from '../components/Navbar'
import { userRequest } from '../publicRequest'
import { deleteProduct } from '../redux/apiCalls'
import { toast } from 'react-toastify'
import BeatLoader from "react-spinners/BeatLoader";



const MyProductsList = () => {
    const currentUser = useSelector((state) => state.auth.currentUser)
    const {isSuccess,isFetching} = useSelector((state) => state.product)
    const [filteredProducts, setFilteredProducts]  = useState([])

    const [loading ,setLoading] = useState(true)
    const dispatch = useDispatch()
    const {id} = useParams()
    const navigate = useNavigate()
    const handleClick=() =>{
        navigate(`/addproduct`)
    }
  
    useEffect(() =>{
      try {
        const getCustomerProduct = async () =>{
            const res = await userRequest.get(`/products/customerproduct/${id}`)
            console.log(res.data)
            let getFiltered = res.data.filter((item) => (
                item.quantity !== 0 || item.isDeleted === true
              ))
              setFilteredProducts(getFiltered)
            setLoading(false)
        }
        getCustomerProduct()
      } catch (error) {
        console.log({error: error.message})
      }
    },[id])

    const handleDelete = (id) =>{
        deleteProduct(id, dispatch)

        navigate(0);
        toast.success("Product Deleted")
    }

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
          ) : (
              <Box p={4} sx={{display: 'flex', flexDirection:'column'}}>
              <Box sx={{display:'flex', alignItem:"center", justifyContent: 'space-between', width: '100%', paddingY: 2}}>
                  <Typography variant="h6" sx={{fontWeight: 700}}>My Products</Typography>
                  <Button variant="outlined" onClick={handleClick} color="success">Add New Product</Button>
              </Box>
              <Box>
                  <TableContainer component={Paper}>
                      <Table>
                       <TableHead>
                           <TableRow bgcolor="skyblue">
                              <TableCell align='center'>Product</TableCell>
                              <TableCell align='center'>Image</TableCell>
                              <TableCell align='center'>QTY</TableCell>
                              <TableCell align='center'>Price</TableCell>
                              <TableCell align='center'>Action</TableCell>
                          </TableRow>
                          </TableHead>

                          {!filteredProducts ? (
                              <Typography>No items yet...</Typography>
                          ) : (
                              <TableBody>
                              {filteredProducts.map((product) => (
                                  <TableRow key={product._id}>
                                  <TableCell align='center'>{product.title}</TableCell>
                                  <TableCell align='center'>
                                  <Box component="img" sx={{width: '80px', height: '80px', borderRadius: '10px', objectFit: 'contain'}} src={product.img}/>
                                  </TableCell>
                                  <TableCell align='center'> {product.quantity}</TableCell>
                                  <TableCell align='center'>₱ {product.price}</TableCell>
                                  <TableCell align='center'>
                                              <Box sx={{display: 'flex', alignItems:'center', justifyContent: 'center', gap: "10px"}}>                                                                   
                                                  <Link style={{textDecoration: 'none'}}  to={`/editproduct/${product._id}`}>
                                                          <Button variant="contained">Edit</Button>
                                                  </Link>
                                                          <Button 
                                                          onClick={() => handleDelete(product._id)} 
                                                              color="error" variant="contained">Delete
                                                          </Button>
                                              </Box>
                                  </TableCell>
                              </TableRow>
                              ))}
                      </TableBody>
                          )}
                      </Table>
                  </TableContainer>
              </Box>
          </Box>
          )}
        </Container>
    </Box>
  )
}

export default MyProductsList