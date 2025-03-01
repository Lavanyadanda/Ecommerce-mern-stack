import React from 'react'
import { useSearchParams } from 'react-router-dom'

const SortOptions = () => {
    const [searchParams,setSearchParams]=useSearchParams();
    const handleSortChange=(e)=>{
        const sortBy=e.target.value;
        searchParams.set("sortBy",sortBy);
        setSearchParams(searchParams)
    }
  return (
    <div  className='mb-4 flex items-center justify-end'>
        <select
        value={searchParams.get("sortBy")|| ""}
        onChange={handleSortChange}
         id='sort' className='border p-2 rounded-md  focus:outline-none'>
                <option value=""> Default</option>
                <option value="pricesAsc">Price low to hifh</option>
                <option value="priceDesc">Price high tomlow</option>
                <option value="popularity">Popularity</option>


            </select>
      
    </div>
  )
}

export default SortOptions
