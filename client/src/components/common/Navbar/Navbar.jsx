import React from 'react'
// import { useState } from 'react'
import { Link } from 'react-router-dom'

function Navbar() {
    // const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      {/* TOP NAVBAR */}
      <nav className="w-full bg-red-600 shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-center py-4 md:justify-between md:py-3">

          {/* CENTER LOGO ON MOBILE */}
          <div className="text-2xl m-px font-semibold text-white absolute left-1/2 -translate-x-1/2 md:static md:translate-x-0">
            InstaFood
          </div>

          {/* Desktop Menu */}
          {/* We can add more links accordingly or maybe use conditional rendering to display different navbar for different user roles */}
          <ul className="hidden md:flex space-x-8 text-white">
            <li><Link to="/delivery" className="hover:text-gray-900">Home</Link></li>
            <li><Link to="/delivery/order-history" className="hover:text-gray-900">Orders</Link></li>
            <li><Link to="/delivery/profile" className="hover:text-gray-900">Profile</Link></li>
            <li><Link to="/contact-us" className="hover:text-gray-900">Contact Us</Link></li>
          </ul>

          {/* Desktop Login Button */}
          <button className="hidden md:block bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg">
            Login
          </button>
        </div>
      </nav>

      {/* BOTTOM NAVBAR (Mobile only) */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white shadow-lg border-t border-gray-200 z-50">
        <ul className="flex justify-around py-2 text-gray-600">

          <li className="flex flex-col items-center">
            <Link to="/home" className="flex flex-col items-center">
              <svg className="w-6 h-6 mb-1" fill="none" stroke="currentColor" strokeWidth="2"
                viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round"
                  d="M3 9.75L12 4.5l9 5.25v9.75a.75.75 0 01-.75.75h-5.25a.75.75 0 01-.75-.75V15a1.5 1.5 0 00-1.5-1.5h-3A1.5 1.5 0 008.25 15v4.5c0 .414-.336.75-.75.75H2.75A.75.75 0 012 19.5V9.75z" />
              </svg>
              <span className="text-xs">Home</span>
            </Link>
          </li>

          <li className="flex flex-col items-center">
            <Link to="/orders" className="flex flex-col items-center">
              <svg className="w-6 h-6 mb-1" fill="none" stroke="currentColor" strokeWidth="2"
                viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round"
                  d="M3 3h18M9 3v18m6-18v18M3 9h18M3 15h18" />
              </svg>
              <span className="text-xs">Orders</span>
            </Link>
          </li>

          <li className="flex flex-col items-center">
            <Link to="/profile" className="flex flex-col items-center">
              <svg className="w-6 h-6 mb-1" fill="none" stroke="currentColor" strokeWidth="2"
                viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round"
                  d="M12 12a5 5 0 100-10 5 5 0 000 10zM4 21a8 8 0 0116 0H4z" />
              </svg>
              <span className="text-xs">Profile</span>
            </Link>
          </li>

          <li className="flex flex-col items-center">
            <Link to="/contact-us" className="flex flex-col items-center">
              <svg className="w-6 h-6 mb-1" fill="none" stroke="currentColor" strokeWidth="2"
                viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round"
                  d="M21 8a2 2 0 00-2-2h-3.28a2 2 0 01-1.56-.72l-1.72-1.72A2 2 0 0010.72 3H5a2 2 0 00-2 2v2m18 1v8a2 2 0 01-2 2h-3.28a2 2 0 00-1.56.72l-1.72 1.72a2 2 0 01-1.56.72H5a2 2 0 01-2-2v-8" />
              </svg>
              <span className="text-xs">Contact</span>
            </Link>
          </li>

        </ul>
      </nav>
    </>
  )
}

export default Navbar