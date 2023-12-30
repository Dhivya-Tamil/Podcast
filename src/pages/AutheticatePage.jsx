import React from 'react'
import "./style.css"
import Header from "../components/Header"
import Input from '../components/Input'
import { useState } from 'react'
import Button from '../components/Button';
import SignupForm from '../components/Authentication/SignupForm';
import LoginForm from '../components/Authentication/LoginForm';
import podcastImg from "../images/img.jpeg"


function AuthenticatePage() {
  const[flag,setFlag] = useState(false);
 function handleSignup(){
  console.log("Signup suceess")
 }

  return (
    <div>
        <Header />
        <div className='auth-container'>
          <img src={podcastImg} alt='image'/>
          <div className='input-wrapper'>
            {!flag ? <h1>Signup</h1> : <h1>Login</h1>}
            {!flag ? <SignupForm /> :<LoginForm/>}
            {!flag ? 
            (<p style={{cursor:"pointer"}} onClick={()=>setFlag(!flag)}>Already Have an account? <span>Login</span></p>):
            (<p style={{cursor:"pointer"}} onClick={()=>setFlag(!flag)}>Don't Have an account? <span>Signup</span></p>)}
          </div>
        </div>
    </div>
  )
}

export default AuthenticatePage