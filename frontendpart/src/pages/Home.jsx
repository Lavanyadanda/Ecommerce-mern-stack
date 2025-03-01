import React, { useEffect ,useState} from 'react'
import axios from 'axios';
import Hero from '../components/layout/Hero.jsx';
import GenderCollection from '../components/products/GenderCollection.jsx';
import NewArrivals from '../components/products/NewArrivals.jsx';
import ProductDetails from '../components/products/ProductDetails.jsx';
import ProductGrid from '../components/products/ProductGrid.jsx';
import FeaturedCollection from '../components/products/FeaturedCollection.jsx';
import FeaturesSection from '../components/products/FeaturesSection.jsx';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductsByFilter } from '../../redux/slices/productsSlice.js';
// const placeholderProducts=[
//     {_id:1,
//         name:"Product 1",
//         price:100,
//         images:[
//             {url:"https:/picsum.photos/500/500?random=1"}
//         ]
//     },
   
//         {_id:2,
//             name:"Product 2",
//             price:100,
//             images:[
//                 {url:"https:/picsum.photos/500/500?random=2"}
//             ]
//         },
//         {_id:3,
//             name:"Product 3",
//             price:100,
//             images:[
//                 {url:"https:/picsum.photos/500/500?random=3"}
//             ]
//         },
//         {_id:4,
//             name:"Product 4",
//             price:100,
//             images:[
//                 {url:"https:/picsum.photos/500/500?random=4"}
//             ]
//         },
//         {_id:5,
//             name:"Product 5",
//             price:100,
//             images:[
//                 {url:"https:/picsum.photos/500/500?random=5"}
//             ]
//         },
//         {_id:6,
//             name:"Product 6",
//             price:100,
//             images:[
//                 {url:"https:/picsum.photos/500/500?random=6"}
//             ]
//         },
//         {_id:7,
//             name:"Product 7",
//             price:100,
//             images:[
//                 {url:"https:/picsum.photos/500/500?random=7"}
//             ]
//         },
//         {_id:8,
//             name:"Product 8",
//             price:100,
//             images:[
//                 {url:"https:/picsum.photos/500/500?random=8"}
//             ]
//         },
//     ]

const Home = () => {
    const dispatch=useDispatch();
    const {products,loading,error}=useSelector((state)=>state.products);
    const [bestSellerProduct,setBestSellerProduct]=useState(null);
    useEffect(()=>{
        //fetch products for a specific collection
        dispatch(
            fetchProductsByFilter({
                gender:"Women",
                category:"Bottom Wear",
                limit:8,
            })
        );
        //fetch best seller product
        const fetchBestSeller=async()=>{
            try{
                const response=await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/products/best-seller`);
                setBestSellerProduct(response.data);
            }catch(error){
                console.error(error);
            }
        };
        fetchBestSeller()
    },[dispatch]);
  return (
    <div>
      <Hero/>
      

  <GenderCollection /> 

      <NewArrivals/>

      {/* Best seller details */}
       <h2 className='text-3xl text-center font-bold am-4'>Best Sellers</h2>
       {bestSellerProduct ?( <ProductDetails productId={bestSellerProduct._id}/>):(<p className='text-center'>Loading best seller product</p>)}
     
      <div className='container mx-auto '>
        <h2 className='text-3xl text-center font-bold mb-4'>
            Top wears for women
        </h2>
        <ProductGrid product={products} loading={loading} error={error}/>
      </div> 
      <FeaturedCollection/>
      <FeaturesSection/>
    </div>
  )
}

export default Home;
