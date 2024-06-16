import React from 'react'
import {GoogleAuthProvider, signInWithPopup,getAuth} from 'firebase/auth'
import { app } from '../Firebase';
import {useDispatch } from 'react-redux';
import { signInstart,signInsuccess,signInfailure } from '../redux/user/userSlice';
import {useNavigate} from 'react-router-dom'

const OAuth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
    const handleGoogle = async() =>{
        try{
            const provider = new GoogleAuthProvider();
            const auth = getAuth(app);
            const result = await signInWithPopup(auth,provider);
            const res = await fetch('api/auth/google', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: result.user.displayName,
                    email: result.user.email,
                    photo: result.user.photoURL,
                }),
              });
            const data = await res.json();
            console.log(result);
            console.log(data);
            dispatch(signInsuccess(data));
            navigate('/')
        }catch(error){
            console.log(error);
        }
    }
  return (
    <button type = "button" onClick={handleGoogle} className='bg-red-700 text-white rounded-lg p-3 uppercase hover:opacity-80'>
        continue with google
    </button>
  )
}

export default OAuth