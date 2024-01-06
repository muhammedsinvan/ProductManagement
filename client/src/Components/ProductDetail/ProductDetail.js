import React, { useEffect, useState } from 'react';
import DoneIcon from '@mui/icons-material/Done';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import "./ProductDetail.css";
import { useParams } from 'react-router-dom';
import axios from 'axios';

const ProductDetail = ({searchResults,refresh}) => {
    const params = useParams();

    const [detail,setDetail] = useState({})
    const [viewimage,setViewimage] = useState()
    const [favorites, setFavorites] = useState([])
    const [refreshs,setRefreshs] = useState(false)

    useEffect(()=>{
      const fetchData = async () => {
          try{
            let res = await axios.get(`/api/getproductdetail/${params.id}`);
              setDetail(res.data)
              setViewimage(res.data.image1)
          }catch(error){
            console.log(error)
          }
        }
        if (searchResults && searchResults.data) {
          setDetail(searchResults.data);
          setViewimage(searchResults.data.image1)
        } else {
          fetchData();
        }
      },[searchResults,refresh])

      const toggleFavorite =async(productId)=>{
        try{
          let data = await axios.post('/api/favorite',{productId})
          setRefreshs(!refreshs)
          console.log(data)
        }catch(error){
          console.log(error)
        }
      }

      useEffect(()=>{
        (async()=>{
          try{
            let res = await axios.get('/api/getallfavarites')
            setFavorites(res.data)
          }catch(error){
            console.log(error)
          }
  
        })()
      },[refresh,refreshs])

  return (
    <div className='ProductDetail-container'>
<div className='ProductDetail-img'>
<div className='ProductDetail-mainImg'>
<img src={viewimage} alt='MainImg'/>
</div>

<div className='ProductDetail-listImg'>
        <div className='ProductDetail-listImg_One'>
            <img onClick={e => setViewimage(e.target.src)} src={detail?.image1}   alt='img' />
        </div>
        <div className='ProductDetail-listImg_One'>
            <img  onClick={e => setViewimage(e.target.src)} src={detail?.image2} alt='img' />
        </div>
</div>


</div>
<div className='ProductDetail-detailContainer'>


<div className='ProductDetail-detail'>
    <text className='ProductDetail-detail_heading' >{detail?.title}</text>
    <text className='ProductDetail-detail_price'>${detail?.price}</text>
    <div className='ProductDetail-detail_avilablity'>
    <text>Availablity : </text>
    <DoneIcon style={{color:"#30BD57",marginLeft:"1rem"}}/>
    <text style={{color:"#30BD57",marginLeft:"0.5rem"}}>In stock</text>
    </div>
    <text className='ProductDetail-detail_stock'>Hurry up! only {detail?.qty} product left in stock!</text>
    
</div>
<div className='ProductDetail-button'>
    <div className='ProductDetail-button_ram'>
        <text>Ram : </text>
        <button> {detail?.ram} GB </button>
        <button> 8 GB </button>
        <button> 16 GB </button>
    </div>


    <div  className='ProductDetail-button_qty'>
        <text>Quantity : </text>

        <div className='ProductDetail-button_qtyBtn'>
            <button>-</button>
            <text>1</text>
            <button>+</button>
        </div>
</div>

<div className='ProductDetail-button_main'>
<button>Edit product</button>
<button>Buy it now</button>
<FavoriteBorderIcon style={{fontSize:"3.5rem",backgroundColor:"#EEEEEE" , borderRadius:"50%",padding:"9px",cursor:"pointer",color: favorites.some((favorite) => favorite.productId === detail._id) ? 'red' : 'black'}} onClick={() => toggleFavorite(detail._id)} />
</div>


</div>

    </div>
    </div>
  )
}

export default ProductDetail
