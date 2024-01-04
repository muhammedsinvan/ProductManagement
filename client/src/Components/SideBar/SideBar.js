import React, { useEffect, useState } from 'react';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import './SideBar.css';
import axios from 'axios';

const SideBar = ({ onCheckboxChange }) => {

  const [subMenu,setSubMenu] = useState(null)
  const [sideBarMenu,setSideBarMenu] = useState(false)
  const [categoryData,setCategoryData] =useState([])
  const [checkedItems, setCheckedItems] = useState({});

  const showSubmenu =(categoryId)=>{
    setSubMenu((prevId) => (prevId === categoryId ? null : categoryId));
  }

  const showSideBar =()=>{ 
    setSideBarMenu(!sideBarMenu)
  }

  useEffect(()=>{
    (async()=>{
      try{
        let data = await axios.get('/api/getallcatagory');
        setCategoryData(data.data)
      }catch(error){
        console.log(error)
      }
    })()
  },[])

  const handleCheckboxChange = (isChecked, categoryName) => {
    setCheckedItems((prevItems) => ({
      ...prevItems,
      [categoryName]: isChecked,
    }));

    onCheckboxChange({ [categoryName]: isChecked });
  };


  return (
    <div className='sideBar-container'>
      <div className="sideMenu-toggleBtn" onClick={showSideBar}>
      {sideBarMenu?  <CloseIcon/> : <MenuIcon   />}
      </div>

<div className={sideBarMenu?'sideBar-subContainerRes' :'sideBar-subContainer'}>
      <text className='sidBar-container_heading'>Categories</text>
        <div className='sideBar-contents'>
          <text className='sideBar-contents_allCategory'>All Categories</text>
          {categoryData.map((item)=>(
 <div className='sideBar-contents_menuItems' key={item._id}>
 <div className='sideBar-contents_menuItem' onClick={()=>showSubmenu(item._id)}>
   <text>{item.name}</text>
   {subMenu ===item._id ? <KeyboardArrowDownIcon/>:<KeyboardArrowRightIcon />}
   </div>
   {subMenu === item._id && 
   <div className='sideBar-contents_subMenuItem'>
    {item.subcategory.map((subItem)=>(
    <div className='sideBar-contents_subMenuItem-item'>
    <input type={'checkbox'}   checked={checkedItems[subItem.subCatagoryName] || false} onChange={(e) => handleCheckboxChange(e.target.checked, subItem.subCatagoryName)} />
     <text>{subItem.subCatagoryName}</text>
    </div>
    ))}


   </div>}

 </div>
          ))}
         
</div>
        </div>
    </div>
  )
}

export default SideBar