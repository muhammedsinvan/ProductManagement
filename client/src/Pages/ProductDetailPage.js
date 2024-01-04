import React, { useState } from 'react';
import Header from '../Components/Header/Header';
import PageName from '../Components/SubHeader/PageName';
import ProductDetail from '../Components/ProductDetail/ProductDetail';
import './Pages.css';
import Notfound from '../Components/NotFound/NotFound';
import axios from 'axios';

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

  return (
    <div>
      <Header onSearch={handleSearch}/>
      <PageName  />
      {/* {searchResults ? <ProductDetail searchResults={searchResults}  /> : <ProductDetail /> } */}
     {notFound ? <Notfound /> : <ProductDetail searchResults={searchResults} /> }
    </div>
  )
}

export default ProductDetailPage
