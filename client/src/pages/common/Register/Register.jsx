import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    password: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Registration attempt with:', formData);
    // TODO: Add backend registration integration here
  };

  const handleLoginRedirect = () => {
    navigate('/customer/login');
  };

  return (
    <div className="min-h-screen bg-orange-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-xl shadow-lg border border-orange-100">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            Create an Account
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Join us to order your favorite food
          </p>
        </div>
        
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm space-y-4">
            
            {/* Full Name */}
            <div className="border border-orange-100 rounded-lg p-3 shadow-sm">
              <label htmlFor="fullName" className="sr-only">Full Name</label>
              <input
                id="fullName"
                name="fullName"
                type="text"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border-b-2 border-orange-200 placeholder-gray-400 text-gray-900 focus:outline-none focus:border-black focus:z-10 sm:text-sm font-medium transition-colors bg-transparent"
                placeholder="Full Name"
                value={formData.fullName}
                onChange={handleChange}
              />
            </div>

            {/* Email */}
            <div className="border border-orange-100 rounded-lg p-3 shadow-sm">
              <label htmlFor="email" className="sr-only">Email address</label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border-b-2 border-orange-200 placeholder-gray-400 text-gray-900 focus:outline-none focus:border-black focus:z-10 sm:text-sm font-medium transition-colors bg-transparent"
                placeholder="Email address"
                value={formData.email}
                onChange={handleChange}
              />
            </div>

            {/* Phone */}
            <div className="border border-orange-100 rounded-lg p-3 shadow-sm">
              <label htmlFor="phone" className="sr-only">Phone Number</label>
              <input
                id="phone"
                name="phone"
                type="tel"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border-b-2 border-orange-200 placeholder-gray-400 text-gray-900 focus:outline-none focus:border-black focus:z-10 sm:text-sm font-medium transition-colors bg-transparent"
                placeholder="Phone Number"
                value={formData.phone}
                onChange={handleChange}
              />
            </div>

             {/* Address */}
             <div className="border border-orange-100 rounded-lg p-3 shadow-sm">
              <label htmlFor="address" className="sr-only">Address</label>
              <textarea
                id="address"
                name="address"
                required
                rows="3"
                className="appearance-none rounded-none relative block w-full px-3 py-2 border-b-2 border-orange-200 placeholder-gray-400 text-gray-900 focus:outline-none focus:border-black focus:z-10 sm:text-sm font-medium transition-colors bg-transparent resize-none"
                placeholder="Address"
                value={formData.address}
                onChange={handleChange}
              />
            </div>

            {/* Password */}
            <div className="border border-orange-100 rounded-lg p-3 shadow-sm">
              <label htmlFor="password" className="sr-only">Password</label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="new-password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border-b-2 border-orange-200 placeholder-gray-400 text-gray-900 focus:outline-none focus:border-black focus:z-10 sm:text-sm font-medium transition-colors bg-transparent"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Buttons */}
          <div className="flex gap-4">
            <button
              type="submit"
              className="group relative w-1/2 flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 transition-colors"
            >
              Register
            </button>
            <button
              type="button"
              onClick={handleLoginRedirect}
              className="group relative w-1/2 flex justify-center py-2 px-4 border border-black text-sm font-medium rounded-md text-black bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-colors"
            >
              Back to Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register;
