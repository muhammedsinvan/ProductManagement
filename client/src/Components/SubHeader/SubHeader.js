import React from 'react';
import PageName from './PageName';
import Buttons from './Buttons';
import './SubHeader.css'

const SubHeader = () => {
  return (
   
       
        <div className='subHeader-subContainer'>
           <PageName />
       <Buttons/>
        </div>
  )
}

export default SubHeader