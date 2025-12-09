import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

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

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Login attempt with:', formData);

  };

  const handleRegister = () => {
    navigate('/customer/register'); 
  };

  return (
    <div className="min-h-screen bg-orange-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-xl shadow-lg border border-orange-100">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            INSTAFOOD
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Please sign in to your account
          </p>
        </div>
        
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm space-y-4">
            

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


            <div className="border border-orange-100 rounded-lg p-3 shadow-sm">
              <label htmlFor="password" className="sr-only">Password</label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border-b-2 border-orange-200 placeholder-gray-400 text-gray-900 focus:outline-none focus:border-black focus:z-10 sm:text-sm font-medium transition-colors bg-transparent"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="text-sm">
              <a href="#" className="font-medium text-orange-600 hover:text-orange-500">
                Forgot your password?
              </a>
            </div>
          </div>

          <div className="flex gap-4">
            <button
              type="submit"
              className="group relative w-1/2 flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 transition-colors"
            >
              Login
            </button>
            <button
              type="button"
              onClick={handleRegister}
              className="group relative w-1/2 flex justify-center py-2 px-4 border border-black text-sm font-medium rounded-md text-black bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-colors"
            >
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;