import "./table.scss";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import dayjs from 'dayjs';


const List = ({orders}) => {
  console.log(orders)
  return (
    <TableContainer component={Paper} className="table">
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell className="tableCell">Tracking ID</TableCell>
            <TableCell className="tableCell">Seller</TableCell>
            <TableCell className="tableCell">Buyer</TableCell>
            <TableCell className="tableCell">Amount</TableCell>
            <TableCell className="tableCell">Time</TableCell>
            <TableCell className="tableCell">Location</TableCell>
            <TableCell className="tableCell">Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {orders.map((row) => (
            <TableRow key={row._id}>
              <TableCell className="tableCell">{row._id}</TableCell>
              <TableCell className="tableCell">
                {row.products.map((product) => (
                  <div key={product?._id} className="cellWrapper">
                  {product.sellerId?.studentId}
                </div>
                ))}
              </TableCell>
              <TableCell className="tableCell">{row.userId?.studentId}</TableCell>
              <TableCell className="tableCell">₱ {row.amount}</TableCell>
              <TableCell className="tableCell">{dayjs(row.time).format('YYYY-MM-DD h:mm A')}</TableCell>
              <TableCell className="tableCell">{row.location}</TableCell>
              <TableCell className="tableCell">
                <span className={`status ${row.status}`}>{row.status}</span>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default List;
