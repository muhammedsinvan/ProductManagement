import express from 'express';

const router = express.Router();

import {signupdata,signindata,checktoken,addcatagory,getcatagory,addsubcatagory,addproduct,getallproducts,getproductdetail,getsearchresult,getallcatagory,sendSelectedCategories,getsearchresultbyname,favorite,getallfavarites,getFavoritProduct,removeItemFavorite} from "../Helpers/cliend.js"
import { protect } from '../Helpers/auth.js';



router.post("/signup", signupdata);

router.post("/signin", signindata);

router.get("/checktoken", protect, checktoken);

router.post("/addcatagory", addcatagory);

router.get("/getcatagory",getcatagory)

router.post("/addsubcatagory/:id", addsubcatagory);

router.post("/addproduct",addproduct);

router.get("/getallproducts",getallproducts)

router.get("/getproductdetail/:id",getproductdetail)

router.get("/getsearchresult/:searchTerm",getsearchresult)

router.get("/getallcatagory",getallcatagory)

router.get("/sendSelectedCategories/:subcategories",sendSelectedCategories)

router.get("/getsearchresultbyname/:searchTerm",getsearchresultbyname)

router.post("/favorite",favorite)

router.get("/getallfavarites",getallfavarites)

router.get("/getFavoritProduct",getFavoritProduct)

router.get("/removeItemFavorite/:itemid",removeItemFavorite)

export default router;