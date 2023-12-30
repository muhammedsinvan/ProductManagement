import React from 'react'
import Header from '../Components/Header/Header';
import SideBar from '../Components/SideBar/SideBar';
import SubHeader from '../Components/SubHeader/SubHeader';
import Products from '../Components/Products/Products';
import "./Pages.css";

const HomePage = () => {
  return (
    <div >
        <Header/>
        <SubHeader/>
        <div className='homePage-container'>
        <SideBar />
        <Products />
        </div>
    </div>
  )
}

export default HomePage