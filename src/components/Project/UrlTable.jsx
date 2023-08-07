import React from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Paper from "@mui/material/Paper";
import { visuallyHidden } from "@mui/utils";
import axios from "axios";
import Spinner from "react-spinner-material";
import Alert from "@mui/material/Alert";
import { toast } from "react-toastify";
import UrlModal from "./UrlModal";

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) return -1;
  if (b[orderBy] > a[orderBy]) return 1;
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headCells = [
  { id: "id", numeric: false, label: "Id" },
  { id: "name", numeric: true, label: "Name" },
  { id: "url", numeric: true, label: "Url" },
  { id: "action", numeric: true, label: "Action" },
];

function EnhancedTableHead(props) {
  const { order, orderBy, onRequestSort } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align="left"
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

export default function EnhancedTable({ id }) {
  const [error, setError] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("calories");
  const [page, setPage] = React.useState(0);
  const [data, setData] = React.useState([]);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const onDeactivate = (idx) => {
    axios
      .delete(
        `${process.env.REACT_APP_URL}/api/idp/v2/project/${id}/url/${idx}`,
        {
          headers: { Authorization: sessionStorage.getItem("token") },
        }
      )
      .then((res) => {
        console.log(res);
        toast.success("Successfully deactivated")
      })
      .catch((err) => {
        toast.error("An Error occurred!");
      });
  };

  const getDate = async () => {
    setLoading(true);
    await axios
      .get(`${process.env.REACT_APP_URL}/api/idp/v2/project/${id}/url`, {
        headers: { Authorization: sessionStorage.getItem("token") },
      })
      .then((res) => {
        setData(res.data.data.projectUrls);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setError(true);
        setLoading(false);
      });
  };

  const getData = async () => {
    await axios
      .get(`${process.env.REACT_APP_URL}/api/idp/v2/project/${id}/url`, {
        headers: { Authorization: sessionStorage.getItem("token") },
      })
      .then((res) => {
        setData(res.data.data.projectUrls);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  React.useEffect(() => {
    getDate();
    // eslint-disable-next-line
  }, []);
  return (
    <div>
      <UrlModal id={id} get={getData}/>
      {loading ? (
        <div
          style={{
            marginTop: "100px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Spinner radius={150} color={"#1976d2"} stroke={16} visible={true} />
        </div>
      ) : (
        <Box sx={{ width: "100%" }}>
          {!error && data.length === 0 && (
            <Alert variant="outlined" severity="warning">
              No project urls added yet
            </Alert>
          )}
          {error && data.length === 0 && (
            <Alert variant="outlined" severity="error">
              An error occurred
            </Alert>
          )}
          {data.length >= 1 && (
            <Paper sx={{ width: "100%", mb: 2 }}>
              <TableContainer>
                <Table
                  sx={{ minWidth: 750, px: 2 }}
                  aria-labelledby="tableTitle"
                  size="medium"
                >
                  <EnhancedTableHead
                    order={order}
                    orderBy={orderBy}
                    onRequestSort={handleRequestSort}
                    rowCount={data.length}
                  />
                  <TableBody>
                    {stableSort(data, getComparator(order, orderBy))
                      .slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
                      .map((row, index) => {
                        return (
                          <TableRow hover tabIndex={-1} key={row.id}>
                            <TableCell align="left">{row.id}</TableCell>
                            <TableCell align="left">{row.name}</TableCell>
                            <TableCell align="left">
                              <a
                                style={{
                                  textDecoration: "underline",
                                  color: "blue",
                                }}
                                href={row.url}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                open
                              </a>
                            </TableCell>
                            <TableCell>
                              <button
                                onClick={(e) => onDeactivate(row.id)}
                                style={{ padding: "4px 10px" }}
                                className="border border-pink-200 bg-pink-100 text-pink-700 text-xs cursor-pointer rounded-full hover:text-pink-800 focus:ring-2 focus:outline-none focus:ring-red-300"
                              >
                                delete<i className="fa-solid fa-trash ml-2"></i>
                              </button>
                            </TableCell>
                          </TableRow>
                        );
                      })}
                  </TableBody>
                </Table>
              </TableContainer>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25, 100]}
                component="div"
                count={data.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </Paper>
          )}
        </Box>
      )}
    </div>
  );
}
