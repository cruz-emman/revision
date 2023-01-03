import { Box, Button, Container, Divider, FormControl, Grid, InputLabel, MenuItem, Paper, Select, Stack, TextField, Typography } from '@mui/material'
import React, {useState} from 'react'
import { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Navbar from '../components/Navbar'
import {itemTables} from '../dataTables'
import { publicRequest, userRequest } from '../publicRequest'
import BeatLoader from "react-spinners/BeatLoader";
import PhotoCamera from '@mui/icons-material/PhotoCamera';

import {storage} from '../firebase'
import app from '../firebase'
import {
    getDownloadURL,
    ref,
    uploadBytesResumable,
  } from 'firebase/storage'
  import { toast } from 'react-toastify'


const EditProduct = () => {
  const navigate = useNavigate()
  const {id} = useParams()
  const [singleProduct,setSingleProduct] = useState()
  const [loading,setLoading] = useState(true)
  const [itemName, setItemName] = useState({})


  useEffect(() => {
    const getSingleProduct = async () =>{
      const res = await publicRequest.get(`/products/find/${id}`)
      setSingleProduct(res.data)
      setLoading(false)

    }
    getSingleProduct()
  },[id])



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

  const [imgUrl, setImgUrl] = useState(null);
  const [progresspercent, setProgresspercent] = useState(0);

  const handleSubmit = async (e) =>{
    e.preventDefault()
    
    try {
      await userRequest.put(`/products/${id}`, itemName)
      toast.success("Update Successfully!")
      navigate('/')
    } catch (err) {
      console.log({err:err.message})
    }
  }


  

  const handleUpload = (e) => {
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
    <>
            {loading ? (
                    <BeatLoader 
                    color="#36d7b7" 
                    loading={loading}
                    size={50}
                    aria-label="Loading Spinner"
                    data-testid="loader"
                  />
          ):
          (
           
            <Box>
              <Navbar />
              <Container maxWidth="xl">
              <Box sx={{marginTop: 4, marginX: 'auto', width: '95%', height: {xs: '100%', md: '75vh'}, boxShadow: 3, padding: 4, borderRadius: "15px", display: 'flex', flexDirection: 'column'}}>
                <Grid container>
                  <Grid item md={5} xs={12}>
                  <Typography variant="h6" sx={{fontWeight: 700, paddingY: 2, marginBottom: 5}}> Edit Products</Typography>
                    <Box sx={{display:'flex', flexDirection: 'column', gap: '10px'}}>
                    <TextField label="Product Name" name="title" variant="outlined" placeholder={singleProduct.title} fullWidth onChange={(e) => setItemName({...itemName, [e.target.name]: e.target.value})}  />
                    <TextField name="price" label="Price" type="Number" variant="outlined" placeholder={`₱ ${singleProduct.price}`} fullWidth 
                      onChange={(e) => setItemName({...itemName, [e.target.name]: e.target.value})} 
                    />  

                  <TextField variant="outlined" label="Quantity" 
                    onChange={(e) => setItemName({...itemName, quantity: e.target.value > 5 ? e.target.value = 5 : e.target.value})} 
                    fullWidth name="quantity"
                      
                      placeholder='Maximum limit of 5'  
                      InputProps={{ inputProps: { min: 0, max: 5, maxLength: 1}}}
                      pattern="^-?[0-5]\d*\.?\d*$"
                      />
                    <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">Course</InputLabel>
                              <Select
                                name="category"
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                label="Category"
                                defaultValue=""
                                onChange={(e) => setItemName({...itemName, [e.target.name]: e.target.value})} 
                              >
                                <MenuItem value="CAHS">College of Allied Health and Sciences</MenuItem>
                                <MenuItem value="CASE">College of Arts, Sciences and Education </MenuItem>
                                <MenuItem value="CBMA">College of Business Management and Accountancy</MenuItem>
                                <MenuItem value="CEIS">College of Engineering and Information Sciences</MenuItem>
                                <MenuItem value="CHTM">College of Hospitality and Tourism Management </MenuItem>
                                <MenuItem value="CMT">College of Medical Technology</MenuItem>
                                <MenuItem value="SLCN">St. Lukes College of Nursing</MenuItem>
                              </Select>
                            
                      </FormControl>

                      <FormControl fullWidth>  
                          <InputLabel id="demo-simple-select-label">Product Category</InputLabel>
                        <Select
                          fullWidth
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          name="productCategory"
                          defaultValue=""
                          label="productCategory"
                          onChange={(e) => setItemName({...itemName, productCategory: e.target.value})}
                        >         
                          {Itemtype ? (
                            Itemtype.map((el) => <MenuItem value={el} key={el}>{el}</MenuItem>)
                          ): <MenuItem>Choose Department</MenuItem>}
                        </Select>
                        </FormControl>
                      <TextField label="Description Name"
                       onChange={(e) => setItemName({...itemName, [e.target.name]: e.target.value})} 
                       name="description" multiline row={4} variant="outlined" placeholder={singleProduct.description} fullWidth />
                      <Box>
                        <form stlye={{display: 'flex', flexDireciton: 'column'}} onSubmit={handleUpload} className='form'>
                          <input type='file' />
                          <Button type='submit'  endIcon={<PhotoCamera />} color="secondary" size='small' variant="contained">Upload</Button>
                        </form>
                        {
                          !imgUrl &&
                          <Box>
                            <Box sx={{ width: `${progresspercent}%` }}>{progresspercent}%</Box>
                          </Box>
                        }
                      </Box>
                      <Button type="submit" onClick={handleSubmit} variant="contained" size="large" >Update</Button>
                    </Box>
                  </Grid>
                  <Grid item sx={{marginLeft: {xs: 0, md: 2}}} md={6} xs={12}>
                    <Typography variant="h6" sx={{fontWeight: 700, paddingY: 2}} color="gray"> Preview </Typography>
                      <Box sx={{display: 'flex', alingItems:'center', justifyContent: {xs: 'center', md: 'space-between'},  marginX: 'auto', gap: '10px', flexDirection: {xs: 'column', md:'row'}}}>
                            <Box component="img" src={imgUrl ? URL.createObjectURL(imgUrl): singleProduct.img } sx={{height:'50%', width: '50%', objectFit: 'contain',borderRadius: '16px'}}  />
                   
                        <Box sx={{display: 'flex',  flexDirection: 'column', width:"100%", gap: {xs: '10px', md: '20px'}}}>
                        <TextField 
                                id="outlined-multiline-static"
                                label="Title"
                                multiline
                                fullWidth
                                variant="outlined"
                                value={itemName.title || singleProduct.title}
                                InputProps={{
                                  readOnly: true,
                                }}
                              />
                        <TextField 
                                id="outlined-multiline-static"
                                label="Price"
                                multiline
                                fullWidth
                                variant="outlined"
                                value={itemName.price || singleProduct.price}
                                InputProps={{
                                  readOnly: true,
                                }}
                              />
                        <TextField 
                                id="outlined-multiline-static"
                                label="Quantity"
                                multiline
                                fullWidth
                                variant="outlined"
                                value={itemName.quantity || singleProduct.quantity}
                                InputProps={{
                                  readOnly: true,
                                }}
                              />
                        <TextField 
                                id="outlined-multiline-static"
                                label="Course"
                                multiline
                                fullWidth
                                variant="outlined"
                                value={itemName.category || singleProduct.category}
                                InputProps={{
                                  readOnly: true,
                                }}
                              />
                        <TextField 
                                id="outlined-multiline-static"
                                label="Course"
                                multiline
                                fullWidth
                                variant="outlined"
                                value={itemName.productCategory || singleProduct.productCategory}
                                InputProps={{
                                  readOnly: true,
                                }}
                              />
                        <TextField 
                                id="outlined-multiline-static"
                                label="Description"
                                multiline
                                fullWidth
                                variant="outlined"
                                value={itemName.description || singleProduct.description}
                                InputProps={{
                                  readOnly: true,
                                }}
                              />
                         
                        </Box>
                      </Box>       
                  </Grid>
                </Grid>
              </Box>
            </Container>
            </Box>

          )}
    </>

  )
}

export default EditProduct