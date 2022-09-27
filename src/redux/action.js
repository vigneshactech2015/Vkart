//here data is coming from ui that is app.js
import { ADD_TO_CART,REMOVE_FROM_CART,EMPTY_CART,GET_CART } from "./constant";


//extra

export const addToCart=(data)=>{
    console.log("action is called")
    return{
        
       type: ADD_TO_CART,
        data:data
    };
}


export const getCart=(data)=>{
    console.log("action is called")
    return{
        type:GET_CART,
        data:data
    };
}



export const removeToCart=(data)=>{
    console.log("removal action is called",data)
    return{
        type:REMOVE_FROM_CART,
        data:data
    };
}



