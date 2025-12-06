import React from 'react'
import Navbar from '../../../components/common/Navbar/Navbar'
function RestaurantDashboard() {
  return (
    <div>
      <div className="min-h-screen bg-white">

        {/* NAVBAR */}
        <Navbar />

        {/* SEARCH BAR */}
        <h1 className="text-center text-3xl font-bold mt-8 text-gray-800">
          Orders
        </h1>

        {/* FIRST ROW (3 CARDS) */}
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 mt-10 p-4">

          {/* ORDER 1 */}
          <div className="border bg-orange-50 shadow-lg rounded-2xl p-4 hover:shadow-xl transition">
            <div className="h-40 bg-orange-200 rounded-xl"></div>

            <div className="mt-4 space-y-1 text-gray-700">
              <p><b>Item:</b> Paneer Butter Masala</p>
              <p><b>Quantity:</b> 2</p>
              <p><b>Description:</b> Creamy paneer gravy</p>
              <p><b>Total Amount:</b> ₹480</p>
              <p><b>Delivery Address:</b> </p>
              <p><b>Status:</b> Pending</p>
            </div>

            <div className="flex justify-center gap-4 mt-4">
              <button className="px-6 py-2 border rounded-full bg-green-100 hover:bg-green-200">
                Accept
              </button>
              <button className="px-6 py-2 border rounded-full bg-red-100 hover:bg-red-200">
                Reject
              </button>
            </div>
          </div>

          {/* ORDER 2 */}
          <div className="border bg-blue-50 shadow-lg rounded-2xl p-4 hover:shadow-xl transition">
            <div className="h-40 bg-blue-200 rounded-xl"></div>

            <div className="mt-4 space-y-1 text-gray-700">
              <p><b>Item:</b> Veg Biryani</p>
              <p><b>Quantity:</b> 1</p>
              <p><b>Description:</b> Spicy aromatic biryani</p>
              <p><b>Total Amount:</b> ₹250</p>
              <p><b>Delivery Address:</b> </p>
              <p><b>Status:</b> Pending</p>
            </div>

            <div className="flex justify-center gap-4 mt-4">
              <button className="px-6 py-2 border rounded-full bg-green-100 hover:bg-green-200">
                Accept
              </button>
              <button className="px-6 py-2 border rounded-full bg-red-100 hover:bg-red-200">
                Reject
              </button>
            </div>
          </div>

          {/* ORDER 3 */}
          <div className="border bg-green-50 shadow-lg rounded-2xl p-4 hover:shadow-xl transition">
            <div className="h-40 bg-green-200 rounded-xl"></div>

            <div className="mt-4 space-y-1 text-gray-700">
              <p><b>Item:</b> Masala Dosa</p>
              <p><b>Quantity:</b> 3</p>
              <p><b>Description:</b> Crispy dosa with aloo masala</p>
              <p><b>Total Amount:</b> ₹300</p>
              <p><b>Delivery Address:</b> </p>
              <p><b>Status:</b> Pending</p>
            </div>

            <div className="flex justify-center gap-4 mt-4">
              <button className="px-6 py-2 border rounded-full bg-green-100 hover:bg-green-200">
                Accept
              </button>
              <button className="px-6 py-2 border rounded-full bg-red-100 hover:bg-red-200">
                Reject
              </button>
            </div>
          </div>

        </div>

        {/* SECOND ROW (1 CARD) */}
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 p-4">

          {/* ORDER 4 */}
          <div className="border bg-purple-50 shadow-lg rounded-2xl p-4 hover:shadow-xl transition">
            <div className="h-40 bg-purple-200 rounded-xl"></div>

            <div className="mt-4 space-y-1 text-gray-700">
              <p><b>Item:</b>Margherita Pizza</p>
              <p><b>Quantity:</b> 1</p>
              <p><b>Description:</b> Loaded extra cheese pizza</p>
              <p><b>Total Amount:</b> ₹50</p>
              <p><b>Delivery Address:</b> </p>
              <p><b>Status:</b> Pending</p>
            </div>

            

            <div className="flex justify-center gap-4 mt-4">
              <button className="px-6 py-2 border rounded-full bg-green-100 hover:bg-green-200">
                Accept
              </button>
              <button className="px-6 py-2 border rounded-full bg-red-100 hover:bg-red-200">
                Reject
              </button>
            </div>
          </div>

          {/* Empty placeholders */}
          <div></div>
          <div></div>

        </div>
      </div>
    </div>
  )
}

export default RestaurantDashboard
