import { useState, useEffect } from 'react';
import {
  Menu,
  Bell,
  Package,
  Wallet,
  Clock,
  HeadphonesIcon,
  MapPin,
  DollarSign,
  Navigation
} from 'lucide-react';
import { BottomNav } from '../../../components/delivery/BottomNav';

const availableOrders = [
  {
    id: '1',
    restaurant: 'Pizza Palace',
    distance: '1.2 km',
    time: '15 min',
    payout: 45,
    items: 2
  },
  {
    id: '2',
    restaurant: 'Burger King',
    distance: '2.5 km',
    time: '20 min',
    payout: 65,
    items: 3
  },
  {
    id: '3',
    restaurant: 'Sushi House',
    distance: '0.8 km',
    time: '10 min',
    payout: 38,
    items: 1
  }
];

export function Dashboard({ navigateTo }) {
  const [isOnline, setIsOnline] = useState(false);
  const [loadingStatus, setLoadingStatus] = useState(false);
  const [summary, setSummary] = useState({
    todayOrderStats: {
      todayEarnings: 0,
      todayOrderCount: 0,
      avgOrderPayout: 0
    },
    miscStats: {
      totalEarnings: 0,
      totalOrdersCount: 0
    }
  });

  useEffect(() => {
    fetch('http://localhost:8080/delivery/status?deliveryPartnerId=1')
      .then(res => res.json())
      .then(data => {
        setIsOnline(data.status === 'AVAILABLE');
      })
      .catch(() => {
        setIsOnline(false);
      });

    fetch('http://localhost:8080/delivery/dashboard/summary?deliveryPartnerId=1')
      .then(res => res.json())
      .then(data => {
        setSummary({
          todayOrderStats: {
            todayEarnings: data.todayOrderStats?.todayEarnings ?? 0,
            todayOrderCount: data.todayOrderStats?.todayOrderCount ?? 0,
            avgOrderPayout: data.todayOrderStats?.avgOrderPayout ?? 0
          },
          miscStats: {
            totalEarnings: data.miscStats?.totalEarnings ?? 0,
            totalOrdersCount: data.miscStats?.totalOrdersCount ?? 0
          }
        });
      });
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 p-4">
        <div className="flex items-center justify-between mb-4">
          <button onClick={() => navigateTo('apply')}>
            <Menu className="w-6 h-6 text-gray-700" />
          </button>
          <h1 className="text-xl">Dashboard</h1>
          <button
            onClick={() => navigateTo('notifications')}
            className="relative"
          >
            <Bell className="w-6 h-6 text-gray-700" />
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full text-white text-xs flex items-center justify-center">
              3
            </div>
          </button>
        </div>

        {/* Online/Offline Toggle */}
        <div className="flex items-center justify-between bg-gray-50 rounded-2xl p-4">
          <div>
            <p className="text-sm text-gray-500">Status</p>
            <p
              className={`text-lg ${
                isOnline ? 'text-green-600' : 'text-gray-600'
              }`}
            >
              {isOnline ? 'Online' : 'Offline'}
            </p>
          </div>
          <button
            onClick={async () => {
              setLoadingStatus(true);
              try {
                const res = await fetch('http://localhost:8080/delivery/status?deliveryPartnerId=1', {
                  method: 'PATCH',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({ status: isOnline ? 'UNAVAILABLE' : 'AVAILABLE' }) 
                });
                if (res.ok) {
                  setIsOnline(!isOnline);
                }
              } finally {
                setLoadingStatus(false);
              }
            }}
            disabled={loadingStatus}
            className={`relative w-16 h-8 rounded-full transition-colors ${
              isOnline ? 'bg-green-500' : 'bg-gray-300'
            }`}
          >
            <div
              className={`absolute top-1 w-6 h-6 bg-white rounded-full shadow-md transition-transform ${
                isOnline ? 'translate-x-9' : 'translate-x-1'
              }`}
            />
          </button>
        </div>
      </div>

      {/* Daily Earnings Summary */}
      <div className="p-4">
        <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-3xl p-6 text-white shadow-lg">
          <p className="text-orange-100 mb-1">Today's Earnings</p>
          <h2 className="text-4xl mb-4">₹{summary.todayOrderStats.todayEarnings}</h2>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <p className="text-orange-100 text-sm">Orders</p>
              <p className="text-xl">{summary.todayOrderStats.todayOrderCount}</p>
            </div>
            <div>
              <p className="text-orange-100 text-sm">Avg/Order</p>
              <p className="text-xl">₹{summary.todayOrderStats.avgOrderPayout}</p>
            </div>
            <div>
              <p className="text-orange-100 text-sm">Total Earnings</p>
              <p className="text-xl">₹{summary.miscStats.totalEarnings}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Access Cards */}
      <div className="px-4 mb-6">
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={() => navigateTo('orders')}
            className="bg-white rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow border border-gray-100"
          >
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-3">
              <Package className="w-6 h-6 text-blue-600" />
            </div>
            <p className="text-gray-900 mb-1">Orders</p>
            <p className="text-2xl text-blue-600">{summary.miscStats.totalOrdersCount}</p>
          </button>

          <button
            onClick={() => navigateTo('wallet')}
            className="bg-white rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow border border-gray-100"
          >
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mb-3">
              <Wallet className="w-6 h-6 text-green-600" />
            </div>
            <p className="text-gray-900 mb-1">Total Earnings</p>
            <p className="text-2xl text-green-600">₹{summary.miscStats.totalEarnings}</p>
          </button>

          <button
            onClick={() => navigateTo('history')}
            className="bg-white rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow border border-gray-100"
          >
            <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mb-3">
              <Clock className="w-6 h-6 text-purple-600" />
            </div>
            <p className="text-gray-900 mb-1">History</p>
            <p className="text-sm text-gray-500">{summary.miscStats.totalOrdersCount} trips</p>
          </button>

          <button
            onClick={() => navigateTo('support')}
            className="bg-white rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow border border-gray-100"
          >
            <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center mb-3">
              <HeadphonesIcon className="w-6 h-6 text-orange-600" />
            </div>
            <p className="text-gray-900 mb-1">Support</p>
            <p className="text-sm text-gray-500">Get help</p>
          </button>
        </div>
      </div>

      {/* Available Orders */}
      <div className="px-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-lg text-gray-900">Available Orders</h3>
          <button
            onClick={() => navigateTo('orders')}
            className="text-orange-500 text-sm"
          >
            View All
          </button>
        </div>

        <div className="space-y-3">
          {availableOrders.map((order) => (
            <div
              key={order.id}
              className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <h4 className="text-gray-900 mb-1">
                    {order.restaurant}
                  </h4>
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
                  <div className="flex items-center gap-1 text-green-600">
                    <DollarSign className="w-4 h-4" />
                    <span className="text-lg">₹{order.payout}</span>
                  </div>
                  <p className="text-xs text-gray-500">
                    {order.items} items
                  </p>
                </div>
              </div>
              <button
                onClick={() =>
                  navigateTo('order-details', order.id)
                }
                className="w-full bg-orange-500 text-white py-3 rounded-xl hover:bg-orange-600 transition-colors flex items-center justify-center gap-2"
              >
                <Navigation className="w-4 h-4" />
                Accept Order
              </button>
            </div>
          ))}
        </div>
      </div>

      <BottomNav
        currentScreen="dashboard"
        navigateTo={navigateTo}
      />
    </div>
  );
}
