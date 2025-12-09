import React from 'react'
import Navbar from '../../components/common/Navbar/Navbar';
import { Route, Routes } from 'react-router-dom';
import RestaurantDashboard from './RestaurantDashboard/RestaurantDashboard';
import Apply from './Apply/Apply';
import RestaurantOrderDetails from './RestaurantOrderDetails/RestaurantOrderDetails';
import RestaurantOrders from './RestaurantOrders/RestaurantOrders';
import RestaurantProfile from './RestaurantProfile/RestaurantProfile'
import RestaurantEditProfile from './RestaurantEditProfile/RestaurantEditProfile'
import ManageMenu from './ManageMenu/ManageMenu';
import Revenue from './Revenue/Revenue';
import AddDish from './AddDish/AddDish';

function Restaurant() {
  return (
    <div className="w-full h-screen flex flex-col">
      {/* <Navbar /> */}

      <Routes>
        <Route path="/" element={<RestaurantDashboard />} />
        <Route path="/apply" element={<Apply />} />
        <Route path="/order-details" element={<RestaurantOrderDetails />} />
        <Route path="/orders" element={<RestaurantOrders />} />
        <Route path="/profile" element={<RestaurantProfile />} />
        <Route path="/edit-profile" element={<RestaurantEditProfile />} />
        <Route path="/menu" element={<ManageMenu />} />
        <Route path="/revenue" element={<Revenue />} />
        <Route path="/add-dish" element={<AddDish />} />
      </Routes>

      {/* Other pages will render here */}
      <div className="flex-1 overflow-y-auto bg-gray-100 p-4">
        {/* <ContactUs /> */}
      </div>
    </div>
  )
}

export default Restaurant
