import * as React from 'react';
import { styled } from '@mui/material/styles';
import {useState} from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import CloseIcon from '@mui/icons-material/Close';
import TextField from '@mui/material/TextField';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import {FaEdit} from "react-icons/fa";  
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import {MdAddCircle,MdDelete} from "react-icons/md";
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import MenuItem from '@mui/material/MenuItem';
import Checkbox from '@mui/material/Checkbox';
import { TablePagination } from '@mui/material';
import { useDispatch, useSelector } from "react-redux"
import {setUserSlice} from '../../redux/slice/user'
import { nanoid } from "@reduxjs/toolkit"
import { CREATE_USER, UPDATE_USER_BY_ID } from "../../redux/types"
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import { DELETE_USER_BY_ID, GET_USERS } from '../../redux/types';



const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
//Modal for add user
const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));



const BootstrapDialogTitle = (props) => {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
};

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};


//table from MUI
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));


const Paginationstyle={
  marginRight:"5%"
}

const userrole = [
  {
    value: 'Admin',
    label: 'Admin',
  },
  {
    value: 'supplier',
    label: 'supplier',
  },
  {
    value: 'customer',
    label: 'customer',
  }
];

const IsFeatured = [
  {
    value: 'Yes',
    label: 'Yes',
  },
  {
    value: 'No',
    label: 'No',
  }
];

export default function ProductTable() {
  
//toggle functionality
  const [open, setOpen] = React.useState(false);

  const [featuredopen, setFeaturedOpen] = React.useState(false);
  //form handling state
  
  const[User,setUser]=useState('');
  const[from,setFrom]=useState('');
  const[to,setTo]=useState('');
  const[featuredData,setFeaturedData]=useState([]);

  const user = useSelector(state => state.user)

//pagination
const [page, setPage] = React.useState(0);
const [rowsPerPage, setRowsPerPage] = React.useState(5);


const rows = useSelector(state => state.users)

const dispatch = useDispatch()

React.useEffect(() => {
  dispatch({ type: GET_USERS })
}, [])
//pagination
const handleChangePage = (event, newPage) => {
  setPage(newPage);
};


//pagination
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };


  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    dispatch(setUserSlice({
      id: 0,
      Product_Id: '',
      ProductName: '',
      ProductType: '',
      Price:'',
      Is_Featured:'',
      Stock:'',
      Description:'',
      Image:'',
      User:''
  }))
  };
  

const handleChange = (prop) => (event) => {
  dispatch(setUserSlice({ ...user, [prop]: event.target.value }))
}


const handleSubmit = () => {
  user.id === 0 ? dispatch({ type: CREATE_USER, user: { ...user, id: nanoid(8) } }) : dispatch({ type: UPDATE_USER_BY_ID, user })

  dispatch(setUserSlice({
      id: 0,
      Product_Id: '',
      ProductName: '',
      ProductType: '',
      Price:'',
      Is_Featured:'',
      Stock:'',
      Description:'',
      Image:'',
      User:''
  }))

  handleClose();
}

//pagination
const emptyRows =
rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);


const feature={featuredData,
  From_Date:from.toString(),
  To_Date:to}

const handleFeaturedClickOpen = (user) => {
  setFeaturedOpen(true);
  setFeaturedData(user);
};

const handleFeaturedClose = () => {
  setFeaturedOpen(false);
};



