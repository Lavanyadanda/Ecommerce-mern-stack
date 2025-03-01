// import React, { useEffect, useState } from 'react'
// import { toast } from 'sonner';
// import ProductGrid from './ProductGrid';
// const selectedProduct={
//     name:"Stylish Jacet",
//     price:120,
//     originalPrice:150,
//     description:"This is a stylish jacet perfect for any occasion",
//     brand:"FashionBrand",
//     material:"Leather",
//     sizes:["S","M","L","XL"],
//     colors:["Red","Black"],
//     images:[
//         {url:"https://picsum.photos/500/500?random=1",
//             altText:"Stylish Jacet 1",
//         }
//         ,{url:"https://picsum.photos/500/500?random=2",
//             altText:"Stylish Jacet 2",
//         }
//     ]

// }
// const similarProduct=[
//     {_id:2,
//         name:"Product 2",
//         price:100,
//         images:[
//             {url:"https://picsum.photos/500/500?random=2"}
//         ]
//     },
//     {_id:3,
//         name:"Product 3",
//         price:100,
//         images:[
//             {url:"https://picsum.photos/500/500?random=3"}
//         ]
//     },
//     {_id:4,
//         name:"Product 4",
//         price:100,
//         images:[
//             {url:"https://picsum.photos/500/500?random=4"}
//         ]
//     },
//     {_id:5,
//         name:"Product 5",
//         price:100,
//         images:[
//             {url:"https://picsum.photos/500/500?random=5"}
//         ]
//     },
// ]
// const ProductDetails = () => {
//     const [selectedSize,setSelectedSize]=useState("");
//     const [selectedColor,setSelectedColor]=useState("");
//     const [quantity,setQuantity]=useState(1);
//     const [isButtonDisabled,setIsButtonDisabled]=useState(false);
//     const [mainImage,setMainImage]=useState("");
//     const handleQuantityChange=(action)=>{
//             if(action==='plus'){
//                 setQuantity((prev)=>prev+1);
//             }
//             if(action==='minus' && quantity>1){
//                 setQuantity((prev)=>prev-1);
//             }
//     }
//     const handleAddToCart=()=>{
//         if(!selectedSize || !selectedColor){
//             toast.error("Please select a size and color before adding to cart",{duration:1000,});
//             return;
//         }
//         setIsButtonDisabled(true);
//         setTimeout(()=>{
//             toast.success("product added to cart"),{
//                 duration:1000,
//             }
//             setIsButtonDisabled(false);
//         },5000);
        
//     }
//     useEffect(()=>{
//         if(selectedProduct?.images?.length>0){
//             setMainImage(selectedProduct.images[0].url);
//         }
//     },[selectedProduct])
//   return (
//     <div className='p-6'>
//         <div className='max-w-6xl mx-auto bg-white p-8 rounded-lg'>
//             <div className='flex flex-col  md:flex-row'>
//                 {/* left thumbnails */}
//                 <div className='hidden md:flex flex-col space-y-4 mr-6'>
//                     {selectedProduct.images.map((image,index)=>(
//                         <img  key={index} src={image.url} alt={image.altText || `Thumbnail ${index}`}        
//                         className='w-20 h-20 object-cover rounded-lg cursor-pointer border'
//                         onClick={setMainImage(image.url)}
//                         />
//                     ))}

//                 </div>
//                 {/* Main image */}
//                 <div className='md:w-1/2'>
//                     <div className='mb-4'>
//                         <img src={mainImage} alt="Main product" className="w-full h-auto object-cover rounded-lg"/>
//                     </div>
                
                
//                 </div>
//                 {/* Mobime thumbnails */}
//                 <div className='md:hidden flex overflow-x-scroll space-x-4 mb-4'>
//                 {selectedProduct.images.map((image,index)=>(
//                         <img  key={index} src={image.url} alt={image.altText || `Thumbnail ${index}`}        
//                         className='w-20 h-20 object-cover rounded-lg cursor-pointer border' 
//                         onClick={() => setMainImage(image.url)}

