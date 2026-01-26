import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../../../services/common/login';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const decodeToken = (token) => {
    try {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split('')
          .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
          .join('')
      );
      return JSON.parse(jsonPayload);
    } catch (e) {
      console.error('Error decoding token', e);
      return null;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = formData;

    try {
      const response = await login(email, password);
      
      if (response && response.token) {
        // Decode token to find role and postalCode
        const payload = decodeToken(response.token);
        const roles = payload?.authorities || [];
        const postalCode = payload?.postalCode;

        // Store token, email, postalCode, and userId
        sessionStorage.setItem('token', response.token);
        sessionStorage.setItem('email', response.email);
        
        // Extract userId from response or JWT payload
        const userId = response.id || payload?.userId;
        if (userId) {
          sessionStorage.setItem('userId', userId);
        }
        
        if (postalCode) {
          sessionStorage.setItem('postalCode', postalCode);
        }
        
        toast.success(`Welcome back, ${response.email}!`);

        // Role-based navigation
        setTimeout(() => {
          if (roles.includes('ROLE_ADMIN')) {
            navigate('/admin');
          } else if (roles.includes('ROLE_RESTAURANT')) {
            navigate('/restaurant');
          } else if (roles.includes('ROLE_DELIVERY_PARTNER')) {
            navigate('/delivery');
          } else {
            navigate('/customer');
          }
        }, 1500);
      } else {
        toast.error('Invalid credentials. Please try again.');
      }
    } catch (error) {
      console.error('Login error:', error);
      toast.error('An error occurred during login. Please check your credentials.');
    }
  };

  const handleRegister = () => {
    navigate('/register'); 
  };

  return (
    <div className="min-h-screen bg-orange-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 font-sans">
      <ToastContainer position="top-center" autoClose={3000} />
      <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-2xl shadow-xl border border-orange-100">
        <div className="text-center">
          <h2 className="mt-2 text-5xl font-black text-gray-900 tracking-tighter">
            INSTA<span className="text-orange-600">FOOD</span>
          </h2>
          <p className="mt-4 text-base text-gray-600 font-medium tracking-wide">
            Sign in to experience the <span className="font-bold">best flavors</span>
          </p>
        </div>
        
        <form className="mt-10 space-y-8" onSubmit={handleSubmit}>
          <div className="space-y-6">
            
            {/* Email Field */}
            <div className="group relative">
              <label htmlFor="email" className="block text-xs font-bold text-orange-500 uppercase tracking-widest mb-1 ml-1 group-focus-within:text-orange-600 transition-colors">Email address</label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="block w-full px-4 py-3 bg-orange-50/30 border-2 border-orange-100/50 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:border-orange-500 focus:bg-white transition-all duration-300 sm:text-sm font-semibold shadow-sm"
                placeholder="name@example.com"
                value={formData.email}
                onChange={handleChange}
              />
            </div>

            {/* Password Field */}
            <div className="group relative">
              <label htmlFor="password" className="block text-xs font-bold text-orange-500 uppercase tracking-widest mb-1 ml-1 group-focus-within:text-orange-600 transition-colors">Password</label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="block w-full px-4 py-3 bg-orange-50/30 border-2 border-orange-100/50 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:border-orange-500 focus:bg-white transition-all duration-300 sm:text-sm font-semibold shadow-sm"
                placeholder="••••••••"
                value={formData.password}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* <div className="flex items-center justify-end">
            <div className="text-sm">
              <a href="#" className="font-bold text-orange-600 hover:text-orange-700 transition-colors">
                Forgot password?
              </a>
            </div>
          </div> */}

          <div className="flex flex-col gap-4">
            <button
              type="submit"
              className="group relative w-full flex justify-center py-4 px-4 border border-transparent text-sm font-black rounded-xl text-white bg-orange-600 hover:bg-orange-700 focus:outline-none transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-orange-200"
            >
              LOG IN
            </button>
            <button
              type="button"
              onClick={handleRegister}
              className="group relative w-full flex justify-center py-4 px-4 border-2 border-orange-600 text-sm font-black rounded-xl text-orange-600 bg-white hover:bg-orange-50 focus:outline-none transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98]"
            >
              CREATE NEW ACCOUNT
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
