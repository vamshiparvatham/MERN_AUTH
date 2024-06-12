import React from 'react'
import { Link } from 'react-router-dom'
export const Header = () => {
  return (
    <div className='bg-slate-200'>
        <div className ='flex justify-between items-center max-w-6xl mx-auto p-3'>
            <Link to='/'>
                <h1 className='font-bold'>Auth App</h1>
            </Link>
            
            <ul className='flex gap-4'>
                <Link to='/home'><li>Home</li></Link>
                <Link to='/about'><li>About</li></Link>
                <Link to='/sigin'><li>Login</li></Link>
            </ul>
        </div>
    </div>
  )
}