import React from 'react'
import { styled } from '@mui/material/styles';
import {useState,useEffect} from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import CloseIcon from '@mui/icons-material/Close';
import TextField from '@mui/material/TextField';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import MenuItem from '@mui/material/MenuItem';
import {useNavigate} from 'react-router-dom';
import Header from '../ui/Header';
import DummyTable from './DummyTable';
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

function UserEditComponent() {
    const [open, setOpen] = React.useState(true);
    const[show,setShow]=useState(false);
    const [change, setChange] = useState(false);
    const[FirstName,setFirstName]=useState('');
    const[LastName,setLastName]=useState('');
    const[MobileNo,setMobileNo]=useState('');
    const[Emailid,setEmailId]=useState('');
    const[UserRole,setUserRole]=useState('');
    const[UserName,setUserName]=useState('');
   const[admin,setAdmin]=useState(false);
  const [id, setID] = useState(0);
  const navigate = useNavigate();
  

  useEffect(() => {
    setID(localStorage.getItem('ID'))
    setFirstName(localStorage.getItem('FirstName'))
    setLastName(localStorage.getItem('LastName'))
    setMobileNo(localStorage.getItem('MobileNo'))
    setEmailId(localStorage.getItem('Emailid'))
    setUserRole(localStorage.getItem('UserRole'))
    setUserName(localStorage.getItem('UserName'))
    let adminCheck=sessionStorage.getItem('UserRole');
    if(adminCheck==='admin'){
      setAdmin(!admin)
    }
}, []);






    const Toggle=()=>{
      setShow(!show)
      setChange(!change);
    }
  
   
  
    const handleClickOpen = () => {
      setOpen(!open);
    };
    const handleClose = () => {
      navigate('/homepage/user')
    };

    const notify = () => {
        toast.success("User Updated Successfully",{position:toast.POSITION.TOP_RIGHT,theme:'colored'});
        }
  
   const UpdateHandler=(e)=>{
    e.preventDefault();
   
    var data={FirstName,
      LastName,
      MobileNo,
      Emailid,
      UserRole,
      UserName
    };
    
    axios.patch(`https://vigneshecommerce.herokuapp.com/${id}`,data).then(() => {
        notify()
        setTimeout(()=>{
          navigate('/homepage/user')
        },1000)
       
    })

     }
  
  return (
    <div>
    <Header/>
    <DummyTable/>
    <BootstrapDialog
    aria-labelledby="customized-dialog-title"
    open={open}
  >
    <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
    Edit User Details
    </BootstrapDialogTitle>
    <form onSubmit={UpdateHandler}>
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

{admin && <Button variant="contained" size="small" color="primary" type="submit" style={change?changebutton:addbutton}>Update User</Button>}
</Box>
</form>
  </BootstrapDialog>
  <ToastContainer />
  </div>
  )
}

export default UserEditComponent