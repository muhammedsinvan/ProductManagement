import React, { useEffect, useState } from 'react';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import {useNavigate} from "react-router-dom"
import "./Header.css";
import "../WhishList/WhishList.css"
import axios from 'axios';
import WhishList from '../WhishList/WhishList';

const Header = ({onSearch,openWishlistSidebar}) => { 

  const navigate = useNavigate();

  const [token,setToken] = useState();
  const [searchTerm, setSearchTerm] = useState('');
  const [isRightSidebarOpen, setIsRightSidebarOpen] = useState(false);
  const [refresh,setRefresh] = useState(false)

  const userInfo = localStorage.getItem('usertoken')

  const config = {
    headers: {
      Authorization: `Bearer ${userInfo}`,
    },
  };

  useEffect(()=>{
    (async()=>{
      try{
        let res = await axios.get('/api/checktoken',config)
        setToken(localStorage.getItem('usertoken'))
      }catch(error){
        localStorage.removeItem('usertoken')
        localStorage.removeItem('userid')
        setToken()
      }
    })()
    
  },[])

  const logout =()=>{
    localStorage.removeItem('usertoken')
    localStorage.removeItem('userid')
    setToken()
    navigate('/')
   } 

   useEffect(()=>{
    onSearch(searchTerm);
   },[searchTerm])
 
  

  const handleSearch = () => {
    onSearch(searchTerm);
  };

  const handleFavoriteClick = () => {
    openWishlistSidebar(); 
  };

  // const handleFavoriteClick = () => {
  //   setIsRightSidebarOpen(true);
  // };

  // const closeRightSidebar = () => {
  //   setIsRightSidebarOpen(false);
  //   setRefresh(!refresh)
  // };

  return (
    <div className='header-container'>
      
        <div className='header-serch_container'>
            <div className='header-search'>
                <input placeholder='Serach any things'
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)} />
                <button onClick={handleSearch} >Search</button>
            </div>
        </div>

        <div className='header-right_container'>
{
  token?
  <>
    <FavoriteBorderIcon  style={{ fontSize: '2rem',cursor:"pointer"}} onClick={handleFavoriteClick}/>   
  <AddShoppingCartIcon style={{ fontSize: '2rem',cursor:"pointer"}} />
  <text onClick={logout} >Logout</text>
  </>:
  <text onClick={()=>navigate('/signin')}>Sign In</text>   
} 

        
        </div>
        {/* <WhishList isOpen={isRightSidebarOpen} onClose={closeRightSidebar} /> */}

  </div>
        






  )
}

export default Header