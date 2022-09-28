//to handle async operation we use generator fn
//to handle async data we use yield in generator fn

import {takeEvery,put} from 'redux-saga/effects'
import {PRODUCT_LIST, SEARCH_PRODUCT, SET_PRODUCT_LIST } from './constant';


function* getProducts(){
      let data=yield fetch('https://vigneshecommerce.herokuapp.com/Product')
    data=yield data.json();
    console.log("productlist action is called",data)
yield put({type:SET_PRODUCT_LIST,data})
}


function* productSaga(){
yield takeEvery(PRODUCT_LIST,getProducts)
}



export default productSaga;