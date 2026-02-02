import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

function CustomerNavbar() {
  const navigate = useNavigate();

  const navLinks = [
    { name: 'Home', path: '/customer/' },
    { name: 'Orders', path: '/customer/orders' },
    { name: 'Profile', path: '/customer/profile' },
    // { name: 'ContactUS', path: '/contact-us' },
  ];

  const handleLogout = () => {
    // Clear session storage
    sessionStorage.clear();
    // Redirect to login page
    navigate('/');
  };

  return (
    <nav className="bg-white shadow-md border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Left side: Navigation Links */}
          <div className="flex space-x-8 h-full">
            {navLinks.map((link) => (
              <NavLink
                key={link.name}
                to={link.path}
                className={({ isActive }) =>
                  `inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium transition-colors duration-200 ${
                    isActive
                      ? 'border-orange-500 text-gray-900'
                      : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                  }`
                }
              >
                {link.name}
              </NavLink>
            ))}
          </div>

          {/* Right side: Logout Button */}
          <button
            onClick={handleLogout}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-orange-600 hover:bg-orange-700 transition-colors duration-200 focus:outline-none shadow-sm"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
}

export default CustomerNavbar;
