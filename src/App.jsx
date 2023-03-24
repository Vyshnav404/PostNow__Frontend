import React from 'react'
import { Route, Routes } from 'react-router-dom'
import AdminRouter from './Routes/AdminRouter'
import UserRouter from './Routes/UserRouter'
import ErrorPage from './Pages/ErrorPage/ErrorPage'

function App() {
  return (
    <Routes>
      <Route exact path='/admin/*' element={<AdminRouter />} />
      <Route exact path='/*' element={<UserRouter />} />
      <Route path='/*' element={<ErrorPage />} />
    </Routes>
  )
}

export default App
