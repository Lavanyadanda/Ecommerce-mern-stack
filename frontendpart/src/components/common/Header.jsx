import React from 'react'
import Topbar from '../layout/Topbar'
import Navbar from './Navbar'

const Header = () => {
  return (
    <div>
        <header className='border-b border-gray-200'>
                 {/* //   topbar */}
                    {/* navbar */}
                  {/* cartdrawer */}
      <Topbar/>
      <Navbar/>
      </header>
    </div>
  )
}

export default Header
