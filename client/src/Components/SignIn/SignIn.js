import React, { useState } from 'react';
import "./SignIn.css";
import { useNavigate } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import axios from 'axios';

const SignIn = () => {

    const navigate = useNavigate();

    const[eye,seteye]=useState(true);
    const[inpass,setinpass]=useState("password");
    const[errorMessage,setErrorMessage] = useState('')

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
        email:Yup.string().required('Enter your email').email('Enter correct email'),
        password:Yup.string().required('Enter your password')
        .min(6,'Password must be atleast 6 characters')
        .max(8, 'Password must not exceed 8 characters')
      }).required()
    
      const {
        register,
        handleSubmit, 
        formState: { errors }
      } = useForm({
        resolver: yupResolver(validationSchema)
      }
      );
    
     
      const onsubmit = async(data) => {
        try{
           let res = await axios.post("/api/signin",data)
           console.log(res)
           localStorage.setItem('usertoken',res.data.jsontoken)
           localStorage.setItem('userid',res.data._id)
           setErrorMessage('')
           navigate('/')
        }catch(error){
          setErrorMessage(error.response.data)
        }
    };
    

  return (
    <>
    <div className="container">
    <div className="card">
       <div className="form">
          <div className="left-side">
           
  <div className='left-side_content'>
            <div className="heading">
                      <text>Sign In to Your Account</text>
                  </div>
                  <form onSubmit={handleSubmit(onsubmit)}  >
                  <p className='signin-error'>{errorMessage}</p>
                  <div className="input-text">
                      <input type="text" className='wemail' placeholder='Email'  {...register('email')}   />
                      <i className="fa fa-envelope"></i>
                  </div>
                  {errors.email && <p className='register-error-message'>{errors.email.message}</p>}

                  <div className="input-text">
                      <input type={inpass} className='wpassword' placeholder='Password'  {...register('password')}  />
                      <i className="fa fa-lock"></i>
                      <i onClick={Eye} className={`fa ${eye ? "fa-eye-slash" : "fa-eye"}`}></i>
                  </div>
                  {errors.password && <p className='signin-error-message'>{errors.password.message}</p>}
                  <div className="forget_pass">
                      <text>forgot password?</text>
                  </div>
                  <div className="button">
                      <button type="submit">SIGN IN</button>
                      
                  </div>
                   </form>   
                   <text className='reg-button_or'>OR</text>
                   <div className="reg-button">
                      <button type="submit" onClick={()=>navigate('/signup')}>SIGN UP</button>
                      
                  </div> 
          </div>
          </div> 
          <div className="right-side">
          <div className='right-side-text'>
            <text>Hello Friend!</text>
            <p>Enter your personal details and start journey with us</p>
            <button onClick={()=>navigate('/signup')}>
              SIGN UP
            </button>
            </div>
             </div>
          </div>
      </div>
  </div>
  </>
  )
}

export default SignIn