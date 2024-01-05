import React, { useEffect, useState } from 'react'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import "./Products.css"
import axios from 'axios';
import {useNavigate} from 'react-router-dom'


const Products = ({ searchResults }) => {
  const [data,setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(8); 
  const [favorites, setFavorites] = useState([])

  const navigate = useNavigate()


  useEffect(() => {
    const fetchData = async () => {
      try {
        let res = await axios.get('/api/getallproducts');
        setData(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    if (searchResults && searchResults.data && searchResults.data.length > 0) {
      // Fetch all products only if there are no search results
      setData(searchResults.data);
    } else {
      // Use search results if available
      fetchData();
    }
  }, [searchResults]);


    // Calculate the indexes of the current page
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);
  
    // Change page
    const paginate = (pageNumber) => setCurrentPage(pageNumber);


    // const toggleFavorite = axios(productId) => {
    //     let data = await axios.post
    // };

    const toggleFavorite =async(productId)=>{
      try{
        let data = await axios.post('/api/favorite',{productId})
        console.log(data)
      }catch(error){
        console.log(error)
      }
    }

  return (
    <div className='product-mainContainer'>
 
    <div className='products-container'>

  {currentItems?.map((item)=>(
    <div className='products-box'  >
      <div className='product-favoriteIcn' onClick={() => toggleFavorite(item._id)} >
        <FavoriteBorderIcon  style={{color: favorites.includes(item._id) ? 'red' : 'black' }}   />
        </div>
        <div className='product-img' onClick={()=>navigate(`/detail/${item?._id}`)}>
        <img src={item?.image1} alt='product-img'/>
        </div>
        <div className='product-content'>
        <text>{item?.title}</text>
    <text>${item?.price}</text>
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
      <div className="pagination">
        {Array.from({ length: Math.ceil(data.length / itemsPerPage) }, (_, index) => (
          <button key={index + 1} onClick={() => paginate(index + 1)}>
            {index + 1}
          </button>
        ))}
      </div>
      </div>
           
    </div>
  )
}

export default Products
