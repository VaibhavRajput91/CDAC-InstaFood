import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CustomerNavbar from '../../../components/customer/CustomerNavbar/CustomerNavbar';
import ProfileAvatar from '../../../components/common/ProfileAvatar/ProfileAvatar';
// import './CustomerEditProfile.css'; // Uncomment if custom CSS is needed

function CustomerEditProfile() {
  const navigate = useNavigate();

  // Initial state with dummy data
  const [formData, setFormData] = useState({
    fullName: 'Digvijay Singh',
    email: 'Diguu@email.com',
    phone: '9876543210',
    city: 'Pune',
    address: 'Sunbeam Infotech Pvt. Ltd.'
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
    // Logic to save data to backend would go here
    console.log('Form submitted:', formData);
    alert('Profile updated successfully!');
    // navigate('/profile'); // Optional: Navigate back after save
  };

  return (
    <div className="min-h-screen bg-orange-50">
      <CustomerNavbar />
      <div className="max-w-4xl mx-auto py-10 px-4 sm:px-6 lg:px-8">
        <div className="bg-white shadow rounded-lg overflow-hidden border border-orange-100">
          
          {/* Header Section with Avatar */}
          <div className="bg-white p-6 flex flex-col items-center border-b border-orange-200">
             <div className="mb-4">
                <ProfileAvatar />
            </div>
            <h2 className="text-xl font-bold text-gray-900">Edit Profile</h2>
          </div>

          {/* Form Section */}
          <div className="p-6">
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                {/* Full Name */}
                <div className="p-4 border border-orange-100 rounded-lg shadow-sm bg-white">
                  <label htmlFor="fullName" className="block text-sm font-medium text-gray-500 mb-1">Full Name</label>
                  <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    required
                    className="w-full text-lg font-semibold border-b-2 border-orange-200 focus:border-black outline-none transition-colors"
                  />
                </div>

                {/* Email (Read-Only) */}
                <div className="p-4 border border-orange-100 rounded-lg shadow-sm bg-orange-50">
                  <label htmlFor="email" className="block text-sm font-medium text-gray-500 mb-1">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    readOnly
                    className="w-full text-lg font-semibold bg-transparent text-gray-600 cursor-not-allowed outline-none"
                  />
                </div>

                {/* Phone */}
                <div className="p-4 border border-orange-100 rounded-lg shadow-sm bg-white">
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-500 mb-1">Phone</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    pattern="[0-9]{10}"
                    title="Please enter a valid 10-digit phone number"
                    className="w-full text-lg font-semibold border-b-2 border-orange-200 focus:border-black outline-none transition-colors"
                  />
                </div>

                {/* City */}
                <div className="p-4 border border-orange-100 rounded-lg shadow-sm bg-white">
                  <label htmlFor="city" className="block text-sm font-medium text-gray-500 mb-1">City</label>
                  <input
                    type="text"
                    id="city"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    required
                    className="w-full text-lg font-semibold border-b-2 border-orange-200 focus:border-black outline-none transition-colors"
                  />
                </div>

                {/* Address */}
                <div className="p-4 border border-orange-100 rounded-lg shadow-sm bg-white md:col-span-2">
                  <label htmlFor="address" className="block text-sm font-medium text-gray-500 mb-1">Address</label>
                   <textarea
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    required
                    rows="3"
                    className="w-full text-lg font-semibold border-b-2 border-orange-200 focus:border-black outline-none transition-colors resize-none"
                  ></textarea>
                </div>

              </div>

              {/* Action Buttons */}
              <div className="mt-8 flex justify-between md:justify-center gap-4">
                <button
                  type="button"
                  onClick={() => navigate('/customer/profile')}
                  className="bg-white text-black border border-black px-6 py-2 rounded-md hover:bg-gray-100 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                >
                  Back to Profile
                </button>
                <button
                  type="submit"
                  className="bg-black text-white px-6 py-2 rounded-md hover:bg-gray-800 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900"
                >
                  Apply for Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CustomerEditProfile;
