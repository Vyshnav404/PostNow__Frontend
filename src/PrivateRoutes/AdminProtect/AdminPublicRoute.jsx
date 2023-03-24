import React from 'react'
import { Navigate } from 'react-router-dom'

export default function AdminPublicRoute({ children }) {
  if(localStorage.getItem('Admintoken')){
    return <Navigate to='/admindashboard' />;
  }else{
    return children
  }
}
