import React,{useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux';
import './slider.css';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {productList} from '../../redux/productAction';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    speed: 1000,
    autoplaySpeed: 2000,
    cssEase: "linear",
  };


function SliderProduct() {
    const dispatch=useDispatch();
let data=useSelector((state)=>state.productData)

useEffect(()=>{
    dispatch(productList())
},[])


return (
    <div>
    <h2 style={{marginLeft:"10%"}} className='featuredtitle'>Featured Product</h2>
    <Slider className="slider_mobile"
            style={{
              margin: "25px",
              marginTop: "10%",
              width: "85%",
              marginLeft: "150px",
            }}
            {...settings}
          >
            {data.map((featuredProducts) => {
              return (
                <div>
                  <Card sx={{ maxWidth: 230, textAlign: "center", border: "1px solid black" }}>
                    <CardActionArea>
                      <CardMedia
                        component="img"
                        height="200"
                        image={featuredProducts.Image[0].Image}
                      />
                      <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                          {featuredProducts.ProductName}
                        </Typography>
                        <Typography style={{color: "green"}}>{featuredProducts.ProductType}</Typography>
                        <Typography style={{ color: "blue" }}>
                          {featuredProducts.From_Date}
                        </Typography>
                        <Typography style={{ color: "blue" }}>
                          {featuredProducts.To_Date}
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                  </Card>
                </div>
              );
            })}
          </Slider>

    </div>
  )
}

export default SliderProduct