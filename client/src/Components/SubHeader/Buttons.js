import React, { useState } from 'react';
import "./SubHeader.css";
import  '../Add/AddProduct.css';
import "../Add/AddCatagory.css";
import "../Add/AddSubCatagory.css";

const Buttons = () => {

  const [isOpenAddProduct,setIsOpenAddProduct] = useState(false)

  const OpenAddProduct =()=>{
    setIsOpenAddProduct(!isOpenAddProduct)
  }

  const [isOpenCatagory,setIsOpenCatagory] = useState(false)

  const OpenCatagory =()=>{
    setIsOpenCatagory(!isOpenCatagory)
  }


  const [isOpenSubCatagory,setIsOpenSubCatagory] = useState(false)

  const OpenSubCatagory =()=>{
    setIsOpenSubCatagory(!isOpenSubCatagory)
  }




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
    <input placeholder='Enter category name'/>
    <div className='addCatagory-button'>
      <button className='addCatagory-button_add'>ADD</button>
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
      <select className='addSubCatagory-box-data_dropdown' >
                    <option >dfskfj</option>
                    <option >dfskfj</option>
                    <option >dfskfj</option>
                </select>
    </div>
    <input placeholder='Enter category name'/>
    <div className='addSubCatagory-button'>
      <button className='addSubCatagory-button_add'>ADD</button>
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
