import React, { useEffect, useState } from 'react';
import "./WhishList.css";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import CloseIcon from '@mui/icons-material/Close';
import axios from 'axios';
import Notfound from '../NotFound/NotFound';

const WhishList = ({ isOpen, onClose, refresh, setRefresh }) => {
  const [data,setData] = useState([])

  const user = localStorage.getItem('userid')

  const userInfo = localStorage.getItem('usertoken')

  const config = {
    headers: {
      Authorization: `Bearer ${userInfo}`,
    },
  };

  useEffect(()=>{
    (async()=>{
      try{
        let datas = await axios.get(`/api/getFavoritProduct/${user}`,config);
        setData(datas.data)
        if(data.length !== 0){
          console.log('not empty')
        }else{
          console.log('empty')
        }
      }catch(error){
        console.log(error)
      }
      
    })()
  },[isOpen,refresh])
   
  const removeFavorite =async(itemid)=>{
    try{
      let removeItem = await axios.get(`/api/removeItemFavorite/${user}/${itemid}`,config)
      console.log(removeItem)
      setRefresh(!refresh)
    }catch(error){
      console.log(error)
    }
  }

  return (
    <div className={`overlay ${isOpen ? 'visible' : ''}`} >
    <div className={`right-sidebar ${isOpen ? 'open' : ''}`}>

     
      <div className='right-sidebar_header'>
        <div>
        <FavoriteBorderIcon style={{backgroundColor:"white",borderRadius:"25rem",fontSize:"3.5rem",padding:"0.8rem",fontWeight:200}}/>
        <text className=''>Items</text>
        </div>
        <div onClick={onClose}>
        <KeyboardArrowRightIcon style={{color:"white",fontSize:"3rem",cursor:"pointer"}} />
        </div>
      </div>
      { data.length!==0 ?<>
    <div className="right-sidebar-content">
    {data?.map((item)=>(
        <div className='right-sidebar-contentOne'>
        <img src={item.image1} />
        <div className='right-sidebar-contentOne_detail'>
          <text className='right-sidebar-contentOne_detail-title'>{item.title}</text>
          <text>${item.price}</text>
          <div className='right-sidebar-contentOne_detailStar'>
<StarBorderIcon/>
<StarBorderIcon/>
<StarBorderIcon/>
<StarBorderIcon/>
<StarBorderIcon/>
    </div>
        </div>
        <div className='right-sidebar-contentOne_removeicn' onClick={()=>removeFavorite(item._id)}>
          <CloseIcon style={{borderRadius:"50%",border:"1px solid black",cursor:"pointer"}}/>
        </div>
      </div>
        ))}
      
      
    </div>
    </> : <Notfound />}
  </div>
  </div>
  )
}

export default WhishList
