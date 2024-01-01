import express from 'express';

const router = express.Router();

import {signupdata,signindata,checktoken} from "../Helpers/cliend.js"
import { protect } from '../Helpers/auth.js';



router.post("/signup", signupdata);

router.post("/signin", signindata);

router.get("/checktoken", protect, checktoken);


export default router;