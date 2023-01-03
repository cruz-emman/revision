import "./list.scss"
import Sidebar from "../../components/sidebar/Sidebar"
import Navbar from "../../components/navbar/Navbar"
import Datatable from "../../components/datatable/Datatable"
import { useLocation } from "react-router-dom"
import { useState, useEffect } from "react"
import {useDispatch, useSelector} from 'react-redux'
import { userRequest } from "../../publicRequest"
import BeatLoader from "react-spinners/BeatLoader";
import { getProduct } from "../../redux/apiCalls"

const ListProducts = ({columns}) => {
  const {products, isFetching} = useSelector((state) => state.product)
  const [filteredProducts, setFilteredProducts]  = useState([])
  const [loading, setLoading] = useState(true)


  const dispatch = useDispatch()
  const location = useLocation()
  const id = location.pathname.split('/')[1]
 
  useEffect(() => {
    try {
      const getAllProducts = async () => {
        const res = await userRequest.get('/products')
            let getFiltered = res.data.filter((item) => (
              item.quantity !== 0
            ))
            setFilteredProducts(getFiltered)
            setLoading(false)
            
      }
      getAllProducts()
    } catch (error) {
      console.log({error: error.message})
    }
    
  },[setFilteredProducts])


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
     
   ): (
    <div className="list">
    <Sidebar/>
    <div className="listContainer">
      <Navbar/>
      <Datatable columns={columns} id={id} data={filteredProducts} />
    </div>
  </div>
   )}
   </>



  )
}

export default ListProducts