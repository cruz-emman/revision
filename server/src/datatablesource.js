import dayjs from 'dayjs';
import avatarImage from './assets/avatar.png'

export const userColumns = [
  { field: "studentId", headerName: "ID", width: 120 },
  {
    field: "user",
    headerName: "User",
    width: 230,
    renderCell: (params) => {

      return (
        <div className="cellWithImg">
          <img className="cellImg" src={params.row?.img || avatarImage} alt="avatar" />
          {params.row?.firstname} {params.row?.lastname}
        </div>
      );
    },
  },
  {
    field: "department",
    headerName: "Department",
    width: 230,
  },
 { field: 'studentId',
  headerName: "Student ID",
  width : 250},
  {
    field: "status",
    headerName: "Status",
    width: 160,
    renderCell: (params) => {
      return (
        <div className={`cellWithStatus ${params.row?.status}`}>
          {params.row?.status}
        </div>
      );
    },
  },
];

//temporary data
export const userRows = [
  {
    id: 1,
    username: "Snow",
    img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
    status: "active",
    email: "1snow@gmail.com",
    age: 35,
  },
  {
    id: 2,
    username: "Jamie Lannister",
    img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
    email: "2snow@gmail.com",
    status: "passive",
    age: 42,
  },
  {
    id: 3,
    username: "Lannister",
    img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
    email: "3snow@gmail.com",
    status: "pending",
    age: 45,
  },
  {
    id: 4,
    username: "Stark",
    img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
    email: "4snow@gmail.com",
    status: "active",
    age: 16,
  },
  {
    id: 5,
    username: "Targaryen",
    img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
    email: "5snow@gmail.com",
    status: "passive",
    age: 22,
  },
  {
    id: 6,
    username: "Melisandre",
    img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
    email: "6snow@gmail.com",
    status: "active",
    age: 15,
  },
  {
    id: 7,
    username: "Clifford",
    img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
    email: "7snow@gmail.com",
    status: "passive",
    age: 44,
  },
  {
    id: 8,
    username: "Frances",
    img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
    email: "8snow@gmail.com",
    status: "active",
    age: 36,
  },
  {
    id: 9,
    username: "Roxie",
    img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
    email: "snow@gmail.com",
    status: "pending",
    age: 65,
  },
  {
    id: 10,
    username: "Roxie",
    img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
    email: "snow@gmail.com",
    status: "active",
    age: 65,
  },
];




export const productColumn = [
  {
    field: "seller_id",
    headerName: "Student ID",
    width: 250,
    renderCell: (params) => {
      return (
        <div className="cellWithImg">
          <img className="cellImg" src={params.row?.seller_id?.img || avatarImage} alt="avatar" />
          {params.row?.seller_id?.studentId}
        </div>
      )
    },
  },  
  {
    field: 'title',
    headerName: 'Item',
    width: 250,
    renderCell: (params) => {  
      return (
        <div className="cellWithImg">
          <img className="cellImg" src={params.row?.img} alt="avatar" />
          {params.row?.title}
        </div>
      )
    },
  },

  {
    field: 'price',
    headerName: 'Price',
    width: 230,
    renderCell: (params) => {  
      console.log(params)
      return (
        <div className="cellWithImg">
          ₱ {params.row?.price}
        </div>
      )
    },
    
  },
  {
    field: 'quantity',
    headerName: 'Quantity',
    width: 230,
    
  },

]


export const orderColumn = [
  {field: "_id", headerName: "Transaction", width: 220},
  {
    field: "buyerId",
    headerName: "Buyer ID" ,
    width: 150,
    renderCell: (params) => {

      return (
        <div className="cellWithImg">
             {params?.row?.userId?.studentId}
        </div>
      )
    },
  },
  {
    field: "amount",
    headerName:"Price" ,
    width: 100,
    renderCell: (params) => {
      return (
        <div className="cellWithImg">
           ₱ {params?.row?.amount}
        </div>
      )
    },
  },
  {
    field: "quantity",
    headerName:"Qty" ,
    width: 100,
    renderCell: (params) => {
      return (
        <div className="cellWithImg">
           {params?.row?.boughtItem}
        </div>
      )
    },
  },
  {
    field: "products",
    headerName: "Product",
    width: 150,
    renderCell: (params) =>{
      return (
        <div className="cellWithImg">
          <img className="cellImg" src={params.row?.products[0] ? params.row?.products[0].productId?.img : ''} alt="avatar" />
          {params?.row?.products[0] ? params.row?.products[0].productId?.title : '-'}
        </div>
      )
    }
  },
  {
    field: "seller",
    headerName: "Seller",
    width: 150,
    renderCell: (params) =>{
      return (
      <div>
          {params?.row?.products[0]?.sellerId?.studentId}
      </div>
      )
    }
  },
  {
    field: "location and time",
    headerName: "Location and Time",
    width: 400,
    renderCell: (params) =>{
      let time = params?.row?.time
      time = (dayjs(time).format('YYYY-MM-DD h:mm A'))
      return (
      <div >
          {params?.row?.location} || {time}
      </div>
      )
    }
  },
  {
    field: "status",
    headerName: "Status",
    width: 150,
    renderCell: (params) =>{
      return (
        <div className={`cellWithStatus ${params.row?.status}`}>
        {params.row?.status}
      </div>
      )
    }
  }
] 