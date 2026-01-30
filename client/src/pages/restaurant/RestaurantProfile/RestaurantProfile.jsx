import { useState, useEffect } from 'react';
import { Edit2, Save, X } from 'lucide-react';
import LoadingSkeleton from '../../../components/restaurant/UI/LoadingSkeleton';
import Toast from '../../../components/restaurant/UI/Toast';
import { restaurantAPI, RESTAURANT_ID } from '../../../services/Restaurant/api';
import RestaurantNavbar from '../../../components/restaurant/RestaurantNavbar/RestaurantNavbar';

export default function RestaurantProfile() {
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState(null);
  const [profileData, setProfileData] = useState({
    email: '',
    restaurantName: '',
    firstName: '',
    lastName: '',
    phone: '',
    lineOne: '',
    lineTwo: '',
    city: '',
    state: '',
    postalCode: '',
    openingTime: '',
    closingTime: '',
  });
  const [originalData, setOriginalData] = useState({});

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      setLoading(true);
      const response = await restaurantAPI.getProfile(RESTAURANT_ID);
      const data = response.data;
      setProfileData({
        email: data.email || '',
        restaurantName: data.restaurantName || '',
        firstName: data.firstName || '',
        lastName: data.lastName || '',
        phone: data.phone || '',
        lineOne: data.lineOne || '',
        lineTwo: data.lineTwo || '',
        city: data.city || '',
        state: data.state || '',
        postalCode: data.postalCode || '',
        openingTime: data.openingTime || '',
        closingTime: data.closingTime || '',
      });
      setOriginalData(data);
    } catch (error) {
      console.error('Error fetching profile:', error);
      setToast({
        message: 'Failed to load profile',
        type: 'error',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleEdit = () => {
    setEditing(true);
  };

  const handleCancel = () => {
    setProfileData({
      email: originalData.email || '',
      restaurantName: originalData.restaurantName || '',
      firstName: originalData.firstName || '',
      lastName: originalData.lastName || '',
      phone: originalData.phone || '',
      lineOne: originalData.lineOne || '',
      lineTwo: originalData.lineTwo || '',
      city: originalData.city || '',
      state: originalData.state || '',
      postalCode: originalData.postalCode || '',
      openingTime: originalData.openingTime || '',
      closingTime: originalData.closingTime || '',
    });
    setEditing(false);
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      // Send the data with the exact DTO field names
      const updateData = {
        restaurantName: profileData.restaurantName,
        firstName: profileData.firstName,
        lastName: profileData.lastName,
        phone: profileData.phone,
        lineOne: profileData.lineOne,
        lineTwo: profileData.lineTwo,
        city: profileData.city,
        state: profileData.state,
        postalCode: profileData.postalCode,
        openingTime: profileData.openingTime,
        closingTime: profileData.closingTime,
      };

      await restaurantAPI.updateProfile(RESTAURANT_ID, updateData);
      setOriginalData(updateData);
      setEditing(false);
      setToast({
        message: 'Profile updated successfully',
        type: 'success',
      });
    } catch (error) {
      console.error('Error saving profile:', error);
      setToast({
        message: 'Failed to update profile',
        type: 'error',
      });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <h2 className="font-bold text-2xl text-gray-900">Restaurant Profile</h2>
        <LoadingSkeleton type="card" count={2} />
      </div>
    );
  }

  return (
    <>
      <RestaurantNavbar />
      <br />
      <div className="space-y-6 mx-4 md:mx-8 lg:mx-12">
        <div className="flex items-center justify-between">
          <h2 className="font-bold text-2xl text-gray-900">Restaurant Profile</h2>
          {!editing && (
            <button
              onClick={handleEdit}
              className="flex items-center gap-2 px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors"
            >
              <Edit2 className="w-4 h-4" />
              Edit Profile
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Profile Card */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="text-center">
              <div className="w-24 h-24 bg-gradient-to-br from-orange-400 to-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-4xl text-white font-bold">
                  {profileData.firstName?.charAt(0) || ''}
                </span>
              </div>
              <h4 className="font-bold text-l text-gray-900 mb-1">
                {profileData.firstName} {profileData.lastName}
              </h4>
              <p className="text-gray-600">
                {profileData.email}
              </p>
            </div>
          </div>

          {/* Details Form */}
          <div className="lg:col-span-2 bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="font-semibold text-lg text-gray-900 mb-6">Restaurant Details</h3>

            <div className="space-y-6">
              {/* Restaurant Name */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="restaurantName" className="block font-medium text-gray-700 mb-2">
                    Restaurant Name
                  </label>
                  <input
                    type="text"
                    id="restaurantName"
                    name="restaurantName"
                    value={profileData.restaurantName}
                    onChange={handleChange}
                    disabled={!editing}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent disabled:bg-gray-50 disabled:text-gray-600"
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block font-medium text-gray-700 mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={profileData.phone}
                    onChange={handleChange}
                    disabled={!editing}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent disabled:bg-gray-50 disabled:text-gray-600"
                  />
                </div>
              </div>

              {/* Last Name and Phone */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="firstName" className="block font-medium text-gray-700 mb-2">
                    First Name
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={profileData.firstName}
                    onChange={handleChange}
                    disabled={!editing}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent disabled:bg-gray-50 disabled:text-gray-600"
                  />
                </div>

                <div>
                  <label htmlFor="lastName" className="block font-medium text-gray-700 mb-2">
                    Last Name
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={profileData.lastName}
                    onChange={handleChange}
                    disabled={!editing}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent disabled:bg-gray-50 disabled:text-gray-600"
                  />
                </div>


              </div>

              {/* Address */}
              <div>
                <label htmlFor="lineOne" className="block font-medium text-gray-700 mb-2">
                  Street Address
                </label>
                <input
                  type="text"
                  id="lineOne"
                  name="lineOne"
                  value={profileData.lineOne}
                  onChange={handleChange}
                  disabled={!editing}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent disabled:bg-gray-50 disabled:text-gray-600"
                />
              </div>

              {/* Address Line 2 */}
              <div>
                <label htmlFor="lineTwo" className="block font-medium text-gray-700 mb-2">
                  Address Line 2 (Optional)
                </label>
                <input
                  type="text"
                  id="lineTwo"
                  name="lineTwo"
                  value={profileData.lineTwo}
                  onChange={handleChange}
                  disabled={!editing}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent disabled:bg-gray-50 disabled:text-gray-600"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label htmlFor="city" className="block font-medium text-gray-700 mb-2">
                    City
                  </label>
                  <input
                    type="text"
                    id="city"
                    name="city"
                    value={profileData.city}
                    onChange={handleChange}
                    disabled={!editing}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent disabled:bg-gray-50 disabled:text-gray-600"
                  />
                </div>

                <div>
                  <label htmlFor="state" className="block font-medium text-gray-700 mb-2">
                    State
                  </label>
                  <input
                    type="text"
                    id="state"
                    name="state"
                    value={profileData.state}
                    onChange={handleChange}
                    disabled={!editing}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent disabled:bg-gray-50 disabled:text-gray-600"
                  />
                </div>

                <div>
                  <label htmlFor="postalCode" className="block font-medium text-gray-700 mb-2">
                    Postal Code
                  </label>
                  <input
                    type="text"
                    id="postalCode"
                    name="postalCode"
                    value={profileData.postalCode}
                    onChange={handleChange}
                    disabled={!editing}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent disabled:bg-gray-50 disabled:text-gray-600"
                  />
                </div>
              </div>

              {/* Operating Hours */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="openingTime" className="block font-medium text-gray-700 mb-2">
                    Opening Time
                  </label>
                  <input
                    type="time"
                    id="openingTime"
                    name="openingTime"
                    value={profileData.openingTime}
                    onChange={handleChange}
                    disabled={!editing}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent disabled:bg-gray-50 disabled:text-gray-600"
                  />
                </div>

                <div>
                  <label htmlFor="closingTime" className="block font-medium text-gray-700 mb-2">
                    Closing Time
                  </label>
                  <input
                    type="time"
                    id="closingTime"
                    name="closingTime"
                    value={profileData.closingTime}
                    onChange={handleChange}
                    disabled={!editing}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent disabled:bg-gray-50 disabled:text-gray-600"
                  />
                </div>
              </div>

              {/* Action Buttons */}
              {editing && (
                <div className="flex gap-3 pt-4">
                  <button
                    onClick={handleCancel}
                    className="flex items-center gap-2 flex-1 px-4 py-2 border border-gray-700 text-gray-00 rounded-lg hover:bg-gray-100 transition-colors"
                    disabled={saving}
                  >
                    <X className="w-4 h-4" />
                    Cancel
                  </button>
                  <button
                    onClick={handleSave}
                    className="flex items-center gap-2 flex-1 px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors disabled:opacity-50"
                    disabled={saving}
                  >
                    <Save className="w-4 h-4" />
                    {saving ? 'Saving...' : 'Save Changes'}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Toast Notification */}
        {toast && (
          <Toast
            message={toast.message}
            type={toast.type}
            onClose={() => setToast(null)}
          />
        )}
      </div>
    </>
  );
}
