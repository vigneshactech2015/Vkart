import * as React from 'react';
import { styled } from '@mui/material/styles';
import {useState,useEffect,useRef} from 'react';
import { useDownloadExcel } from 'react-export-table-to-excel';
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
import classes from '../../CSSSTYLE/view.module.css';
import Button from '@mui/material/Button';
import {MdAddCircle,MdDelete} from "react-icons/md";
import axios from 'axios';
import {FcDownload} from "react-icons/fc";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import MenuItem from '@mui/material/MenuItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import {useNavigate} from 'react-router-dom';
//pagination
import TablePagination from '@mui/material/TablePagination';

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


//for select(drop down input field)
const userrole = [
  {
    value: 'admin',
    label: 'admin',
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

//Add user alignment
const addbutton={
  width:"40%",
  marginTop:"2%",
  padding:"10px 30px",
  marginLeft:"30%"
}

const changebutton={
 marginTop:"2%",
 width:"40%",
 padding:"10px 30px",
 marginLeft:"30%"
}

const changefield={
  marginTop:"1%"
}

const addfield={
}

const changeitem={
  marginTop:"65%",
}

const changesitem={
}

const Paginationstyle={
  marginRight:"5%"
}


export default function UserTable({users,get} ) {
  //admin
  const[admin,setAdmin]=useState(false);
  //table download
  const tableRef = useRef(null);
  
//toggle functionality
  const [open, setOpen] = React.useState(false);
  const[show,setShow]=useState(false);
  const [change, setChange] = useState(false);

  //toggle for image
  const [imageopen, setImageOpen] = React.useState(false);
  const[showimage,setShowImage]=useState(false);
  const [changeimage, setChangeImage] = useState(false);


  //form handling state
  const[FirstName,setFirstName]=useState('');
  const[LastName,setLastName]=useState('');
  const[MobileNo,setMobileNo]=useState('');
  const[Emailid,setEmailId]=useState('');
  const[UserRole,setUserRole]=useState('');
  const[UserName,setUserName]=useState('');
const[Facebook,setFacebook]=useState('');
const[Linkedin,setLinkedin]=useState('');
const[Twitter,setTwitter]=useState('');
const[gmail,setGmail]=useState('');
const[Youtube,setYoutube]=useState('');

//file upload
const [file, setFile] = useState([]);
//routing
const navigate = useNavigate();

//pagination
const [page, setPage] = React.useState(0);
const [rowsPerPage, setRowsPerPage] = React.useState(5);

//for knowing whether he is admin
const[usertype,setusertype]=useState('');

//pagination
const handleChangePage = (event, newPage) => {
  setPage(newPage);
};


//pagination
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

//show and hide
  const Toggle=()=>{
    setShow(!show)
    setChange(!change);
  }
 
//show and hide for image
const ToggleImage=()=>{
  setShowImage(!showimage)
  setChangeImage(!changeimage);
}


  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  //toastify
  const notify = () => {
    toast.success("User added Successfully",{position:toast.POSITION.TOP_RIGHT,theme:'colored'});
    }

    const notifyexport = () => {
      toast.error("Only Admin User to View Status",{position:toast.POSITION.TOP_RIGHT,theme:'colored'});
      }

      const notifydelete = () => {
        toast.success("User has been deleted Successfully",{position:toast.POSITION.TOP_RIGHT,theme:'colored'});
        }
  

  const SubmitHandler=(e)=>{
  e.preventDefault();

  var Social={
    Facebook,
    Linkedin,
    Twitter,
    gmail,
    Youtube
  }


var images= [{"image1":file}]



var data={FirstName,
  LastName,
  MobileNo,
  Emailid,
  UserRole,
  UserName,
 Social,
 images
};


axios.post('https://vigneshecommerce.herokuapp.com/data',data).then(()=>{notify();get()});
setFirstName('');
setLastName('');
setMobileNo('');
setEmailId('');
setUserRole('');
setUserName('');
setFacebook('');
setLinkedin('');
setTwitter('');
setGmail('');
setYoutube('');
setFile('');
}


const updateData=(user)=>{
  let{id,FirstName,LastName,MobileNo,Emailid,UserRole,UserName}=user;
  
  localStorage.setItem('ID', id);
  localStorage.setItem('FirstName', FirstName);
  localStorage.setItem('LastName', LastName);
  localStorage.setItem('MobileNo',MobileNo);
  localStorage.setItem('Emailid',Emailid);
  localStorage.setItem('UserRole', UserRole);
  localStorage.setItem('UserName', UserName);
  navigate('/homepage/user/edit');
}



//pagination
const emptyRows =
rowsPerPage - Math.min(rowsPerPage, users.length - page * rowsPerPage);

//checking if admin
useEffect(()=>{
  const role=sessionStorage.getItem('UserRole')
  setusertype(role)
  if(role==='admin'){
    setAdmin(!admin)
   }
   
},[])


const deleteHandler=(id)=>{
  axios.delete(`https://vigneshecommerce.herokuapp.com/data/${id}`)
        .then(() => {
          notifydelete();
            get();
        })
}

//export functionality
const { onDownload } = useDownloadExcel({

  currentTableRef: tableRef.current,
  filename: 'Users table',
  sheet: 'Users'
})

//non admin can't download data
const nonadmin=()=>{
  notifyexport()
}


//file upload

function uploadSingleFile(e) {
  setFile([...file, URL.createObjectURL(e.target.files[0])]);
    console.log("file", file);
}



function deleteFile(e) {
  const s = file.filter((item, index) => index !== e);
  setFile(s);
  console.log(s);
}


    return (
        <div>
      <TableContainer>
      <div className={classes.exportbutton} style={{marginLeft:"16%"}}>
       {/* non admin can't download data*/}
      <Button variant="text" size="large" onClick={usertype==='admin'?onDownload:nonadmin}><FcDownload fontSize="inherit"/>Export</Button>
     
      {/* if admin can add data*/}
      {admin &&  <MdAddCircle className={classes.user} onClick={handleClickOpen}/>}
      <BootstrapDialog
      aria-labelledby="customized-dialog-title"
      open={open}
    >
      <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
      Add User Details
      </BootstrapDialogTitle>
      <form onSubmit={SubmitHandler}>
      <Box
    sx={{
      '& > :not(style)': { m: 1, width: '60ch',height:'6ch' },
    }}
    noValidate
    autoComplete="off"
  >



    <TextField label="FirstName" color="secondary" fullWidth value={FirstName} onChange={(e)=>setFirstName(e.target.value)} required/>
    <TextField label="LastName" color="secondary" fullWidth value={LastName} onChange={(e)=>setLastName(e.target.value)} required/>
    <TextField label="MobileNo" color="secondary" type="number" fullWidth value={MobileNo} onChange={(e)=>setMobileNo(e.target.value)} required/>
    <TextField label="Emailid" color="secondary" type="email" fullWidth value={Emailid} onChange={(e)=>setEmailId(e.target.value)} required/>
    <TextField
    select
    label="UserRole"
    color="secondary"
    fullWidth
    value={UserRole} onChange={(e)=>setUserRole(e.target.value)} required
  >
    {userrole.map((option) => (
      <MenuItem key={option.value} value={option.value}>
        {option.label}
      </MenuItem>
    ))}
  </TextField>
    <TextField label="UserName" color="secondary" fullWidth value={UserName} onChange={(e)=>setUserName(e.target.value)} required/>
  
    <ListItemButton onClick={Toggle}>
    <ListItemIcon>
      <InboxIcon />
    </ListItemIcon>
    <ListItemText primary="Social" />
    {show ? <ExpandLess /> : <ExpandMore />}
    </ListItemButton>
{/*toggle functionality*/}
    {show &&
      <div>
      <TextField label="Facebook" color="secondary" value={Facebook} onChange={(e)=>setFacebook(e.target.value)} fullWidth required/><br/><br/>
    <TextField label="Linkedin" color="secondary" value={Linkedin} onChange={(e)=>setLinkedin(e.target.value)} fullWidth required/><br/><br/>
    <TextField label="Twitter" color="secondary" value={Twitter} onChange={(e)=>setTwitter(e.target.value)} fullWidth required/><br/><br/>
    <TextField label="gmail" color="secondary" value={gmail} onChange={(e)=>setGmail(e.target.value)} fullWidth required/><br/><br/>
    <TextField label="Youtube" color="secondary" value={Youtube} onChange={(e)=>setYoutube(e.target.value)} fullWidth  required/><br/><br/>
  </div>
  }

  {/*toggle functionality for image*/}
  <ListItemButton onClick={ToggleImage} style={change?changeitem:changesitem}>
  <ListItemIcon>
    <InboxIcon />
  </ListItemIcon>
  <ListItemText primary="Images" />
  {showimage ? <ExpandLess /> : <ExpandMore />}
  </ListItemButton>
{/*togglefunctionality*/}
  {showimage &&
    <div>
    <div>
        {file.length > 0 &&
          file.map((item, index) => {
            return (
              <div key={item}>
                <img style={{height:"40px",width:"40px"}} src={item} alt="" />
                <button type="button" onClick={() => deleteFile(index)}>
                  delete
                </button>
              </div>
            );
          })}
      </div>

      <div>
        <input
          type="file"
          disabled={file.length === 5}
          onChange={uploadSingleFile}
          style={change?changefield:addfield}
          multiple
          required
        />
      </div>
      
</div>
}
    <Button variant="contained" size="small" color="success" type="submit" style={change?changebutton:addbutton}>Add User</Button>
  </Box>
  </form>
    </BootstrapDialog>
      </div>
      {/*ref inside table to download data in excel format*/}
        <Table ref={tableRef}  sx={{ minWidth: 700 }} style={{width:"80%",marginLeft:"16%",marginTop:"1%"}} aria-label="customized table">
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
            {users.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((user,id) => (
              <StyledTableRow key={user.id}>
                <StyledTableCell align="center">{user.FirstName}</StyledTableCell>
                <StyledTableCell align="center">{user.LastName}</StyledTableCell>
                <StyledTableCell align="center">{user.MobileNo}</StyledTableCell>
                <StyledTableCell align="center">{user.Emailid}</StyledTableCell>
                <StyledTableCell align="center">{user.UserRole}</StyledTableCell>
                <StyledTableCell align="center">{user.UserName}</StyledTableCell>
                <StyledTableCell align="center"  ><FaEdit onClick={()=>updateData(user)} style={{cursor:"pointer"}}/> &nbsp;&nbsp;{admin && <MdDelete onClick={()=>deleteHandler(user.id)} style={{cursor:"pointer"}}/>}</StyledTableCell>
              </StyledTableRow>
            ))}
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
        count={users.length}
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