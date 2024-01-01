import user from "../Model/user.js";
import CryptoJS from "crypto-js";
import jwt from "jsonwebtoken";
import catagory from "../Model/addCategory.js";

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
      console.log(savedUser);
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
        console.log(data)
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
  

  export {signupdata,signindata,checktoken,addcatagory,getcatagory,addsubcatagory}