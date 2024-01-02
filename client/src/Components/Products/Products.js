import React, { useEffect, useState } from 'react'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import "./Products.css"
import axios from 'axios';
import {useNavigate} from 'react-router-dom'

const Products = () => {


  const [data,setData] = useState([]);

  const navigate = useNavigate()

  useEffect(()=>{
    (async()=>{
      try{
        let res = await axios.get('/api/getallproducts')
        setData(res.data)
      }catch(error){
        console.log(error)
      }
    })()
  },[])


  return (
    <div className='products-container'>

  {data.map((item)=>(
    <div className='products-box' onClick={()=>navigate(`/detail/${item._id}`)} >
      <div className='product-favoriteIcn'>
        <FavoriteBorderIcon />
        </div>
        <div className='product-img'>
        <img src={item.image1} alt='product-img'/>
        </div>
        <div className='product-content'>
        <text>{item.title}</text>
    <text>${item.price}</text>
    <div className='product-starIcn'>
<StarBorderIcon/>
<StarBorderIcon/>
<StarBorderIcon/>
<StarBorderIcon/>
<StarBorderIcon/>
    </div>
        </div>
        </div>
  ))}
      
      </div>
  )
}

export default Products
