import React from 'react';
import PageName from './PageName';
import Buttons from './Buttons';
import './SubHeader.css'

const SubHeader = ({pageName}) => {
  return (
   
       
        <div className='subHeader-subContainer'>
         
          <PageName pageName={pageName}/>
        
          <Buttons/>
       
            
           
      
        </div>
  )
}

export default SubHeader