// import React, { useEffect, useRef, useState } from 'react'
// import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
// import { Link } from 'react-router-dom';

// const NewArrivals = () => {
//     const scrollRef=useRef(null);
//     const [isDragging,setIsDragging]=useState(false);
//     const [startX,setStartX]=useState(0);
//     const [scrollLeft,setScrollLeft]=useState(false);
//     const [canScrollRight,setCanScrollRight]=useState(false);
//     const [canScrollLeft,setCanScrollLeft]=useState(false);

//     const newArrivals=[
//         {
//             _id:"1",
//             name:"Stylish Jacket",
//             price:120,
//             images:[
//                 {
//                     url:"https://picsum.photos/500?random=1",
//                     altText:"Stylish Jacket",
//                 },
//             ]
//         },
//         {
//             _id:"2",
//             name:"Stylish Jacket",
//             price:120,
//             images:[
//                 {
//                     url:"https://picsum.photos/500?random=2",
//                     altText:"Stylish Jacket",
//                 },
//             ]
//         },
//         {
//             _id:"3",
//             name:"Stylish Jacket",
//             price:120,
//             images:[
//                 {
//                     url:"https://picsum.photos/500?random=3",
//                     altText:"Stylish Jacket",
//                 },
//             ]
//         },
//         {
//             _id:"4",
//             name:"Stylish Jacket",
//             price:120,
//             images:[
//                 {
//                     url:"https://picsum.photos/500/500?random=4",
//                     altText:"Stylish Jacket",
//                 },
//             ]
//         },
//         {
//             _id:"5",
//             name:"Stylish Jacket",
//             price:120,
//             images:[
//                 {
//                     url:"https://picsum.photos/500/500?random=5",
//                     altText:"Stylish Jacket",
//                 },
//             ]
//         },
//         {
//             _id:"6",
//             name:"Stylish Jacket",
//             price:120,
//             images:[
//                 {
//                     url:"https://picsum.photos/500/500?random=6",
//                     altText:"Stylish Jacket",
//                 },
//             ]
//         },
//         {
//             _id:"7",
//             name:"Stylish Jacket",
//             price:120,
//             images:[
//                 {
//                     url:"https://picsum.photos/500?random=7",
//                     altText:"Stylish Jacket",
//                 },
//             ]
//         },
//         {
//             _id:"8",
//             name:"Stylish Jacket",
//             price:120,
//             images:[
//                 {
//                     url:"https://picsum.photos/500?random=8",
//                     altText:"Stylish Jacket",
//                 },
//             ]
//         }
//     ];



// const handleMouseDown=(e)=>{
//     setIsDragging(true);
//     setStartX(e.pageX-scrollRed.current.offSetLeft);
//     setScrollLeft(scrollRef.current.scrollLeft);
// }
// const handleMouseMove=(e)=>{
// if(!isDragging)return 
// const x=e.pageX-scrollref.current.offSetLeft;
// const wal=x-startX;
// scrollRef.current.scrollLeft=scrollLeft-walk;
// }

// const handleMouseUpOrLeave=(e)=>{
// setIsDragging(false);
// }





// const scroll=(direction)=>{
// const scrollAmount=direction=== "left"?-300 :300;
// scrollRef.current.scrollBy({left:scrollAmount,behaviour:"smooth"})
//     };
//     //update scroll buttons
//     const updateScrollButtons=()=>{
//         const container=scrollRef.current;
//         if(container){
//             const leftScroll=container.scrollLeft;
// const rightScrollable=container.scrollWidth>leftScroll+contaner.clientWidth;

//             setCanScrollLeft(leftScroll>0? true:false);
//             setCanScrollRight(rightScrollable);
//         }
//         console.log({
//             scrollLeft:container.scrollLeft,
//             clientWidth:container.clientWidth,
//             containerScrollWidth:container.ScrollWidth,
//             offsetLeft:scrollRef.current.offSetLeft;
//         });
//     }
//     useEffect(()=>{
//         const container=scrollRef.current;
//         if(container){
//             container.addEventListner("scroll",updateScrollButtons);
//             updateScrollButtons();
//             return()=>container.removeEventListener("scroll",updateScrollButtons)
//         }
//     },[])
//   return (
//    <section className='py-16 px-4 lg:px-0'>
//     <div className='container mx-auto text-center mb-10 relative'>
//         <h2 className='text-3xl font-bold mb-4'>Explore new arraivals</h2>
//         <p className='text-lg  text-gray-600 mb-8'>
//             Discover the latest styles off the runway ,freshly added to eep your wardrobe on the cutting edge of fashion

