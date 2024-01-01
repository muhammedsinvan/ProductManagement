import React, { useEffect, useState } from 'react';
import "./SubHeader.css";
import  '../Add/AddProduct.css';
import "../Add/AddCatagory.css";
import "../Add/AddSubCatagory.css";
import axios from 'axios';

const Buttons = () => {

  const [errorMessage,setErrorMessage] = useState()
  const [categoryData,setCategoryData] = useState([])
  const [catagoryId,setCatagoryId] = useState()

  const [catagoryName,setCatagoryName] = useState()
  const [subCatagoryName,setSubCatagoryName] = useState()

  const [isOpenAddProduct,setIsOpenAddProduct] = useState(false)

  const OpenAddProduct =()=>{
    setIsOpenAddProduct(!isOpenAddProduct)
  }

  const [isOpenCatagory,setIsOpenCatagory] = useState(false)

  const OpenCatagory =()=>{
    setCatagoryName()
    setIsOpenCatagory(!isOpenCatagory)
  }


  const [isOpenSubCatagory,setIsOpenSubCatagory] = useState(false)

  const OpenSubCatagory =()=>{
    setCatagoryId()
    setSubCatagoryName()
    setIsOpenSubCatagory(!isOpenSubCatagory)
  }


  const addcatagory = async() =>{
    if(catagoryName == null){
      setTimeout(() => {
        setErrorMessage()
      }, 1000);
      setErrorMessage('Enter valid Catagory')
    }else{
      try{
        const newcatagory = {
            name:catagoryName
        }

        let res = await axios.post('/api/addcatagory',newcatagory)
        if(res){
          setCatagoryName()
          setIsOpenCatagory(false)
        }
    }catch(error){
        console.log(error)
    }
    }
  }

  const addsubcatagory = async ()=>{
      try{
        let res = await axios.post(`/api/addsubcatagory/${catagoryId}`,{subCatagoryName})
        if(res){
          setCatagoryId()
          setSubCatagoryName()
          setIsOpenSubCatagory(false)
        }
    }catch(error){
        console.log(error)
    }
  }

  useEffect(()=>{
      (async()=>{
        try{
          let res = await axios.get('/api/getcatagory')
          setCategoryData(res.data)
        }catch(error){
          console.log(error)
        }
      })()
  },[isOpenSubCatagory == true])

  console.log(catagoryId)
  return (
    <div className='subHeader-container'>
    <div className='subHeader-buttons'>
            <button onClick={OpenCatagory}>Add Category</button>
            <button onClick={OpenSubCatagory}>Add Sub Category</button>
            <button onClick={OpenAddProduct}>Add Product</button>
        </div>



{/* -------------------------Start Add product form ----------------------------- */}
        {isOpenAddProduct &&<div>
        <div className={`addProduct-mainContainer ${isOpenAddProduct == true ? 'active' : ''}`} >
   <div className='addProduct-container' >
    <text className='addProduct-heading'>Add Product</text>
    <div className='addProduct-fields'>
    <div className='addProduct-fieldContainer addProduct-name '>
      <text>Title : </text>
      <input />
    </div>


    <div className='addProduct-fieldContainer'>
    <div className='addProduct-name'>
      <text>Ram: </text>
      <input placeholder='Ram' />
    </div> 
    <div className='addProduct-name'>
      <input placeholder='Price'  />
    </div>
    </div>

    <div className='addProduct-fieldContainer'>
    <div className='addProduct-name'>
      <text> Total Products: </text>
      <div className='addProduct-button_qtyBtn'>
            <button>-</button>
            <text>1</text>
            <button>+</button>
        </div>
    </div>
    <div className='addProduct-name_subcatagory'>
      <text>sub category: </text>
      <select className='addproduct-box-data_dropdown' >
                    <option >dfskfj</option>
                    <option >dfskfj</option>
                    <option >dfskfj</option>
                </select>
    </div>
    </div>
    <div className='addProduct-name'>
      <text>Category: </text>
      <select className='addproduct-box-data_dropdown' >
                    <option >dfskfj</option>
                    <option >dfskfj</option>
                    <option >dfskfj</option>
                </select>
    </div>
    <div className='addProduct-name '>
      <text>Add Description: </text>
      <input />
    </div>
    <div className='addProduct-name addProduct-image'>
      <text>Upload image: </text>
      <input type='file' />
      <input type='file' />
    </div>
    <div className='addProduct-button'>
      <button className='addProduct-button_add'>ADD</button>
      <button className='addProduct-button_discart' onClick={(()=>setIsOpenAddProduct(false))}>DISCARD</button>
    </div>
    </div>
   </div>
  
  </div>
        </div>}

{/* -------------------------End Add product form ----------------------------- */}



{/* -----------------------------Start Add Catagory form--------------------------- */}
{isOpenCatagory &&<div>
        <div className={`addCatagory-mainContainer ${isOpenCatagory == true ? 'active' : ''}`} >
   <div className='addCatagory-container' >
    <text className='addCatagory-heading'>Add Category</text>
    <input placeholder='Enter category name' value={catagoryName} onChange={(e)=>setCatagoryName(e.target.value)} />
    <p className='addCategory-error'>{errorMessage}</p>
    <div className='addCatagory-button'>
      <button className='addCatagory-button_add' onClick={addcatagory}>ADD</button>
      <button className='addCatagory-button_discart' onClick={(()=>setIsOpenCatagory(false))}>DISCARD</button>
    </div>
    </div>
   </div>
  
  </div>
        }

{/* -----------------------------End Add Catagory form--------------------------- */}





{/* -----------------------------Start Add Sub Catagory form--------------------------- */}
{isOpenSubCatagory &&<div>
        <div className={`addSubCatagory-mainContainer ${isOpenSubCatagory == true ? 'active' : ''}`} >
   <div className='addSubCatagory-container' >
    <text className='addSubCatagory-heading'>Add Sub Category</text>
    <div className='addSubCatagory-name'>
      <select className='addSubCatagory-box-data_dropdown'  onChange={(e) => setCatagoryId(e.target.value)} >
        {catagoryId? <></>  : <option style={{color:"#6d6c6c"}}>Select the value</option> }
        {categoryData?.map((item)=>(
             <option  value={item._id}>{item.name}</option>
        ))}         
                </select>
    </div>
    <input placeholder='Enter category name' value={subCatagoryName} onChange={(e)=>setSubCatagoryName(e.target.value)} />
    <p className='addCategory-error'>{errorMessage}</p>
    <div className='addSubCatagory-button'>
    {catagoryId && subCatagoryName ? <button className='addSubCatagory-button_add' onClick={addsubcatagory}>ADD</button> :
    <button className='addSubCatagory-button_add' onClick={addsubcatagory} style={{background:"#e4c892",cursor:"not-allowed"}}>ADD</button>
     }
      <button className='addSubCatagory-button_discart' onClick={(()=>setIsOpenSubCatagory(false))}>DISCARD</button>
    </div>
    </div>
   </div>
  
  </div>
        }

{/* -----------------------------End Add Sub Catagory form--------------------------- */}


        </div>
  )
}

export default Buttons
