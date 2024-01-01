import express from 'express';

const router = express.Router();

import {signupdata,signindata} from "../Helpers/cliend.js"



router.post("/signup", signupdata);

router.post("/signin", signindata);



export default router;