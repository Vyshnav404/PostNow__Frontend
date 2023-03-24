import React from 'react'
import { Route, Routes } from 'react-router-dom'
import AdminPublicRoute from '../PrivateRoutes/AdminProtect/AdminPublicRoute'
import AdminProtectedRoute from '../PrivateRoutes/AdminProtect/AdminProtectedRoute'
import AdminLogin from '../Pages/admin/AdminLogin'
import AdminDashboard from '../Pages/admin/AdminDashboard'
import UserManagePage from '../Pages/admin/UserManagePage'
import AdminQuestionPage from '../Pages/admin/AdminQuestionPage'
import AdsManagePage from '../Pages/admin/AdsManagePage'
import PostManagePage from '../Pages/admin/PostManagePage'
import AdminErrorPage from '../Pages/ErrorPage/AdminErrorPage'

function AdminRouter() {
  return (
 <>
    <Routes>
      <Route exact path='/' element={ <AdminPublicRoute> <AdminLogin /> </AdminPublicRoute> } />
      <Route exact path='/admindashboard' element={ <AdminProtectedRoute> <AdminDashboard /> </AdminProtectedRoute> } />
      <Route exact path='/userdetails' element={ <AdminProtectedRoute> <UserManagePage /> </AdminProtectedRoute> } />
      <Route exact path='/reportQuestion' element={ <AdminProtectedRoute> <AdminQuestionPage /> </AdminProtectedRoute> } />
      <Route exact path='/adsmanagement' element={ <AdminProtectedRoute> <AdsManagePage /> </AdminProtectedRoute> } />
      <Route exact path='/postmanagement' element={ <AdminProtectedRoute> <PostManagePage /> </AdminProtectedRoute> } />
      <Route path='/*' element={<AdminErrorPage />} />
    </Routes>
</>
  )
}

export default AdminRouter
