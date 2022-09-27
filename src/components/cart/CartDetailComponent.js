import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useSelector,useDispatch } from 'react-redux';
import { getCart,removeToCart } from '../../redux/action';
import { useEffect } from 'react';
import Header from '../ui/Header';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import classes from '../../CSSSTYLE/cart.module.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

function CartDetailComponent() {

  const dispatch=useDispatch();
    const cartData=useSelector((state)=>state.cartData)

   const amount=cartData.length && cartData.map((item)=>parseInt(item.Price)).reduce((prev,next)=>parseInt(prev)+parseInt(next))
    const navigate=useNavigate();
    
    useEffect(()=>{
      dispatch(getCart())
  },[])

  const notify = () => {
    toast.success("Payment Successful!",{position:toast.POSITION.TOP_RIGHT,theme:'colored',toastId:1});
    }

  const handleCheckout = () => {
    var options = {
      key: "rzp_test_qomLGqRGjjQhK6",
      key_secret: "NWheQnikzyPzsa0H57jjh2tW",
      amount: (amount + amount * 0.1) * 100,
      currency: "INR",
      name: "VKart",
      description: "for testing purpose",
      handler: function () {
        notify("Payment Successful!");
      },
      prefill: {
        name: "Vignesh",
        email: "vigneshactech2015@gmail.com",
        contact: "9500982821",
      },
      notes: {
        address: "Razorpay Corporate office",
      },
      theme: {
        color: "#2D3436",
      },
    };
    var pay = new window.Razorpay(options);
    pay.open();
  };

  return (
   <div >


    <Header/>

    <Box sx={{ width: 1 }} style={{width:"90%",marginLeft:"7%",marginTop:"4%"}} className={classes.cartDetail}>

    {cartData.length>0 &&
    <Box display="grid" gridTemplateColumns="repeat(12, 1fr)" gap={2}>
      <Box gridColumn="span 9">
        <Item>
        
        {cartData.map((cart)=>
        <Box display="grid" gridTemplateColumns="repeat(12, 1fr)" gap={2}>
        <Box gridColumn="span 7">
        <Item>
        <CardMedia
        style={{objectFit:"contain",gap:"5%"}}
        component="img"
        height="200"
        image={cart.Image[0].Image}
        alt="productImage"
      />
        </Item>
      </Box>
      
      <Box gridColumn="span 5">
        <Item>
        <Typography variant="h5" gutterBottom style={{color:"black"}}>
        {cart.ProductName}
      </Typography><br/>
      <Typography variant="h6" gutterBottom style={{color:"blue"}}>
      &#8377;{cart.Price}
    </Typography><br/>
   
    <Typography variant="p" gutterBottom>
      {cart.ProductType}
    </Typography><br/><br/>
    <Button variant="contained"  size="small" onClick={()=>(dispatch(removeToCart(cart.id)))} style={{cursor:"pointer",backgroundColor:"red"}}>Remove</Button>
        </Item>
      </Box>
        
   
    

    </Box>

    )
  }

        </Item>
      </Box>
      <Box gridColumn="span 3">
        <Item>
        <Typography variant="h6" gutterBottom>
        Total Price
      </Typography>
        <Typography variant="h6" gutterBottom>
        Amount : {amount}
      </Typography>
      <Typography variant="h6" gutterBottom>
      Tax(10%) : {amount*0.10}
    </Typography>
   
    <Typography variant="h5" gutterBottom style={{color:"green"}}>
    Total : {amount+(amount*0.10)}
    </Typography>
    <Button variant="contained" style={{cursor:"pointer"}} className={classes.checkoutbutton} onClick={handleCheckout}>Buy Now</Button>
        </Item>
      </Box>
      
    </Box>
  }

  {cartData.length==0 && 
    <div style={{marginLeft:"35%"}} className={classes.emptyCart}>
    <img style={{height:"250px",width:"250px",objectFit:"contain"}} src="https://thumbs.dreamstime.com/b/empty-shopping-cart-closeup-white-background-86468541.jpg" alt="emptycart"/>
    <p style={{marginLeft:"6%"}}>Your Cart is empty</p>
    <Button style={{marginLeft:"7%"}} variant="contained" onClick={()=>navigate('/homepage/product')}>Shop Now</Button>
  </div>
  }
  </Box>
  <ToastContainer />
</div>


  )
}

export default CartDetailComponent