import { Box, Typography } from "@mui/material"
import dayjs from "dayjs"
const statusColor={
    complete:'lime',
    pending:'yellow',
    initiate:'blue',
    }
export const sellerColumn = [
    {field: '_id', headerName: "Order ID", width: 250},
    {field: 'userId', headerName: "Buyer Name", width: 200, 
    renderCell: (params) =>{
        return (
            <div>
                {params.row.userId.firstname} {params.row.userId.lastname}
            </div>
        )
    },
    valueGetter: (params) =>  `${params.row.userId.firstname} ${params.row.userId.lastname}`
    },
    {field: '', headerName: "Student ID", width: 150, 
    renderCell: (params) =>{
        return (
            <div>
                {params.row.userId.studentId} 
            </div>
        )
    },
    valueGetter: (params) =>  ` ${params.row.userId.studentId} `
    },
    {field: 'quantity', headerName: "Qty", width: 50, 
    renderCell: (params) =>{
        return (
            <div>
                {params.row.quantity} 
            </div>
        )
    },
    valueGetter: (params) =>  ` ${params.row.quantity} `
    },
    {field: 'amount', headerName: "Amount", width: 100, 
    renderCell: (params) =>{
        return (
            <div>
               ₱  {params.row.TotalAmount} 
            </div>
        )
    },
    valueGetter: (params) =>  ` ${params.row.TotalAmount} `
    },
    {field: 'location', headerName: "Location & Time", width: 250, 
    renderCell: (params) =>{
        return (
            <div>
                {params.row.location} {dayjs(params.row.time).format('llll')}
            </div>
        )
    },
    valueGetter: (params) =>  ` ${params.row.location} ${dayjs(params.row.time).format('llll')}  `
    },
    {field: 'status', headerName: 'status', width: 100, renderCell: (params) =>{
       return(
        <Typography sx={{padding:1, backgroundColor: statusColor[params.row.status]}}>
            {params.row.status}
       </Typography>
       )
    }},

    
]



export const buyerColumn = [
    {field: '_id', headerName: "Order ID", width: 250},
    {field: 'userId', headerName: "Seller Name", width: 200, 
    renderCell: (params) =>{
        return (
            <div>
                {params.row.userId.firstname} {params.row.userId.lastname}
            </div>
        )
    },
    valueGetter: (params) =>  `${params.row.userId.firstname} ${params.row.userId.lastname}`
    },
    {field: '', headerName: "Student ID", width: 150, 
    renderCell: (params) =>{
        return (
            <div>
                {params.row.userId.studentId} 
            </div>
        )
    },
    valueGetter: (params) =>  ` ${params.row.userId.studentId} `
    },
    {field: 'quantity', headerName: "Qty", width: 50, 
    renderCell: (params) =>{
        return (
            <div>
                {params.row.quantity} 
            </div>
        )
    },
    valueGetter: (params) =>  ` ${params.row.quantity} `
    },
    {field: 'amount', headerName: "Amount", width: 100, 
    renderCell: (params) =>{
        return (
            <div>
               ₱  {params.row.TotalAmount} 
            </div>
        )
    },
    valueGetter: (params) =>  ` ${params.row.TotalAmount} `
    },
    {field: 'location', headerName: "Location & Time", width: 250, 
    renderCell: (params) =>{
        return (
            <div>
                {params.row.location} {dayjs(params.row.time).format('llll')}
            </div>
        )
    },
    valueGetter: (params) =>  ` ${params.row.location} ${dayjs(params.row.time).format('llll')}  `
    },
    {field: 'status', headerName: 'status', width: 100, renderCell: (params) =>{
       return(
        <Typography sx={{padding:1, backgroundColor: statusColor[params.row.status]}}>
            {params.row.status}
       </Typography>
       )
    }},

    
]

