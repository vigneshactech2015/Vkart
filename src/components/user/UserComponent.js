import React from 'react'
import Header from '../ui/Header';
import UserData from './UserData';
import Footer from '../ui/Footer';
function UserComponent() {
  return (
    <div>
    <Header/>
    <UserData/>
    <div>
        <Footer/>
        </div>
    </div>
  )
}

export default UserComponent