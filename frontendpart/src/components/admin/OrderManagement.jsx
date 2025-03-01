import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchAllOrders, updateOrderStatus } from '../../../redux/slices/adminOrderSlice';

const OrderManagement = () => {
    // const orders=[
    //     {
    //         _id:1231231,
    //         user:{
    //             name:"John DOe",
    //         },
    //         totalPrice:110,
    //         status:"Processing",
    //     },
    // ]
    const handleStatusChange=(orderId,status)=>{
       // console.log({id:orderId,status});
       dispatch(updateOrderStatus({id:orderId,status}));
    }

    if(loading) return <p>laoding...</p>
    if(error) return <p> error:{error}</p>
    const dispatch=useDispatch();
    const navigate=useNavigate();
    const {user}=useSelector((state)=>state.auth);
    const {orders,loading,error}=useSelector((state)=>state.adminOrders);
    useEffect(()=>{
        if(!user || user.role!=='admin'){
            navigate('/');
        }else{
            dispatch(fetchAllOrders());
        }
    },[dispatch,user,navigate])
  return (
    <div className='max-w-7xl mx-auto p-6'>
        <h2 className='text-2xl mb-6 font-bold'>Order management</h2>
        <div className='overflow-x-auto shadow-md sm:rounded-lg'>
            <table className='min-w-full text-left text-gray=500'>
                <thead className='bg-gray-100 text-xs uppercase text-gray-700'>
                    <tr>
                       <th className='py-3 px-4'>order id</th> 
                       <th className='py-3 px-4'> customer</th> 
                       <th className='py-3 px-4'> total price</th> 
                       <th className='py-3 px-4'>status</th> 
                       <th className='py-3 px-4'>actions</th> 

                    </tr>
                </thead>
                <tbody>
    {orders.length > 0 ? (
        orders.map((order) => (
            <tr key={order._id} className='border-b hover:bg-gray-50 cursor-pointer'>
                <td className='py-4 px-4 font-medium text-gray-900 whitespace-nowrap'>#{order._id}</td>
                <td className='p-4'>{order.user.name}</td>
                <td className='p-4'>${order.totalPric.toFixed(2)}</td>
                <td className='p-4'>
                    <select onChange={(e) => handleStatusChange(order._id, e.target.value)}
                        value={order.status}
                        className='bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5'>
                        <option value='Processing'>Processing</option>
                        <option value='Shipped'>Shipped</option>
                        <option value='Delivered'>Delivered</option>
                        <option value='Cancelled'>Cancelled</option>
                    </select>
                </td>
                <td className='p-4'>
                    <button onClick={() => handleStatusChange(order._id, "Delivered")} 
                        className='bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600'>
                        Mark as Delivered
                    </button>
                </td>
            </tr>
        ))
    ) : (
        <tr>
            <td colSpan={5} className='p-4 text-center text-gray-500'>No Orders found</td>
        </tr>
    )}
</tbody>

            </table>
        </div>
      
    </div>
  )
}

export default OrderManagement