//         </p>
//         {/* Scroll buttons */}
//         <div className='absolute right-0 bottom-[-30px] flex space-x-2'>
//             <button disabled={!canScrollLeft} onClick={()=>scroll("left")} className={`p-2 rounded border  ${canScrollLeft?" bg-white text-black":" bg-gray-200 text-gray-400 cursor-not-allowed"}`}>
//                 <FiChevronLeft className='text-2xl '/>

//             </button>
//             <button  onClick={()=>scroll("right")}className={`p-2 rounded border  ${canScrollRight?" bg-white text-black":" bg-gray-200 text-gray-400 cursor-not-allowed"}`}>
//                 <FiChevronRight className='text-2xl '/>
                
//             </button>
//         </div>
//     </div>
//     {/* scrolable content */}
//     <div   ref={scrollRef}   
//     onMouseDown={handleMouseDown} 
//     onMouseMove={handleMouseMove}  onMouseUp={handleMouseUpOrLeave} onMouseLeave={handleMouseUpOrLeave}
//      className={`contaner mx-auto overflow-x-scroll flex space-x-6 relative ${isDragging?"cursor-grabbing":"cursor-grab"}`}>
//         {newArrivals.map((product) => (
//             <div key={product._id} className='min-w-[100%] sm:min-w-[50%] lg:min-w-[30%] relative'>
//             <img  draggable="false" scr={product.images[0]?.url} alt={ product.images[0]?.altText || product.name}
//             className='w-full h-[500px] object-cover rounded-lg'/>
//         <div className='absolut bottom-0 left-0 right-0 bg-opacity-50 backdrop-blur-md text-white p-4 rounded-b-lg'>
//                 <Link to={`/product/${product._id}`} className='block'>
//                 <h4 className='font-medium'>
//                     {product.name}</h4>
//                     <p className='mt-1'>${product.price}</p>
//                     </Link>
//         </div>
//   ) ) }
//     </div>
//    </section>
//   );
// }

// export default NewArrivals;















import axios from 'axios';
import React, { useEffect, useRef, useState } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { Link } from "react-router-dom";

