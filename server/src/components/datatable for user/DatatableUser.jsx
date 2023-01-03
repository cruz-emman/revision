import "./datatable.scss";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import BeatLoader from "react-spinners/BeatLoader";
import { toast } from "react-toastify";
import {  deleteUser } from "../../redux/apiCalls";
import { useDispatch } from 'react-redux'



const DatatableUser = ({data, columns, id}) => {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)
  const [searchUser, setSearchUser] = useState([])
  const dispatch = useDispatch()


  console.log(searchUser)

  useEffect(() => {
    setLoading(false)
  },[data,  columns])

  const handleDelete = (id) => {
    deleteUser(id, dispatch)
    navigate(0);
    toast.success("User Deleted")
  };
 



  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <Link to={`/${id}/${params?.row?._id}`} style={{ textDecoration: "none" }}>
              <div className="viewButton">View</div>
            </Link>
            <div
              className="deleteButton"
              onClick={() => handleDelete(params.row._id)}
            >
              Delete
            </div>
          </div>
        );
      },
    },
  ];
  return (
    <div className="datatable">
      <div className="datatableTitle">
      </div>
      {loading ? (
         <BeatLoader 
         color="#36d7b7" 
         loading={loading}
         size={50}
         aria-label="Loading Spinner"
         data-testid="loader"
       />
        
      ): (
        <DataGrid
        className="datagrid"
        {...data}
        rows={loading ? [] : data}
        getRowId={(row) => row._id}
        columns={columns.concat(actionColumn)}
        pageSize={9}
        rowsPerPageOptions={[9]}
        components={{ Toolbar: GridToolbar }}
        componentsProps={{
          toolbar: {
            showQuickFilter: true,
            quickFilterProps: { debounceMs: 500 },
          },
        }}
        checkboxSelection
      />
      )}
    </div>
  );
};

export default DatatableUser;
