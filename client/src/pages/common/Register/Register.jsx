import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { register } from '../../../services/common/register';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    phone: '',
    role: 'ROLE_CUSTOMER',
    city: '',
    postalCode: '',
    lineOne: '',
    lineTwo: '',
    state: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { firstName, lastName, email, password, phone, role, city, postalCode, lineOne, lineTwo, state } = formData;
    
    try {
      const response = await register(firstName, lastName, email, password, phone, role, city, postalCode, lineOne, lineTwo, state);
      // Backend returns UserResponseDTO directly on success
      if (response && (response.id || response.email)) {
        toast.success('Registration successful! Redirecting to login...');
        setTimeout(() => {
          navigate('/');
        }, 2000);
      } else {
        toast.error(response?.message || 'Registration failed. Please try again.');
      }
    } catch (error) {
      console.error('Registration error:', error);
      toast.error('An error occurred during registration.');
    }
  };

  const handleLoginRedirect = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-orange-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 font-sans">
      <ToastContainer position="top-center" autoClose={3000} />
      <div className="max-w-2xl w-full space-y-8 bg-white p-10 rounded-2xl shadow-xl border border-orange-100">
        <div className="text-center">
          <h2 className="mt-2 text-4xl font-black text-gray-900 tracking-tight">
            Create an Account
          </h2>
          <p className="mt-3 text-base text-gray-600 font-medium">
            Join <span className="text-orange-600 font-bold italic">InstaFood</span> to order your favorite food
          </p>
        </div>
        
        <form className="mt-10 space-y-8" onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* First Name */}
            <div className="group relative">
              <label htmlFor="firstName" className="block text-xs font-bold text-orange-500 uppercase tracking-widest mb-1 ml-1 group-focus-within:text-orange-600 transition-colors">First Name</label>
              <input
                id="firstName"
                name="firstName"
                type="text"
                required
                className="block w-full px-4 py-3 bg-orange-50/30 border-2 border-orange-100/50 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:border-orange-500 focus:bg-white transition-all duration-300 sm:text-sm font-semibold shadow-sm"
                placeholder="Digvijay"
                value={formData.firstName}
                onChange={handleChange}
              />
            </div>

            {/* Last Name */}
            <div className="group relative">
              <label htmlFor="lastName" className="block text-xs font-bold text-orange-500 uppercase tracking-widest mb-1 ml-1 group-focus-within:text-orange-600 transition-colors">Last Name</label>
              <input
                id="lastName"
                name="lastName"
                type="text"
                required
                className="block w-full px-4 py-3 bg-orange-50/30 border-2 border-orange-100/50 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:border-orange-500 focus:bg-white transition-all duration-300 sm:text-sm font-semibold shadow-sm"
                placeholder="Singh"
                value={formData.lastName}
                onChange={handleChange}
              />
            </div>

            {/* Email */}
            <div className="group relative">
              <label htmlFor="email" className="block text-xs font-bold text-orange-500 uppercase tracking-widest mb-1 ml-1 group-focus-within:text-orange-600 transition-colors">Email address</label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="block w-full px-4 py-3 bg-orange-50/30 border-2 border-orange-100/50 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:border-orange-500 focus:bg-white transition-all duration-300 sm:text-sm font-semibold shadow-sm"
                placeholder="digvijay@example.com"
                value={formData.email}
                onChange={handleChange}
              />
            </div>

            {/* Phone */}
            <div className="group relative">
              <label htmlFor="phone" className="block text-xs font-bold text-orange-500 uppercase tracking-widest mb-1 ml-1 group-focus-within:text-orange-600 transition-colors">Phone Number</label>
              <input
                id="phone"
                name="phone"
                type="tel"
                required
                className="block w-full px-4 py-3 bg-orange-50/30 border-2 border-orange-100/50 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:border-orange-500 focus:bg-white transition-all duration-300 sm:text-sm font-semibold shadow-sm"
                placeholder="9876543210"
                value={formData.phone}
                onChange={handleChange}
              />
            </div>

             {/* Password */}
             <div className="group relative md:col-span-2">
              <label htmlFor="password" className="block text-xs font-bold text-orange-500 uppercase tracking-widest mb-1 ml-1 group-focus-within:text-orange-600 transition-colors">Password</label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="new-password"
                required
                className="block w-full px-4 py-3 bg-orange-50/30 border-2 border-orange-100/50 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:border-orange-500 focus:bg-white transition-all duration-300 sm:text-sm font-semibold shadow-sm"
                placeholder="••••••••"
                value={formData.password}
                onChange={handleChange}
              />
            </div>

            {/* Role Radio Buttons */}
            <div className="md:col-span-2 space-y-3">
              <label className="block text-xs font-bold text-orange-500 uppercase tracking-widest mb-1 ml-1">Select Your Role</label>
              <div className="flex flex-wrap gap-4">
                {[
                  { id: 'customer', value: 'ROLE_CUSTOMER', label: 'Customer' },
                  { id: 'delivery', value: 'ROLE_DELIVERY_PARTNER', label: 'Delivery Executive' },
                  { id: 'restaurant', value: 'ROLE_RESTAURANT', label: 'Restaurant Owner' }
                ].map((roleOption) => (
                  <label key={roleOption.id} className="flex items-center cursor-pointer group">
                    <input
                      type="radio"
                      name="role"
                      value={roleOption.value}
                      checked={formData.role === roleOption.value}
                      onChange={handleChange}
                      className="hidden"
                    />
                    <div className={`px-4 py-2 rounded-full border-2 transition-all duration-200 text-sm font-bold shadow-sm ${
                      formData.role === roleOption.value 
                        ? 'bg-orange-500 border-orange-500 text-white shadow-orange-200' 
                        : 'bg-white border-orange-100 text-gray-600 hover:border-orange-300'
                    }`}>
                      {roleOption.label}
                    </div>
                  </label>
                ))}
              </div>
            </div>

            {/* Address Line One */}
            <div className="group relative md:col-span-2">
              <label htmlFor="lineOne" className="block text-xs font-bold text-orange-500 uppercase tracking-widest mb-1 ml-1 group-focus-within:text-orange-600 transition-colors">Address Line 1</label>
              <input
                id="lineOne"
                name="lineOne"
                type="text"
                required
                className="block w-full px-4 py-3 bg-orange-50/30 border-2 border-orange-100/50 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:border-orange-500 focus:bg-white transition-all duration-300 sm:text-sm font-semibold shadow-sm"
                placeholder="House No, Street Name"
                value={formData.lineOne}
                onChange={handleChange}
              />
            </div>

            {/* Address Line Two */}
            <div className="group relative md:col-span-2">
              <label htmlFor="lineTwo" className="block text-xs font-bold text-orange-500 uppercase tracking-widest mb-1 ml-1 group-focus-within:text-orange-600 transition-colors">Address Line 2 (Optional)</label>
              <input
                id="lineTwo"
                name="lineTwo"
                type="text"
                className="block w-full px-4 py-3 bg-orange-50/30 border-2 border-orange-100/50 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:border-orange-500 focus:bg-white transition-all duration-300 sm:text-sm font-semibold shadow-sm"
                placeholder="Landmark, Area"
                value={formData.lineTwo}
                onChange={handleChange}
              />
            </div>

            {/* City */}
            <div className="group relative">
              <label htmlFor="city" className="block text-xs font-bold text-orange-500 uppercase tracking-widest mb-1 ml-1 group-focus-within:text-orange-600 transition-colors">City</label>
              <input
                id="city"
                name="city"
                type="text"
                required
                className="block w-full px-4 py-3 bg-orange-50/30 border-2 border-orange-100/50 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:border-orange-500 focus:bg-white transition-all duration-300 sm:text-sm font-semibold shadow-sm"
                placeholder="City Name"
                value={formData.city}
                onChange={handleChange}
              />
            </div>

            {/* State */}
            <div className="group relative">
              <label htmlFor="state" className="block text-xs font-bold text-orange-500 uppercase tracking-widest mb-1 ml-1 group-focus-within:text-orange-600 transition-colors">State</label>
              <input
                id="state"
                name="state"
                type="text"
                required
                className="block w-full px-4 py-3 bg-orange-50/30 border-2 border-orange-100/50 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:border-orange-500 focus:bg-white transition-all duration-300 sm:text-sm font-semibold shadow-sm"
                placeholder="State Name"
                value={formData.state}
                onChange={handleChange}
              />
            </div>

            {/* Postal Code */}
            <div className="group relative">
              <label htmlFor="postalCode" className="block text-xs font-bold text-orange-500 uppercase tracking-widest mb-1 ml-1 group-focus-within:text-orange-600 transition-colors">Postal Code</label>
              <input
                id="postalCode"
                name="postalCode"
                type="text"
                required
                className="block w-full px-4 py-3 bg-orange-50/30 border-2 border-orange-100/50 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:border-orange-500 focus:bg-white transition-all duration-300 sm:text-sm font-semibold shadow-sm"
                placeholder="123456"
                value={formData.postalCode}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <button
              type="submit"
              className="group relative w-full sm:w-1/2 flex justify-center py-4 px-4 border border-transparent text-sm font-black rounded-xl text-white bg-orange-600 hover:bg-orange-700 focus:outline-none transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-orange-200"
            >
              CREATE ACCOUNT
            </button>
            <button
              type="button"
              onClick={handleLoginRedirect}
              className="group relative w-full sm:w-1/2 flex justify-center py-4 px-4 border-2 border-orange-600 text-sm font-black rounded-xl text-orange-600 bg-white hover:bg-orange-50 focus:outline-none transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98]"
            >
              ALREADY HAVE AN ACCOUNT?
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register;

