import React from 'react'
import Navbar from '../../../components/common/Navbar/Navbar';
import { useNavigate } from 'react-router-dom';
function RestaurantOrderDetails() {

   const navigate = useNavigate();
    const order = {
    orderId: "ORD12345",
    customerName: "Vivek Singh",
    price: 750,
    contact: "9876543210",
    address: "Flat 402, Green Valley Apartments, Pune, Maharashtra",
    items: [
      { name: "Pizza", qty: 1 },
      { name: "Burger", qty: 2 },
      { name: "French Fries", qty: 1 },
    ],
  };

  return (
    <div className="min-h-screen w-full bg-blue-50 flex flex-col overflow-hidden">

      <Navbar />

      <div className="flex-grow w-full flex justify-center items-start py-10 px-4">

        <div className="w-full max-w-3xl bg-white shadow-lg rounded-2xl p-8 border border-gray-300">

          <h1 className="text-3xl font-bold text-center mb-6 text-gray-900">
            Order Details
          </h1>

          {/* ---- ORDER BASIC INFO ---- */}
          <div className="space-y-4 border-b pb-6">

            <div className="flex justify-between text-lg">
              <span className="font-semibold text-gray-700">Order ID:</span>
              <span className="text-gray-900">{order.orderId}</span>
            </div>

            <div className="flex justify-between text-lg">
              <span className="font-semibold text-gray-700">Customer Name:</span>
              <span className="text-gray-900">{order.customerName}</span>
            </div>

            <div className="flex justify-between text-lg">
              <span className="font-semibold text-gray-700">Total Price:</span>
              <span className="font-bold text-gray-900">₹{order.price}</span>
            </div>

            <div className="flex justify-between text-lg">
              <span className="font-semibold text-gray-700">Contact:</span>
              <span className="text-gray-900">{order.contact}</span>
            </div>

            {/* ---- DELIVERY ADDRESS ---- */}
            <div className="flex justify-between text-lg">
              <span className="font-semibold text-gray-700">Delivery Address:</span>
              <span className="text-gray-900 text-right w-1/2">
                {order.address}
              </span>
            </div>

          </div>

          {/* ---- ORDER ITEMS ---- */}
          <div className="mt-6">

            <h2 className="text-xl font-semibold text-gray-800 mb-3">Items</h2>

            <div className="space-y-3">
              {order.items.map((item, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center bg-gray-50 p-3 rounded-lg border"
                >
                  <span className="text-gray-800 font-medium">{item.name}</span>

                  <div className="w-10 h-10 bg-blue-200 text-blue-900 rounded-full flex items-center justify-center font-semibold">
                    {item.qty}x
                  </div>
                </div>
              ))}
            </div>

          </div>

          {/* ---- BUTTONS ---- */}
          <div className="flex justify-center gap-8 mt-10">

            <button
              className="px-8 py-2 bg-green-600 text-white font-semibold rounded-full shadow hover:bg-green-700"
              onClick={() => navigate("/restaurant/Orders")}
            >
              Accept
            </button>

            <button
              className="px-8 py-2 bg-red-600 text-white font-semibold rounded-full shadow hover:bg-red-700"
              onClick={() => navigate("/restaurant/Orders")}
            >
              Reject
            </button>

          </div>

        </div>
      </div>
    </div>
  )
}

export default RestaurantOrderDetails