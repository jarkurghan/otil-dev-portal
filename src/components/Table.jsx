/* eslint-disable jsx-a11y/iframe-has-title */
import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableRow from '@mui/material/TableRow';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import IconButton from '@mui/material/IconButton';
import MoreVertIcon from "@mui/icons-material/MoreVert";
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';
import TableSortLabel from '@mui/material/TableSortLabel';
import LinearProgress from '@mui/material/LinearProgress';
import { toast } from 'react-toastify';
import Typography from "@mui/material/Typography";
import { CircularProgress } from '@mui/material';
import MenuItem from "@mui/material/MenuItem";
import { visuallyHidden } from '@mui/utils';
import Tooltip from "@mui/material/Tooltip";
import Paper from '@mui/material/Paper';
import Menu from "@mui/material/Menu";
import ViewModal from './ViewModal';
import FileSaver from 'file-saver';
import axios from 'axios';

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) return -1;
  if (b[orderBy] > a[orderBy]) return 1;
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
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
  { id: 'id', numeric: false, label: 'Id' },
  { id: 'first_name', numeric: true, label: 'First Name' },
  { id: 'last_name', numeric: true, label: 'Last Name' },
  { id: 'cell_number', numeric: true, label: 'Phone Number' },
  { id: 'status', numeric: true, label: 'Status' },
  { id: 'action', numeric: true, label: 'Action' },
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
          <TableCell key={headCell.id} align='left' sortDirection={orderBy === headCell.id ? order : false} >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
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

