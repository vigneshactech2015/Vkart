import {combineReducers} from 'redux'
import {cartData} from './reducer'
import { productData } from './productReducer'
import { productDetail } from './productDetailReducer'
import user from '../redux/slice/user'
import users from '../redux/slice/users'
export default combineReducers({
  cartData,
  productData,
  productDetail,
  user,
  users
})