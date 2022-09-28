import React from 'react'
import Header from '../ui/Header';
import classes from '../../CSSSTYLE/dashboard.module.css';
import Footer from '../ui/Footer';
function PricingComponent() {
  return (
    <div>
    <Header/>
    <p className={classes.dashboardwording}>This is Pricing component</p>
    <div>
        <Footer/>
        </div>
    </div>
  )
}

export default PricingComponent