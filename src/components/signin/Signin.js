import * as React from 'react';
import { useEffect } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {useNavigate} from 'react-router-dom';

//for toastify
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

//md5 for encryption
import md5 from 'md5';
import axios from 'axios';


const theme = createTheme();

export default function SignIn() {


    const[email, setEmail] =React.useState('');
    const[password, setPassword] =React.useState('');
    const[data,setData]=React.useState([]);
    const navigate = useNavigate();

    useEffect(()=>{
      axios.get("https://vigneshecommerce.herokuapp.com/data/").then((response)=>setData(response.data));
    },[])

    //for toastify
    const notify = () => {
        toast.error("Invalid Credentials!",{position:toast.POSITION.TOP_RIGHT,theme:'colored',toastId:1});
        }

        const notifySuccess = () => {
          toast.success("User logged in success",{position:toast.POSITION.TOP_RIGHT,theme:'colored',toastId:1});
          }
    
          let encodedVal=md5(password);
      
      
          const handleSubmit =(e) => {

        e.preventDefault();
      //encrypting password before sending to server
      data.map((auth)=>{
    if(auth.UserName===email&&auth.Password===encodedVal){
    sessionStorage.setItem('UserRole',auth.UserRole);
    notifySuccess();
   setTimeout(()=>{
    navigate('/homepage/product')
    },1000)
  }
}
)
return notify()
      }

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Login 
          </Typography>
          <Box noValidate sx={{ mt: 1 }}>
          <ToastContainer />
          <form onSubmit={handleSubmit}>
          <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              value={email} 
              label="username"
              name="email"
              autoComplete="email"
              autoFocus
              onChange={(e) => setEmail(e.target.value)}/>
              <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              LOGIN
            </Button>
           
            </form>
            <Grid container>
              <Grid item xs>
               
              </Grid>
              <Grid item>
                
              </Grid>
            </Grid>
           
          </Box>
        </Box>
      </Container> 
    </ThemeProvider>
  );
}