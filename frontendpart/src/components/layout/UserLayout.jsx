import React from 'react'
import Header from '../common/Header.jsx'
import Footer from '../common/Footer.jsx'
import { Outlet } from 'react-router-dom'
const UserLayout = () => {
  return (
//    HEADERSECTION
//    MAINCONTENTSECTION
//    FOOTERSECTION
<>
<Header/>
<main>
  <Outlet/>
</main>
<Footer/>


</>
  )
}

export default UserLayout
