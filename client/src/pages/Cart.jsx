import { Box, Button, Checkbox, Container, Grid, IconButton, Modal, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from '@mui/material'
import BorderColorIcon from '@mui/icons-material/BorderColor';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import dayjs from 'dayjs';
import React, { useRef } from 'react'
import Navbar from '../components/Navbar'
import { useDispatch, useSelector } from 'react-redux'
import DeleteIcon from '@mui/icons-material/Delete';
import {deleteProduct, resetStateCart} from '../redux/cartSlice' 
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { publicRequest, userRequest } from '../publicRequest'
import { toast } from 'react-toastify'
import BeatLoader from "react-spinners/BeatLoader";
import emailjs from '@emailjs/browser';
import axios from 'axios'


import { useEffect } from 'react'
import { current } from '@reduxjs/toolkit';
const Cart = () => {
    
    const currentUser = useSelector((state) => state.auth.currentUser)
    const cart = useSelector((state) => state.cart)
    const [getCart, setGetCart] = useState([])
    const [getProductId, setGetProductId] = useState("")
    const [productQuantity, setProductQuantity] = useState(0)
    const [loading, setLoading] = useState(true)
    const soldItem = cart?.products[0]?.quantity
    const [getUserEmail, setUserEmail] = useState()

    const form = useRef();


    // console.log(cart.products[0]._id)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleClick =(id,price) =>{
        dispatch(deleteProduct({id,quantity: cart.quantity, price: price}))
    } 



    useEffect(() => {

            const getIdofProduct = async () => {
                try {
                    setGetProductId(cart.products[0]?._id)      
                    const res = await userRequest.get(`/products/find/${cart.products[0]?._id}`)
                    setProductQuantity(res.data.quantity)
                    setUserEmail(currentUser.email)
                    setLoading(false)
                } catch (error) {
                    console.log({error: error.messsage})
                }
                
            }
            getIdofProduct()

   
    },[dispatch, cart, currentUser,setProductQuantity, soldItem])


    const [orderSummary, setOrderSummary] = useState({
        location: '',
    })


  
    const [value, setValue] = React.useState(dayjs());

    const handleChange = (newValue) => {
      setValue(newValue);
    };


    


    const confirmProduct = async (id, title,amount,qty) =>{
                
                try {
                    
                let res = await publicRequest.get(`/products/find/${id}`)
                await publicRequest.post(`/cart`,{
                    userId: currentUser._id,
                    sellerId: res.data.seller_id._id,
                    productId: id,
                    time: value,
                    quantity: qty,
                    TotalAmount: amount,
                    location: orderSummary.location,
                    ordered: true
                })
                await userRequest.put(`/products/${getProductId}`, {
                    quantity: (productQuantity - soldItem)
                    
                })
                
                

                toast.success("Order was successfully")
                dispatch(deleteProduct({id,quantity: cart.quantity}))
                setOpen(false)
            } catch (error) {
                
            }

    }

    const sendEmail  = (e) =>{
        e.preventDefault()
        console.log("Submit")
        emailjs.sendForm('gmail','template_v9cfyxa', form.current,'Qzg9HMQGgYrGO_WPM')
        .then((result) =>{
          console.log("Success", result.status, result.text)
        },(error) =>{
          console.log("Failed", error)
        })
    }

    


    

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 600,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
      };

      const [open, setOpen] = React.useState(false);
      const handleOpen = () => setOpen(true);
      const handleClose = () => setOpen(false);
    

  return (
    <Box>
        <Navbar />
        {cart.quantity === 0 ? (
             <Container maxWidth="xl">
                <Box mt={7}>
                <Typography fontWeight={600} color="text.secondary" variant="h3">Shopping Cart</Typography>
                <Typography variant="h6">cart is empty</Typography>
                </Box>
             </Container>
        ) : (

        <Container maxWidth="xl">
          {loading  ? (
          <BeatLoader 
          color="#36d7b7" 
          loading={loading}
          size={50}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
          ):(
            <Box mt={7}>
            <Typography fontWeight={600} color="text.secondary" variant="h3">Shopping Cart</Typography>

                    <TableContainer>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Product</TableCell>
                                    <TableCell>Price</TableCell>
                                    <TableCell>Qty</TableCell>
                                    <TableCell>Total</TableCell>
                                    <TableCell>Location</TableCell>
                                    <TableCell>Date</TableCell>
                                    <TableCell>Action</TableCell>
                                </TableRow>
                            </TableHead>
                      

                    <TableBody>
                    
                    {cart.products.map((product, i) =>(
                       // <form ref={form} onSubmit={onSubmit}>

                        <TableRow key={i}>
                            <TableCell>
                                <Box sx={{display: 'flex', alignItems:'center', gap: 2}}>
                                    <Box component="img" sx={{height: '60px', width: '60px'}} src={product.img} />{product.title}
                                </Box>

                            </TableCell>
                            <TableCell> ₱ {product.price}</TableCell>
                            <TableCell>{product.quantity}</TableCell>
                            <TableCell> ₱ {Number(product.quantity * product.price)}</TableCell>
                            <TableCell>
                                <TextField 
                                    required     
                                    variant="outlined"
                                    value={orderSummary.location || ""}
                                    placeholder='Click Order'
                                    disabled />
                            </TableCell>
                            <TableCell>
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DateTimePicker
                                        label="Click Order to change date"
                                        value={value || ""}
                                        onChange={handleChange}   
                                        disabled
                                        renderInput={(params) => <TextField {...params} />}
                                    />
                                </LocalizationProvider>
                                <Modal
                                    open={open}
                                    onClose={handleClose}
                                    aria-labelledby="modal-modal-title"
                                    aria-describedby="modal-modal-description"
                                    >
                                    <Box sx={style}>
                                    <Typography id="modal-modal-title" variant="h6" component="h2">
                                    Confirm Location & Time (For Security Purposes)
                                    </Typography>
                                    <Box sx={{display: 'flex', flexDirection:'column',marginTop: 5, gap: 5, justifyContent: 
                                     'start'}}>
                                        <Box sx={{display: 'flex', alignItems:'center',gap: 5}}>
                                            <Typography variant="h6" color="text.secondary">
                                                Location:  
                                            </Typography>
                                            <TextField 
                                                onChange={(e) => setOrderSummary({location: e.target.value})}   
                                                required         
                                                name="location"   

                                                variant="standard"
                                                placeholder='e.g gym, guardhouse, canteen' />
                                        </Box>
                                        <Box sx={{display: 'flex', alignItems:'center',gap: 5}}>
                                            <Typography variant="h6" color="text.secondary">
                                                Time:  
                                            </Typography>
                                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DateTimePicker
                                        label="Date&Time picker"
                                        value={value || ""}
                                        name="date"
                                        onChange={handleChange}   
                                        renderInput={(params) => <TextField {...params} />}
                                    />
                                </LocalizationProvider>
                                
                                        </Box>
                                        <hr/>

                                        <Box sx={{display: 'flex', alignItems:'center' ,gap: 1}}>
                                            
                                            <Typography variant="subtitle1" fontWeight={700} color="text.secondary">amount to Pay: </Typography>
                                            <Typography variant="h6">₱ {Number(product.quantity * product.price)}</Typography>
                                        </Box>
                                        <form ref={form} onSubmit={sendEmail}>
                                        <input hidden name="title" defaultValue={product.title}  />
                                                <Button variant="contained" type="submit" onClick={(e) =>confirmProduct(product._id, product.title, Number(product.quantity * product.price ),
                                                product.quantity, product.price)}>
                                                Confirm Order
                                            </Button>
                                        </form>
           
                                    </Box>
                                    </Box>
                                    </Modal>
                            </TableCell>

                            <TableCell>
                                <Box sx={{display: 'flex', alignItems:'center', gap: 1}}>
                                    <Button color="success" type="submit" variant="contained" onClick={handleOpen}
                                    startIcon={<BorderColorIcon />}
                                    >
                                        Order
                                    </Button>
                                    <Button color="error" onClick={(e) => handleClick(product._id, product.price)} startIcon= 
                                     {<DeleteIcon />} 
                                     variant="contained">
                                        Remove
                                    </Button>
                                </Box>
                                
                            </TableCell>
                            
                        </TableRow>

                    ))}
                    </TableBody>
                    </Table>
                    </TableContainer>

                   
                
                    
                
                
        </Box>
          )}
        </Container>
         )}

    </Box>
  )
}

export default Cart