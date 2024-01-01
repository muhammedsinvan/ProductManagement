import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {useForm} from "react-hook-form";
import  {yupResolver} from "@hookform/resolvers/yup";
import axios from 'axios';
import * as Yup from 'yup';
import "./SignUp.css";

const SignUp = () => {

    const navigate = useNavigate();

    const[eye,seteye]=useState(true);
    const[inpass,setinpass]=useState("password");

    const [errormessage,setError] = useState('')

    const Eye=()=>{
        if(inpass==="password"){
            setinpass("text");
            seteye(false); 
        }
        else{
            setinpass("password");
            seteye(true);  
        }
     }

     const validationSchema = Yup.object().shape({
        username:Yup.string().required('Enter valid username'),
        email:Yup.string().required('Enter valid email').email('Enter correct email'),
        password:Yup.string().required('Enter valid password')
        .min(6,'Password must be atleast 6 characters')
        .max(8, 'Password must not exceed 8 characters')
    
      }).required()
    

      const {
        register,
        handleSubmit, 
        formState: { errors }
      } = useForm({
        resolver: yupResolver(validationSchema)
      });


      const onsubmit = async(data) => {
        try{
           await axios.post("/api/signup",data)
          navigate('/signin')
        }catch(error){
          setError(error.response.data)
        }
    };
    

  return (
    <>
    <div className="r-container">
    <div className="r-card">
       <div className="r-form">
          <div className="r-left-side">
          <div className='r-left-side-text'>
            <text>Welcome Back!</text>
            <p>To keep connected with us plase login with your personal info</p>
            <button onClick={()=>navigate('/signin')}>
              SIGN IN
            </button>
            </div>

          </div>



          <div className="r-right-side">
         

            <div className='r-right-side_content'>
            <div className="r-heading">
                      <text>Create Account</text>
                  </div>
                  <form onSubmit={handleSubmit(onsubmit)} >
                  <div className='registration-error'>{errormessage}</div>
                  <div className="r-input-text">
                        <input type="text" className='r-wusername' placeholder='Name' {...register('username')}/>
                        <i className="fa fa-user"></i>
                    </div>
                    {errors.username && <p className='register-error-message'>{errors.username.message}</p>}
                  <div className="r-input-text">
                      <input type="text" className='r-wemail' placeholder='Email' {...register('email')}  />
                      
                      <i className="fa fa-envelope"></i>
                  </div>
                  {errors.email && <p className='register-error-message'>{errors.email.message}</p>}
                  <div className="r-input-text">
                      <input type={inpass} className='r-wpassword' placeholder='Password' {...register('password')} />
                      <i className="fa fa-lock"></i>
                      <i onClick={Eye} className={`fa ${eye ? "fa-eye-slash" : "fa-eye"}`}></i>
                      
                  </div>
                  {errors.password && <p className='register-error-message'>{errors.password.message}</p>}
                 
                  <div className="r-button">
                      <button type="submit">SIGN UP</button>
                      
                  </div>
                   </form>   
                   <text className='r-reg-button_or'>OR</text>
                   <div className="r-reg-button">
                      <button type="submit" onClick={()=>navigate('/signin')}>SIGN IN</button>
                      
                  </div> 
          </div>
             </div>
          </div>
      </div>
  </div>
  </>
  )
}

export default SignUp