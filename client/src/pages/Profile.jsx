import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useRef } from 'react';
import { getDownloadURL, getStorage, ref, uploadBytesResumable} from 'firebase/storage'
import {app} from '../Firebase';
import { updateUserStart,updateUserFailure,updateUserSuccess, deleteUserFailure,
  deleteUserSuccess,deleteUserStart
 } from '../redux/user/userSlice';
import { useDispatch } from 'react-redux';

export const Profile = () => {
 
  const [image,setImage] = useState(undefined);
  const fileRef = useRef(null);
  const [imageperc, setImageper] = useState(0);
  const [imageerr,setImageErr] = useState(false);
  const [formData,setFormData] = useState({});
  const [updateSuccess, setUpdateSuccess] = useState(false);
  
  const dispatch = useDispatch();
  const { currentUser,loading,error} = useSelector((state)=> state.user);
  
  useEffect(()=>{
    if(image){
      handleFileUpload(image);
    }
  },[image]);
  const handleFileUpload = async (image)=>{
    const storage = getStorage(app);
    const filename = new Date().getTime() + image.name;
    const storageRef = ref(storage,filename);
    const uploadTask = uploadBytesResumable(storageRef,image);
    
    uploadTask.on(
      'state_changed',
      (snapshot)=>{
        const progress = (snapshot.bytesTransferred/snapshot.totalBytes)*100;
        setImageper(Math.round(progress))
      },
      (error)=>{
      setImageErr(true);
      },
      ()=>{
      getDownloadURL(uploadTask.snapshot.ref).then
      ((downloadUrl) => setFormData({...formData,
        profilePicture: downloadUrl}));
      }
    );
  };
  const handleChange = (e)=>{
    setFormData({ ...formData,[e.target.id]:e.target.value});
  }
  
  const handleSubmit = async (e)=>{
    e.preventDefault();
    try{
      dispatch(updateUserStart());
      const res = await fetch(`/api/user/update/${currentUser._id}`,{
        method: 'POST',
        headers :{
          'Content-Type':'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if(data.success === false){
        dispatch(updateUserFailure(data));
        return;
      }

      dispatch(updateUserSuccess(data));
      setUpdateSuccess(true);
    }catch(error){
        dispatch(updateUserFailure(error));
    }
  };
  const handledeleteAcc =async ()=>{
    try{
      dispatch(deleteUserStart());
      const res = await fetch(`api/user/delete/${currentUser._id}`,{
        method: 'DELETE',
      });
      const data = await res.json();
      if(data.success === false){
        dispatch(deleteUserFailure(data));
        return;
      }
      dispatch(deleteUserSuccess(data))
    }catch(error){
       dispatch(deleteUserFailure);
    }
  }
  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl font-semibold text-center my-7 '>Profile</h1>
      
      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
        <input type = "file" ref={fileRef} hidden accept='image/*'
        onChange={(e)=>setImage(e.target.files[0])}/>

        <img src={formData.profilePicture || currentUser.profilePicture} alt = "image"
         onClick={()=> fileRef.current.click()}
        className ='h-20 w-20 self-center cursor-pointer rounded-full object-cover '/>
        <p className='text-sm self-center'>
          {imageerr ? (
            <span className='text-red-700'>Error uploading image</span>): imageperc >0 &&
            imageperc <100 ? (
              <span className='text-slate-700'>{`Uploading: ${imageperc} %`}</span>): imageperc === 100 ?
              (<span className='text-green-700'>Image uploaded successfully</span>):''}
        </p>

        <input defaultValue={currentUser.username} 
        type = "text" 
        id = "username" 
        placeholder= "Username"
        className='bg-slate-100 rounded-lg p-3'
        onChange = {handleChange}/>

        <input defaultValue={currentUser.email} 
        type = "email" 
        id = "email" 
        placeholder= "Email"
        className='bg-slate-100 rounded-lg p-3'
        onChange = {handleChange}/>

        <input type = "password" 
        id = "password" 
        placeholder= "Password"
        className='bg-slate-100 rounded-lg p-3'
        onChange = {handleChange}/>

        <button className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95'>
          {loading ?'Loading...':'Update'}
        </button>
      </form>
      <div className='flex justify-between mt-5'>
        <span onClick={handledeleteAcc} className='text-red-700 cursor-pointer'>Delete Account</span>
        <span className='text-red-700 cursor-pointer'>Sign out</span>
      </div>
      <p className='text-red-600 mt-5'>{error && "Something went wrong!"}</p>
      <p className='text-green-600 mt-5'>{updateSuccess && "User is updated successfully"}</p>
    </div>
  )
}
