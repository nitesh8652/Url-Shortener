import React, { useState } from 'react'
import Homepage from './Pages/Homepage'
import AuthenticationPage from './Pages/AuthenticationPage'
import { Outlet } from '@tanstack/react-router'
import Navbar from './Components/Navbar'
import { Route, Routes } from '@tanstack/react-router'
import QrPage from './Pages/QrPage'

const RootLayout = () => {
  return (

    <>
    <Navbar />
      <Outlet />
      <Routes>
        <Route path="/generateqr" element={<QrPage />} />
      </Routes>
    </>

  )
}

export default RootLayout