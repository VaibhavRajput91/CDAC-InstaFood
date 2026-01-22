import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import './CustomerOrderSummary.css';
import CustomerNavbar from '../../../components/customer/CustomerNavbar/CustomerNavbar';

// Mock Data for Address
const MOCK_ADDRESS = {
  street: '123, Foodie Lane',
  city: 'Flavor Town',
  zip: '400001',
  state: 'Maharashtra',
};

function CustomerOrderSummary() {
  const location = useLocation();
  
  
  const [orderItems] = useState(location.state?.orderItems || []);
  const [address] = useState(MOCK_ADDRESS); 



  // Calculate Total Bill
  const totalBill = orderItems.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <div className="min-h-screen bg-orange-50 font-sans">
      <CustomerNavbar />
      
      <div className="py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          
          <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">Order Summary</h1>

          <div className="bg-white rounded-xl shadow-sm border border-orange-100 overflow-hidden">
            
            {/* Order Items Section */}
            <div className="p-6 border-b border-orange-100">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Your Order</h2>
              <div className="space-y-4">
                {orderItems.map((item) => (
                  <div key={item.id} className="flex justify-between items-center">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center text-orange-600 font-bold text-sm">
                        {item.quantity}x
                      </div>
                      <span className="text-gray-700 font-medium">{item.name}</span>
                    </div>
                    <span className="text-gray-900 font-bold">₹{item.price * item.quantity}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Address Section */}
            <div className="p-6 border-b border-orange-100 bg-orange-50/30">
              <h2 className="text-xl font-semibold text-gray-800 mb-2">Delivery Address</h2>
              <div className="text-gray-600 bg-white p-4 rounded-lg border border-orange-100 shadow-sm">
                <p>{address.street}</p>
                <p>{address.city}, {address.state} - {address.zip}</p>
              </div>
            </div>

            {/* Total Bill Section */}
            <div className="p-6 bg-orange-50/50">
              <div className="flex justify-between items-center mb-6">
                <span className="text-xl font-bold text-gray-800">Total Bill Amount</span>
                <span className="text-2xl font-bold text-orange-600">₹{totalBill}</span>
              </div>

              {/* Place Order Button */}
              <button 
                className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-4 px-6 rounded-lg shadow-lg hover:shadow-green-600/30 transition-all duration-300 transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 text-lg"
              >
                Place Order
              </button>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

export default CustomerOrderSummary;
