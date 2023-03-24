import React from 'react'
import { Route, Routes } from 'react-router-dom'
import PublicRoute from '../PrivateRoutes/Protect/PublicRoute'
import ProtectedRouted from '../PrivateRoutes/Protect/ProtectedRouted'
import UserLogin from '../Pages/user/UserLogin'
import UserSignup from '../Pages/user/UserSignup'
import UserOtp from '../Pages/user/UserOtp'
import UserHome from '../Pages/user/UserHome'
import UserProfilePage from '../Pages/user/UserProfilePage'
import UserAnswerPage from '../Pages/user/UserAnswerPage'
import UserPostPage from '../Pages/user/UserPostPage'
import OthersProfilePage from '../Pages/user/OthersProfilePage'
import MessengerPage from '../Pages/user/MessengerPage'
import ErrorPage from '../Pages/ErrorPage/ErrorPage'


function UserRouter() {
  return (
<>
    <Routes>
      <Route exact path='/' element={<PublicRoute> <UserLogin /> </PublicRoute>} />
      <Route exact path='/user/signup' element={<PublicRoute> <UserSignup /> </PublicRoute>} />
      <Route exact path='/user/otp-page' element={<UserOtp />} />
      <Route exact path='/user/home' element={<ProtectedRouted> <UserHome /> </ProtectedRouted>} />
      <Route exact path='/user/profile' element={<ProtectedRouted> <UserProfilePage /> </ProtectedRouted>} />
      <Route exact path='/user/answerpage' element={<ProtectedRouted> <UserAnswerPage /> </ProtectedRouted>} />
      <Route exact path='/user/userpost' element={<ProtectedRouted> <UserPostPage /> </ProtectedRouted>} />
      <Route exact path='/user/othersprofile' element={<ProtectedRouted> <OthersProfilePage /> </ProtectedRouted>} />
      <Route exact path='/user/messenger' element={<ProtectedRouted> <MessengerPage /> </ProtectedRouted>} />
      <Route path='/*' element={<ErrorPage />} />
    </Routes>
</>
  )
}

export default UserRouter
