import { productDetail } from '../../redux/productDetailAction';
import { useDispatch, useSelector } from 'react-redux';
import {productList} from '../../redux/productAction';
import { useEffect,useState } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import { experimentalStyled as styled } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import {addToCart} from './../../redux/action';
import Button from '@mui/material/Button';
import '../../CSSSTYLE/pagination.css';


const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));


function Product() {
 //dispatching action from ui to store via action 
const dispatch=useDispatch();
const navigate=useNavigate();
let data=useSelector((state)=>state.productData)
//pagination
const[currentPage,setCurrentPage]=useState(1)
const[postsPerPage,setPostsPerPage]=useState(6)
let pages=[];

for(let i=1;i<=Math.ceil(data.length/postsPerPage);i++){
  pages.push(i);
}

useEffect(()=>{
    dispatch(productList())
},[])

//pagination
const lastPostIndex=currentPage*postsPerPage;
const firstPostIndex=lastPostIndex-postsPerPage;



 
  return (
    <div>
    
    <Box sx={{ flexGrow: 1 }} style={{width:"78%",marginLeft:"17%",padding:"1% 5%",backgroundColor:"#F5F5F5"}}>
    <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
      {data.slice(firstPostIndex,lastPostIndex).map((product, index) => ( 
        
        <Grid item xs={2} sm={4} md={4} key={index}>

          <Item>
        <CardMedia
          style={{objectFit:"contain",cursor:"pointer"}}
          component="img"
          height="140"
          image={product.Image[0].Image}
          alt={product.ProductName}
          onClick={()=>{dispatch(productDetail(product))
            navigate('/homepage/product/detail')}}
      />
      <CardContent>
          <Typography variant="h6" style={{cursor:"pointer",color:"#28659E",textAlign:"start"}} component="div" gutterBottom onClick={()=>{dispatch(productDetail(product))
            navigate('/homepage/product/detail')}}>
            {product.ProductName}
          </Typography>
          <Typography style={{textAlign:"start",color:"black"}} variant="h6" gutterBottom>
            INR : <span style={{color:"green"}}>{product.Price}</span>
          </Typography>
          <Typography style={{textAlign:"start"}} display="block" variant="caption" gutterBottom>
          only  : <span style={{color:"red"}}>{product.Stock}</span> left in stock
        </Typography>
        <Button size="small" variant="contained" style={{backgroundColor:"#FF9F00",float:"left"}} onClick={()=>{
          (dispatch(addToCart(product)))
         }}>Add To Cart</Button>
        </CardContent>
          </Item>
        </Grid>
      ))}
    </Grid>
    <div className='pagination'>
{pages.map((page,index)=>{
  return <button key={index} onClick={()=>setCurrentPage(page)} className={page===currentPage?'active':''}>{page}</button>
})}
</div>
  </Box>
  </div>
  )

}

export default Product;