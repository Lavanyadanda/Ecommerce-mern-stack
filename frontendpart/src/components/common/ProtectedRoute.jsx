import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, useSearchParams } from 'react-router-dom'

const ProtectedRoute = ({children,role}) => {
const {user}=useSelector((state)=>state.auth);

if(!user || (role && user.route!==role)){
    return <Navigate to='/login' replace/>
}

  return children;
}

export default ProtectedRoute
