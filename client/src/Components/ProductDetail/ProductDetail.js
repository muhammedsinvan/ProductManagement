import React from 'react';
import DoneIcon from '@mui/icons-material/Done';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import "./ProductDetail.css";

const ProductDetail = () => {
  return (
    <div className='ProductDetail-container'>
<div className='ProductDetail-img'>
<div className='ProductDetail-mainImg'>
<img src='https://m.media-amazon.com/images/W/MEDIAX_792452-T2/images/I/61Qe0euJJZL.jpg' alt='MainImg'/>
</div>

<div className='ProductDetail-listImg'>
        <div className='ProductDetail-listImg_One'>
            <img src='https://m.media-amazon.com/images/W/MEDIAX_792452-T2/images/I/61Qe0euJJZL.jpg' alt='img' />
        </div>
        <div className='ProductDetail-listImg_One'>
            <img src='https://m.media-amazon.com/images/W/MEDIAX_792452-T2/images/I/61Qe0euJJZL.jpg' alt='img' />
        </div>
</div>


</div>
<div className='ProductDetail-detailContainer'>


<div className='ProductDetail-detail'>
    <text className='ProductDetail-detail_heading' >Tablet as a laptop</text>
    <text className='ProductDetail-detail_price'>$11,70</text>
    <div className='ProductDetail-detail_avilablity'>
    <text>Availablity : </text>
    <DoneIcon style={{color:"#30BD57",marginLeft:"1rem"}}/>
    <text style={{color:"#30BD57",marginLeft:"0.5rem"}}>In stock</text>
    </div>
    <text className='ProductDetail-detail_stock'>Hurry up! only 34 product left in stock!</text>
    
</div>
<div className='ProductDetail-button'>
    <div className='ProductDetail-button_ram'>
        <text>Ram : </text>
        <button> 4 GB </button>
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
<FavoriteBorderIcon style={{fontSize:"3.5rem",backgroundColor:"#EEEEEE" , borderRadius:"50%",padding:"9px",cursor:"pointer"}} />
</div>


</div>

    </div>
    </div>
  )
}

export default ProductDetail
