import React, { useState } from 'react';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import "./Header.css";

const Header = () => { 

    const [togglemenu,setTogglemenu] = useState(false)

    function togglebutton(){
        if(togglemenu === false){
          setTogglemenu(true)
        }else{
          setTogglemenu(false)
        }
      }

  return (
    <div className='header-container'>
        <div className='header-serch_container'>
            <div className='header-search'>
                <input placeholder='Serach any things' />
                <button>Search</button>
            </div>

        </div>

        <div className='header-right_container'>
        <FavoriteBorderIcon  style={{ fontSize: '2rem'}} /> 
        <AddShoppingCartIcon style={{ fontSize: '2rem'}} />
        <text>Sign In</text>
        
        </div>

        
    
    </div>





  )
}

export default Header