// import React from 'react'

// const GenderCollection = () => {
//   return (
//     <div>
//       <h2> hello</h2>
//     </div>
//   )
// }

// export default GenderCollection
import React from 'react';
import mensCollectionImage from '../../assets/mens-collection.webp';
import womensCollectionImage from '../../assets/womens-collection.webp';
import { Link } from 'react-router-dom';

const GenderCollection = () => {
  return (
    <section className='py-16 px-4 lg:px-0'>
      <div className='max-w-7xl mx-auto flex flex-col md:flex-row gap-8'>
        
        {/* Women's Collection */}
        <div className='relative flex-1'>
          <img 
            src={womensCollectionImage} 
            alt='Womens Collection' 
            className='w-full h-[700px] object-cover rounded-lg' 
          />
          <div className='absolute bottom-8 left-8 bg-white bg-opacity-90 p-4 rounded-md'>
            <h2 className='text-2xl font-bold text-gray-900 mb-3'>Women's Collection</h2>
            <Link to="/collections/all?gender=Women" className='text-gray-900 underline'>
              Shop Now
            </Link>
          </div>
        </div>

        {/* Men's Collection */}
        <div className='relative flex-1'> 
          <img 
            src={mensCollectionImage} 
            alt='Mens Collection' 
            className='w-full h-[700px] object-cover rounded-lg' 
          />
          <div className='absolute bottom-8 left-8 bg-white bg-opacity-90 p-4 rounded-md'>
            <h2 className='text-2xl font-bold text-gray-900 mb-3'>Men's Collection</h2>
            <Link to="/collections/all?gender=Men" className='text-gray-900 underline'>
              Shop Now
            </Link>
          </div>
        </div>

      </div>
    </section>
  );
};

export default GenderCollection;
