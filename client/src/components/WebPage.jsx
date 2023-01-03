import React from 'react'
import Pagination from '@mui/material/Pagination';
import { PaginationItem, Paper } from '@mui/material';
import { Link } from 'react-router-dom';
const WebPage = () => {
  return (
    <Paper elevation={6} sx={{padding: 4}}>
       <Pagination
      sx={{display: 'flex', alignItems:'center',justifyContent:'center'}}
       variant="outlined" size="large" count={10} />
    </Paper>
  )
}

export default WebPage