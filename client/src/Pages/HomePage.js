import React, { useState } from 'react'
import Header from '../Components/Header/Header';
import SideBar from '../Components/SideBar/SideBar';
import SubHeader from '../Components/SubHeader/SubHeader';
import Products from '../Components/Products/Products';
import Notfound from '../Components/NotFound/NotFound';
import "./Pages.css";
import axios from 'axios';

const HomePage = () => {
  const [searchResults, setSearchResults] = useState([]);
  const [notFound,setNotFound] = useState(false)


  const handleSearch = async (searchTerm) => {
    if (searchTerm.trim() === '') {
      setSearchResults(null);
    } else {
    try{
      let result = await axios.get(`/api/getsearchresult/${searchTerm}`)
      if(result.data.length == 0){
        setNotFound(true)
      }else{
        setNotFound(false)
        setSearchResults(result);
      }

    }catch(error){
      setNotFound(true)
      console.log(error)
    }
  }
  };
  console.log(notFound)

  return (
    <div >
        <Header  onSearch={handleSearch}/>
        <SubHeader/>
        <div className='homePage-container'>
        <SideBar />
        {notFound ? <Notfound /> : <Products searchResults={searchResults}  /> }


        </div>
    </div>
  )
}

export default HomePage