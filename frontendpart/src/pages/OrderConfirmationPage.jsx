// import React from 'react'
// const checkout={
//     _id:"12342",
//     createdAt:new Date(),
//     checkoutItems:[
//         {
//             productId:"1",
//             name:"jacket",
//             color:"black",
//             size:"m",
//             price:150,
//             quantity:1,
//             image:"https://picsum.photos/150?random=1"
//         },
//     ],
//     shippingAddress:{
//         address:"123 fashion street",
//         city:"new york",
//         country:"USA",
//     },
// }
// const OrderConfirmationPage = () => {
//   return (
//     <div className='max-w-4xl mx-auto p-6 bg-white'>
//         <h1 className='text-4xl font-bold text-center text-emerald-700 mb-8'>
//             Thank you for your order!
//         </h1>
//         {checkout&& (<div className='p-6  rounded-lg border'>
//             <div className='flex justify-between mb-20'>
// {/* orderid and date */}
// <div >
//     <h2 className='text-xl font-semibold'>Order_id:{checkout._id}</h2>
//     <p className='text-gray-500'>
//         order date:{new Date(checkout.createdAt).toLocaleDateString()}
//     </p>
//             </div>
//             </div>) 
//             }
//     </div>
//   )
// }

// export default OrderConfirmationPage

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

// const checkout = {
//     _id: "12342",
//     createdAt: new Date(),
//     checkoutItems: [
//         {
//             productId: "1",
//             name: "jacket",
//             color: "black",
//             size: "m",
//             price: 150,
//             quantity: 1,
//             image: "https://picsum.photos/150?random=1"
//         },
//         {
//             productId: "2",
//             name: "jacket",
//             color: "black",
//             size: "m",
//             price: 150,
//             quantity: 2,
//             image: "https://picsum.photos/150?random=2"
//         },
//     ],
//     shippingAddress: {
//         address: "123 fashion street",
//         city: "New York",
//         country: "USA",
//     },
// };

const OrderConfirmationPage = () => {
    // const calculateEstimatedDelivery=(createdAt)=>{
    //         const orderDate=new Date(createdAt);
    //         orderDate.setDate(orderDate.getDate() +10);//add 10 dats to the ordere
    //         return ordereDate.toLocaleDateString();
    // }
    const dispatch=useDispatch();
    const navigate=useNavigate();
    const {checkout} =useSelector((state)=>state.checkout);



//clear the cart when the order is corfirmed
useEffect(()=>{
    if(checkout && checkout._id){
        dispatch(clearCart());
        localStorage.removeItem("cart");
    }
else{
    navigate('/my-orders');
}
},[checkout,dispatch,navigate]);


    const calculateEstimatedDelivery = (createdAt) => {
        const orderDate = new Date(createdAt);
        orderDate.setDate(orderDate.getDate() + 10); // add 10 days to the order date
        return orderDate.toLocaleDateString(); // Correct variable name
    };
    

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white">
        <h1 className="text-4xl font-bold text-center text-emerald-700 mb-8">
            Thank you for your order!
        </h1>
        
        {checkout && (
            <div className="p-6 rounded-lg border">
                <div className="flex justify-between mb-20">
                    {/* Order ID and Date */}
                    <div>
                        <h2 className="text-xl font-semibold">Order ID: {checkout._id}</h2>
                        <p className="text-gray-500">
                            Order Date: {new Date(checkout.createdAt).toLocaleDateString()}
                        </p>
                    </div>
                    {/* estimated delivery */}
                    <div >
                        <p className='text-emerald-700 text-sm'>
                            Estimated delivery:{" "}
                            {calculateEstimatedDelivery(checkout.createdAt)}
                        </p>
                </div>
                </div>
                {/* ordered items */}
                <div className='mb-20'>
                    {checkout.checkoutItems.map((item)=>(
                            <div key={item.productId} className='flex items-center mb-4'  >
                                    <img src={item.image} alt={item.name} className='w-16 h-16 object-cover rounded-md mr-4'/>
                                <div >
                                    <h4 className='text-md font-semibold'>{item.name}</h4>
                                    <p className='text-sm text-gray-500'>{item.color}|{item.size}</p>
                                    </div>
                                    <div className='ml-auto text-right'>
                                        <p className='text-md'>${item.price}</p>
                                        <p className='text-sm text-gray-500'>Qty:{item.quantity}</p>
                                        </div>
                            </div>
                    ))}
                    </div>
                    {/* payment  and delivery */}
                    <div className='grid grid-cols-2 gap-8'>
                        {/* payment info */}
                        <div >
                            <h4 className='text-lg font-semibold mb-2'>Payment</h4>
                            <p className='text-gray-600'>PayPal</p>
                            </div>  
                            {/* delivery info */}
                            <div>
                                <h4 className='text-lg font-semibold mb-2'>Delivery</h4>
                                <p className='text-gray-600'>{checkout.shippingAddress.address}</p>
                                 <p className='text-gray-600'>{checkout.shippingAddress.city}, {checkout.shippingAddress.country}</p>
                           </div>
                    </div>
            </div>
        )}
    </div>
  );
};

export default OrderConfirmationPage;
