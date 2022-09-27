
import {takeEvery,put} from 'redux-saga/effects'
import { SET_GET_FROM_CART, ADD_TO_CART, GET_CART,REMOVE_FROM_CART} from './constant';
import axios from 'axios';

function* getCarts(){
      let data=yield fetch('https://vigneshecommerce.herokuapp.com/Cart')
      data=yield data.json();
      console.log("productlist action is called",data)
      yield put({type:SET_GET_FROM_CART,data})
}


function* addCart(action){
  yield axios.post('https://vigneshecommerce.herokuapp.com/Cart',action.data)
}


function* removeCart(action){
  console.log('removeCart saga',action.data)
  yield axios.delete(`https://vigneshecommerce.herokuapp.com/Cart/${action.data}`)
  yield getCarts()
}



function* cartSaga(){
yield takeEvery(GET_CART,getCarts)
yield takeEvery(ADD_TO_CART,addCart)
yield takeEvery(REMOVE_FROM_CART,removeCart)
}



export default cartSaga;