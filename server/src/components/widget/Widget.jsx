import "./widget.scss";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import AccountBalanceWalletOutlinedIcon from "@mui/icons-material/AccountBalanceWalletOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import MonetizationOnOutlinedIcon from "@mui/icons-material/MonetizationOnOutlined";
import { useEffect } from "react";
import { getUsers } from "../../redux/apiCalls";
import {useDispatch, useSelector} from 'react-redux'
import { useState } from "react";
import { publicRequest, userRequest } from "../../publicRequest";
import BeatLoader from "react-spinners/BeatLoader";


const Widget = ({ type }) => {
  const dispatch = useDispatch()
  const [userNumber, setUserNumber] = useState(0)
  const [userProduct, setUserProduct] = useState(0)
  const [userOrder, setUserOrder] = useState(0)
  const [total, setTotal] = useState(0)
  const [loading, setLoading] = useState(true)

  let data;


  useEffect(() => {
      try {
        const getAllUsers = async () => {
          const res = await userRequest.get('/users')
          let result = res.data
          let totalUser = Object.keys(result).length
          setUserNumber(totalUser)
          setLoading(false)
        }
        getAllUsers()
      } catch (error) {
        console.log({error: error.message})
      }
  },[setUserNumber])

  useEffect(() => {
      try {
        const getAllUsers = async () => {
          const res = await userRequest.get('/products')
          let result = res.data
          let getFiltered = res.data.filter((item) => (
            item.status === "available"
          ))
          let totalUser = Object.keys(getFiltered).length
          setUserProduct(totalUser)
          setLoading(false)
        }
        getAllUsers()
      } catch (error) {
        console.log({error: error.message})
      }
  },[setUserProduct])


  useEffect(() => {

      try {
        const getAllUsers = async () => {
          const res = await userRequest.get('/order')
          let result = res.data
          let totalUser = Object.keys(result).length
          setUserOrder(totalUser)
          setLoading(false)
        }
        getAllUsers()
      } catch (error) {
        console.log({error: error.message})
      }
  },[setUserOrder])

  useEffect(() => {

      try {
        const getAllUsers = async () => {
          const res = await userRequest.get('/order/totalSales')
          let item = res.data[0]?.total
          setTotal(item)
          setLoading(false)

        }
        getAllUsers()
      } catch (error) {
        console.log({error: error.message})
      }
  },[setTotal])

  //temporary

  switch (type) {
    case "user":
      data = {
        title: "USERS",
        isMoney: false,
        amount: !userNumber ? 0 : userNumber - 1 ,

        icon: (
          <PersonOutlinedIcon
            className="icon"
            style={{
              color: "crimson",
              backgroundColor: "rgba(255, 0, 0, 0.2)",
            }}
          />
        ),
      };
      break;
    case "order":
      data = {
        title: "Products",
        isMoney: false,
        amount: !userProduct ? 0 : userProduct,
        icon: (
          <ShoppingCartOutlinedIcon
            className="icon"
            style={{
              backgroundColor: "rgba(218, 165, 32, 0.2)",
              color: "goldenrod",
            }}
          />
        ),
      };
      break;
    case "earning":
      data = {
        title: "Order",
        isMoney: false,
        amount: userOrder || 0,

        icon: (
          <MonetizationOnOutlinedIcon
            className="icon"
            style={{ backgroundColor: "rgba(0, 128, 0, 0.2)", color: "green" }}
          />
        ),
      };
      break;
    case "balance":
      data = {
        title: "Over All Amount",
        isMoney: true,
        amount: !total ? 0: total ,
        icon: (
          <AccountBalanceWalletOutlinedIcon
            className="icon"
            style={{
              backgroundColor: "rgba(128, 0, 128, 0.2)",
              color: "purple",
            }}
          />
        ),
      };
      break;
    default:
      break;
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
    (<div className="widget">
    <div className="left">
      <span className="title">{data.title || ""}</span>
      <span className="counter">
        {data.isMoney && "₱"} {data.amount || 0}
      </span>
      <span className="link">{data.link}</span>
    </div>
    <div className="right">
      
    </div>
  </div>)
    }
    </>

  );
};

export default Widget;
