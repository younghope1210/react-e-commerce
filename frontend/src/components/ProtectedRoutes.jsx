// eslint-disable-next-line no-unused-vars
import React from 'react'
import {Navigate, Outlet} from 'react-router-dom'

// eslint-disable-next-line react/prop-types
const ProtectedRoutes = ({ isAuth }) => {
  return (
    isAuth ? <Outlet /> : <Navigate to={'/login'} />
  )
}

export default ProtectedRoutes