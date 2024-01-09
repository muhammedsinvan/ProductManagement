import user from "../Model/user.js";
import CryptoJS from "crypto-js";
import jwt from "jsonwebtoken";
import catagory from "../Model/addCategory.js";
import product from "../Model/product.js";
import cloudinary from "../utils/cloudinary.js";
import favarite from "../Model/favarites.js";

const signupdata = async (req, res) => {
    const { username, email, password } = req.body;
    console.log(req.body)
    try {
      const userExists = await user.findOne({ email });
      if (userExists) {
        res.status(400);
        res.json("user already exists");
      }
      const newUser = new user({
        username: username,
        email: email,
        password: CryptoJS.AES.encrypt(password, process.env.PASS_KEY),
      });
      const savedUser = await newUser.save();
      res.status(200).json(savedUser);
    } catch (err) {
      res.status(500).json(err);
    }
  };


  const signindata = async (req, res) => {
    const { email, password } = req.body;
    try {
      const users = await user.findOne({ email });
      if (users) {
        const hashedPassword = CryptoJS.AES.decrypt(
          users.password,
          process.env.PASS_KEY
        );
        const orginalpassword = hashedPassword.toString(CryptoJS.enc.Utf8);
        if (orginalpassword === password) {
          const jsontoken = jwt.sign({ id: users._id }, process.env.JWT_SEC, {
            expiresIn: "3d",
          });
          const { password, ...others } = users._doc;
          res.status(200).json({ ...others, jsontoken });
        } else {
          res.status(400).json("Incorrect password");
        }
      } else {
        res.status(400).json("Incorrect email");
      }
    } catch (error) {
      res.status(500);
      res.json(error);
    }
  };

  const checktoken =(req,res)=>{
    res.json({
      message: "token success",
      success: true
  })
  }

  const addcatagory = async (req, res) => {
    const { name } = req.body;
    try {
      const newcatagory = new catagory({
        name
      });
  
      const catagoryadded = await newcatagory.save();
      res.json(catagoryadded);
    } catch (error) {
      res.status(500);
      res.json(error);
    }
  };


  const getcatagory = async (req,res)=>{
    try{
        const data = await catagory.find();
        res.json(data);    
    }catch(error){
        res.status(500);
        res.json(error);
    }
  }


  const addsubcatagory = async (req,res)=>{
    const catagoryId = req.params.id;
    try {
      let catagoryData = await catagory.findOne({ _id: catagoryId });
      if (catagoryData) {
        let newdata = catagoryData.subcategory.push(req.body);
        console.log(newdata);
      }
      let addSubCategory = await catagoryData.save(); 
      res.json(addSubCategory);
    } catch (error) {
      res.status(500).json(error);
    }
  }

  const addproduct = async (req,res)=>{
    const {
      title,
      ram,
      price,
      subcategory,
      category,
      discription,
      qty,
      image1,
      image2
    } = req.body;
    const response1 = await cloudinary.uploader.upload(image1);
    const response2 = await cloudinary.uploader.upload(image2);
  
    try {
      const newproduct = new product({
      title,
      ram,
      price,
      subcategory,
      category,
      discription,
      qty,
      image1: response1.secure_url,
      image2: response2.secure_url,
      });
  
      const productadded = await newproduct.save();
      res.json(productadded);
    } catch (errror) {
      res.status(500);
      res.json(errror);
    }
  }

  const getallproducts =async(req,res)=>{
    try {
      const allproduct = await product.find({}).sort({ _id: -1 });
      res.json(allproduct);
    } catch (error) {
      res.status(500);
      res.json(error);
    }
  }
  
  const getproductdetail = async (req, res) => {
    try {
      const data = await product.findById(req.params.id);
      res.json(data);
    } catch (error) {
      res.status(500);
      res.json(error);
    }
  };

  const getsearchresult = async (req,res)=>{
    const searchTerm = req.params.searchTerm;
    try{
      const regex = new RegExp(`^${searchTerm}`, 'i');
      const results = await product.find({ title: { $regex: regex } })
      res.json(results)  
    }catch(error){
      res.status(500);
      res.json(error);
    }
  }

  const getallcatagory = async (req,res)=>{
        try{
          let categories = await catagory.find({}).sort({ _id: -1 });
         
          res.json(categories);
    }catch(error){
      res.status(500);
      res.json(error);
    }
  }

  const sendSelectedCategories = async (req,res)=>{
    try {
      const subcategories = req.params.subcategories.split(',');
      const matchedProducts = await product.find({
        subcategory: { $in: subcategories }
      });
  
      res.json(matchedProducts);
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  const getsearchresultbyname =async (req,res)=>{
    const title = req.params.searchTerm;
    try{
      let data = await product.findOne({title})
      res.json(data)
    }catch(error){
      res.status(500);
      res.json(error);
    }
  }

  const favorite = async (req,res)=>{
    const {productId} = req.body;
    const userid = req.params.userid;
    try{
      let [data] = await favarite.find({userid})
      if(data){
        let itemindex = data.products.findIndex((p)=>p.productId == productId)
        if(itemindex >= 0){
          let findProductItem = data.products[itemindex]
          data.products.pull(findProductItem);
          let removeFavorite = await data.save();
          res.json(removeFavorite);
        }else{
        const addFavorite =  await favarite.findOneAndUpdate({userid},{
        $push:{
          products:{
            productId:productId
          }
        }
       })
       res.json(addFavorite)
        }
      }else{
        const newFavorite = new favarite({
          userid,
          products:[
            {
              productId:productId
            }
          ]
        })

        let addNewFavorite = await newFavorite.save();
        res.json(addNewFavorite)
      }
    }catch(error){
      res.status(500);
      res.json(error);
    }
  }

  const getallfavarites = async (req,res)=>{
    const userid = req.params.userid;
    try{
      let [data] = await favarite.find({userid})
      res.json(data)
    }catch(error){
      res.status(500);
      res.json(error);
    }
  }

  const getFavoritProduct = async(req,res)=>{
    const userid = req.params.userid;
    try{
      let [allFavorites] = await favarite.find({userid}) 
      const favoriteProductIds = allFavorites.products.map((favorite) => favorite.productId);
      const favoritedProducts = await product.find({ _id: { $in: favoriteProductIds } });
      res.json(favoritedProducts)
    }catch(error){
      res.status(500);
      res.json(error);
    }
  }

  const removeItemFavorite = async(req,res)=>{
    const productId = req.params.itemid;
    const userid = req.params.userid;
     try{
      let [data] = await favarite.find({userid})
      let itemindex = data.products.findIndex((p)=>p.productId == productId)
      let findProductItem = data.products[itemindex]
      console.log(findProductItem)
      data.products.pull(findProductItem);
      let removeFavorite = await data.save();
      res.json(removeFavorite);
    }catch(error){
      res.status(500);
      res.json(error);
    }
  }

  export {signupdata,signindata,checktoken,addcatagory,getcatagory,addsubcatagory,addproduct,getallproducts,getproductdetail,getsearchresult,getallcatagory,sendSelectedCategories,getsearchresultbyname,favorite,getallfavarites,getFavoritProduct,removeItemFavorite}