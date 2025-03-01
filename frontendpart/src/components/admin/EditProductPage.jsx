// import React, { useState } from 'react'

// const handleChange=(e)=>{
//     const {name,value}=e.target;
//     setProductData((prevData)=>({...prevData,[name]:value}))
// }
// const EditProductPage = () => {
//     const [productData,setProductData]=useState({
//         name:"",
//         description:"",
//         price:0,
//         countInStock:0,
//         sku:"",
//         category:"",
//         brand:"",
//         sizes:[],
//         colors:[],
//         collections:"",
//         material:"",
//         gender:"",
//         images:[
//             {
//                 url:'https://picsum.photos/150?random=1',
    
//             },
//             {
//                 url:'https://picsum.photos/150?random=2',
    
//             }
//         ],
//     });
//   return (
//     <div className='max-w-5xl mx-auto p-6 shadow-md rounded-md'>
//         <h2 className='text-3xl font-bold mb-6'>Edit product</h2>
//         <form>
//             {/* name */}
//             <div className='mb-6'>
//                 <label className='block font-semibold mb-2'>product name</label>
//                 <input required className='w-full border border-gray-300 rounded-md p-2' type='text' name='name' value={productData.name} onChange={handleChange}/>
//             </div>
//             {/* description */}
//             <div className='mb-6'>
//                 <label className='block font-semibold mb-2'>description</label>
//                 <textarea className='w-full border border-gray-300 rounded-md p-2'  name='description' value={productData.description} rows={4} required onChange={handleChange}/>
//             </div>
//             {/* price */}
//             <div className='mb-6'>
//                 <label className='block font-semibold mb-2'>price</label>
//                 <input className='w-full border border-gray-300 rounded-md p-2' type='number' name='price' value={productData.price} onChange={handleChange}/>
//             </div>
//         </form>
      
//     </div>
//   )
// }

// export default EditProductPage


import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchProductDetails } from '../../../redux/slices/productsSlice';

const EditProductPage = () => {

    const dispatch=useDispatch();
    const navigate=useNavigate();
    const {id}=useParams();
    const {selectedProduct,loading,error}=useSelector((state)=>state.products);
    const [productData, setProductData] = useState({
        name: "",
        description: "",
        price: 0,
        countInStock: 0,
        sku: "",
        category: "",
        brand: "",
        sizes: [],
        colors: [],
        collections: "",
        material: "",
        gender: "",
        images: [
            // { url: 'https://picsum.photos/150?random=1' },
            // { url: 'https://picsum.photos/150?random=2' }
        ],
    });


    const [uploading,setUploading]=useState(false);

    useEffect(()=>{
        if(id ){
            dispatch(fetchProductDetails(id));
        }
    },[dispatch,id]);


    useEffect(()=>{
        if(selectedProduct){
            setProductData(selectedProduct);
        }
    },[selectedProduct]);
    const handleChange = (e) => {
        const { name, value } = e.target;
        setProductData((prevData) => ({ ...prevData, [name]: value }));
    };
    const handleImageUpload=async(e)=>{
        const file=e.target.files[0];
        const formData=new FormData();
        formData.append("image",file);
        //console.log(file);

        try{
            setUploading(true);
            const {data}=await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/upload`,
                formData,
                {headers:{
                    "Content-type":"multipart/form-data"
                }}
            );
            setProductData((prevData)=>({
...prevData,
images:[...prevData.images,{url:data.imageUrl,altText:""}],
              }));
              setUploading(false);
        }
        catch(error){
            console.error(error);
            setUploading(false);
        }
    }
const handleSubmit=(e)=>{
    e.preventDefault();
    //console.log(productData);
    dispatch(updateProduct({id,productData}));
    navigate("/admin/products");
};
if(loading) return<p> Loading...</p>
if(error) return <p> error:{error}</p>
    return (
        <div className='max-w-5xl mx-auto p-6 shadow-md rounded-md'>
            <h2 className='text-3xl font-bold mb-6'>Edit Product</h2>
            <form onSubmit={handleSubmit}>
                {/* Name */}
                <div className='mb-6'>
                    <label className='block font-semibold mb-2'>Product Name</label>
                    <input
                        required
                        className='w-full border border-gray-300 rounded-md p-2'
                        type='text'
                        name='name'
                        value={productData.name}
                        onChange={handleChange}
                    />
                </div>

                {/* Description */}
                <div className='mb-6'>
                    <label className='block font-semibold mb-2'>Description</label>
                    <textarea
                        className='w-full border border-gray-300 rounded-md p-2'
                        name='description'
                        value={productData.description}
                        rows={4}
                        required
                        onChange={handleChange}
                    />
                </div>

                {/* Price */}
                <div className='mb-6'>
                    <label className='block font-semibold mb-2'>Price</label>
                    <input
                        className='w-full border border-gray-300 rounded-md p-2'
                        type='number'
                        name='price'
                        value={productData.price}
                        onChange={handleChange}
                    />
                </div>
                {/* count in stcok */}
                <div className='mb-6'>
                    <label className='block font-semibold mb-2'>count in stcok</label>
                    <input
                        className='w-full border border-gray-300 rounded-md p-2'
                        type='number'
                        name='countInStock'
                        value={productData.countInStock}
                        onChange={handleChange}
                    />
                </div>
                {/* sku */}
                <div className='mb-6'>
                    <label className='block font-semibold mb-2'>Price</label>
                    <input
                        className='w-full border border-gray-300 rounded-md p-2'
                        type='text'
                        name='sku'
                        value={productData.sku}
                        onChange={handleChange}
                    />
                </div>
                {/* sizes */}
                <div className='mb-6'>
                    <label className='block font-semibold mb-2'>sizes (comma-seperated_)</label>
                    <input
                        className='w-full border border-gray-300 rounded-md p-2'
                        type='text'
                        name='sizes'
                        value={productData.sizes}
                        onChange={(e)=>setProductData({...productData,sizes:e.target.value.split(",").map((size)=>size.trim())})}
                    />
                </div>
              {/* colors */}
              <div className='mb-6'>
                    <label className='block font-semibold mb-2'>colors (comma-seperated_)</label>
                    <input
                        className='w-full border border-gray-300 rounded-md p-2'
                        type='text'
                        name='colors'
                        value={productData.colors}
                        onChange={(e)=>setProductData({...productData,colors:e.target.value.split(",").map((size)=>size.trim())})}
                    />
                </div>
                {/* image upload */}
                <div className='mb-6'>
                    <label className='bloc font-semibold mb-2'>Upload image</label>
                    <input type='file' onChange={handleImageUpload}/>
                     {uploading && <p>Uploading  image</p>}
               <div className='flex gap-4 mt-4'>
                {productData.images.map((image,index)=>(
                    <div key={index}>
                        <img src={image.url} alt={image.name} className='w-20 h-20 object-cover rounded-md shadow-md'/>
                        </div>
                ))}
               </div>
                </div>
                <button type='submit' className='w-full bg-green-500 text-white py-2 rounded-md transition-colors'> upload image</button>
            </form>
        </div>
    );
};

export default EditProductPage;
