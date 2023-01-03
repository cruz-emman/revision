import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import "./home.scss";
import Widget from "../../components/widget/Widget";
import Featured from "../../components/featured/Featured";
import Table from "../../components/table/Table";
import { useEffect, useMemo, useState } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getOrder } from "../../redux/apiCalls";
import BeatLoader from "react-spinners/BeatLoader";
import { publicRequest } from "../../publicRequest";
import BarChartComponent from "../../components/bar/BarChartComponent";

const Category = () => {
  const dispatch = useDispatch()
  const {isFetching, orders} = useSelector((state) => state.order)

  const [barColor, setBarColor] = useState([])
  const [topDepartment,setTopDepartment] = useState([])
  const [loading,setLoading] = useState(true)

  const [orderStats, setOrderStats] = useState([])

  const MONTHS = useMemo(
    () => [
        'Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'
    ],[]
)

  useEffect(() =>{
   
    const getTopDepartment = async () =>{ 
      try {
        let res = await publicRequest.get(`/order/categories`)
        console.log(res.data)

        setTopDepartment(res.data)
        setLoading(false)
      } catch (error) {
        
      }
    }
    getTopDepartment()

  },[setTopDepartment])


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
    <div className="home">
      <Sidebar />
      <div className="homeContainer">
        <Navbar />
        <div className="widgets">
          <Widget type="user" />
          <Widget type="order" />
          <Widget type="earning" />
          <Widget type="balance" />
        </div>
          <div className="charts">
          <BarChartComponent data={topDepartment} title="Categories/Merchendise" barColor={barColor}  />
        </div>

      </div>
    </div>
        )}
    </>
  );
};

export default Category;
