import user from "../Model/user.js";
import CryptoJS from "crypto-js";

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

  export {signupdata}