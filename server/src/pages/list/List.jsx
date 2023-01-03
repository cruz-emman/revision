import "./list.scss"
import Sidebar from "../../components/sidebar/Sidebar"
import Navbar from "../../components/navbar/Navbar"
import Datatable from "../../components/datatable/Datatable"
import { useLocation } from "react-router-dom"
import { useState, useEffect } from "react"
import { userRequest } from "../../publicRequest"
import BeatLoader from "react-spinners/BeatLoader";
import { useSelector, useDispatch } from "react-redux"
import { getUsers } from "../../redux/apiCalls"
import DatatableUser from "../../components/datatable for user/DatatableUser"


const List = ({columns}) => {
  const {users, isFetching} = useSelector((state) => state.user)
  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch()
  const location = useLocation()
  const id = location.pathname.split('/')[1]

  useEffect(() =>{
    getUsers(dispatch)
    setLoading(false)
  },[dispatch])

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

    ) : (
       <div className="list">
       <Sidebar/>
       <div className="listContainer">
         <Navbar/>
         <DatatableUser columns={columns}  id={id} data={users} />
       </div>
     </div>
    )}
   </>
  )
}

export default List