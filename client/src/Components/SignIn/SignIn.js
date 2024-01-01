import React, { useState } from 'react';
import "./SignIn.css";
import { useNavigate } from 'react-router-dom';

const SignIn = () => {

    const navigate = useNavigate();

    const[eye,seteye]=useState(true);
    const[inpass,setinpass]=useState("password");

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
                  <form  >
                  <div className="input-text">
                      <input type="text" className='wemail' placeholder='Email'  />
                      
                      <i className="fa fa-envelope"></i>
                  </div>
                  <div className="input-text">
                      <input type={inpass} className='wpassword' placeholder='Password'  />
                      <i className="fa fa-lock"></i>
                      <i onClick={Eye} className={`fa ${eye ? "fa-eye-slash" : "fa-eye"}`}></i>
                  </div>
                 
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