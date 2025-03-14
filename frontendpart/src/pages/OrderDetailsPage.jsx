import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom'
import { fetchOrderDetails } from '../../redux/slices/orderSlice';
const OrderDetailsPage = () => {
    const {id}=useParams();
    //const [orderDetails,setOrderDetails]=useState(null);

const dispatch=useDispatch();
const {orderDetails,loading,error}=useSelector((state)=>state.orders);

useEffect(()=>{
    dispatch(fetchOrderDetails(id));
},[dispatch,id]);


if(loading){
    return <p> loading...</p>
}
if(error){
    return <p> error:{error}</p>
}



   //
    //     const mockOrderDetails={
    //         _id:id,
    //         createdAt:new Date(),
    //         isPaid:true,
    //         isDelivered:false,
    //         paymentMethod:"PayPal",
    //         shippingMethod:"Standard",
    //         shippingAddress:{
    //             city:"New York",
    //             country:"USA",
    //         },
    //         orderItems:[
    //             {
    //             productId:"1",
    //             name:"Jacket",
    //             price:120,
    //             quantity:1,
    //             image:"https://picsum.photos/150?random=1",
    //         },
    //         {
    //             productId:"2",
    //             name:"Jacket",
    //             price:120,
    //             quantity:1,
    //             image:"https://picsum.photos/150?random=2",
    //         },

    //     ],
    //     };
    //     setOrderDetails(mockOrderDetails);
    // },[id]);
      return (
    <div className='max-w-7xl mx-auto p-4 sm:p-6'>
        <h2 className='text-2xl md:text-3xl  font-bold mb-6'>Order Details</h2>
      {!orderDetails ?(<p>No order details found</p>):(<div className='p-4 sm:p-6 rounded-lg border'>
        {/* order info */}
        <div className='flex flex-col sm:flex-row justify-between mb-8'>
            <div >
                <h3 className='text-lg md:text-xl font-semibold '>Order ID:#{orderDetails._id}</h3>
                <p className='text-gray-600'> {new Date(orderDetails.createdAt).toLocaleDateString()}</p>

            </div>
            <div className='flex flex-col items-start sm:items-end mt-4 sm:mt-0'>
                <span className={`${orderDetails.isPaid ? "bg-green-100 text-green-700":" bg-red-100 text-red-700"} px-3 py-1 rounded-full text-sm  font-medium mb-2`} >
                    {orderDetails.isPaid?"Approved":" pending"}


                </span>
                <span className={`${orderDetails.isDelivered ? "bg-green-100 text-green-700":" bg-yellow-100 text-yellow-700"} px-3 py-1 rounded-full text-sm  font-medium mb-2`} >
                    {orderDetails.isDelivered?"Deliverd":" Arrive soon"}

                </span>
                </div>
        </div>
{/* customer ,payment shipping info */}
<div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mb-8'>
    <div>
        <h4 className='text-lg font-semibold mb-2'>Payment info</h4>
        <p>Payment method:{orderDetails.paymentMethod}</p>
        <p>Status:{orderDetails.isPaid? "paid":" umPaid"}</p>
        </div>
        <div>
        <h4 className='text-lg font-semibold mb-2'>shipping info</h4>
        <p>Payment method:{orderDetails.shippingMethod}</p>
        <p>address:{" "}
            {`${orderDetails.shippingAddress.city},${orderDetails.shippingAddress.country}`}
        </p>
        </div>
    </div>
    {/* product list */}
    <div className='overflow-x auto'>
        <h4 className='text-lg font-semibold mb-4'>Products</h4>
        <table className='min-w-full text-gray-600 mb-4'>
            <thead className='bg-gray-100'>
                <tr>
                    <th className='py-2 px-4'>Name</th>
                    <th className='py-2 px-4'>unit price </th>
                    <th className='py-2 px-4'>qquantity </th>
                    <th className='py-2 px-4'>total </th>
                </tr>
            </thead>
            <tbody>
                {orderDetails.orderItems.map((item)=>(
                    <tr key={item.productId} className='border-b'>
                        <td className='py-2 px-4 flex items-center'>
                            <img src={item.image} alt={item.name} className='w-12 h-12 object-cover rounded-lg mr-4'/>
                            <Link to={`/product/${item.productId}`} className='text-blue-500 hover:underline '> {item.name}</Link>
                        </td>
                        <td className='py-2 px-4'>${item.price}</td>
                        <td className='py-2 px-4'>{item.quantity}</td>
                        <td className='py-2 px-4'>${item.price*item.quantity}</td>
                    </tr>
                ))}
            </tbody>
        </table>
        </div>

        {/* back to orders link */}
        <Link to='/my-orders' className='text-blue-500 hover:underline'>Back to My Orders</Link>
      </div>)}
    </div>
  )
}

export default OrderDetailsPage
