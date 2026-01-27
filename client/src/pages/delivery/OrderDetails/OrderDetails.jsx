import { ArrowLeft, MapPin, Phone, Navigation, Clock, Package } from 'lucide-react';

export function OrderDetails({ navigateTo, orderId }) {
  const orderItems = [
    { name: 'Margherita Pizza (Large)', quantity: 1, price: 349 },
    { name: 'Garlic Bread', quantity: 2, price: 99 },
    { name: 'Coke (750ml)', quantity: 1, price: 45 }
  ];

  const itemTotal = 493;
  const deliveryFee = 30;
  const taxes = 25;
  const total = 548;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 p-4 sticky top-0 z-10">
        <div className="flex items-center gap-3">
          <button onClick={() => navigateTo('orders')}>
            <ArrowLeft className="w-6 h-6 text-gray-700" />
          </button>
          <div className="flex-1">
            <h1 className="text-xl">Order Details</h1>
            <p className="text-sm text-gray-500">Order #{orderId}</p>
          </div>
          <div className="bg-orange-100 text-orange-700 px-3 py-1 rounded-full text-sm">
            New
          </div>
        </div>
      </div>

      {/* Map Preview */}
      <div className="relative h-64 bg-gradient-to-br from-blue-100 to-blue-200">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <MapPin className="w-12 h-12 text-blue-600 mx-auto mb-2" />
            <p className="text-sm text-gray-600">Map Preview</p>
            <p className="text-xs text-gray-500">1.2 km · 15 min</p>
          </div>
        </div>

        {/* Route Info Overlay */}
        <div className="absolute bottom-4 left-4 right-4 bg-white rounded-2xl p-4 shadow-lg">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                <MapPin className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Pickup</p>
                <p className="text-gray-900">Pizza Palace</p>
              </div>
            </div>
          </div>

          <div className="h-px bg-gray-200 my-2"></div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
              <MapPin className="w-5 h-5 text-orange-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Drop</p>
              <p className="text-gray-900">123 Main St, Apartment 4B</p>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 space-y-4">
        {/* Customer Info */}
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 mb-1">Customer</p>
              <p className="text-gray-900">Rahul Sharma</p>
              <p className="text-sm text-gray-500">+91 98765 43210</p>
            </div>
            <button className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center hover:bg-green-600 transition-colors">
              <Phone className="w-5 h-5 text-white" />
            </button>
          </div>
        </div>

        {/* Order Items */}
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
          <div className="flex items-center gap-2 mb-4">
            <Package className="w-5 h-5 text-gray-700" />
            <h3 className="text-gray-900">Order Items</h3>
          </div>

          <div className="space-y-3">
            {orderItems.map((item, index) => (
              <div key={index} className="flex items-start justify-between">
                <div className="flex-1">
                  <p className="text-gray-900">{item.name}</p>
                  <p className="text-sm text-gray-500">
                    Qty: {item.quantity}
                  </p>
                </div>
                <p className="text-gray-900">₹{item.price}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Price Breakdown */}
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
          <h3 className="text-gray-900 mb-4">Price Breakdown</h3>

          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600">Item Total</span>
              <span className="text-gray-900">₹{itemTotal}</span>
            </div>

            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600">Delivery Fee</span>
              <span className="text-gray-900">₹{deliveryFee}</span>
            </div>

            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600">Taxes & Charges</span>
              <span className="text-gray-900">₹{taxes}</span>
            </div>

            <div className="h-px bg-gray-200 my-2"></div>

            <div className="flex items-center justify-between">
              <span className="text-gray-900">Total</span>
              <span className="text-gray-900 text-lg">₹{total}</span>
            </div>
          </div>
        </div>

        {/* Delivery Payout */}
        <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-2xl p-4 text-white">
          <p className="text-green-100 text-sm mb-1">Your Earnings</p>
          <p className="text-3xl">₹45</p>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 pb-4">
          <button className="flex-1 bg-white border-2 border-orange-500 text-orange-500 py-4 rounded-2xl hover:bg-orange-50 transition-colors">
            Reject
          </button>
          <button className="flex-1 bg-orange-500 text-white py-4 rounded-2xl hover:bg-orange-600 transition-colors flex items-center justify-center gap-2">
            <Navigation className="w-5 h-5" />
            Accept & Navigate
          </button>
        </div>
      </div>
    </div>
  );
}
