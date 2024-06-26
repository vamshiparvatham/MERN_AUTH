import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react';
import OAuth from '../components/OAuth';

export const Signup = () => {
  const [formData,setFormData] = useState({});
  const [err, setError] = useState(false);
  const [loading,setloading] = useState(false);
  const navigate = useNavigate();
  const handleChange = (e)=>{
    setFormData({...formData, [e.target.id]: e.target.value});
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      setloading(true);
      setError(false);
      const res = await fetch('api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      setloading(false);
      if(data.success === false){
        setError(true);
        return;
      }
      navigate('/sign-in');
    } catch (error) {
      setloading(false);
      setError(true);
      console.error('Error:', error);
    }
  };
  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl text-center font-semibold my-7'>
        Sign Up</h1>
      <form onSubmit={handleSubmit}  className='flex flex-col gap-4'>
        <input className='bg-slate-100 p-3 rounded-lg'
        type = "text" 
        placeholder = "Username" 
        id = 'username'
        onChange = {handleChange}/>

        <input className='bg-slate-100 p-3 rounded-lg'
        type = "email" 
        placeholder = "email" 
        id = 'email'
        onChange = {handleChange}/>

        <input className='bg-slate-100 p-3 rounded-lg'
        type = "password" 
        placeholder = "Enter password" 
        id = 'password'
        onChange = {handleChange}/>

        <button disabled = {loading} className = 'bg-slate-700 text-white rounded-lg p-3 uppercase hover:opacity-80' >
          {loading? 'Loading...': 'Sign Up'}</button>
            <OAuth/>
      </form>
      <div className="flex gap-2 mt-5">
        <p>Have an account?</p>
        <Link to ='/sign-in '>
          <span className = 'text-blue-500'>Signin</span>
        </Link>
      </div>
      <p className='text-red-600 mt-4'>{err && 'Something wrong'}</p>
    </div>
  );
};
