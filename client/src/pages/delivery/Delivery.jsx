import React from 'react'
import { Outlet } from "react-router-dom";
import Navbar from '../../components/common/Navbar/Navbar';
import Wallet from './Wallet/Wallet';

function Delivery() {
  return (
    <div className="w-full h-screen flex flex-col">
      <Navbar />
      <Wallet />

      {/* Other pages will render here */}
      <div className="flex-1 overflow-y-auto bg-gray-100 p-4">
      </div>
    </div>
  )
}

export default Delivery
