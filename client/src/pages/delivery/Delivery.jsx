import React from 'react'
import { Outlet } from "react-router-dom";
import Navbar from '../../components/common/Navbar/Navbar';
import Wallet from './Wallet/Wallet';
import Dashboard from "./Dashboard/Dashboard";
import OrderHistory from './OrderHistory/OrderHistory';
import OrderDetails from './OrderDetails/OrderDetails';
import Profile from './Profile/Profile';
import EditProfile from './EditProfile/EditProfile';
import ContactUs from '../common/ContactUs/ContactUs';

function Delivery() {
  return (
    <div className="w-full h-screen flex flex-col">
      <Navbar />

      {/* other pages */}
      {/* <Dashboard />
      <Profile />
      <EditProfile />
      <Wallet />
      <OrderHistory /> 
      <OrderDetails /> */}

      {/* Other pages will render here */}
      <div className="flex-1 overflow-y-auto bg-gray-100 p-4">
        <ContactUs />
      </div>
    </div>
  )
}

export default Delivery
