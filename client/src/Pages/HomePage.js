import React, { useCallback, useEffect, useState } from 'react'
import Header from '../Components/Header/Header';
import SideBar from '../Components/SideBar/SideBar';
import SubHeader from '../Components/SubHeader/SubHeader';
import Products from '../Components/Products/Products';
import Notfound from '../Components/NotFound/NotFound';
import "./Pages.css";
import axios from 'axios';
import WhishList from '../Components/WhishList/WhishList';

const HomePage = () => {
  const [searchResults, setSearchResults] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [notFound,setNotFound] = useState(false)
  const [pageName,setPageName] = useState([{name:'Home',link:'/'}])


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
    }
  }
  };


  const handleCheckboxChange = (changedCheckbox) => {
    const categoryName = Object.keys(changedCheckbox)[0];
    const isChecked = changedCheckbox[categoryName];

    if (isChecked) {
      setSelectedCategories((prevSelected) => [...prevSelected, categoryName]);
    } else {
      setSelectedCategories((prevSelected) => prevSelected.filter((category) => category !== categoryName));
    }
  };

  useEffect(() => {
    // Make an API call to send selectedCategories to the backend
    const sendSelectedCategories = async () => {
      if (selectedCategories.length === 0){
        setNotFound(false)
      }else{
        try {
          const result =   await axios.get(`/api/sendSelectedCategories/${selectedCategories}`);
          if(result.data.length == 0){
            setNotFound(true)
          }else{
            setNotFound(false)
            setSearchResults(result);
          }
          } catch (error) {
            setNotFound(true)
            console.error('Error sending selected categories to the backend:', error);
          }
      }
    
    };

    // Call the function when selectedCategories changes
    sendSelectedCategories();
  }, [selectedCategories]);


  const [isRightSidebarOpen, setIsRightSidebarOpen] = useState(false);
const [refresh, setRefresh] = useState(false);

const openWishlistSidebar = () => {
  setIsRightSidebarOpen(true);
};

console.log(refresh)




  return (
    <div >
      <div className='homePage-topBarContainer'>
      <Header  onSearch={handleSearch} openWishlistSidebar={openWishlistSidebar}/>
        <SubHeader pageName={pageName}/>
      </div>
       
        <div className='homePage-container'>
         
          <SideBar onCheckboxChange={handleCheckboxChange} />
          
       
        {notFound ? <Notfound /> : <Products searchResults={searchResults} refresh={refresh}   /> }

        <WhishList isOpen={isRightSidebarOpen} onClose={() => setIsRightSidebarOpen(false)} refresh={refresh} setRefresh={setRefresh} />
        </div>
    </div>
  )
}

export default HomePage
