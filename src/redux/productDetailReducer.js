import { PRODUCT_DETAIL } from "./constant"

export const productDetail=(data=[],action)=>{

    switch(action.type){
       
                    case PRODUCT_DETAIL:
                    console.warn("PRODUCT_DETAIL Condition",action)
                    return [action.data]
        
            default:
                return data
    }
}