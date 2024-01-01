import express from 'express';

const router = express.Router();

import {signupdata} from "../Helpers/cliend.js"



router.post("/signup", signupdata);


export default router;