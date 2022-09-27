import React from 'react'
import {useDispatch, useSelector} from 'react-redux';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import ReactImageMagnify from 'react-image-magnify';
import { useNavigate } from 'react-router-dom';
import Header from '../ui/Header';
import {addToCart} from './../../redux/action';
import '../../CSSSTYLE/productdetail.css';
import { useState,useEffect} from 'react';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));


const Div = styled('div')(({ theme }) => ({
  ...theme.typography.button,
  backgroundColor: theme.palette.background.paper,
  padding: theme.spacing(1),
}));


function ProductDetailComponent() {
  const dispatch=useDispatch();
  const navigate=useNavigate();
  const productData=useSelector((state)=>state.productDetail)

  const [picture, setPicture] = useState([]);
  
  useEffect(() => {
    productData.map((item) => {
      setPicture(item.Image[0].Image)})
  },[]);

    const viewImage = (image) => {
      setPicture(image);
    };

  return (

    <section >
    <Header/>
    {productData.map((product,index)=>{
      return( <div key={product.index}>
 <Box sx={{ flexGrow: 1 }} style={{width:"86%",marginLeft:"14%",padding:"1% 5%"}}>
 <Grid container spacing={2} sx={{height: 220}}>
   <Grid item xs={4}>
   <Item>
   <ReactImageMagnify
   {...{
     smallImage: {
       alt: "Items",
       height: 440,
       isFluidWidth: true,
       src: picture,
     },
     largeImage: {
       src: picture,
       width: 1200,
       height: 1800,
     },
     enlargedImageContainerDimensions: {
       width: "125%",
       height: "125%",
     },
   }}
 />
   </Item>  <br/>
   <div style={{display:"flex",justifyContent:"space-around"}}  className="multipleImage">
   {product.Image.map((image) => {
     return  (
       <div>
         <img
           srcSet={image.Image}
           onClick={() => viewImage(image.Image)}
           width="80"
           style={{border: '1px solid grey',cursor:"pointer"}}
         />
       </div>
     );
   })}
 </div><br/>
 <Button size="small" variant="contained" style={{backgroundColor:"#FF9F00"}} onClick={()=>{
  (dispatch(addToCart(product)))
 }}>Add To Cart</Button><br/><br/>
<Button variant="contained" onClick={()=>navigate('/homepage/product')}>Go back</Button>    
  
</Grid>
   <Grid item xs={8}>
     <Item style={{textAlign:"start"}}>
 <h2 style={{color:"#28659E"}}>{product.ProductName}</h2>
 <h3 style={{color:"black"}}>INR {product.Price}</h3>
 <Typography>{product.Description}</Typography>
 <p>{product.ProductType}</p>
 <p>No of items available :<b style={{color:"green"}}>{product.Stock}</b></p>
     </Item>
   </Grid>
 </Grid>
</Box>
       </div>  
       )
     })}

  
    </section>



  )
}

export default ProductDetailComponent