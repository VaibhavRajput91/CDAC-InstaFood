import React, { useState } from "react";
import Navbar from "../../../components/common/Navbar/Navbar";
import ProfileAvatar from "../../../components/common/ProfileAvatar/ProfileAvatar";
import { useNavigate } from "react-router-dom";

function RestaurantEditProfile() {
  const navigate = useNavigate();

  
  const [formData, setFormData] = useState({
    ownerName: "John Doe",
    restaurantName: "Sunshine",
    email: "johndoe@email.com",
    phone: "9876543210",
    city: "Pune",
    address: "Sunbeam Infotech Pvt. Ltd."
  });

  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Submit Handler
  const handleSave = () => {
    console.log("Updated Profile:", formData);

    // Later save to backend API ...
    {/*alert("Profile updated!");*/}

    {/*navigate("/restaurant/profile");*/}
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-4xl mx-auto py-10 px-4 sm:px-6 lg:px-8">
        <div className="bg-white shadow rounded-lg overflow-hidden">

          
          <div className="bg-white p-6 flex flex-col items-center border-b border-gray-200">
            <ProfileAvatar />
            <h2 className="text-xl font-bold text-gray-900 mt-4">Edit Profile</h2>
          </div>

         
          <div className="p-6">

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

              
              <div>
                <label className="text-sm text-gray-600">Owner Name</label>
                <input
                  type="text"
                  name="ownerName"
                  value={formData.ownerName}
                  onChange={handleChange}
                  className="w-full p-3 border rounded-lg mt-1"
                />
              </div>

              
              <div>
                <label className="text-sm text-gray-600">Restaurant Name</label>
                <input
                  type="text"
                  name="restaurantName"
                  value={formData.restaurantName}
                  onChange={handleChange}
                  className="w-full p-3 border rounded-lg mt-1"
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
                />
              </div>

              
              <div>
                <label className="text-sm text-gray-600">Phone</label>
                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full p-3 border rounded-lg mt-1"
                />
              </div>

              
              <div>
                <label className="text-sm text-gray-600">City</label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  className="w-full p-3 border rounded-lg mt-1"
                />
              </div>

              
              <div className="md:col-span-2">
                <label className="text-sm text-gray-600">Address</label>
                <textarea
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  rows="3"
                  className="w-full p-3 border rounded-lg mt-1 resize-none"
                ></textarea>
              </div>
            </div>

           
            <div className="mt-10 flex justify-around">

              <button
                className="px-6 py-3 bg-red-600 text-white rounded-lg shadow hover:bg-red-400 transition"
                onClick={() => navigate("/restaurant/profile")}
              >
                Cancel
              </button>

              <button
                className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition"
                onClick={handleSave}
              >
                Save Changes
              </button>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default RestaurantEditProfile;
