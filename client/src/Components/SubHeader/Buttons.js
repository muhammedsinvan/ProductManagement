import React, { useEffect, useState } from 'react';
import "./SubHeader.css";
import  '../Add/AddProduct.css';
import "../Add/AddCatagory.css";
import "../Add/AddSubCatagory.css";
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import axios from 'axios';

const Buttons = () => {

  const [errorMessage,setErrorMessage] = useState()
  const [categoryData,setCategoryData] = useState([])
  const [catagoryId,setCatagoryId] = useState()
  const [subCategoryData,setSubCategoryData] = useState([])

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

  const subcategory =(data)=>{
    setSubCategoryData()
    setCatagoryId(data)
    for(let i = 0;i<categoryData.length;i++){
      if(categoryData[i].name==data){
        setSubCategoryData(categoryData[i].subcategory)
      }
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
  },[isOpenCatagory == true])



  // -----------------------------add product fuction ----------------------

  const [qty,setQty] = useState(1)

  const [baseImage1, setBaseImage1] = useState("");
  const [baseImage2, setBaseImage2] = useState("");
  const [addButton,setAddButton] = useState(false)

  const lessqty =()=>{
    if(qty > 1){
      setQty(qty-1)
    }

  }

  const addqty =()=>{
    setQty(qty+1)
  }

  const uploadImage1 = async (e) => {
    const file = e.target.files[0];
    const base64 = await convertBase64(file);
    setBaseImage1(base64);
  };

  const uploadImage2 = async (e) => {
    const file = e.target.files[0];
    const base64 = await convertBase64(file);
    setBaseImage2(base64);
  };


  const convertBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);

      fileReader.onload = () => {
        resolve(fileReader.result);
      };

      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };


  const validationSchema = Yup.object().shape({
    title:Yup.string().required('Enter title'),
    ram:Yup.string().required('Enter ram'),
    price:Yup.string().required('Enter price'),
    category:Yup.string().required('Select category'),
    subcategory:Yup.string().required('Select subcategory'),
    discription:Yup.string().required('Enter description'),
    image1:Yup.mixed()
        .test('required','Uplod the image', value =>{
          return value && value.length;
        }),
    image2:Yup.mixed()
        .test('required','Uplod the image', value =>{
          return value && value.length;
        })
  }).required()


  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(validationSchema)
  });



  const onsubmit = async(data) => {
    setAddButton(true)
    try{
        const newproduct={
           title:data.title,
            ram:data.ram,
            price:data.price,
            subcategory:data.subcategory,
            category:data.category,
            discription:data.discription,
            qty:qty,
            image1:baseImage1,
            image2:baseImage2
        }
        const res = await axios.post('/api/addproduct',newproduct)
        if(res.data){
          setAddButton(false)
          reset()
          setCatagoryId()
          setSubCategoryData()
          setQty(1)
          setIsOpenAddProduct(false)
        }
    }catch(err){
        console.log(err)
    }
};

console.log(subCategoryData)



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
    <form onSubmit={handleSubmit(onsubmit)}>
    <div className='addProduct-fields'>
    <div className='addProduct-fieldContainer addProduct-name '>
      <text>Title : </text>
      <input className={`${errors.title ? 'addProduct-error_input' :''}`}  {...register('title')}/>
    </div>
    <div className='addProduct-fieldContainer'>
    <div className='addProduct-name'>
      <text>Ram: </text>
      <input className={`${errors.ram ? 'addProduct-error_input' :''}`} placeholder='Ram'  {...register('ram')} />
    </div> 

    <div className='addProduct-name'>
      <input className={`${errors.price ? 'addProduct-error_input' :''}`}placeholder='Price'  {...register('price')}  />
    </div>
    </div>

    <div className='addProduct-fieldContainer'>
    <div className='addProduct-name'>
      <text> Total Products: </text>
      <div className='addProduct-button_qtyBtn'>
            <text className='addProduct-button_qtyBtn-button' onClick={lessqty}>-</text>
            <text>{qty}</text>
            <text className='addProduct-button_qtyBtn-button' onClick={addqty}>+</text>
        </div>
    </div>
    <div className='addProduct-name_subcatagory'>
      <text>sub category: </text>
      <select className={'addproduct-box-data_dropdown'}  {...register('subcategory')} >
        {subCategoryData?.map((item)=>(
   <option value={item?.subCatagoryName}>{item?.subCatagoryName}</option>
        ))}
</select>
{errors.subcategory && <p className='register-error-message'>{errors.subcategory.message}</p>}

    </div>
    </div>
    <div className='addProduct-name'>
      <text>Category: </text>
      <select className={'addproduct-box-data_dropdown'}  {...register('category')}  onChange={(e)=>subcategory(e.target.value)} >
        {categoryData?.map((item)=>(  
             <option  value={item?.name}>{item?.name}</option>
        ))}         
                </select>
                {errors.category && <p className='register-error-message'>{errors.category.message}</p>}
    </div>
    <div className='addProduct-name '>
      <text>Add Description: </text>
      <input className={`${errors.discription ? 'addProduct-error_input' :''}`} {...register('discription')}/>
    </div>
    <div className='addProduct-name addProduct-image'>
      <text>Upload image: </text>
      <input type='file' className={`${errors.image1 ? 'addProduct-error_input' :''}`} {...register('image1')}  onChange={(e)=>{
                uploadImage1(e);
              }}  />
      <input type='file'className={`${errors.image2 ? 'addProduct-error_input' :''}`}  {...register('image2')}  onChange={(e)=>{
                uploadImage2(e);
              }} />
    </div>
    <div className='addProduct-button'>
      {addButton == true?  <button className='addProduct-button_add' style={{cursor:"wait",backgroundColor:"#e4c892"}}>ADDING.....</button>: 
      <button className='addProduct-button_add' type="submit">ADD</button> 
      }
      <button className='addProduct-button_discart' onClick={(()=>setIsOpenAddProduct(false))}>DISCARD</button>
    </div>
    </div>
    </form>
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
     {catagoryName?<button className='addCatagory-button_add' onClick={addcatagory}>ADD</button>:
     <button className='addCatagory-button_add' onClick={addsubcatagory} style={{background:"#e4c892",cursor:"not-allowed"}}>ADD</button>}
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
