import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "./SignUp.css";

const SignUp = () => {

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
                  <form  >
                  <div className="r-input-text">
                        <input type="text" className='r-wusername' placeholder='Name'/>
                        <i className="fa fa-user"></i>
                    </div>
                  <div className="r-input-text">
                      <input type="text" className='r-wemail' placeholder='Email'  />
                      
                      <i className="fa fa-envelope"></i>
                  </div>
                  <div className="r-input-text">
                      <input type={inpass} className='r-wpassword' placeholder='Password'  />
                      <i className="fa fa-lock"></i>
                      <i onClick={Eye} className={`fa ${eye ? "fa-eye-slash" : "fa-eye"}`}></i>
                  </div>
                 
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