import express from 'express';

const router = express.Router();

import {signupdata,signindata,checktoken,addcatagory,getcatagory,addsubcatagory} from "../Helpers/cliend.js"
import { protect } from '../Helpers/auth.js';



router.post("/signup", signupdata);

router.post("/signin", signindata);

router.get("/checktoken", protect, checktoken);

router.post("/addcatagory", addcatagory);

router.get("/getcatagory",getcatagory)

router.post("/addsubcatagory/:id", addsubcatagory);


export default router;