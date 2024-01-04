import React, { useEffect, useState } from 'react';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import {useNavigate} from "react-router-dom"
import "./Header.css";
import "../WhishList/WhishList.css"
import axios from 'axios';

const Header = ({onSearch}) => { 

  const navigate = useNavigate();

  const [token,setToken] = useState();
  const [searchTerm, setSearchTerm] = useState('');

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
    
  })

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
    <FavoriteBorderIcon  style={{ fontSize: '2rem'}}/>   
  <AddShoppingCartIcon style={{ fontSize: '2rem'}} />
  <text onClick={logout} >Logout</text>
  </>:
  <text onClick={()=>navigate('/signin')}>Sign In</text>   
} 

        
        </div>
      
  </div>
        






  )
}

export default Header