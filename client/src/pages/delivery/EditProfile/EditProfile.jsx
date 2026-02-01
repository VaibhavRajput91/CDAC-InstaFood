import React, { useEffect, useState } from 'react';
import ProfileAvatar from '../../../components/common/ProfileAvatar/ProfileAvatar';
import { ArrowLeft } from 'lucide-react';

export function EditProfile({ navigateTo }) {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    licenseNumber: '',
    vehicleType: '',
    vehicleModel: ''
  });
  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    fetch('http://localhost:8080/delivery/details?deliveryPartnerId=' + sessionStorage.getItem('deliveryPartnerId'))
      .then(res => res.json())
      .then(data => {
        setFormData({
          firstName: data.firstName || '',
          lastName: data.lastName || '',
          email: data.email || '',
          phoneNumber: data.phoneNumber || '',
          licenseNumber: data.licenseNumber || '',
          vehicleType: data.vehicleDetails?.vehicleType || '',
          vehicleModel: data.vehicleDetails?.vehicleModel || ''
        });
        setLoading(false);
      })
      .catch(() => {
        setError('Failed to load details');
        setLoading(false);
      });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess(false);
    try {
      const res = await fetch('http://localhost:8080/delivery/edit-details?deliveryPartnerId=' + sessionStorage.getItem('deliveryPartnerId'), {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          vehicleDetails: {
            vehicleType: formData.vehicleType,
            vehicleModel: formData.vehicleModel
          }
        })
      });
      if (!res.ok) throw new Error('Update failed');
      setSuccess(true);
    } catch (err) {
      setError('Failed to update profile');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-3xl mx-auto px-4 py-8">
        <div className="bg-white shadow rounded-lg overflow-hidden border border-orange-100">
          <div className="bg-white p-6 flex flex-col items-center border-b border-orange-200 w-full relative">
            <button
              className="absolute left-4 top-4 p-2 rounded-full hover:bg-gray-100"
              type="button"
              onClick={() => navigateTo ? navigateTo('profile') : window.history.back()}
              aria-label="Back"
            >
              <ArrowLeft className="w-6 h-6 text-gray-700" />
            </button>
            <ProfileAvatar />
            <h2 className="text-xl font-bold text-gray-900 mt-4">Edit Profile</h2>
          </div>
          <form className="p-6" onSubmit={handleSubmit}>
            {loading ? (
              <div className="text-center text-gray-500">Loading...</div>
            ) : (
              <>
                {error && <div className="mb-4 text-red-600">{error}</div>}
                {success && <div className="mb-4 text-green-600">Profile updated successfully!</div>}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="text-sm text-gray-600">First Name</label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      className="w-full p-3 border rounded-lg mt-1"
                      required
                    />
                  </div>
                  <div>
                    <label className="text-sm text-gray-600">Last Name</label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      className="w-full p-3 border rounded-lg mt-1"
                      required
                    />
                  </div>
                  <div>
                    <label className="text-sm text-gray-600">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full p-3 border rounded-lg mt-1"
                      required
                    />
                  </div>
                  <div>
                    <label className="text-sm text-gray-600">Phone Number</label>
                    <input
                      type="text"
                      name="phoneNumber"
                      value={formData.phoneNumber}
                      onChange={handleChange}
                      className="w-full p-3 border rounded-lg mt-1"
                      required
                    />
                  </div>
                  <div>
                    <label className="text-sm text-gray-600">License Number</label>
                    <input
                      type="text"
                      name="licenseNumber"
                      value={formData.licenseNumber}
                      onChange={handleChange}
                      className="w-full p-3 border rounded-lg mt-1"
                    />
                  </div>
                  <div>
                    <label className="text-sm text-gray-600">Vehicle Type</label>
                    <input
                      type="text"
                      name="vehicleType"
                      value={formData.vehicleType}
                      onChange={handleChange}
                      className="w-full p-3 border rounded-lg mt-1"
                    />
                  </div>
                  <div>
                    <label className="text-sm text-gray-600">Vehicle Model</label>
                    <input
                      type="text"
                      name="vehicleModel"
                      value={formData.vehicleModel}
                      onChange={handleChange}
                      className="w-full p-3 border rounded-lg mt-1"
                    />
                  </div>
                </div>
                <div className="mt-10 flex justify-center space-x-6">
                  <button
                    type="button"
                    className="px-6 py-3 bg-red-600 text-white rounded-lg shadow hover:bg-red-400 transition"
                    onClick={() => navigateTo ? navigateTo('profile') : window.history.back()}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition"
                  >
                    Save Changes
                  </button>
                </div>
              </>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}