//                        />
//                     ))}
//                 </div>
//                 {/* right section */}
//                 <div className='md:w-1/2 md:ml-10'>
//                 <h1 className='text-2xl md:text-3xl font-semibold mb-2'>
//                     {selectedProduct.name}
                    
//                  </h1>
//                  <p className='text-lg text-gray-600 mb-1 line-through '>
//                     {selectedProduct.originalPrice && `${selectedProduct.originalPrice}`}
//                  </p>
//                  <p className='text-xl text-gray-500 mb-2'>
//                     ${selectedProduct.price};
//                  </p>
//                  <p className='text-gray-600 mb-4'>{selectedProduct.description}</p>
//                  <div className='mb-4'>
//                     <p className='text-gray-700'>Color:</p>
//                     <div className='flex gap-2 mt-2'>
//                         {selectedProduct.colors.map((color)=>(
//                             <button key={color}
//                             onClick={()=>setSelectedColor(color)} className={`'w-8 h-8 rounded-full border' ${selectedColor===color?"border-4 border-black":"border-gray-300"}`} style={{backgroundColor:color.toLocaleLowerCase(),filter:"brightness(0.5)"}}></button>
//                         )
//                         )}
//                     </div>
//                  </div>
//                  <div className='mb-4'>
//                     <p className='text-gray-700'>Size:</p>
//                     <div className='flex gap-2 mt-2'>
//                         {selectedProduct.sizes.map((size)=>(
//                             <button onClick={()=>setSelectedSize(size)} key={size} className={`px-4 py-2 rounded border ${selectedSize===size? "bg-black text-white" :""}`} >
//                                 {size}
//                             </button>
//                         ))}
//                     </div>
//                  </div>
//                  <div className='mb-6 '>
//                     <p className='text-gray-700 '>QuantityL</p>
//                     <div className='flex items-center space-x-4 mt-2'>
//                         <button onClick={()=> handleQuantityChange("minus")} className='px-2 py-1 bg-gray-200 rounded text-lg'>
//                             -
//                         </button>
//                         <span className='text-lg'>{quantity}</span>
//                         <button onClick={()=> handleQuantityChange("plus")} className='px-2 py-1 bg-gray-200 rounded text-lg'>
//                             +
//                         </button>
//                     </div>
//                  </div>
//                  <button  disabled={isButtonDisabled} onClick={handleAddToCart} className={`bg-black text-white py-2 px-6 rounded w-full mb-2 ${isButtonDisabled?" cursor-not-allowed opacity-50":"hover:bg-gray-900"}`}>
//                    {isButtonDisabled?"Adding" :"Add to cart"}
//                  </button>
//                  <div className='mt-10 text-gray-700'>
//                     <h3 className='text-xl font-bold mb-4 '>Characteristiccs:</h3>
//                     <table className='w-full text-left text-sm text-gray-600'>
//                         <tbody>
//                             <tr>

//                                 <td className='py-1'>Brand</td>
//                                 <td className='py-1'>{selectedProduct.brand}</td>
//                             </tr>
//                         <tr>
//                             <td className='py-1'>Material</td>
//                             <td className='py-1'>{selectedProduct.material}</td>
//                                 </tr>
//                         </tbody>
//                     </table>
//                  </div>
//                 </div>
//             </div>
//             <div className='mt-20'>
//                 <h2 className='text-2xl text-center font-medium mb-4'>You May Also LIke</h2>
//                 <ProductGrid product={similarProduct} />

//             </div>
//         </div>
      
//     </div>
//   )
// }

// export default ProductDetails










import React, { useEffect, useState } from 'react';
import { toast } from 'sonner';
import ProductGrid from './ProductGrid';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductDetails, fetchSimilarProducts } from '../../../redux/slices/productsSlice';
import { addToCart } from '../../../redux/slices/cartSlice';

