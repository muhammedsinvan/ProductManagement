import React, { useState } from 'react';
import Header from '../Components/Header/Header';
import PageName from '../Components/SubHeader/PageName';
import ProductDetail from '../Components/ProductDetail/ProductDetail';
import './Pages.css';
import Notfound from '../Components/NotFound/NotFound';
import axios from 'axios';
import WhishList from '../Components/WhishList/WhishList';

const ProductDetailPage = () => {

  const [searchResults, setSearchResults] = useState({});
  const [notFound,setNotFound] = useState(false)

  const handleSearch = async (searchTerm) => {
    console.log(searchTerm)
    if (searchTerm.trim() === '') {
      setSearchResults();
      setNotFound(false)
    } else {
    try{
      let result = await axios.get(`/api/getsearchresultbyname/${searchTerm}`)
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
  
  const [isRightSidebarOpen, setIsRightSidebarOpen] = useState(false);
  const [refresh, setRefresh] = useState(false);
  
  const openWishlistSidebar = () => {
    setIsRightSidebarOpen(true);
  };
  

  return (
    <div>
      <Header onSearch={handleSearch}  openWishlistSidebar={openWishlistSidebar}/>
      <PageName  />
      {/* {searchResults ? <ProductDetail searchResults={searchResults}  /> : <ProductDetail /> } */}
     {notFound ? <Notfound /> : <ProductDetail searchResults={searchResults} refresh={refresh}  /> }

     <WhishList isOpen={isRightSidebarOpen} onClose={() => setIsRightSidebarOpen(false)} refresh={refresh} setRefresh={setRefresh} />
    </div>
  )
}

export default ProductDetailPage
