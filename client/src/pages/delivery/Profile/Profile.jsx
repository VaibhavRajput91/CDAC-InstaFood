import {
  ArrowLeft,
  Camera,
  MapPin,
  Edit,
  ChevronRight,
  Bike
} from 'lucide-react';

import { useEffect, useState } from 'react';
import { BottomNav } from '../../../components/delivery/BottomNav'
import { Navigate } from 'react-router-dom';

export function Profile({ navigateTo }) {
  const [details, setDetails] = useState(null);
  useEffect(() => {
    fetch('http://localhost:8080/delivery/details?id=7')
      .then(res => res.json())
      .then(data => setDetails(data))
      .catch(() => setDetails(null));
  }, []);

  if (!details) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <span className="text-gray-500 text-lg">Loading profile...</span>
      </div>
    );
  }

  const { id, firstName, lastName, email, phoneNumber, licenseNumber, vehicleDetails, address } = details;
  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button onClick={() => navigateTo('dashboard')}>
              <ArrowLeft className="w-6 h-6 text-gray-700" />
            </button>
            <h1 className="text-xl">Profile</h1>
          </div>
          <button className="text-orange-500 text-sm">
            Logout
          </button>
        </div>
      </div>

      {/* Profile Header */}
      <div className="bg-white p-6 mb-4">
        <div className="flex items-start gap-4 mb-6">
          <div className="relative">
            <div className="w-24 h-24 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full flex items-center justify-center text-white text-3xl">
              {firstName?.[0]}{lastName?.[0]}
            </div>
            <button className="absolute bottom-0 right-0 w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center text-white shadow-lg">
              <Camera className="w-4 h-4" />
            </button>
          </div>

          <div className="flex-1">
            <h2 className="text-2xl mb-1">{firstName} {lastName}</h2>
            <p className="text-gray-500 mb-2">+91 {phoneNumber}</p>
            <p className="text-gray-500 mb-2">{email}</p>
          </div>
        </div>

        <button
          className="w-full bg-orange-500 text-white py-3 rounded-2xl hover:bg-orange-600 transition-colors flex items-center justify-center gap-2"
          onClick={() => navigateTo('edit-profile')}
        >
          <Edit className="w-5 h-5" />
          Edit Profile
        </button>
      </div>

      {/* Vehicle Details */}
      <div className="bg-white p-4 mb-4">
        <div className="flex items-center gap-2 mb-4">
          <Bike className="w-5 h-5 text-gray-700" />
          <h3 className="text-gray-900">Rider Details</h3>
        </div>
        <div className="space-y-3">
          <div className="flex items-center justify-between py-2">
            <span className="text-gray-600">Vehicle Type</span>
            <span className="text-gray-900">{vehicleDetails?.vehicleType}</span>
          </div>
          <div className="flex items-center justify-between py-2">
            <span className="text-gray-600">Model</span>
            <span className="text-gray-900">{vehicleDetails?.vehicleModel}</span>
          </div>
          <div className="flex items-center justify-between py-2">
            <span className="text-gray-600">License</span>
            <span className="text-gray-900">{licenseNumber}</span>
          </div>
        </div>
      </div>

      {/* Address Details */}
      <div className="bg-white p-4 mb-4">
        <div className="flex items-center gap-2 mb-4">
          <MapPin className="w-5 h-5 text-gray-700" />
          <h3 className="text-gray-900">Address Details</h3>
        </div>
        <div className="space-y-3">
          <div className="flex items-center justify-between py-2">
            <span className="text-gray-600">Line 1</span>
            <span className="text-gray-900">{address?.lineOne}</span>
          </div>
          <div className="flex items-center justify-between py-2">
            <span className="text-gray-600">Line 2</span>
            <span className="text-gray-900">{address?.lineOne}</span>
          </div>
          <div className="flex items-center justify-between py-2">
            <span className="text-gray-600">City</span>
            <span className="text-gray-900">{address?.city}</span>
          </div>
          <div className="flex items-center justify-between py-2">
            <span className="text-gray-600">Postal Code</span>
            <span className="text-gray-900">{address?.postalCode}</span>
          </div>
          <div className="flex items-center justify-between py-2">
            <span className="text-gray-600">State</span>
            <span className="text-gray-900">{address?.state}</span>
          </div>
          
        </div>
      </div>

      {/* Account Settings */}
      <div className="bg-white p-4 mb-4">
        <div className="space-y-1">
          <button
            onClick={() => navigateTo('settings')}
            className="w-full flex items-center justify-between py-4 hover:bg-gray-50 rounded-xl px-2 transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center">
                <Edit className="w-5 h-5 text-purple-600" />
              </div>
              <span className="text-gray-900">App Settings</span>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-400" />
          </button>
        </div>
      </div>


      <BottomNav
        currentScreen="profile"
        navigateTo={navigateTo}
      />
    </div>
  );
}
