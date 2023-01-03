import "./new.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useEffect, useState } from "react";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { userRequest } from "../../publicRequest";
import BeatLoader from "react-spinners/BeatLoader";
import { toast } from 'react-toastify'


const New = ({ inputs, title }) => {
  const [file, setFile] = useState("");
  const {userId} = useParams()
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()
  const [userInfo, setUserInfo] = useState()

  const [data,setData] = useState({})


  useEffect(() =>{
    const getUser = async () =>{
      try {
        const res = await userRequest.get(`/users/find/${userId}`)
        console.log(res.data)
        setUserInfo(res.data)
        setLoading(false)
      } catch (error) {
        
      }
    }
    getUser()
  },[userId])


  const handleClick = async (e) => {
    e.preventDefault() 
    try {
       await userRequest.put(`/users/${userId}`,data)
       toast.success("Edit User Succesfully.")
       navigate('/')
    } catch (error) {
      console.log({error: error.message})
    }
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
                (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="top">
          <h1>{title}</h1>
        </div>
        <div className="bottom">
          <div className="left">
            <img
              src={
                userInfo.img
                ? userInfo.img
                : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
              }
              alt=""
              />
          </div>
          <div className="right">
            <form>
              <div className="formInput">
                <label htmlFor="file">
                  Image: <DriveFolderUploadOutlinedIcon className="icon" />
                </label>
                <input
                  type="file"
                  id="file"
                  onChange={(e) => setFile(e.target.files[0])}
                  style={{ display: "none" }}
                  />
              </div>

                <div className="formInput">
                  <label>First Name</label>
                  <input type="text" value={userInfo.firstname} readOnly />
                </div>
                <div className="formInput">
                  <label>Middle Name</label>
                  <input type="text" value={userInfo.middlename}  readOnly />
                </div>
                <div className="formInput">
                  <label>Last Name</label>
                  <input type="text" value={userInfo.lastname}  readOnly />
                </div>
                <div className="formInput">
                  <label>Email</label>
                  <input type="email" value={userInfo.email} readOnly />
                </div>
                <div className="formInput">
                  <label>Department</label>
                  <input type="text" value={userInfo.department}  readOnly />
                </div>
                <div className="formInput">
                  <label>Contact No.</label>
                  <input type="text" name="contactNumber" value={userInfo.contactNumber}   onChange={(e) => setData({...data, [e.target.name]: e.target.value})} />
                </div>
                <div className="formInput">
                  <label>Password</label>
                  <input type="text" name="password" onChange={(e) => setData({...data, [e.target.name]: e.target.value})}  />
                </div>
                <div className="formInput">
                  <label>Student ID</label>
                  <input type="text" placeholder={userInfo.studentId} name="studentId"  onChange={(e) => setData({...data, [e.target.name]: e.target.value})} />
                </div>
                <div className="formInput">
                    <FormControl sx={{ m: 1, minWidth: 200 }}>
                    <InputLabel id="demo-simple-select-helper-label">Status</InputLabel>
                      <Select
                        labelId="demo-simple-select-helper-label"
                        id="demo-simple-select-helper"
                        label="Status"
                        name="status"
                        defaultValue={userInfo.status}
                        onChange={(e) => setData({...data, [e.target.name]: e.target.value})}
                        >
                        <MenuItem value="">
                          <em>None</em>
                        </MenuItem>
                        <MenuItem value="pending">Pending</MenuItem>
                        <MenuItem value="active">Active</MenuItem>
                        <MenuItem value="disable">Disable</MenuItem>
                      </Select>
                    </FormControl>

                </div>
            </form>
            <button onClick={handleClick}>Update</button>

          </div>
        </div>
      </div>
    </div>
  )}
  </>
  );
};

export default New;
