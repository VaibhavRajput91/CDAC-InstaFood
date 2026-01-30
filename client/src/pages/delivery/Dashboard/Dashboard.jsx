import { useState, useEffect } from 'react';
import axios from 'axios';
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
import { config } from '../../../services/config';

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
  const [availableOrders, setAvailableOrders] = useState([]);

  useEffect(() => {
    const deliveryPartnerId = sessionStorage.getItem('deliveryPartnerId');
    if (!deliveryPartnerId) {
      console.error("No deliveryPartnerId found in session");
      return;
    }

    // Fetch initial status
    fetch(`${config.server}/delivery/status?deliveryPartnerId=${deliveryPartnerId}`)
      .then(res => res.json())
      .then(data => {
        setIsOnline(data.status === 'AVAILABLE');
      })
      .catch(err => console.error("Error fetching status:", err));

    // Fetch dashboard summary
    fetch(`${config.server}/delivery/dashboard/summary?deliveryPartnerId=${deliveryPartnerId}`)
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
      })
      .catch(err => console.error("Error fetching summary:", err));

    // Fetch available orders
    fetch(`${config.server}/delivery/orders/available`)
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          // Add default distance/time if not present in API, as UI expects it
          const mappedOrders = data.map(order => ({
            ...order, // keep original data
            id: order.orderId,
            restaurant: order.restaurantName,
            distance: '2 km', // Mock distance
            time: '20 min',   // Mock time
            payout: order.totalAmount,
            itemCount: order.items?.length || 0
          }));
          setAvailableOrders(mappedOrders.slice(0, 5));
        }
      })
      .catch(err => console.error("Error fetching available orders:", err));
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
              className={`text-lg ${isOnline ? 'text-green-600' : 'text-gray-600'
                }`}
            >
              {isOnline ? 'Online' : 'Offline'}
            </p>
          </div>
          <button
            onClick={async () => {
              setLoadingStatus(true);
              const deliveryPartnerId = sessionStorage.getItem('deliveryPartnerId');
              try {
                // Using PATCH with query param as requested: patch : ${config.server}/delivery/status?deliveryPartnerId=${sessionStorage.getItem("deliveryPartnerId}
                // The user request didn't specify body content for the toggle, it just said 'to toggle the status... use the api'.
                // Usually PATCH toggles or sends new status. The previous code sent body. Use logic: current isOnline -> new is !isOnline?
                // Wait, user instructions: "to toggle the status and persist into db use the api: patch : ${config.server}/delivery/status?deliveryPartnerId=..."
                // It does NOT say send body. Perhaps the server toggles it automatically?
                // I will try sending empty body or just the request. given "toggle", it implies server side toggle.
                // But previously I saw code sending body. I'll adhere to user instruction which doesn't specify body.
                // However, axios/fetch might require method.

                const res = await fetch(`${config.server}/delivery/status?deliveryPartnerId=${deliveryPartnerId}`, {
                  method: 'PATCH',
                  headers: { 'Content-Type': 'application/json' }
                });

                if (res.ok) {
                  const data = await res.json();
                  // Response is { "status": "AVAILABLE" or "UNAVAILABLE" }
                  if (data.status) {
                    setIsOnline(data.status === 'AVAILABLE');
                  }
                }
              } catch (e) {
                console.error("Error toggling status", e);
              } finally {
                setLoadingStatus(false);
              }
            }}
            disabled={loadingStatus}
            className={`relative w-16 h-8 rounded-full transition-colors ${isOnline ? 'bg-green-500' : 'bg-gray-300'
              }`}
          >
            <div
              className={`absolute top-1 w-6 h-6 bg-white rounded-full shadow-md transition-transform ${isOnline ? 'translate-x-9' : 'translate-x-1'
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
                    {order.itemCount} items
                  </p>
                </div>
              </div>
              <button
                onClick={() =>
                  navigateTo('order-details', order.id)
                }
                className="w-full bg-orange-500 text-white py-3 rounded-xl hover:bg-orange-600 transition-colors flex items-center justify-center gap-2"
              >
                Details
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