const NewArrivals = () => {
    const scrollRef = useRef(null);
    const [isDragging, setIsDragging] = useState(false);
    const [startX, setStartX] = useState(0);
    const [scrollLeft, setScrollLeft] = useState(0);
    const [canScrollRight, setCanScrollRight] = useState(false);
    const [canScrollLeft, setCanScrollLeft] = useState(false);

   
    // const newArrivals=[
    //     {
    //         _id:"1",
    //         name:"Stylish Jacket",
    //         price:120,
    //         images:[
    //             {
    //                 url:"https://picsum.photos/500?random=1",
    //                 altText:"Stylish Jacket",
    //             },
    //         ]
    //     },
    //     {
    //         _id:"2",
    //         name:"Stylish Jacket",
    //         price:120,
    //         images:[
    //             {
    //                 url:"https://picsum.photos/500?random=2",
    //                 altText:"Stylish Jacket",
    //             },
    //         ]
    //     },
    //     {
    //         _id:"3",
    //         name:"Stylish Jacket",
    //         price:120,
    //         images:[
    //             {
    //                 url:"https://picsum.photos/500?random=3",
    //                 altText:"Stylish Jacket",
    //             },
    //         ]
    //     },
    //     {
    //         _id:"4",
    //         name:"Stylish Jacket",
    //         price:120,
    //         images:[
    //             {
    //                 url:"https://picsum.photos/500/500?random=4",
    //                 altText:"Stylish Jacket",
    //             },
    //         ]
    //     },
    //     {
    //         _id:"5",
    //         name:"Stylish Jacket",
    //         price:120,
    //         images:[
    //             {
    //                 url:"https://picsum.photos/500/500?random=5",
    //                 altText:"Stylish Jacket",
    //             },
    //         ]
    //     },
    //     {
    //         _id:"6",
    //         name:"Stylish Jacket",
    //         price:120,
    //         images:[
    //             {
    //                 url:"https://picsum.photos/500/500?random=6",
    //                 altText:"Stylish Jacket",
    //             },
    //         ]
    //     },
    //     {
    //         _id:"7",
    //         name:"Stylish Jacket",
    //         price:120,
    //         images:[
    //             {
    //                 url:"https://picsum.photos/500?random=7",
    //                 altText:"Stylish Jacket",
    //             },
    //         ]
    //     },
    //     {
    //         _id:"8",
    //         name:"Stylish Jacket",
    //         price:120,
    //         images:[
    //             {
    //                 url:"https://picsum.photos/500?random=8",
    //                 altText:"Stylish Jacket",
    //             },
    //         ]
    //     }
    // ];


const [newArrivals,setNewArrivals]=useState([]);
useEffect(()=>{
    const fetchNewArrivals=async()=>{
        try{
            const response=await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/products/new-arrivals`);
            setNewArrivals(response.data);
        }catch(error){
            console.error(error);
        }
    };
    fetchNewArrivals();

},[]);
    const handleMouseDown = (e) => {
        setIsDragging(true);
        setStartX(e.pageX - scrollRef.current.offsetLeft);
        setScrollLeft(scrollRef.current.scrollLeft);
    };

    const handleMouseMove = (e) => {
        if (!isDragging) return;
        const x = e.pageX - scrollRef.current.offsetLeft;
        const walk = x - startX;
        scrollRef.current.scrollLeft = scrollLeft - walk;
    };

    const handleMouseUpOrLeave = () => {
        setIsDragging(false);
    };

    const scroll = (direction) => {
        const scrollAmount = direction === "left" ? -300 : 300;
        scrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    };

    const updateScrollButtons = () => {
        const container = scrollRef.current;
        if (container) {
            setCanScrollLeft(container.scrollLeft > 0);
            setCanScrollRight(container.scrollWidth > container.scrollLeft + container.clientWidth);
        }
    };

    useEffect(() => {
        const container = scrollRef.current;
        if (container) {
            container.addEventListener("scroll", updateScrollButtons);
            updateScrollButtons();
        }

        return () => {
            if (container) {
                container.removeEventListener("scroll", updateScrollButtons);
            }
        };
    }, [newArrivals]);

    return (
        <section>
            <div className="container mx-auto text-center mb-10 relative">
                <h2 className="text-3xl font-bold mb-4">Explore New Arrivals</h2>
                <p className="text-lg text-gray-600 mb-8">
                    Discover the latest styles off the runway, freshly added to keep your wardrobe on the cutting edge of fashion.
                </p>

                {/* Scroll buttons */}
                <div className="absolute right-0 bottom-[-30px] flex space-x-2">
                    <button disabled={!canScrollLeft} onClick={() => scroll("left")} className={`p-2 rounded border ${canScrollLeft ? "bg-white text-black" : "bg-gray-200 text-gray-400 cursor-not-allowed"}`}>
                        <FiChevronLeft className="text-2xl" />
                    </button>
                    <button onClick={() => scroll("right")} className={`p-2 rounded border ${canScrollRight ? "bg-white text-black" : "bg-gray-200 text-gray-400 cursor-not-allowed"}`}>
                        <FiChevronRight className="text-2xl" />
                    </button>
                </div>
            </div>

            {/* Scrollable Content */}
            <div ref={scrollRef} onMouseDown={handleMouseDown} onMouseMove={handleMouseMove} onMouseUp={handleMouseUpOrLeave} onMouseLeave={handleMouseUpOrLeave} className="container mx-auto overflow-x-scroll flex space-x-6 relative">
                {newArrivals.map((product) => (
                    <div key={product._id} className="min-w-[30%] relative">
                        <img draggable="false" src={product.images[0]?.url} alt={product.images[0]?.altText || product.name} className="w-full h-[500px] object-cover rounded-lg" />
                    </div>
                ))}
            </div>
        </section>
    );
};

export default NewArrivals;
