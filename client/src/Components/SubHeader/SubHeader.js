import React from 'react';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import './SubHeader.css'

const SubHeader = () => {
  return (
    <div className='subHeader-container'>
       
        
        <div className='subHeader-pagenames'>
            <div className='subHeader-pagename'>
            <text>Home</text>
            <KeyboardArrowRightIcon  style={{fontSize:"1.7rem"}}/>
            </div>
            
        </div>

        <div className='subHeader-buttons'>
            <button>Add Category</button>
            <button>Add Sub Category</button>
            <button>Add Product</button>
        </div>
        </div>
  )
}

export default SubHeader