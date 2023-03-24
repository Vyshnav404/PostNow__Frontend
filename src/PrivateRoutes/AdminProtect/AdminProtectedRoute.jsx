import React from 'react'
import { Navigate } from 'react-router-dom'

export default function AdminProtectedRoute({ children }) {
if(localStorage.getItem("Admintoken")){
    return children;
}else{
    return <Navigate to='/admin' />
}
}
