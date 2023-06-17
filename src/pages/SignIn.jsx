import React from 'react'
import LogoImage from '../assets/logo.png'
import './index.css'

const SignIn = ()=> {
  return (
    <>
     <div class='container'>
      <img src={LogoImage}/>  
      <h3>Welcome to D3moon</h3>
      <input type="number" placeholder='Type your access code '/>
     </div>
    </>
  )
}

export default SignIn