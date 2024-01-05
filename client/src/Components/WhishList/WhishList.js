import React, { useState } from 'react';
import "./WhishList.css";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import CloseIcon from '@mui/icons-material/Close';

const WhishList = ({ isOpen, onClose }) => {
   

  return (
    <div className={`overlay ${isOpen ? 'visible' : ''}`} >
    <div className={`right-sidebar ${isOpen ? 'open' : ''}`}>
      <div className='right-sidebar_header'>
        <div>
        <FavoriteBorderIcon style={{backgroundColor:"white",borderRadius:"25rem",fontSize:"3.5rem",padding:"0.8rem",fontWeight:200}}/>
        <text className=''>Items</text>
        </div>
        <div onClick={onClose}>
        <KeyboardArrowRightIcon style={{color:"white",fontSize:"3rem",cursor:"pointer"}} />
        </div>
      </div>
    <div className="right-sidebar-content">
      <div className='right-sidebar-contentOne'>
        <img src='https://cdn.thewirecutter.com/wp-content/media/2023/06/businesslaptops-2048px-0943.jpg?auto=webp&quality=75&width=1024' />
        <div className='right-sidebar-contentOne_detail'>
          <text className='right-sidebar-contentOne_detail-title'>HP AMD Ryzen</text>
          <text>$2333</text>
          <div className='right-sidebar-contentOne_detailStar'>
<StarBorderIcon/>
<StarBorderIcon/>
<StarBorderIcon/>
<StarBorderIcon/>
<StarBorderIcon/>
    </div>
        </div>
        <div className='right-sidebar-contentOne_removeicn'>
          <CloseIcon style={{borderRadius:"50%",border:"1px solid black",cursor:"pointer"}}/>
        </div>
      </div>
      
    </div>
  </div>
  </div>
  )
}

export default WhishList
