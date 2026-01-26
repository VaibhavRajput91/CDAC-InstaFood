import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import CustomerNavbar from '../../../components/customer/CustomerNavbar/CustomerNavbar';
import ProfileAvatar from '../../../components/common/ProfileAvatar/ProfileAvatar';
import { getCustomerProfile } from '../../../services/customer/customerProfile';
import { editProfile } from '../../../services/customer/customerEditProfile';
import { toast } from 'react-toastify';

function CustomerEditProfile() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    city: '',
    postalCode: '',
    lineOne: '',
    lineTwo: '',
    state: ''
  });

  useEffect(() => {
    const fetchProfile = async () => {
        try {
            const userId = sessionStorage.getItem('userId');
            if (userId) {
                const response = await getCustomerProfile(userId);
                if (response) {
                    setFormData({
                        firstName: response.firstName || '',
                        lastName: response.lastName || '',
                        email: response.email || '',
                        phone: response.phone || '',
                        city: response.city || '',
                        postalCode: response.postalCode || '',
                        lineOne: response.lineOne || '',
                        lineTwo: response.lineTwo || '',
                        state: response.state || ''
                    });
                }
            }
        } catch (error) {
            console.error("Error fetching profile:", error);
            toast.error("Failed to load user details");
        } finally {
            setLoading(false);
        }
    };

    fetchProfile();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const userId = sessionStorage.getItem('userId');
        const { firstName, lastName, phone, city, postalCode, lineOne, lineTwo, state } = formData;
        
        const response = await editProfile(
            userId, firstName, lastName, phone, city, postalCode, lineOne, lineTwo, state
        );

        if (response) {
            toast.success('Profile updated successfully!');
            navigate('/customer/profile');
        }
    } catch (error) {
        console.error('Update error:', error);
        toast.error('Failed to update profile. Please try again.');
    }
  };

  if (loading) {
    return (
        <div className="min-h-screen bg-orange-50">
            <CustomerNavbar />
            <div className="flex justify-center items-center h-[calc(100vh-64px)]">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
            </div>
        </div>
    );
  }

  return (
    <div className="min-h-screen bg-orange-50">
      <CustomerNavbar />
      <div className="max-w-4xl mx-auto py-10 px-4 sm:px-6 lg:px-8">
        <div className="bg-white shadow rounded-lg overflow-hidden border border-orange-100">
          
          <div className="bg-white p-6 flex flex-col items-center border-b border-orange-200">
             <div className="mb-4">
                <ProfileAvatar user={formData} />
            </div>
            <h2 className="text-xl font-bold text-gray-900">Edit Profile</h2>
          </div>

          <div className="p-6">
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                {/* First Name */}
                <div className="p-4 border border-orange-100 rounded-lg shadow-sm bg-white">
                  <label htmlFor="firstName" className="block text-sm font-medium text-gray-500 mb-1">First Name</label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                    className="w-full text-lg font-semibold border-b-2 border-orange-200 focus:border-black outline-none transition-colors"
                  />
                </div>

                {/* Last Name */}
                <div className="p-4 border border-orange-100 rounded-lg shadow-sm bg-white">
                  <label htmlFor="lastName" className="block text-sm font-medium text-gray-500 mb-1">Last Name</label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                    className="w-full text-lg font-semibold border-b-2 border-orange-200 focus:border-black outline-none transition-colors"
                  />
                </div>

                {/* Email (Read-Only) */}
                <div className="p-4 border border-orange-100 rounded-lg shadow-sm bg-orange-50">
                  <label htmlFor="email" className="block text-sm font-medium text-gray-500 mb-1">Email </label>
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

                {/* Line One */}
                <div className="p-4 border border-orange-100 rounded-lg shadow-sm bg-white md:col-span-2">
                  <label htmlFor="lineOne" className="block text-sm font-medium text-gray-500 mb-1">Address Line 1</label>
                  <input
                    type="text"
                    id="lineOne"
                    name="lineOne"
                    value={formData.lineOne}
                    onChange={handleChange}
                    required
                    className="w-full text-lg font-semibold border-b-2 border-orange-200 focus:border-black outline-none transition-colors"
                  />
                </div>

                {/* Line Two */}
                <div className="p-4 border border-orange-100 rounded-lg shadow-sm bg-white md:col-span-2">
                  <label htmlFor="lineTwo" className="block text-sm font-medium text-gray-500 mb-1">Address Line 2</label>
                  <input
                    type="text"
                    id="lineTwo"
                    name="lineTwo"
                    value={formData.lineTwo}
                    onChange={handleChange}
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

                {/* State */}
                <div className="p-4 border border-orange-100 rounded-lg shadow-sm bg-white">
                  <label htmlFor="state" className="block text-sm font-medium text-gray-500 mb-1">State</label>
                  <input
                    type="text"
                    id="state"
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                    required
                    className="w-full text-lg font-semibold border-b-2 border-orange-200 focus:border-black outline-none transition-colors"
                  />
                </div>

                {/* Postal Code */}
                <div className="p-4 border border-orange-100 rounded-lg shadow-sm bg-white">
                  <label htmlFor="postalCode" className="block text-sm font-medium text-gray-500 mb-1">Postal Code</label>
                  <input
                    type="text"
                    id="postalCode"
                    name="postalCode"
                    value={formData.postalCode}
                    onChange={handleChange}
                    required
                    className="w-full text-lg font-semibold border-b-2 border-orange-200 focus:border-black outline-none transition-colors"
                  />
                </div>

              </div>

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
