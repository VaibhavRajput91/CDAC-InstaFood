import React from 'react'
import ProfileAvatar from '../../../components/common/ProfileAvatar/ProfileAvatar'
import UserDetails from '../../../components/restaurant/UserDetails/UserDetails'
import Navbar from '../../../components/common/Navbar/Navbar'
import { useNavigate } from 'react-router-dom';
function RestaurantProfile() {
     const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-4xl mx-auto py-10 px-4 sm:px-6 lg:px-8">
        <div className="bg-white shadow rounded-lg overflow-hidden">

          
          <div className="bg-white p-6 flex flex-col items-center border-b border-gray-200">
            <div className="mb-4">
              <ProfileAvatar />
            </div>
          </div>

          
          <div className="p-6">
            <UserDetails />

            
            <div className="mt-8 flex justify-around">
                    <button onClick={() => navigate('/restaurant/revenue')}className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700">
                      Revenue
                    </button>

                    <button  onClick={() => navigate('/restaurant/edit-profile')}className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700">
                      Edit Profile
                    </button>

                    <button  onClick={() => navigate("/restaurant/Orders")}className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700">
                      Order History
                    </button>
              </div>

          </div>
        </div>
      </div>
    </div>
  )
}

export default RestaurantProfile
