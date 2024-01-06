import React from 'react'
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import './SubHeader.css'
import { useNavigate } from 'react-router-dom';

const PageName = ({pageName}) => {

  const navigate = useNavigate()

  return (
    <div>
         <div className='subHeader-leftContainer'>

         <div className='subHeader-pagenames'>
 { pageName.map((item)=>(
   <div className='subHeader-pagename'>
   <text onClick={()=>navigate(item.link)}>{item.name}</text>
   <KeyboardArrowRightIcon  style={{fontSize:"1.7rem"}}/>
   </div>
 ))}
    </div>
    </div>
    </div>
  )
}

export default PageName
