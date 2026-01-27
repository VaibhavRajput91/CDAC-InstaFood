import { useState } from 'react';
import { ArrowLeft, Filter, DollarSign, MapPin, Clock, X } from 'lucide-react';
import { BottomNav } from '../../../components/delivery/BottomNav';

const historyData = [
  {
    id: '1',
    date: 'Today',
    orders: [
      {
        id: 'ORD001',
        restaurant: 'Pizza Palace',
        distance: '1.2 km',
        time: '2:45 PM',
        earnings: 45,
        status: 'completed'
      },
      {
        id: 'ORD002',
        restaurant: 'Burger King',
        distance: '2.5 km',
        time: '1:30 PM',
        earnings: 65,
        status: 'completed'
      }
    ]
  },
  {
    id: '2',
    date: 'Yesterday',
    orders: [
      {
        id: 'ORD003',
        restaurant: 'Sushi House',
        distance: '0.8 km',
        time: '8:15 PM',
        earnings: 38,
        status: 'completed'
      },
      {
        id: 'ORD004',
        restaurant: 'Taco Bell',
        distance: '1.5 km',
        time: '6:45 PM',
        earnings: 0,
        status: 'cancelled'
      },
      {
        id: 'ORD005',
        restaurant: 'KFC',
        distance: '3.2 km',
        time: '3:20 PM',
        earnings: 78,
        status: 'completed'
      }
    ]
  },
  {
    id: '3',
    date: 'Dec 6, 2024',
    orders: [
      {
        id: 'ORD006',
        restaurant: 'Subway',
        distance: '1.8 km',
        time: '7:30 PM',
        earnings: 55,
        status: 'completed'
      },
      {
        id: 'ORD007',
        restaurant: 'Dominos',
        distance: '2.1 km',
        time: '5:15 PM',
        earnings: 48,
        status: 'returned'
      }
    ]
  }
];

export function OrderHistory({ navigateTo }) {
  const [filter, setFilter] = useState('all');
  const [showFilters, setShowFilters] = useState(false);

  const getFilteredOrders = () => {
    if (filter === 'all') return historyData;

    return historyData
      .map((day) => ({
        ...day,
        orders: day.orders.filter(
          (order) => order.status === filter
        )
      }))
      .filter((day) => day.orders.length > 0);
  };

  const filteredData = getFilteredOrders();

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-700';
      case 'cancelled':
        return 'bg-red-100 text-red-700';
      case 'returned':
        return 'bg-orange-100 text-orange-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 p-4 sticky top-0 z-10">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <button onClick={() => navigateTo('dashboard')}>
              <ArrowLeft className="w-6 h-6 text-gray-700" />
            </button>
            <h1 className="text-xl">Order History</h1>
          </div>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-xl hover:bg-gray-200 transition-colors"
          >
            <Filter className="w-5 h-5" />
            <span className="text-sm">Filter</span>
          </button>
        </div>

        {/* Filter Options */}
        {showFilters && (
          <div className="bg-gray-50 rounded-2xl p-4 space-y-2">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-700">
                Filter by Status
              </span>
              <button onClick={() => setShowFilters(false)}>
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => setFilter('all')}
                className={`py-2 px-3 rounded-xl text-sm transition-colors ${
                  filter === 'all'
                    ? 'bg-orange-500 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
              >
                All Orders
              </button>

              <button
                onClick={() => setFilter('completed')}
                className={`py-2 px-3 rounded-xl text-sm transition-colors ${
                  filter === 'completed'
                    ? 'bg-orange-500 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
              >
                Completed
              </button>

              <button
                onClick={() => setFilter('cancelled')}
                className={`py-2 px-3 rounded-xl text-sm transition-colors ${
                  filter === 'cancelled'
                    ? 'bg-orange-500 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
              >
                Cancelled
              </button>

              <button
                onClick={() => setFilter('returned')}
                className={`py-2 px-3 rounded-xl text-sm transition-colors ${
                  filter === 'returned'
                    ? 'bg-orange-500 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
              >
                Returned
              </button>
            </div>
          </div>
        )}
      </div>

      {/* History List */}
      <div className="p-4">
        {filteredData.map((day) => (
          <div key={day.id} className="mb-6">
            <h3 className="text-sm text-gray-500 mb-3 px-2">
              {day.date}
            </h3>

            <div className="space-y-3">
              {day.orders.map((order) => (
                <div
                  key={order.id}
                  className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="text-gray-900">
                          {order.restaurant}
                        </h4>
                        <span
                          className={`text-xs px-2 py-1 rounded-full ${getStatusColor(
                            order.status
                          )}`}
                        >
                          {order.status}
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
                      {order.status === 'completed' && (
                        <div className="flex items-center gap-1 text-green-600">
                          <DollarSign className="w-4 h-4" />
                          <span className="text-lg">
                            ₹{order.earnings}
                          </span>
                        </div>
                      )}
                      <p className="text-xs text-gray-500">
                        #{order.id}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <BottomNav
        currentScreen="history"
        navigateTo={navigateTo}
      />
    </div>
  );
}
