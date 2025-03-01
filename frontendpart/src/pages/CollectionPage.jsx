// import React, { useEffect, useState,useRef } from 'react'
// import {FaFilter} from 'react-icons/fa'
// import FilterSidebar from '../components/products/FilterSidebar';
// import SortOptions from '../components/products/SortOptions';
// import ProductGrid from '../components/products/ProductGrid';
// const CollectionPage = () => {
//     const [products,setProducts]=useState([]);
//     const sidebarRef=useRef(null);
//     const [isSidebarOpen,setIsSidebarOpen]=useState(false);
//     const toggleSidebar=()=>{
//         setIsSidebarOpen(!isSidebarOpen);
//     }
//     const handleClickOutside=()=>{
//         //close sidebar if clicked outside
//         if(sidebarRef.current && !sidebarRef.current.contains(e.target)){
//             setIsSidebarOpen(false);
//         }
//     }
//     useEffect(()=>{
//         //add eventlistner for clicks
//         document.addEventListener("mousedown",handleClickOutside);
//         //clean event listener
//         document.removeEventListener("mousedown",handleClickOutside)
//     })
//     useEffect(()=>{
//         setTimeout(()=>{
//             const fetchedProduct=[ 
//                 {_id:1,
//                     name:"Product 1",
//                     price:100,
//                     images:[
//                         {url:"https:/picsum.photos/500/500?random=1"}
//                     ]
//                 },
//                 {_id:2,
//                 name:"Product 2",
//                 price:100,
//                 images:[
//                     {url:"https:/picsum.photos/500/500?random=2"}
//                 ]
//             },
//             {_id:3,
//                 name:"Product 3",
//                 price:100,
//                 images:[
//                     {url:"https:/picsum.photos/500/500?random=3"}
//                 ]
//             },
//             {_id:4,
//                 name:"Product 4",
//                 price:100,
//                 images:[
//                     {url:"https:/picsum.photos/500/500?random=4"}
//                 ]
//             },
//             {_id:5,
//                 name:"Product 5",
//                 price:100,
//                 images:[
//                     {url:"https:/picsum.photos/500/500?random=5"}
//                 ]
//             },
//             {_id:6,
//                 name:"Product 6",
//                 price:100,
//                 images:[
//                     {url:"https:/picsum.photos/500/500?random=6"}
//                 ]
//             },
//             {_id:7,
//                 name:"Product 7",
//                 price:100,
//                 images:[
//                     {url:"https:/picsum.photos/500/500?random=7"}
//                 ]
//             },
//             {_id:8,
//                 name:"Product 8",
//                 price:100,
//                 images:[
//                     {url:"https:/picsum.photos/500/500?random=8"}
//                 ]
//             },  ];
//             setProducts(fetchedProduct);

//         },1000);
//     },[])
//   return (
//     <div className='flex flex-col lg:flex-row'>
//         {/* mobile filter button */}
//         <button onClick={toggleSidebar} className='lg:hidden border p-2 flex justify-center items-center'>
//             <FaFilter className='mr-2' />
//         </button>
//       {/* filter sidebar */}
//       <div ref={sidebarRef} className={`${isSidebarOpen? "translate-x-0":"-translate-x-full "} fixed inset-y-0 z-50 left-0 w-64 bg-white overflow-y-auto transition-transform duration-300 lg:static lg:translate-x-0`}>

//         <FilterSidebar/>
//       </div>
//       <div className='flex-grow p-4'>
//         <h2 className='text-2xl uppercase mb-4'>All collections</h2>
//         {/* sort options */}
//         <SortOptions/>

//         {/* product grid */}
//         <ProductGrid products={products}/>
//       </div>
//     </div>
//   )
// }

// export default CollectionPage














import React, { useEffect, useState, useRef, useCallback } from "react";
import { FaFilter } from "react-icons/fa";
import FilterSidebar from "../components/products/FilterSidebar";
import SortOptions from "../components/products/SortOptions";
import ProductGrid from "../components/products/ProductGrid";
import { useParams, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductsByFilter } from "../../redux/slices/productsSlice";

const CollectionPage = () => {
  const {collection} =useParams();
  const [searchParams]=useSearchParams();
  const dispatch=useDispatch();
  const {products,loading,error}=useSelector((state)=>state.products);
  const queryParams=Object.fromEntries([...searchParams]);
  // const [products, setProducts] = useState([]);
  const sidebarRef = useRef(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  useEffect(()=>{
    dispatch(fetchProductsByFilter({collection,...queryParams}));

  },[dispatch,collection,searchParams]);

  // Toggle Sidebar Visibility
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // Handle Click Outside Sidebar
  const handleClickOutside = useCallback((e) => {
    if (sidebarRef.current && !sidebarRef.current.contains(e.target)) {
      setIsSidebarOpen(false);
    }
  }, []);

  // Attach and Remove Event Listener
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [handleClickOutside]);

  // // Fetch Product Data (Simulated)
  // useEffect(() => {
  //   setTimeout(() => {
  //     const fetchedProduct = [
  //       { _id: 1, name: "Product 1", price: 100, images: [{ url: "https://picsum.photos/500/500?random=1" }] },
  //       { _id: 2, name: "Product 2", price: 120, images: [{ url: "https://picsum.photos/500/500?random=2" }] },
  //       { _id: 3, name: "Product 3", price: 150, images: [{ url: "https://picsum.photos/500/500?random=3" }] },
  //       { _id: 4, name: "Product 4", price: 200, images: [{ url: "https://picsum.photos/500/500?random=4" }] },
  //       { _id: 5, name: "Product 5", price: 250, images: [{ url: "https://picsum.photos/500/500?random=5" }] },
  //       { _id: 6, name: "Product 6", price: 300, images: [{ url: "https://picsum.photos/500/500?random=6" }] },
  //     ];
  //     setProducts(fetchedProduct);
  //   }, 1000);
  // }, []);

  return (
    <div className="flex flex-col lg:flex-row">
      {/* Mobile Filter Button */}
      <button onClick={toggleSidebar} className="lg:hidden border p-2 flex justify-center items-center">
        <FaFilter className="mr-2" size={20} />
      </button>

      {/* Filter Sidebar */}
      <div
        ref={sidebarRef}
        className={`${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} 
        fixed inset-y-0 z-50 left-0 w-64 bg-white overflow-y-auto transition-transform duration-300 lg:static lg:translate-x-0`}
      >
        <FilterSidebar />
      </div>

      {/* Main Content */}
      <div className="flex-grow p-4">
        <h2 className="text-2xl uppercase mb-4">All Collections</h2>
        <SortOptions />
        <ProductGrid product={products}  loading={loading} error={error}/>
      </div>
    </div>
  );
};

export default CollectionPage;
