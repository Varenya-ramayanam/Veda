import React from 'react'
import TopBar from '../Layout/User-components/TopBar'
import NavBar from "./NavBar"

const Header = () => {
  return (
    <div className='border-b border-gray-200'>
        {/* Topbar */}
        <TopBar/>
        {/* Navbar */}
        <NavBar/>
        {/* Cart Drawer */}
    </div>
  )
}

export default Header