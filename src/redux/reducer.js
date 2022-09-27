//reducer must always return something
import {REMOVE_FROM_CART,SET_GET_FROM_CART,ADD_TO_CART} from "./constant"


export const cartData=(data=[],action)=>{

    switch(action.type){
        case SET_GET_FROM_CART:
            console.warn("SET_GET_FROM_CART Condition",action)
            //action.data coming from action.js file
            
            return [...action.data]

            case ADD_TO_CART:
                console.warn("ADD_TO_CART Condition",action)
                //action.data coming from action.js file
                
                return [...data,action.data]

                
            case REMOVE_FROM_CART:
                console.warn("REMOVE_FROM_CART Condition",action)
                return [...data]

        
            default:
                return data
    }
}