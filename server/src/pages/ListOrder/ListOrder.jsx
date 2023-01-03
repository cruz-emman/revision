import "./list.scss"
import Sidebar from "../../components/sidebar/Sidebar"
import Navbar from "../../components/navbar/Navbar"
import Datatable from "../../components/datatable/Datatable"
import { useLocation } from "react-router-dom"
import { useState, useEffect } from "react"
import { userRequest } from "../../publicRequest"
import { useDispatch, useSelector
 } from "react-redux"
import BeatLoader from "react-spinners/BeatLoader";
import { getOrder } from "../../redux/apiCalls"

const ListOrder = ({columns}) => {
  const dispatch = useDispatch()
  const {isFetching, orders} = useSelector((state) => state.order)
  const location = useLocation()
  const id = location.pathname.split('/')[1]
 
  useEffect(() => {
    getOrder(dispatch)
  },[dispatch])

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
       <div className="list">
       <Sidebar/>
       <div className="listContainer">
         <Navbar/>
         <Datatable columns={columns} id={id} data={orders} />
       </div>
     </div>
    )}
   </>
  )
}

export default ListOrder