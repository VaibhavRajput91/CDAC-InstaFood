import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { forgotPassword } from '../../../services/common/forgotPassword';
import CustomerNavbar from '../../../components/customer/CustomerNavbar/CustomerNavbar';

function UpdatePassword() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: sessionStorage.getItem('email') || '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
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
    const { email, currentPassword, newPassword, confirmPassword } = formData;

    if (newPassword !== confirmPassword) {
      toast.error("New passwords do not match!");
      return;
    }

    try {
      const response = await forgotPassword(email, currentPassword, newPassword);
      if (response) {
        toast.success("Password updated successfully!");
        navigate('/customer/profile');
      } else {
        toast.error("Failed to update password. Please check your current password.");
      }
    } catch (error) {
      console.error('Password update error:', error);
      toast.error('An error occurred. Please try again later.');
    }
  };

  return (
    <div className="min-h-screen bg-orange-50 font-sans">
      <CustomerNavbar />
      <div className="flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-2xl shadow-xl border border-orange-100">
          <div className="text-center">
            <h2 className="text-3xl font-black text-gray-900 tracking-tight">
              Change <span className="text-orange-600">Password</span>
            </h2>
            <p className="mt-2 text-sm text-gray-500 font-medium">
              Keep your account secure
            </p>
          </div>

          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-4">
              {/* Email (Read-Only) */}
              <div className="group relative">
                <label className="block text-xs font-bold text-orange-500 uppercase tracking-widest mb-1 ml-1">Email Address</label>
                <input
                  type="email"
                  value={formData.email}
                  readOnly
                  className="block w-full px-4 py-3 bg-gray-50 border-2 border-orange-100/50 rounded-xl text-gray-500 sm:text-sm font-semibold cursor-not-allowed outline-none"
                />
              </div>

              {/* Current Password */}
              <div className="group relative">
                <label className="block text-xs font-bold text-orange-500 uppercase tracking-widest mb-1 ml-1 group-focus-within:text-orange-600 transition-colors">Current Password</label>
                <input
                  name="currentPassword"
                  type="password"
                  required
                  className="block w-full px-4 py-3 bg-orange-50/30 border-2 border-orange-100/50 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:border-orange-500 focus:bg-white transition-all duration-300 sm:text-sm font-semibold shadow-sm"
                  placeholder="••••••••"
                  value={formData.currentPassword}
                  onChange={handleChange}
                />
              </div>

              {/* New Password */}
              <div className="group relative">
                <label className="block text-xs font-bold text-orange-500 uppercase tracking-widest mb-1 ml-1 group-focus-within:text-orange-600 transition-colors">New Password</label>
                <input
                  name="newPassword"
                  type="password"
                  required
                  className="block w-full px-4 py-3 bg-orange-50/30 border-2 border-orange-100/50 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:border-orange-500 focus:bg-white transition-all duration-300 sm:text-sm font-semibold shadow-sm"
                  placeholder="••••••••"
                  value={formData.newPassword}
                  onChange={handleChange}
                />
              </div>

              {/* Confirm New Password */}
              <div className="group relative">
                <label className="block text-xs font-bold text-orange-500 uppercase tracking-widest mb-1 ml-1 group-focus-within:text-orange-600 transition-colors">Confirm New Password</label>
                <input
                  name="confirmPassword"
                  type="password"
                  required
                  className="block w-full px-4 py-3 bg-orange-50/30 border-2 border-orange-100/50 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:border-orange-500 focus:bg-white transition-all duration-300 sm:text-sm font-semibold shadow-sm"
                  placeholder="••••••••"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="flex flex-col gap-4 pt-2">
              <button
                type="submit"
                className="group relative w-full flex justify-center py-4 px-4 border border-transparent text-sm font-black rounded-xl text-white bg-orange-600 hover:bg-orange-700 focus:outline-none transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-orange-200"
              >
                UPDATE PASSWORD
              </button>
              <button
                type="button"
                onClick={() => navigate('/customer/profile')}
                className="group relative w-full flex justify-center py-4 px-4 border-2 border-orange-600 text-sm font-black rounded-xl text-orange-600 bg-white hover:bg-orange-50 focus:outline-none transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98]"
              >
                BACK TO PROFILE
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default UpdatePassword;
