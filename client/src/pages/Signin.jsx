import React from 'react'
import { Link } from 'react-router-dom'
import { useState } from 'react';

export const Signin = () => {
  const [formData,setFormData] = useState({});
  const [err, setError] = useState(false);
  const [loading,setloading] = useState(false);

  const handleChange = (e)=>{
    setFormData({...formData, [e.target.id]: e.target.value});
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      setloading(true);
      setError(false);
      const res = await fetch('api/auth/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      console.log(data);
      setloading(false);
      if(data.success === false){
        setError(true);
        return;
      }
      
    } catch (error) {
      setloading(false);
      setError(true);
      console.error('Error:', error);
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

        <button disabled = {loading} className = 'bg-slate-700 text-white p-3 rounded-lg uppercase hover: opacity-95' >
          {loading? 'Loading...': 'Sign Up'}</button>
      </form>
      <div className="flex gap-2 mt-5">
        <p>Dont Have an account?</p>
        <Link to ='/sign-up '>
          <span className = 'text-blue-500'>SignUp</span>
        </Link>
      </div>
      <p className='text-red-600 mt-4'>{err && 'Something wrong'}</p>
    </div>
  );
};

