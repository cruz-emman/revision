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
import Chart from "../../components/chart/Chart";

const Home = () => {
  const dispatch = useDispatch()
  const {isFetching, orders} = useSelector((state) => state.order)
  const [orderStats, setOrderStats] = useState([])

  const MONTHS = useMemo(
    () => [
        'Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'
    ],[]
)

  useEffect(() => {
    const getChart = async () =>{
      const res = await publicRequest.get(`/order/income`);
      console.log(res.data)
      const list = res.data.sort((a,b)=>{
        return a._id - b._id
      })
      list.map((item) =>
      setOrderStats((prev) => [
        ...prev,
        { name: MONTHS[item._id - 1], "Total Sales": item.total },
      ])
    );
    }
    getChart()
  },[MONTHS])


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
          <Chart data={orderStats} 
          grid
          dataKey="Total Sales"
          title="Last 12 Months (Revenue)"
           aspect={3 / 1} />
        </div>
        <div className="listContainer">
          <div className="listTitle">Latest Transactions</div>
          <Table orders={orders} />
        </div>
      </div>
    </div>
        )}
    </>
  );
};

export default Home;
