import React, { useState } from 'react';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import './SideBar.css';

const SideBar = () => {

  const [subMenu,setSubMenu] = useState(false)
  const [sideBarMenu,setSideBarMenu] = useState(false)

  const showSubmenu =()=>{
    setSubMenu(!subMenu)
  }

  const showSideBar =()=>{
    setSideBarMenu(!sideBarMenu)
  }



  return (
    <div className='sideBar-container'>
      <div className="sideMenu-toggleBtn" onClick={showSideBar}>
      {sideBarMenu?  <CloseIcon/> : <MenuIcon   />}
      </div>

<div className={sideBarMenu?'sideBar-subContainerRes' :'sideBar-subContainer'}>
      <text className='sidBar-container_heading'>Categories</text>
        <div className='sideBar-contents'>
          <text className='sideBar-contents_allCategory'>All Categories</text>
          <div className='sideBar-contents_menuItems'>

          <div className='sideBar-contents_menuItem' onClick={()=>showSubmenu(12)}>
            <text>Laptop</text>
            {subMenu ? <KeyboardArrowDownIcon/>:<KeyboardArrowRightIcon />}
            </div>
            {subMenu && <div className='sideBar-contents_subMenuItem'>
              <input type={'checkbox'} />
              <text>Dell</text>
            </div>}

          </div>

          <div className='sideBar-contents_menuItems'>

<div className='sideBar-contents_menuItem' onClick={showSubmenu}>
  <text>Laptop</text>
  {subMenu ? <KeyboardArrowDownIcon/>:<KeyboardArrowRightIcon />}
  </div>
  {subMenu && <div className='sideBar-contents_subMenuItem'>
    <input type={'checkbox'} />
    <text>Dell</text>
  </div>}

</div>
</div>
        </div>
    </div>
  )
}

export default SideBar