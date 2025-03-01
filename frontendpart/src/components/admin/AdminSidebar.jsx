// import React from 'react'
// import { FaBoxOpen, FaClipboardList, FaStore, FaUser } from 'react-icons/fa'
// import { Link, NavLink } from 'react-router-dom'

// const AdminSidebar = () => {
//   return (
//     <div className='p-6'>
//         <div className='mb-6'>
//             <Link to='/admin' className='text-2xl font-medium'>Rabbit</Link>
//         </div>
//         <h2 className='text-xl font-medium mb-6 text-center'>Admin Board</h2>
//       <nav className='flex flex-col space-y-2'>
//     <NavLink to='/admin/users' className={({isActive})=>isActive?"bg-gray-700  text-white py-3 px-4 rounded flex items-center space-x-2":"text-gray-300 hover:bg-gray-700 hover:text-white py-3 px-4 rounded flex  items-center space-x-2"}>
//     <FaUser/>
//     <span>Users</span>
//     </NavLink>
//     <NavLink to='/admin/products' className={({isActive})=>isActive?"bg-gray-700  text-white py-3 px-4 rounded flex items-center space-x-2":"text-gray-300 hover:bg-gray-700 hover:text-white py-3 px-4 rounded flex  items-center space-x-2"}>
//     <FaBoxOpen/>
//     <span>Products</span>
//     </NavLink>
//     <NavLink to='/admin/orders' className={({isActive})=>isActive?"bg-gray-700  text-white py-3 px-4 rounded flex items-center space-x-2":"text-gray-300 hover:bg-gray-700 hover:text-white py-3 px-4 rounded flex  items-center space-x-2"}>
//     <FaClipboardList/>
//     <span>Orders</span>
//     </NavLink>
//     <NavLink to='/' className={({isActive})=>isActive?"bg-gray-700  text-white py-3 px-4 rounded flex items-center space-x-2":"text-gray-300 hover:bg-gray-700 hover:text-white py-3 px-4 rounded flex  items-center space-x-2"}>
//     <FaStore/>
//     <span>Shop</span>
//     </NavLink>
    
//       </nav>
//     </div>
//   )
// }

// export default AdminSidebar
import React from 'react';
import { FaBoxOpen, FaClipboardList, FaSignOutAlt, FaStore, FaUser } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { Link, NavLink, useNavigate } from 'react-router-dom';

const AdminSidebar = () => {
    const navigate=useNavigate();
    const dispatch=useDispatch();



    const handleLogout=()=>{
      dispatch(logout());
      dispatch(clearCart());
        navigate("/");
    }
  return (
    <div className="p-6 w-64 h-screen bg-gray-900 text-white fixed">
      {/* Sidebar Header */}
      <div className="mb-6 text-center">
        <Link to="/admin" className="text-2xl font-bold text-white">
          Rabbit
        </Link>
      </div>

      <h2 className="text-lg font-semibold mb-6 text-center">Admin Board</h2>

      {/* Navigation Links */}
      <nav className="flex flex-col space-y-2">
        <NavLink
          to="/admin/users"
          className={({ isActive }) =>
            `py-3 px-4 rounded flex items-center space-x-2 ${
              isActive ? "bg-gray-700 text-white" : "text-gray-300 hover:bg-gray-700 hover:text-white"
            }`
          }
        >
          <FaUser />
          <span>Users</span>
        </NavLink>

        <NavLink
          to="/admin/products"
          className={({ isActive }) =>
            `py-3 px-4 rounded flex items-center space-x-2 ${
              isActive ? "bg-gray-700 text-white" : "text-gray-300 hover:bg-gray-700 hover:text-white"
            }`
          }
        >
          <FaBoxOpen />
          <span>Products</span>
        </NavLink>

        <NavLink
          to="/admin/orders"
          className={({ isActive }) =>
            `py-3 px-4 rounded flex items-center space-x-2 ${
              isActive ? "bg-gray-700 text-white" : "text-gray-300 hover:bg-gray-700 hover:text-white"
            }`
          }
        >
          <FaClipboardList />
          <span>Orders</span>
        </NavLink>

        <NavLink
          to="/"
          className={({ isActive }) =>
            `py-3 px-4 rounded flex items-center space-x-2 ${
              isActive ? "bg-gray-700 text-white" : "text-gray-300 hover:bg-gray-700 hover:text-white"
            }`
          }
        >
          <FaStore />
          <span>Shop</span>
        </NavLink>
      </nav>
      <div className='mt-6'>
        <button onClick={handleLogout} className='w-full bg-red-500 hover:bg-red-600 py-2 px-4 rounded flex items-center justify-center space-x-2'>
            <FaSignOutAlt/>
            <span>Logout</span>
        </button>
      </div>
    </div>
  );
};

export default AdminSidebar;
