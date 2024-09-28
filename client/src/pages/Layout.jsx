import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../components/Navbar/Navbar'
import Footer from '../components/Footer/Footer'
const Layout = () => {
  return (
    <>
    <Navbar/>
    <Outlet></Outlet>
    <Footer/>
    </>
  )
}

export default Layout