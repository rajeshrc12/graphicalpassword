import React, { useRef } from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MdAlternateEmail } from 'react-icons/md';
import { AiOutlineEye } from 'react-icons/ai';
import Swal from 'sweetalert2';
const Signup = () => {
  const [showPassword1,setShowPassword1] = useState(false);
  const [showPassword2,setShowPassword2] = useState(false);
  const passRef = useRef();
  const cpassRef = useRef();
  const emailRef = useRef();
  const colorRef = useRef();
  const navigate = useNavigate();
function isPasswordMatched(e){
      e.preventDefault();
      if(passRef.current.value===cpassRef.current.value)
      {
        const data = {"email":emailRef.current.value,"password":passRef.current.value,"color":colorRef.current.value};
        sessionStorage.setItem("data",JSON.stringify(data) );
        Swal.fire({
          title: 'Sign Up Complete',
          text: "Do You Remember your color?",
          icon: 'success',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Yes!',
          cancelButtonText: 'No!',
        }).then((result) => {
          if (result.isConfirmed) {
            navigate("/circle");
          }
        })
        //navigate("/circle");
      }
      else
      {
        Swal.fire({
          icon: 'error',
          title: 'Password is not matching',
          text: ' Check your password'
        })
      }
  }
  return (
    <div className="container">
      <form onSubmit={isPasswordMatched} className="card">
      <div className="title">Sign Up</div>
        <div className="input_wrapper">
          <input ref={emailRef} type="text" pattern="^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$" placeholder='Email' required/>
          <MdAlternateEmail className='icon'/>
        </div>
        <div className="input_wrapper">
          <input ref={passRef} type={showPassword1?"text":"password"} onInvalid={e => e.target.setCustomValidity('Minimum 8 and maximum 16 characters, at least one uppercase letter, one lowercase letter, one number and one special character:')} onInput={e => e.target.setCustomValidity('')} pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,16}$" placeholder='Password'  required/>
          <AiOutlineEye onClick={()=>setShowPassword1(!showPassword1)} className="icon"/>
        </div>
        <div className="input_wrapper">
          <input ref={cpassRef} type={showPassword2?"text":"password"} placeholder='Re-type Password'  required/>
          <AiOutlineEye onClick={()=>setShowPassword2(!showPassword2)} className="icon"/>
        </div>
        <select ref={colorRef} required>
          <option value="">Select Color</option>
          <option value="#2e003e">Violet</option>
          <option value="#2ab7ca">Sky Blue</option>
          <option value="#fed766">Light Yellow</option>
          <option value="#4f372d">Brown</option>
          <option value="#f37736">Orange</option>
          <option value="#7bc043">Green</option>
          <option value="#ff3377">Pink</option>
          <option value="#ffdbac">Skin Color</option>
        </select>
        <button>SUBMIT</button>
      </form>
    </div>
  )
}

export default Signup;