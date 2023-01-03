import "./sidebar.scss";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import StoreIcon from "@mui/icons-material/Store";
import InsertChartIcon from "@mui/icons-material/InsertChart";
import SettingsApplicationsIcon from "@mui/icons-material/SettingsApplications";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import SettingsSystemDaydreamOutlinedIcon from "@mui/icons-material/SettingsSystemDaydreamOutlined";
import PsychologyOutlinedIcon from "@mui/icons-material/PsychologyOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import BeatLoader from "react-spinners/BeatLoader";
import { logOut } from "../../redux/authSlice";
import { toast } from "react-toastify";


const Sidebar = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const id = location.pathname.split('/')[1]
  const [loading,setLoading] = useState(true)

  useEffect(() =>[
      setLoading(false)
  ],[id])
  
  const onLogout = async (e) => {
    e.preventDefault();
    dispatch(logOut())
    window.location.reload()
    toast.info("Logout Successfully")
    navigate('/login')
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
    ): (

      <div className="sidebar">
      <div className="top">
      <Link to="/" style={{ textDecoration: "none" }}>
      <span className="logo">E-BENTA</span>
      </Link>
      </div>
      <hr />
      <div className="center">
        <ul>
          <p className="title">MAIN</p>
          <Link to="/" style={{ textDecoration: "none" }}>
          <li>
            <DashboardIcon className="icon" />
            <span>Dashboard</span>
          </li>
          </Link>

          <p className="title">LISTS</p>
          <Link to="/users" style={{ textDecoration: "none" }}>
            <li>
              <PersonOutlineIcon className="icon" />
              <span>Users</span>
            </li>
          </Link>
          <Link to="/products" style={{ textDecoration: "none" }}>
            <li>
              <StoreIcon className="icon" />
              <span>Products</span>
            </li>
          </Link>
          <Link to="/order" style={{ textDecoration: "none" }}>
          <li>
            <CreditCardIcon className="icon" />
            <span>Orders</span>
          </li>
          </Link>


          <p className="title">CHARTS</p>
          <Link to="/department" style={{ textDecoration: "none" }}>
          <li>
            <PsychologyOutlinedIcon className="icon" />
            <span>Department</span>
          </li>
          </Link>
          <Link to="/category" style={{ textDecoration: "none" }}>
          <li>
            <InsertChartIcon className="icon" />
            <span>Merchendise</span>
          </li>
          </Link>
          
          <p className="title">ACCOUNT</p>
          <li onClick={onLogout}>
            <ExitToAppIcon className="icon" />
            <span>Logout</span>
          </li>
        </ul>
      </div>
    </div>
    )}
    </>
    );
};

export default Sidebar;
