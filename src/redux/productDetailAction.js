
import { PRODUCT_DETAIL } from './constant';

export const productDetail=(data)=>{
    console.log("action is called",data)
    return{
        type:PRODUCT_DETAIL,
        data:data
    };
}
  

