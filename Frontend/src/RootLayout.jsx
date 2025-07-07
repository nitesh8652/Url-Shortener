import { useState } from 'react'
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
