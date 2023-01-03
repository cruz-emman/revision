import "./single.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import Chart from "../../components/chart/Chart";
import List from "../../components/table/Table";
import BeatLoader from "react-spinners/BeatLoader";

import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import { userRequest } from "../../publicRequest";
import { useState } from "react";
import {useSelector, useDispatch}  from 'react-redux'
import { searchUser, updateUser } from "../../redux/apiCalls";
import TableTransact from "../../components/TableTransact/TableTransact";
import { useMemo } from "react";

const Single = () => {
  const navigate = useNavigate()
  const {userId} = useParams()
  const dispatch = useDispatch()
  const {users, isFetching} = useSelector((state) => state.user)
  const [status,setStatus] = useState("")
  const [recentTransaction, setRecentTransaction] = useState([])
  const [orderStats, setOrderStats] = useState([])

  const [loading, setLoading] = useState(true)

  useEffect(() => {
      searchUser(userId, dispatch)
  },[userId])

  const MONTHS = useMemo(
    () => [
        'Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'
    ],[]
)

  useEffect(() => {
    const getStats = async () =>{
      
        try {
            const res = await userRequest.get(`/order/recent/${userId}`)
            setRecentTransaction(res.data)
            setLoading(false)
        } catch (error) {
            console.log({error: error.message})
        }

    }   
getStats()
},[userId])

useEffect(() =>{
  const getIncomeStats = async () =>{
      try {
          const res = await userRequest.get(`/order/previousSales/${userId}`)
          const list = res.data.sort((a,b)=>{
              return a._id - b._id
          })

          list.map((item) =>
          setOrderStats((prev) => [
            ...prev,
            { name: MONTHS[item._id - 1], "Total Sales": item.total },
          ])
        );
          
          // res.data.map((item) => {
          //     // //Since ang value sa backend is _id: 10 which is eqal to October, dahil sa spread operator
          //     // //ginawan ng name, so name:MONTHS na equal sa use memo, then kung ano ung current Id. 
          //     setOrderStats(prev=>[
          //         ...prev,
          //         {name:MONTHS[item._id - 1], "Total Sales": item.total}
                  
          //         ])
          // })
      } catch (error) {
      }
  }
  getIncomeStats()
},[MONTHS, userId])



  const handleClick = () =>{
    navigate(`/users/edit/${userId}`)
  }


  return (
    <>
    {!isFetching ? (
                <BeatLoader 
                color="#36d7b7" 
                loading={isFetching}
                size={50}
                aria-label="Loading Spinner"
                data-testid="loader"
              />

    ) : (
    <div className="single">
      <Sidebar />
      <div className="singleContainer">
        <Navbar />
        <div className="top">
          <div className="left">
            <div className="editButton" onClick={handleClick}>Edit</div>
            <h1 className="title">Information</h1>
            <div className="item">
              <img
                src={users.img}
                alt=""
                className="itemImg"
              />
              <div className="details">
                <h1 className="itemTitle"> {users.firstname} {users.lastname} </h1>
                <div className="detailItem">
                  <span className="itemKey">Email:</span>
                  <span className="itemValue">{users.email}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Student ID:</span>
                  <span className="itemValue">{users.studentId}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Department:</span>
                  <span className="itemValue">{users.department}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Contact No.:</span>
                  <span className="itemValue">{users.contactNumber}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Status:</span>
                  <span className="itemValue">{users.status}</span>

                </div>
              </div>
            </div>
          </div>
          <div className="right">
            <Chart data={orderStats}    dataKey="Total Sales"
      grid aspect={3 / 1} title="User Spending ( Last 12 Months)" />
          </div>
        </div>
        <div className="bottom">
        <h1 className="title">Last Transactions</h1>
          <TableTransact orders={recentTransaction}  />
        </div>
      </div>
    </div>
    )}
    </>
  )
};

export default Single;
