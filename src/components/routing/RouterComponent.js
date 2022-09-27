import React from 'react';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import SignIn from '../signin/Signin';
import DashComponent from '../dashboard/DashComponent';
import ProductComponent from '../product/ProductComponent';
import PricingComponent from '../pricing/PricingComponent';
import UserComponent from '../user/UserComponent';
import UserEditComponent from '../user/UserEditComponent';
import ErrorComponent from './ErrorComponent';
import ProductDetailComponent from '../product/ProductDetailComponent';
import CartDetailComponent from '../cart/CartDetailComponent';
function RouterComponent() {
  return (
    <div>
    <BrowserRouter>
    <Routes>
    <Route exact path="/" element={<SignIn/>}/>
    <Route exact path="/homepage/dash" element={<DashComponent/>}/>
    <Route exact path="/homepage/product" element={<ProductComponent/>}/>
    <Route exact path="/homepage/product/detail" element={<ProductDetailComponent/>}/>
    <Route exact path="/homepage/product/cart" element={<CartDetailComponent/>}/>
    <Route exact path="/homepage/pricing" element={<PricingComponent/>}/>
    <Route exact path="/homepage/user" element={<UserComponent/>}/>
    <Route exact path="/homepage/user/edit" element={<UserEditComponent/>}/>
    <Route exact path="*" element={<ErrorComponent/>}/>
    </Routes>
    </BrowserRouter>
    </div>
  )
}

export default RouterComponent