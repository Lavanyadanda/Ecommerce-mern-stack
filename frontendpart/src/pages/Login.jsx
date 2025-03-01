import React, { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { loginUser } from '../../redux/slices/authSlice';
// import login from '../../assets/asset/login.webp'
import login from 'C:/Users/Aparna/Documents/ECommerce/frontendpart/src/assets/asset/login.webp'
//import login from '../../assets/asset/login.webp';

import { useDispatch, useSelector } from 'react-redux';
import { mergeCart } from '../../redux/slices/cartSlice';
const Login = () => {
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    const dispatch=useDispatch();
    const navigate=useNavigate();
    const location=useLocation();
    const {user,guestId,loading}=useSelector((state)=>state.auth);
    const {cart}=useSelector((state)=>state.cart);
    //get redirect parament and click ifi its us checout ors omething
    const redirect=new URLSearchParams(location.search).get("redirect")|| "/";
    const isCheckoutRedirect=redirect.includes('checkout');
    useEffect(()=>{
        if(user){
            if(cart?.products.length >0 && guestId){
                dispatch(mergeCart({guestId,user})).then(()=>{
                    navigate(isCheckoutRedirect ?"/checkout":"/");
                })
            }else{
                navigate(isCheckoutRedirect ?"/checkout":"/");
            }
        }
    },[user,guestId,cart,navigate,isCheckoutRedirect,dispatch]);
    const handleSubmit=(e)=>{
        e.preventDefault();
        dispatch(loginUser({email,password}));
        console.log("User login",{email,password});
    }

  return (
    <div className='flex'>
        <div className='w-full md:w-1/2 flex flex-col justify-center items-center p-8 md:p-12'>
        <form  onSubmit={handleSubmit}  className='w-full max-w-md bg-white p-8 rounded-lg border shawdow-sm'>
            <div className='flex justify-center mb-6'>
                <h2 className='text-xl font-medium '>Rabbit</h2>
            </div>
            <h2 className='text-2xl font-bold text-center mb-6'>Hey there</h2>
            <p className='text-center mb-6'>
                Enter your username and password to login
            </p>
            <div className='mb-4'>
                <label className='block text-sm font-bold mb-2'>
                    Email
                </label>
                <input type='email' name="email" value={email} onChange={(e)=>setEmail(e.target.value)} placeholder='enter your mail' className='w-full p-2 border rounded'/>
            </div>
            <div className='mb-4'>
                <label className='block text-sm font-bold mb-2'>
                    Password
                </label>
                <input type='password' name="password" value={password} onChange={(e)=>setPassword(e.target.value)} placeholder='enter your password' className='w-full p-2 border rounded'/>
            </div>
        <button type="submit" className='bg-black text-white w-full p-2 rounded-lg font-semibold hover:bg-gray-800 transition'>{loading?"loading":"sign in"}</button>


       <p className=' mt-6 text-center text-sm'>
        Don't have an account?
        <Link to={`/register?redirect=${encodeURIComponent(redirect)}`} className='text-blue-500'>Register</Link>
       </p>
       
       
        </form>
        </div>
        <div className='hidden md:block w-1/2 bg-grat-800'>
        <div className='h-full flex flex-col justify-center items-center'>
        <img src={login} className='w-full object-cover h-[650px]' />
            </div>
            </div>
    </div>
  )
}

export default Login
