import React, { useState } from 'react'
import Homepage from './Pages/Homepage'
import AuthenticationPage from './Pages/AuthenticationPage'
import { Outlet } from '@tanstack/react-router'
import Navbar from './Components/Navbar'

const RootLayout = () => {
  return (

    <>
    <Navbar />
      <Outlet />
    </>

  )
}

export default RootLayout