const featuredSubmit=(e)=>{
e.preventDefault();
axios.post('http://localhost:3000/FeaturedProduct',feature)
}

    return (
        <div>
      <TableContainer>
      <div style={{marginLeft:'90%',fontSize:"40px",cursor:"pointer"}}>
      <MdAddCircle  onClick={handleClickOpen}/>
      <BootstrapDialog
      aria-labelledby="customized-dialog-title"
      open={open}
    >
      <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
      {user.id===0 ? "Add User":"Edit User"} 
      </BootstrapDialogTitle>
      <form>
      <Box
    sx={{
      '& > :not(style)': { m: 1, width: '60ch',height:'6ch' },
    }}
    noValidate
    autoComplete="off"
  >
  <input value={user.id} fullWidth disabled />
  <TextField label="ProductId" color="secondary" fullWidth value={user.Product_Id} onChange={handleChange('Product_Id')} required/>
    <TextField label="ProductName" color="secondary" fullWidth value={user.ProductName} onChange={handleChange('ProductName')} required/>
    <TextField label="ProductType" color="secondary" type="text" fullWidth value={user.ProductType} onChange={handleChange('ProductType')} required/>
    <TextField label="Price" color="secondary" type="number" fullWidth value={user.Price} onChange={handleChange('Price')} required/>
    <TextField
    select
    label="Is_Featured"
    color="secondary"
    fullWidth
    value={user.Is_Featured} onChange={handleChange('Is_Featured')} required
  >
    {IsFeatured.map((option) => (
      <MenuItem key={option.value} value={option.value}>
        {option.label}
      </MenuItem>
    ))}
  </TextField>
    
    <TextField label="Stock" color="secondary" type="number" fullWidth value={user.Stock} onChange={handleChange('Stock')} required/>
    <TextField label="Description" color="secondary" fullWidth value={user.Description} onChange={handleChange('Description')} required/>
    <TextField label="Image" color="secondary" fullWidth value={User.Image} onChange={handleChange('Image')} required/>
    <TextField
    select
    label="UserRole"
    color="secondary"
    fullWidth
    value={User.User} onChange={handleChange('User')} required
  >
    {userrole.map((option) => (
      <MenuItem key={option.value} value={option.value}>
        {option.label}
      </MenuItem>
    ))}
  </TextField>
    <Button variant="contained" size="small" color="success" type="submit" onClick={() => handleSubmit()}> {user.id===0 ? "Add User":"Edit User"}</Button>
  </Box>
  </form>
    </BootstrapDialog>
      </div>
      {/*ref inside table to download data in excel format*/}
        <Table sx={{ minWidth: 700 }} style={{width:"80%",marginLeft:"16%",marginTop:"1%"}} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell align="center" style={{width:"40px"}}>Product_Id</StyledTableCell>
              <StyledTableCell align="center">ProductName</StyledTableCell>
              <StyledTableCell align="center">ProductType</StyledTableCell>
              <StyledTableCell align="center">Price</StyledTableCell>
              <StyledTableCell align="center">Stock</StyledTableCell>
              <StyledTableCell align="center">Is Featured</StyledTableCell>
              <StyledTableCell align="center">Action</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
          {/*for pagination adding slice before slice*/}
            {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((user,id) => (
              <StyledTableRow key={user.id}>
                <StyledTableCell align="center">{user.Product_Id}</StyledTableCell>
                <StyledTableCell align="center">{user.ProductName}</StyledTableCell>
                <StyledTableCell align="center">{user.ProductType}</StyledTableCell>
                <StyledTableCell align="center">{user.Price}</StyledTableCell>
                <StyledTableCell align="center">{user.Stock}</StyledTableCell>
                <StyledTableCell align="center"><Checkbox {...label} onClick={()=>handleFeaturedClickOpen(user)}/></StyledTableCell>
                <StyledTableCell align="center"><FaEdit style={{cursor:"pointer"}} onClick={() =>{ 
                  handleClickOpen()
                  dispatch(setUserSlice(user))}}/> &nbsp;&nbsp;<MdDelete onClick={() => dispatch({ type: DELETE_USER_BY_ID, id: user.id })} style={{cursor:"pointer"}}/></StyledTableCell>
              </StyledTableRow>
            ))}

            {/*featured product*/}
            <Dialog open={featuredopen} onClose={handleFeaturedClose}>
            <DialogActions style={{display:"flex",justifyContent:"space-between"}}>
            <DialogTitle>Featured Product Form</DialogTitle> <Button onClick={handleFeaturedClose} style={{color:"black"}}>X</Button>
        </DialogActions>
        
        
        <DialogContent>
        <form onSubmit={featuredSubmit}>
        <label htmlFor="from">From</label>
          <TextField
            autoFocus
            value={from}
            onChange={(e)=>setFrom(e.target.value)}
            margin="dense"
            id="from"
            type="datetime-local"
            color="secondary"
            fullWidth
          />
          <label htmlFor="to">To</label>
          <TextField
          autoFocus
          margin="dense"
          value={to}
          onChange={(e)=>setTo(e.target.value)}
          id="to"
          type="datetime-local"
          color="secondary"
          fullWidth
        /><br/>
        <Button type="submit" variant="contained" style={{marginLeft:"30%",marginTop:"4%"}}>Submit</Button>
        </form>
        </DialogContent>
        
      </Dialog>
            {/*pagination for empty rows*/}
            {emptyRows > 0 && (
              <TableRow style={{ height: 53 * emptyRows }}>
                <TableCell colSpan={6} />
              </TableRow>
            )}

          </TableBody>
        </Table>
{/* pagination to be added before table container closing tag*/}
        <TablePagination
        style={Paginationstyle}
        rowsPerPageOptions={[3,5,7]}
        component="div"
        count={rows.length}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
      </TableContainer>
    <ToastContainer />
    </div>
    );
}