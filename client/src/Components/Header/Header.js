import React from 'react';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import {useNavigate} from "react-router-dom"
import "./Header.css";
import "../WhishList/WhishList.css"

const Header = () => { 

  const navigate = useNavigate();

  return (
    <div className='header-container'>
      
        <div className='header-serch_container'>
            <div className='header-search'>
                <input placeholder='Serach any things' />
                <button>Search</button>
            </div>
        </div>

        <div className='header-right_container'>
        <FavoriteBorderIcon  style={{ fontSize: '2rem'}}/>  
        <AddShoppingCartIcon style={{ fontSize: '2rem'}} />
        <text onClick={()=>navigate('/signin')}>Sign In</text>
        
        </div>
      
  </div>
        






  )
}

export default Header