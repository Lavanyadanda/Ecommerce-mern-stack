import React,{useState} from 'react'
import { Link, useSearchParams } from 'react-router-dom';
import { HiOutlineUser, HiOutlineShoppingBag, HiBars3BottomRight } from 'react-icons/hi2';

import SearchBar from './SearchBar';
import CartDrawer from '../layout/CartDrawer';
import { IoMdClose } from 'react-icons/io';
import { useSelector } from 'react-redux';

const Navbar = () => {
    const [drawerOpen,setDrawerOpen]=useState(false);
    const toggleCartDrawer=()=>{
        setDrawerOpen(!drawerOpen);
 };
 const [navDrawerOpen,setNavDrawerOpen]=useState(false);

const toggleNavDraw=()=>{
    setNavDrawerOpen(!navDrawerOpen);
}

const{cart}=useSelector((state)=>state.cart);
const cartItemCount=cart?.products?.reduce((total,product)=>total+product.quantity,0)|| 0;

const {user}=useSelector((state)=>state.auth);

  return (
    <>
<nav className='container mx-auto flex items-center justify-between py-4 px-6'>
    {/* 
     */}

    <div>

        <Link to='/' className='text-2xl font-medium'>
        Rabbit 
        </Link>
    </div>

    {/* center-navigation links */}
    <div className='hidden md:flex space-x-6'>
                <Link to='/collections/all?gender=Men' className='text-gray-700 hover:text-black text-sm font-medium uppercase'>
                Men
                </Link>
                <Link to='/collections/all?gender=Women'className='text-gray-700 hover:text-black text-sm font-medium uppercase'>
                Women
                </Link>
                <Link to='/collections/all?category=Top Wear'className='text-gray-700 hover:text-black text-sm font-medium uppercase'>
                TopWear
                </Link>
                <Link to='/collections/all?category=Bottom Wear'className='text-gray-700 hover:text-black text-sm font-medium uppercase'>
                Bottom wear
                </Link>

    </div>
{/* right -icons */}
<div className='flex  items-center space-x-4'>
    {user && user.role==='admin' && (<Link to='/admin' className='block bg-black px-2 rounded text-sm text-white'>Admin</Link>)
    }
    {/* <Link to='/admin' className='block bg-black px-2 rounded text-sm text-white'>Admin</Link> */}
    <Link to='/profile' className='hover:text-black' >
    <HiOutlineUser  className='h-6   w-6 text-grey-700'/>

    </Link>
    <button  onClick={toggleCartDrawer}className='relative hover:text-black'>
    <HiOutlineShoppingBag  className='h-6   w-6 text-grey-700'/> 
    {cartItemCount >0 && (<span className='absolute  -top-1  bg-[#ea2e0e] text-white text-xs rounded-full px-2 py-0.5'>{cartItemCount}</span>)}
    
  </button>
  <div className='overflow-hidden'>
        {/* search  */}
        <SearchBar/>
        </div>
        <button  className='md:hidden' onClick={toggleNavDraw} >
            <HiBars3BottomRight className=' h-6 w-6 text-gray-700'/>
        </button>
</div>

</nav>
<CartDrawer drawerOpen={drawerOpen} toggleCartDrawer={toggleCartDrawer} />
{/* Mobile navigation */}
<div className={`fixed top-0 left-0 w-3/4 sm:w-1/2 md:w-1/3  h-full  bg-white shadow-lg transform transition-transform duration-300 z-50  ${navDrawerOpen?"tranalate-x-0": "-translate-x-full"}`}>
<div className='flex justify-end p-4'>
    <button onClick={toggleNavDraw}>
        <IoMdClose className='h-6 w-6 text-gray-600'/>
    </button>
</div>
<div className='p-4'>
    <h2 className='text-xl font-semibold mb-4 '>Menu</h2>
    <nav className='space-y-4'>
        <Link to="/collections/all?gender=Men" onClick={toggleNavDraw} className='block text-gray-600 hover:text-black'>
        Man
        </Link>
        <Link to="/collections/all?gender=Women" onClick={toggleNavDraw} className='block text-gray-600 hover:text-black'>
        women
        </Link>
        <Link to="/collections/all?category=Top Wear" onClick={toggleNavDraw} className='block text-gray-600 hover:text-black'>
        TopWear
        </Link>
        <Link to="/collections/all?category=Bottom Wear" onClick={toggleNavDraw} className='block text-gray-600 hover:text-black'>
        bottom wear
        </Link>
        </nav>
</div>


</div>
    </>
  )
}

export default Navbar
