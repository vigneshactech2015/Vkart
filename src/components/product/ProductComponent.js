import React from 'react'
import Header from '../ui/Header';
import Product from './Product';
import {useState,useEffect} from 'react';
import ProductTable from './ProductTable';


function ProductComponent() {

const[userType,setUserType]=useState('');

useEffect(()=>{
  setUserType(sessionStorage.getItem('UserRole'))
},[])

  return (
    <div>

    <Header/>
    {userType==='admin'&&<ProductTable/>}
    {userType!=='admin'&&<Product/>}
    </div>
  )
}

export default ProductComponent