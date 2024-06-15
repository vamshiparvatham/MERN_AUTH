import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react';
import { signInstart,signInsuccess,signInfailure } from '../redux/user/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import OAuth from '../components/OAuth';

export const Signin = () => {
  const [formData,setFormData] = useState({});
  const {loading,error } = useSelector((state)=>state.user);
  console.log(error);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleChange = (e)=>{
    setFormData({...formData, [e.target.id]: e.target.value});
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      dispatch(signInstart());
      const res = await fetch('api/auth/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      
      if(data.success === false){
        dispatch(signInfailure(data));
        return;
      }
      dispatch(signInsuccess(data));
      navigate('/');
    } catch (error) {
      dispatch(signInfailure(error));
      
    }
  };
  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl text-center font-semibold my-7'>
        Sign In</h1>
      <form onSubmit={handleSubmit}  className='flex flex-col gap-4'>

        <input className='bg-slate-100 p-3 rounded-lg'
        type = "email" 
        placeholder = "Email" 
        id = 'email'
        onChange = {handleChange}/>

        <input className='bg-slate-100 p-3 rounded-lg'
        type = "password" 
        placeholder = "Enter password" 
        id = 'password'
        onChange = {handleChange}/>

        <button disabled = {loading} className = 'bg-slate-700 text-white rounded-lg p-3 uppercase hover:opacity-80' >
          {loading? 'Loading...': 'Sign in'}</button>
        <OAuth/>
      </form>
      <div className="flex gap-2 mt-5">
        <p>Dont Have an account?</p>
        <Link to ='/sign-up '>
          <span className = 'text-blue-500'>Sign Up</span>
        </Link>
      </div>
      <p className='text-red-600 mt-4'>{error ? error.error || 'Something wrong': ''}</p>
    </div>
  );
};

