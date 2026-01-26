import React from 'react'
import Navbar from '../../components/common/Navbar/Navbar';
import { Route, Routes, Navigate } from 'react-router-dom';
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
    <div>


      <Routes>
        <Route
          path="/"
          element={<Navigate to="statistics" />}
        />
        <Route path="/statistics" element={<RestaurantDashboard />} />
        <Route path="/apply" element={<Apply />} />
        <Route path="/order-details" element={<RestaurantOrderDetails />} />
        <Route path="/orders" element={<RestaurantOrders />} />
        <Route path="/profile" element={<RestaurantProfile />} />
        <Route path="/edit-profile" element={<RestaurantEditProfile />} />
        <Route path="/menu/dishes" element={<ManageMenu />} />
        <Route path="/revenue" element={<Revenue />} />
        <Route path="/add-dish" element={<AddDish />} />
      </Routes>


    </div>
  )
}

export default Restaurant
