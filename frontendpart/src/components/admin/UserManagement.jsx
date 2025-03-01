import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchUsers } from '../../../redux/slices/adminSlice';

const UserManagement = () => {
    // const users=[
    //     {_id:123123,
    //         name:"John Doe",
    //         email:"john@example.com",
    //         role:"admin",
    //     },
    // ]



    const dispatch=useDispatch();
    const navigate=useNavigate();
const {user}=useSelector((state)=>state.auth);
const {users,loading,error}=useSelector((state)=>state.admin);
useEffect(()=>{
    if(user && user.role!=='admin'){
        navigate('/');
    }
},[user,navigate])
useEffect(()=>{
    if(user && user.role==="admin"){
        dispatch(fetchUsers);
    }
},[dispatch]);

    const [formData,setFormData]=useState({
        name:"",
        email:"",
        password:"",
        role:"cutsomer"//default role
    });
    const handleChange=(e)=>{
        setFormData({...formData,[e.target.name]:e.target.value});
    }
    const handleSubmit=(e)=>{
        e.preventDefault();
        dispatch(addUser(formdata));
        //reset form after submission
        setFormData({ name:"",
            email:"",
            password:"",
            role:"cutsomer"});
    }
    const handleRoleChange=(userId,newRole)=>{
        // console.log({id:userId,role:newRole});

        dispatch(updateUser({id:userId,role:newRole}));

    }
    const handleDeleteUser=(userId)=>{
        if(window.confirm("are you want to delete this user")){

            dispatch(deleteUser(userId));
           // console.log(`eleting user with id  ${userId}`)
        }
    }
  return (
    <div className='max-w-7xl mx-auto p-6'>
        <h2 className='text-2xl font-bold mb-6'>user management</h2>
        {/* add new user form */}
        {loading && <p>loading..</p>}
        {error && <p>error:{error}</p>}
        <div className='p-6 rounded-lg mb-6'>
            <h3 className='text-lg font-bold mb-4 '>Add new user

            </h3>
            <form onSubmit={handleSubmit}>
                <div className='mb-4'>
                    <label className='block text-gray-700'>Name</label>
                <input  required type='text' className='w-full p-2 border rounded' name='name' value={formData.name} onChange={()=>handleChange}/>

                </div>
                <div className='mb-4'>
                    <label className='block text-gray-700'>Email</label>
                <input required type='email' className='w-full p-2 border rounded' name='email' value={formData.mail} onChange={()=>handleChange}/>

                </div>
                <div className='mb-4'>
                    <label className='block text-gray-700'>Password</label>
                <input  required type='password' className='w-full p-2 border rounded' name='password' value={formData.password} onChange={()=>handleChange}/>

                </div>
                <div className='mb-4'>
                    <label className='block text-gray-700'>Role</label>
                        <select className='w-full p-2 border rounded' name="role" value={formData.role} onChange={handleChange}>
                            <option value="customer">Customer</option>
                            <option value="admin">Admin</option>
                        </select>

                </div>
                <button type='submit' className='bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600'>Add User</button>
            </form>
        </div>
        {/* user list management */}
        <div className='overflow-x-auto shadow-md sm:rounded-lg'>
            <table className='min-w-full text-left text-gray-500'>
                <thead className='bg-gray-100 text-xs uppercase text-gray-700'>
                    <tr>
                        <th className='py-3 px-4'>Name</th>
                        <th className='py-3 px-4'>Email</th>
                        <th className='py-3 px-4'>Role</th>
                        <th className='py-3 px-4'>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user)=>(<tr key={user._id} className='border-b hover:bg-gray-50'>
                        <td className='p-4 font-medium text-gray-900 whitespace-nowrap'>
                            {user.name}
                        </td>
                        <td className='p-4'>{user.email}</td>
                        <td className='p-4'>
                            <select value={user.role} onChange={(e)=>handleRoleChange(user._id,e.target.value)}
                                className='p-2 border rounded' >
                                            <option value="customer">Cutsomer</option>
                                            <option value="admin">Admin</option>
                            </select>
                        </td>
                        <td className='p-4'>{user.email}</td>
                        <td className='p-4'>
                            <button onClick={()=>handleDeleteUser(user._id)}
                                className='bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600'>Delete</button>
                        </td>

                    </tr>))}
                </tbody>
            </table>
        </div>
      
    </div>
  )
}

export default UserManagement