// const selectedProduct = {
//     name: "Stylish Jacket",
//     price: 120,
//     originalPrice: 150,
//     description: "This is a stylish jacket perfect for any occasion",
//     brand: "FashionBrand",
//     material: "Leather",
//     sizes: ["S", "M", "L", "XL"],
//     colors: ["Red", "Black"],
//     images: [
//         { url: "https://picsum.photos/500/500?random=1", altText: "Stylish Jacket 1" },
//         { url: "https://picsum.photos/500/500?random=2", altText: "Stylish Jacket 2" }
//     ]
// };

// const similarProducts = [
//     { _id: 2, name: "Product 2", price: 100, images: [{ url: "https://picsum.photos/500/500?random=2" }] },
//     { _id: 3, name: "Product 3", price: 100, images: [{ url: "https://picsum.photos/500/500?random=3" }] },
//     { _id: 4, name: "Product 4", price: 100, images: [{ url: "https://picsum.photos/500/500?random=4" }] },
//     { _id: 5, name: "Product 5", price: 100, images: [{ url: "https://picsum.photos/500/500?random=5" }] }
// ];

const ProductDetails = ({productId}) => {
    const {id}=useParams();
    const dispatch=useDispatch();
    const {selectedProduct,loading,error,similarProducts}=useSelector((state)=>state.products);
    const {user,guestId}=useSelector((state)=> state.auth);
    const [selectedSize, setSelectedSize] = useState("");
    const [selectedColor, setSelectedColor] = useState("");
    const [quantity, setQuantity] = useState(1);
    const [isButtonDisabled, setIsButtonDisabled] = useState(false);
    const [mainImage, setMainImage] = useState("");
const productFetchId=productId|| id;
useEffect(()=>{
    if(productFetchId){
        dispatch(fetchProductDetails(productFetchId));
        dispatch(fetchSimilarProducts({id:productFetchId}));
    }
},[dispatch,productFetchId]);
    // useEffect(() => {
    //     setMainImage(selectedProduct.images[0].url);
    // }, []);
    // useEffect(() => {
    //     if (selectedProduct && selectedProduct.images?.length > 0) {
    //         setMainImage(selectedProduct.images[0].url);
    //     }
    // }, [selectedProduct]); 
    useEffect(() => {
        if (selectedProduct && selectedProduct.images?.length > 0) {
            setMainImage(selectedProduct.images[0]?.url || null);  // Ensure no empty string
        }
    }, [selectedProduct]);

    const handleQuantityChange = (action) => {
        setQuantity((prev) => (action === "plus" ? prev + 1 : prev > 1 ? prev - 1 : prev));
    };

    const handleAddToCart = () => {
        if (!selectedSize || !selectedColor) {
            toast.error("Please select a size and color before adding to cart", { duration: 1000 });
            return;
        }
        setIsButtonDisabled(true);
        // setTimeout(() => {
        //     toast.success("Product added to cart", { duration: 1000 });
        //     setIsButtonDisabled(false);
        // }, 5000);
        dispatch(
            addToCart({
                productId:productFetchId,
                quantity,
                size:selectedSize,
                color:selectedColor,
                guestId,
                userId:user?._id,
            })
        )
        .then(()=>{
            toast.success("Product added to cart",{duration:1000})
            
        })
        .finally(()=>{
            setIsButtonDisabled(false);
        })
    };

if(loading){
    return <p>loading...</p>
}
if(error){
    return <p>error:{error}</p>
}
const fallbackImage = "https://via.placeholder.com/300";
    
    return (
        <div className="p-6">
            {selectedProduct && (
            <div className="max-w-6xl mx-auto bg-white p-8 rounded-lg">
                <div className="flex flex-col md:flex-row">
                    {/* Left thumbnails */}
                    <div className="hidden md:flex flex-col space-y-4 mr-6">
                        {selectedProduct.images.map((image, index) => (
                            <img
                                key={index}
                                //src={image.url }
                                src={image.url || fallbackImage}
                                // src={image.url ||"https://picsum.photos/500/500?random=1"
                                alt={image.altText || `Thumbnail ${index}`}
                                className="w-20 h-20 object-cover rounded-lg cursor-pointer border"
                                onClick={() => setMainImage(image.url)}
                            />
                        ))}
                    </div>
                    {/* Main image */}
                    <div className="md:w-1/2">
                        <div className="mb-4">
                            <img src={mainImage} alt="Main product" className="w-full h-auto object-cover rounded-lg" />
                        </div>
                    </div>
                    {/* Mobile thumbnails */}
                    <div className="md:hidden flex overflow-x-scroll space-x-4 mb-4">
                        {selectedProduct.images.map((image, index) => (
                            <img
                                key={index}
                                src={image.url}
                                alt={image.altText || `Thumbnail ${index}`}
                                className="w-20 h-20 object-cover rounded-lg cursor-pointer border"
                                onClick={() => setMainImage(image.url)}
                            />
                        ))}
                    </div>
                    {/* Right section */}
                    <div className="md:w-1/2 md:ml-10">
                        <h1 className="text-2xl md:text-3xl font-semibold mb-2">{selectedProduct.name}</h1>
                        <p className="text-lg text-gray-600 mb-1 line-through">{selectedProduct.originalPrice && `$${selectedProduct.originalPrice}`}</p>
                        <p className="text-xl text-gray-500 mb-2">${selectedProduct.price}</p>
                        <p className="text-gray-600 mb-4">{selectedProduct.description}</p>
                        {/* Colors */}
                        <div className="mb-4">
                            <p className="text-gray-700">Color:</p>
                            <div className="flex gap-2 mt-2">
                                {selectedProduct.colors.map((color) => (
                                    <button
                                        key={color}
                                        onClick={() => setSelectedColor(color)}
                                        className={`w-8 h-8 rounded-full border ${selectedColor === color ? "border-4 border-black" : "border-gray-300"}`}
                                        style={{ backgroundColor: color.toLowerCase(), filter: "brightness(0.5)" }}
                                    ></button>
                                ))}
                            </div>
                        </div>
                        {/* size */}
                        <div className='mb-4'>
                    <p className='text-gray-700'>Size:</p>
                     <div className='flex gap-2 mt-2'>     
                        
                           {selectedProduct.sizes.map((size)=>(
                          <button onClick={()=>setSelectedSize(size)} key={size} className={`px-4 py-2 rounded border ${selectedSize===size? "bg-black text-white" :""}`} >
                                {size}
                            </button>
                        ))}
                    </div>
                 </div>
                        {/* Quantity */}
                        <div className="mb-6">
                            <p className="text-gray-700">Quantity:</p>
                            <div className="flex items-center space-x-4 mt-2">
                                <button onClick={() => handleQuantityChange("minus")} className="px-2 py-1 bg-gray-200 rounded text-lg">-</button>
                                <span className="text-lg">{quantity}</span>
                                <button onClick={() => handleQuantityChange("plus")} className="px-2 py-1 bg-gray-200 rounded text-lg">+</button>
                            </div>
                        </div>
                        {/* Add to cart */}
                        <button disabled={isButtonDisabled} onClick={handleAddToCart} className="bg-black text-white py-2 px-6 rounded w-full mb-2">
                            {isButtonDisabled ? "Adding..." : "Add to Cart"}
                        </button>
                    </div>
                </div>
                <div className='mt-10 text-gray-700'>
                    <h3 className='text-xl font-bold mb-4 '>Characteristiccs:</h3>
                     <table className='w-full text-left text-sm text-gray-600'>
                         <tbody>
                            <tr>

                                 <td className='py-1'>Brand</td>
                                 <td className='py-1'>{selectedProduct.brand}</td>
                             </tr>
                         <tr>
                             <td className='py-1'>Material</td>
                             <td className='py-1'>{selectedProduct.material}</td>
                                </tr>
                         </tbody>
                     </table>
                  </div>
                <h2 className="text-2xl text-center font-medium mt-20">You May Also Like</h2>
                <ProductGrid product={similarProducts} loading={loading} error={error} />
            </div>)}
        </div>
    );
};

export default ProductDetails;

