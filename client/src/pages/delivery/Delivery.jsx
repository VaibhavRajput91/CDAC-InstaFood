import React from 'react'
import { Outlet, Route } from "react-router-dom";
import Navbar from '../../components/common/Navbar/Navbar';
import Wallet from './Wallet/Wallet';
import Dashboard from "./Dashboard/Dashboard";
import OrderHistory from './OrderHistory/OrderHistory';
import OrderDetails from './OrderDetails/OrderDetails';
import Profile from './Profile/Profile';
import EditProfile from './EditProfile/EditProfile';
import ContactUs from '../common/ContactUs/ContactUs';
import { Route, Routes } from 'react-router-dom';

function Delivery() {
  return (
    <div className="w-full h-screen flex flex-col">
      <Navbar />

      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/wallet" element={<Wallet />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/order-history" element={<OrderHistory />} />
        <Route path="/order-details" element={<OrderDetails />} />
        <Route path="/edit-profile" element={<EditProfile />} />
      </Routes>

      {/* Other pages will render here */}
      <div className="flex-1 overflow-y-auto bg-gray-100 p-4">
        <ContactUs />
      </div>
    </div>
  )
}

export default Delivery
