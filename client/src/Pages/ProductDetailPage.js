import React from 'react';
import Header from '../Components/Header/Header';
import PageName from '../Components/SubHeader/PageName';
import ProductDetail from '../Components/ProductDetail/ProductDetail';
import './Pages.css';

const ProductDetailPage = () => {
  return (
    <div>
      <Header />
      <PageName  />
      <ProductDetail />
    </div>
  )
}

export default ProductDetailPage