export default function Tables({ value }) {
  
  const [idx, setIdx] = React.useState('');
  const [page, setPage] = React.useState(0);
  const [data, setData] = React.useState([]);
  const [order, setOrder] = React.useState('asc');
  const [loading, setLoading] = React.useState(false);
  const [docType, setDocType] = React.useState(false);
  const [errorMsg, setErrorMsg] = React.useState(null);
  const [errorFile, setErrorFile] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [showModal, setShowModal] = React.useState(false);
  const [orderBy, setOrderBy] = React.useState('calories');
  const [modalValue, setModalValue] = React.useState(null);
  const [loadingModal, setLoadingModal] = React.useState(false);

  React.useEffect(() => {
    getDate();
  }, [])

  const getDate = async () => {
    setLoading(true);
    setData(value.applicants);
    setLoading(false);
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const [anchor, setAnchor] = React.useState(null);
  const [anchor2, setAnchor2] = React.useState(null);

  const openMenu = (event, elem) => {
    setIdx(elem)
    console.log(elem)
    setShowModal(false)
    setAnchor(event.currentTarget)
  }

  const closeMenu = () => {
    setAnchor(null);
  }

  const closeAllMenu = () => {
    setAnchor2(null); setAnchor(null);
  }

  const setViewModal = () => {
    setAnchor(null)
    setLoadingModal(true)
    axios(`${process.env.REACT_APP_URL}/api/hrp/v1/employee/openPosition/applicant/${idx.id}`,
      { headers: { Authorization: process.env.REACT_APP_TOKEN }
      }).then(res => {
        setModalValue(res.data.data)
        setLoadingModal(false)
    }).catch(err => {
      setLoadingModal(false)
      toast.error("An error occurred")
    })
  }

  const onbInitialStatus = () => {
    axios.post(`${process.env.REACT_APP_URL}/api/hrp/v1/employee/openPosition/onboardingInitiated/${idx.id}`, {},
      { headers: { Authorization: process.env.REACT_APP_TOKEN }
      }).then(res => {
      closeAllMenu(); getDate();
    }).catch(err => {
      toast.error("An error occurred")
      closeAllMenu()
    })
  }

  const callInterviewStatus = () => {
    axios.post(`${process.env.REACT_APP_URL}/api/hrp/v1/employee/openPosition/callInterview/${idx.id}`, {},
      { headers: { Authorization: process.env.REACT_APP_TOKEN }}
    ).then(res => {
      closeAllMenu(); getDate();
    }).catch(err => {
      toast.error("An error occurred")
      closeAllMenu()
    })
  }

  const rejectStatus = () => {
    axios.post(`${process.env.REACT_APP_URL}/api/hrp/v1/employee/openPosition/reject/${idx.id}`, {},
      { headers: { Authorization: process.env.REACT_APP_TOKEN }}
    ).then(res => {
      closeAllMenu(); getDate();
    }).catch(err => {
      toast.error("An error occurred")
      closeAllMenu()
    })
  }

  const getFile = async (id) => {
    setAnchor(null)
    setDocType(false)
    setErrorFile(false)
    setLoadingModal(true)
    await axios(`${process.env.REACT_APP_URL}/api/hrp/v1/employee/openPosition/applicant/resume/${id}`, {
      headers: { Authorization: process.env.REACT_APP_TOKEN },
      responseType: 'blob'
    }).then((blob) => {
      if (blob.data.type === "application/pdf" || /image/.test(blob.data.type)){
        setLoadingModal(false);
        setTimeout(() => {
          document.querySelector("#education_doc").src = window.URL.createObjectURL(blob.data);
        });
      }
      else {
        setLoadingModal(false); setDocType(true);
        setTimeout(() => { FileSaver.saveAs(blob.data, 'resume') });
      }
    }).catch(err => {
      console.log(err)
      setLoadingModal(false);
      setErrorFile(true);
    })
  };

  return (

    <div className="container py-3">
      <Box sx={{ width: '100%' }}>
        <Paper sx={{ width: '100%', mb: 2 }}>
          <TableContainer>
            <Table sx={{ minWidth: 750, px: 2 }} aria-labelledby="tableTitle" size='medium'>
              <EnhancedTableHead
                order={order} orderBy={orderBy}
                onRequestSort={handleRequestSort}
                rowCount={data.length}
              />
              {
                !loading &&
                <TableBody>
                  {stableSort(data, getComparator(order, orderBy))
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row, index) => {
                      return (
                      <TableRow hover tabIndex={-1} key={row.id}>
                          <TableCell align="left">{row.id}</TableCell>
                          <TableCell align="left">{row.first_name}</TableCell>
                          <TableCell align="left">{row.last_name}</TableCell>
                          <TableCell align="left">{row.phone_number}</TableCell>
                          <TableCell align="left">{row.status}</TableCell>
                          <TableCell align="left">
                            <Box sx={{ flexGrow: 0 }}>
                              <Tooltip title="Actions">
                                <IconButton onClick={(e, elem=row)=>openMenu(e, elem)} sx={{ p: 0 }}>
                                  <MoreVertIcon/>
                                </IconButton>
                              </Tooltip>
                              <Menu
                                sx={{ mt: "23px" }} id="menu-appbar"
                                anchorOrigin={{ vertical: "top", horizontal: "left" }}
                                transformOrigin={{ vertical: "top", horizontal: "left" }}
                                anchorEl={anchor} open={Boolean(anchor)} onClose={closeMenu}>
                                  <MenuItem className='m__item' onClick={()=>setViewModal()} data-bs-toggle="modal" data-bs-target="#viewModal">
                                    <Typography>View</Typography> 
                                  </MenuItem>
                                  <MenuItem className='m__item' onClick={()=>getFile(idx.id)} data-bs-toggle="modal" data-bs-target="#resumeModal">
                                    <Typography>Resume</Typography>
                                  </MenuItem>
                                  <MenuItem className='m__item' onClick={(e)=>setAnchor2(e.currentTarget)}><Typography>Status</Typography></MenuItem>
                              </Menu>
                              <Menu
                                sx={{ ml: "-76px" }} id="menu-appbar"
                                anchorOrigin={{ vertical: "top", horizontal: "right" }}
                                transformOrigin={{ vertical: "top", horizontal: "right" }}
                                anchorEl={anchor2} open={Boolean(anchor2)} onClose={()=>setAnchor2(null)}>
                                  <MenuItem disabled={idx.status !== 'new'} onClick={()=>callInterviewStatus()} id="option"><Typography>Called interview</Typography></MenuItem>
                                  <MenuItem disabled={idx.status !== 'new' && (idx.status !== 'called_interview')} onClick={()=>onbInitialStatus()} id="option"><Typography>Initiated</Typography></MenuItem>
                                  <MenuItem disabled={idx.status !== 'new' && (idx.status !== 'called_interview')} onClick={()=>rejectStatus()} id="option"><Typography>Rejected</Typography></MenuItem>
                              </Menu>
                            </Box>
                          </TableCell>
                        </TableRow>
                      )
                    })}
                </TableBody>
              }
            </Table>
            { 
            loading ? <LinearProgress /> :  errorMsg ? 
            <div className="w-100 all__center py-4 my-4">
              <p style={{color: "#ff0000", fontWeight: "550"}}>An error occurred while getting Applicants</p>
            </div> : ""
            }
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25, 100]} component="div"
            count={data.length} rowsPerPage={rowsPerPage}
            page={page} onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      </Box>

      <div className="modal fade" id="viewModal" tabIndex="-1" aria-labelledby="viewModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered modal-xl">
          <div className="modal-content bg-white">
            <div className="modal-header py-1">
              <h5 className="modal-title" id="viewModalLabel">View</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body px-2 pb-3">
              {
                loadingModal ?  <div className="w-100 all__center py-5 my-5"><CircularProgress /></div> : 
                modalValue ? <ViewModal value={modalValue} /> : <p className="error">An error occurred</p> 
              }
            </div>
          </div>
        </div>
      </div>

      <div className="modal fade" id="resumeModal" tabIndex="-1" aria-labelledby="resumeModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered modal-lg">
          <div className="modal-content bg-white">
            <div className="modal-header py-1">
              <h5 className="modal-title" id="resumeModalLabel">Resume</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body img-fluid">
            { loadingModal ? <CircularProgress /> : 
                errorFile ? 
                <div className="spinner-border text-info my-5" role="status">
                  <span className="visually-hidden">An error occurred</span>
                </div> :
                docType ? <h2 className="m-auto my-5">File downloaded!</h2> : <iframe id="education_doc" src="" alt="" height="750" width="900"/>
              }
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}