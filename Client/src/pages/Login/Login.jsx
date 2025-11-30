import React, { useRef } from 'react'

const Login = () => {

   let emailRef = useRef();
   let passwordRef = useRef();
   
   function loginHandler(){
      
   }
  return (
    <div>
      <input ref={emailRef} type="text" placeholder='Enter email' />
      <input ref={passwordRef} type="text" placeholder='Enter password' />
      <button onClick={loginHandler}>Login</button>
    </div>
  )
}

export default Login