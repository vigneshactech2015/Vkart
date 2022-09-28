import axios from 'axios'
import React,{useEffect,useState} from 'react'
import UserTable from './UserTable';

function UserData() {
const[users,setUsers]=useState([]);

 const getData=()=>{
axios.get('https://vigneshecommerce.herokuapp.com/data').then((data)=>setUsers(data.data));
}

useEffect(()=>{
    getData()
},[]);


  return (
    <div>
<UserTable users={users} get={getData}/>
    </div>
  )
}

export default UserData