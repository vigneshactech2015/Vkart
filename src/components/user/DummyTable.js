import * as React from 'react';
import { styled } from '@mui/material/styles';
import {useState,useEffect} from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import {FaEdit} from "react-icons/fa";  
import classes from '../../CSSSTYLE/view.module.css';
import Button from '@mui/material/Button';
import {MdDelete} from "react-icons/md";
import axios from 'axios';
import {FcDownload} from "react-icons/fc";
import '../../CSSSTYLE/pagination.css';
//pagination
import TablePagination from '@mui/material/TablePagination';

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
  

function DummyTable() {
const[data,setData]=useState([]);
const [page, setPage] = React.useState(0);
const [rowsPerPage, setRowsPerPage] = React.useState(5);


const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  
  
  //pagination
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };


    const get=()=>{
axios.get('https://vigneshecommerce.herokuapp.com/data').then((res)=>setData(res.data))
    }

    useEffect(()=>{
get()
    },[])

  return (
    <div>
    <TableContainer>
    <div className={classes.exportbutton} style={{marginLeft:"16%"}}>
     {/* non admin can't download data*/}
    <Button variant="text" size="large" ><FcDownload fontSize="inherit"/>Export</Button>
   </div>
    {/* if admin can add data*/}
   
    {/*ref inside table to download data in excel format*/}
      <Table  sx={{ minWidth: 700 }} style={{width:"80%",marginLeft:"16%",marginTop:"1%"}} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell align="center" style={{width:"40px"}}>First Name</StyledTableCell>
            <StyledTableCell align="center">Last Name</StyledTableCell>
            <StyledTableCell align="center">Mobile No</StyledTableCell>
            <StyledTableCell align="center">Email id</StyledTableCell>
            <StyledTableCell align="center">User Role</StyledTableCell>
            <StyledTableCell align="center">User Name</StyledTableCell>
            <StyledTableCell align="center">Action</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
        {/*for pagination adding slice before slice*/}
          {data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((user,id) => (
            <StyledTableRow key={user.id}>
              <StyledTableCell align="center">{user.FirstName}</StyledTableCell>
              <StyledTableCell align="center">{user.LastName}</StyledTableCell>
              <StyledTableCell align="center">{user.MobileNo}</StyledTableCell>
              <StyledTableCell align="center">{user.Emailid}</StyledTableCell>
              <StyledTableCell align="center">{user.UserRole}</StyledTableCell>
              <StyledTableCell align="center">{user.UserName}</StyledTableCell>
              <StyledTableCell align="center"  ><FaEdit  style={{cursor:"pointer"}}/><MdDelete style={{cursor:"pointer"}}/></StyledTableCell>
            </StyledTableRow>
          ))}
          {/*pagination for empty rows*/}
      

        </TableBody>
      </Table>
{/* pagination to be added before table container closing tag*/}
      <TablePagination
      style={Paginationstyle}
      className="mobile"
      rowsPerPageOptions={[3,5,7]}
      component="div"
      count={data.length}
      page={page}
      onPageChange={handleChangePage}
      rowsPerPage={rowsPerPage}
      onRowsPerPageChange={handleChangeRowsPerPage}
    />

    </TableContainer>
 
  </div>
  )
}

export default DummyTable