import "./datatable.scss";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";

import { userColumns, userRows } from "../../datatablesource";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import BeatLoader from "react-spinners/BeatLoader";


const Datatable = ({data, columns, id}) => {
  const [loading, setLoading] = useState(true)
  //const [data, setData] = useState(userRows);

  useEffect(() => {
    setLoading(false)
  },[data,  columns])

  const handleDelete = (id) => {
     //setData(data.filter((item) => item.id !== id));
     console.log(id)
  };

  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <Link to={`/${id}/edit/${params?.row?._id}`} style={{ textDecoration: "none" }}>
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
      <div className="search">
          <input type="text" placeholder="Search..." />
          <SearchOutlinedIcon />
        </div>
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

        rows={loading ? {} : data}
        getRowId={(row) => row._id}
        columns={columns}
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

export default Datatable;
