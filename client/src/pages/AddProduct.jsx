import { Box, Button, Container, FormControl, Grid, InputLabel, MenuItem, Select, Stack, TextField, Typography } from '@mui/material'
import React, {useEffect, useState} from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import app from '../firebase'
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from 'firebase/storage'
import {itemTables} from '../dataTables'
import { addProduct } from '../redux/apiCalls'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import BeatLoader from "react-spinners/BeatLoader";
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import {storage} from '../firebase'

import {resetStateProduct} from '../redux/productSlice'


const AddProduct = () => {

  const currentUser = useSelector((state) => state.auth.currentUser)
  const {isMessage,isError, isSuccess} = useSelector((state) => state.product)
  const [loading,setLoading] = useState(false)
  const location = useLocation()
  const id = location.pathname.split('/')[2]
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [itemName, setItemName] = useState({
    seller_id: currentUser._id,
    title: '',
    description: '',
    category: '',
    productCategory: '',
    price: '',
    quantity: ''
  })


  const CAHScategory = [
    'CAHS Merchandise',
    'CAHS Related Softwares',
    'Clinical Equipments',
    'Others',
  ]
  const CASEcategory = [
    'CASE Merchandise',
    'CASE Related Softwares',
    'Laboratory Equipments',
    'Others',
  ]

  const CBMAcategory = [
    'CBMA Merchandise',
    'CBMA Related Softwares',
    'Business and Accountancy Equipments',
    'Others',
  ]

  const CEIScategory = [
    'CEIS Merchandise',
    'CEIS Related Softwares',
    'IT Tools/Equipment',
    'Others',
  ]

  const CHTMcategory =[
    'CHTM Merchandise',
    'CHTM Related Softwares',
    'Hospitality and Tourism Equipments',
    'Others',
  ]

  const CMTcategory = [
    'CMT Merchandise',
    'CMT Related Softwares',
    'Medical Technology Equipments',
    'Others',
  ]
  
  const SLCNcategory = [
    'SLCN Merchandise',
    'SLCN Related Softwares',
    'Nursing Equipments',
    'Others',
  ]

   let Itemtype = null
   if(itemName.category === 'CAHS'){
    Itemtype = CAHScategory
   }
   else if(itemName.category === 'CASE'){
    Itemtype = CASEcategory
   }
   else if(itemName.category === 'CBMA'){
    Itemtype = CBMAcategory
   }
   else if(itemName.category === 'CMT'){
    Itemtype = CMTcategory
   }
   else if(itemName.category === 'CEIS'){
    Itemtype = CEIScategory
   }
   else if(itemName.category === 'CHTM'){
    Itemtype = CHTMcategory
   }
   else if(itemName.category === 'SLCN'){
    Itemtype = SLCNcategory
   }
  
   
useEffect(() =>{
  if(isError){
    toast.error(isMessage)
  }
  dispatch(resetStateProduct())

},[dispatch, isError])

useEffect(() =>{
  if(isSuccess){
    toast.success(isMessage)  
    navigate('/')
  }
},[dispatch, isSuccess])

  const handleClick = async (e) =>{

    e.preventDefault()
    addProduct(itemName, dispatch)

  }

  const [imgUrl, setImgUrl] = useState(null);
  const [progresspercent, setProgresspercent] = useState(0);


    const handleSubmit = (e) => {
    e.preventDefault()
    const file = e.target[0]?.files[0]
    if (!file) return;
    const storageRef = ref(storage, `files/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on("state_changed",
      (snapshot) => {
        const progress =
          Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
        setProgresspercent(progress);
      },
      (error) => {
        alert(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setItemName({...itemName, img: downloadURL})
          setImgUrl(downloadURL)
        });
      }
    );
  }


  return (
    <Box>
        <Navbar />
        {loading ? (
           <BeatLoader 
           color="#36d7b7" 
           loading={loading}
           size={50}
           aria-label="Loading Spinner"
           data-testid="loader"
         />
        ): (
          <Container maxWidth="xl" >
          <Box p={4} sx={{display:'flex'}}>
              <Grid container spacing={2}>
                  <Grid item xs={12} md={6}>
                  <Typography variant="body2">Marketplace</Typography>
            <Typography variant="h6" fontWeight={700}>Item For Sale</Typography>
                  <Stack
                direction="column"
                justifyContent="flex-start"
                alignItems="flex-start"
                spacing={2}
                py={2}
            >
                <TextField variant="outlined" required label="Title"
                  onChange={(e) => setItemName({...itemName, title: e.target.value })}
                  fullWidth name="title" 
                    />
                <TextField variant="outlined" required label="Price" type="number" 
                      onChange={(e) => setItemName({...itemName, price: e.target.value })}
                      fullWidth name="price" />
                <TextField variant="outlined" label="Quantity" 
                    onChange={(e) => setItemName({...itemName, quantity: e.target.value > 20 ? e.target.value = 20 : e.target.value})} 
                    fullWidth name="quantity"
                    type="number"
                    placeholder='Maximum limit of 20'  
                    required
                    pattern="^-?[0-9]\d*\.?\d*$"
                    />
                <FormControl fullWidth>  
                  <InputLabel id="demo-simple-select-label">Department</InputLabel>
                <Select
                  fullWidth
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  name="categories"
                  defaultValue=""
                  required

                  label="categories"
                  onChange={(e) => setItemName({...itemName, category: e.target.value})}
                  
                >
                    {itemTables.map((item) =>(
                      <MenuItem key={item.id} value={item.cat}>
                          {item.name}
                      </MenuItem>              
                  ))}
                    
                </Select>
                </FormControl>
                <FormControl fullWidth>  
                  <InputLabel id="demo-simple-select-label">Product Category</InputLabel>
                <Select
                  fullWidth
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  name="productCategory"
                  required

                  defaultValue=""
                  label="productCategory"
                  onChange={(e) => setItemName({...itemName, productCategory: e.target.value})}
                  
                >         
                   {Itemtype ? (
                    Itemtype.map((el) => <MenuItem value={el} key={el}>{el}</MenuItem>)
                   ): null}
                </Select>
                </FormControl>
                <TextField variant="outlined" label="Description" 
                    onChange={(e) => setItemName({...itemName, description: e.target.value})} 
                    fullWidth name="description" rows={4} multiline
                    required

                    />


          <div className="App">
                <form onSubmit={handleSubmit} className='form'>
                  <input type='file' multiple />
                  <Button variant='contained' endIcon={<PhotoCamera />}  size="small" type='submit'>Upload</Button>
                </form>
                {
                  !imgUrl &&
                  <div className='outerbar'>
                    <div className='innerbar' style={{ width: `${progresspercent}%` }}>{progresspercent}%</div>
                  </div>
                }
            
              </div>
            </Stack>
                  </Grid>
                  <Grid item xs={12} md={6}>
                      <Box  
                        sx=
                          {{display: 'flex', flexDirection: 'column', justifyContent:'center', paddingX: 5,
                          width: '100%', height: '700px', border: 1, borderColor: 'grey.500', borderRadius: '10px', boxShadow: 2, 
                          }}>
                      
                            <Typography variant="h5" sx={{fontWeight: 'bold'}}>
                              Preview
                            </Typography>
                            <Box sx={{display:'flex', width: '100%', justifyContent: 'space-between', flexDirection: {xs: 'column', md: 'row'}}}>
                              <Box sx={{width: {xs: 150, md: "50%"} }}>
                                  {imgUrl  && 
                                   <Box component="img" src={imgUrl} sx={{height:'100%', width: '100%', objectFit: 'contain',borderRadius: '16px'}}   />
                                  }
                    
                              </Box>
                              <Box sx={{display: 'flex', flexDirection: 'column', height: '100%', gap: '20px'}}>
                                <TextField 
                                    id="outlined-multiline-static"
                                    label="Title"
                                    multiline
                                    variant="outlined"
                                    value={itemName.title || "Title"}
                                    InputProps={{
                                      readOnly: true,
                                    }}
                                  />
                                <TextField 
                                    id="outlined-multiline-static"
                                    label="Price"
                                    multiline
                                    variant="outlined"
                                    value = {`₱ ${itemName.price}` ||  "₱ 500"}
                                    InputProps={{
                                      readOnly: true,
                                    }}
                                  />
                                <TextField 
                                    id="outlined-multiline-static"
                                    label="Category"
                                    multiline
                                    variant="outlined"
                                    value = { itemName.category || ""}
                                    InputProps={{
                                      readOnly: true,
                                    }}
                                  />
                                <TextField 
                                    id="outlined-multiline-static"
                                    label="Product Category"
                                    multiline
                                    variant="outlined"
                                    value = { itemName.productCategory || ""}
                                    InputProps={{
                                      readOnly: true,
                                    }}
                                  />
                                <TextField 
                                    id="outlined-multiline-static"
                                    label="Quantity"
                                    multiline
                                    type="number"
                                    variant="outlined"
                                    value = { itemName.quantity || ""}
                                    InputProps={{
                                      readOnly: true,
                                    }}
                                  />
                                  <TextField 
                                    id="outlined-multiline-static"
                                    multiline
                                    label="Description"
                                    rows={6}
                                    variant="outlined"
                                    value = {itemName.description || ""}
                                    InputProps={{
                                      readOnly: true,
                                    }}
                                  />
                                  <Box mt={5}>
                                    <Button onClick={handleClick} variant="contained" type="submit"  sx={{alignSelf: 'center'}}>
                                      Sell Product
                                    </Button>
                                  </Box>
                              </Box>
                        </Box>     
                      </Box>
                  </Grid>
              </Grid>
                  
          </Box>
      </Container>
        )}
    </Box>
  )
}

export default AddProduct