import React from 'react'
import Navbar from '../../../components/common/Navbar/Navbar';

function RestaurantOrders() {

  const orders = [
    {
      id: "ORD1021",
      date: "12 Jan 2025",
      customer: "Tina Sharma",
      address: " ",
      items: [
        { name: "Pizza", qty: 2 },
        { name: "Burger", qty: 1 }
      ],
      total: 620,
      status: "Accepted",
    },
    {
      id: "ORD1022",
      date: "13 Jan 2025",
      customer: "Minal Kohli",
      address: " ",
      items: [
        { name: "Pasta", qty: 1 },
        { name: "Coke", qty: 2 }
      ],
      total: 340,
      status: "Cancelled",
    },
    {
      id: "ORD1023",
      date: "14 Jan 2025",
      customer: "Rohit Yadav",
      address: " ",
      items: [
        { name: "Veg Biryani", qty: 1 },
        { name: "Gulab Jamun", qty: 4 }
      ],
      total: 450,
      status: "Accepted",
    },
    {
      id: "ORD1024",
      date: "15 Jan 2025",
      customer: "D Siya",
      address: " ",
      items: [
        { name: "Margherita Pizza", qty: 1 }
      ],
      total: 320,
      status: "Accepted",
    },
    {
      id: "ORD1025",
      date: "16 Jan 2025",
      customer: "D Rahul",
      address: " ",
      items: [
        { name: "Frankie", qty: 2 },
        { name: "Brownie", qty: 1 }
      ],
      total: 410,
      status: "Cancelled",
    },
    {
      id: "ORD1026",
      date: "17 Jan 2025",
      customer: "Mohit Kumar",
      address: " ",
      items: [
        { name: "Sandwich", qty: 2 }
      ],
      total: 180,
      status: "Accepted",
    }
  ];

  return (
    <div className="min-h-screen w-full bg-gray-50 flex flex-col">
      
      
      <Navbar />

      
      <h1 className="text-center text-3xl font-bold mt-6 text-gray-800">
        Orders
      </h1>

      {/* Orders Grid */}
      <div className="w-full max-w-6xl mx-auto p-6">
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">

          {orders.map((order, index) => (
            <div
              key={index}
              className={`bg-white p-6 rounded-2xl shadow-md hover:shadow-lg 
              hover:-translate-y-1 transition-all duration-300 
              border-2 ${
                order.status === "Accepted"
                  ? "border-green-500"
                  : "border-red-500"
              }`}
            >
              
              {/* Header */}
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-gray-900">
                  {order.customer}
                </h2>

                <span
                  className={`px-3 py-1 text-xs rounded-full font-semibold ${
                    order.status === "Accepted"
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {order.status}
                </span>
              </div>

              
              <p className="text-xs text-gray-500 mt-1">
                Order ID: <span className="font-semibold">{order.id}</span>
              </p>

              
              <p className="text-xs text-gray-500 -mt-1">
                Date: <span className="font-semibold">{order.date}</span>
              </p>

             
              <p className="text-xs text-gray-600 mt-1 mb-3">
                Delivery Address: <span className="font-medium">{order.address}</span>
              </p>

              
              <div className="my-3 border-t border-gray-200"></div>

              
              <p className="font-semibold text-gray-700 mb-2 text-sm">
                Ordered Items
              </p>

              <div className="space-y-2">
                {order.items.map((item, i) => (
                  <div
                    key={i}
                    className="flex justify-between bg-gray-50 rounded-lg px-3 py-2 
                    border border-gray-200"
                  >
                    <span className="text-gray-800">{item.name}</span>
                    <span className="font-semibold text-gray-900">{item.qty}x</span>
                  </div>
                ))}
              </div>

              
              <p className="mt-5 text-lg font-extrabold text-gray-900">
                Total: <span className="text-orange-600">₹{order.total}</span>
              </p>

            </div>
          ))}

        </div>
      </div>
    </div>
  )
}

export default RestaurantOrders
