import { useState } from 'react';
import { ArrowLeft, MapPin, Clock, DollarSign, Package } from 'lucide-react';
import { BottomNav } from '../../../components/delivery/BottomNav';

const ordersData = {
  new: [
    {
      id: '1',
      restaurant: 'Pizza Palace',
      distance: '1.2 km',
      time: '15 min',
      payout: 45,
      items: 2,
      address: '123 Main St'
    },
    {
      id: '2',
      restaurant: 'Burger King',
      distance: '2.5 km',
      time: '20 min',
      payout: 65,
      items: 3,
      address: '456 Oak Ave'
    }
  ],
  ongoing: [
    {
      id: '3',
      restaurant: 'Sushi House',
      distance: '0.8 km',
      time: '10 min',
      payout: 38,
      items: 1,
      address: '789 Pine Rd',
      status: 'Picked up'
    }
  ],
  completed: [
    {
      id: '4',
      restaurant: 'Taco Bell',
      distance: '1.5 km',
      time: '18 min',
      payout: 52,
      items: 2,
      address: '321 Elm St',
      completedAt: '2:45 PM'
    },
    {
      id: '5',
      restaurant: 'KFC',
      distance: '3.2 km',
      time: '25 min',
      payout: 78,
      items: 4,
      address: '654 Maple Dr',
      completedAt: '1:30 PM'
    }
  ]
};

export function OrdersList({ navigateTo }) {
  const [activeTab, setActiveTab] = useState('new');

  const orders = ordersData[activeTab];

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 p-4 sticky top-0 z-10">
        <div className="flex items-center gap-3 mb-4">
          <button onClick={() => navigateTo('dashboard')}>
            <ArrowLeft className="w-6 h-6 text-gray-700" />
          </button>
          <h1 className="text-xl">Orders</h1>
        </div>

        {/* Tabs */}
        <div className="flex gap-2">
          <button
            onClick={() => setActiveTab('new')}
            className={`flex-1 py-3 rounded-xl transition-colors ${
              activeTab === 'new'
                ? 'bg-orange-500 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            New ({ordersData.new.length})
          </button>

          <button
            onClick={() => setActiveTab('ongoing')}
            className={`flex-1 py-3 rounded-xl transition-colors ${
              activeTab === 'ongoing'
                ? 'bg-orange-500 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            Ongoing ({ordersData.ongoing.length})
          </button>

          <button
            onClick={() => setActiveTab('completed')}
            className={`flex-1 py-3 rounded-xl transition-colors ${
              activeTab === 'completed'
                ? 'bg-orange-500 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            Completed ({ordersData.completed.length})
          </button>
        </div>
      </div>

      {/* Orders List */}
      <div className="p-4 space-y-3">
        {orders.length === 0 ? (
          <div className="text-center py-12">
            <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">
              No {activeTab} orders
            </p>
          </div>
        ) : (
          orders.map((order) => (
            <div
              key={order.id}
              onClick={() =>
                navigateTo('order-details', order.id)
              }
              className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 cursor-pointer hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <h3 className="text-gray-900 mb-1">
                    {order.restaurant}
                  </h3>

                  <div className="flex items-center gap-1 text-sm text-gray-500 mb-1">
                    <MapPin className="w-4 h-4" />
                    <span className="truncate">
                      {order.address}
                    </span>
                  </div>

                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <div className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      {order.distance}
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {order.time}
                    </div>
                  </div>
                </div>

                <div className="text-right">
                  <div className="flex items-center gap-1 text-green-600 mb-1">
                    <DollarSign className="w-4 h-4" />
                    <span className="text-lg">
                      ₹{order.payout}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500">
                    {order.items} items
                  </p>
                </div>
              </div>

              {activeTab === 'ongoing' && (
                <div className="bg-blue-50 text-blue-700 py-2 px-3 rounded-xl text-sm">
                  Status: {order.status}
                </div>
              )}

              {activeTab === 'completed' && (
                <div className="text-sm text-gray-500">
                  Completed at {order.completedAt}
                </div>
              )}

              {activeTab === 'new' && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    navigateTo('order-details', order.id);
                  }}
                  className="w-full bg-orange-500 text-white py-3 rounded-xl hover:bg-orange-600 transition-colors mt-3"
                >
                  View Details
                </button>
              )}
            </div>
          ))
        )}
      </div>

      <BottomNav
        currentScreen="orders"
        navigateTo={navigateTo}
      />
    </div>
  );
}
