import React from 'react'
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import './SubHeader.css'

const PageName = () => {
  return (
    <div>
         <div className='subHeader-container'>

         <div className='subHeader-pagenames'>
   <div className='subHeader-pagename'>
    <text>Home</text>
    <KeyboardArrowRightIcon  style={{fontSize:"1.7rem"}}/>
    </div>
    </div>
    </div>
    </div>
  )
}

export default PageName
