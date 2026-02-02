import { useState, useEffect } from 'react';
import api from '../../../services/api';
import { ArrowLeft, Filter, DollarSign, MapPin, Clock, X } from 'lucide-react';
import { BottomNav } from '../../../components/delivery/BottomNav';

export function OrderHistory({ navigateTo }) {
  const [filter, setFilter] = useState('all');
  const [showFilters, setShowFilters] = useState(false);
  const [historyData, setHistoryData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    const deliveryPartnerId = sessionStorage.getItem('deliveryPartnerId');
    if (!deliveryPartnerId) return;

    setLoading(true);
    try {
      const response = await api.get(`/delivery/orders/history`, {
        params: { id: deliveryPartnerId }
      });

      const orders = response.data.map(order => ({
        id: order.orderId,
        restaurant: order.restaurantName,
        distance: '2.5 km', // Mock as API misses it
        time: new Date(order.time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        fullDate: new Date(order.time), // For grouping
        earnings: order.totalAmount, // Using totalAmount as earnings based on prompt example
        status: order.orderStatus.toLowerCase() // Ensure lowercase for filter matching
      }));

      // Group by date
      const grouped = groupOrdersByDate(orders);
      setHistoryData(grouped);

    } catch (error) {
      console.error("Error fetching history:", error);
    } finally {
      setLoading(false);
    }
  };

  const groupOrdersByDate = (orders) => {
    const groups = {};
    const today = new Date().toDateString();
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayStr = yesterday.toDateString();

    orders.forEach(order => {
      const orderDate = order.fullDate.toDateString();
      let groupLabel = orderDate;

      if (orderDate === today) groupLabel = 'Today';
      else if (orderDate === yesterdayStr) groupLabel = 'Yesterday';
      else groupLabel = order.fullDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

      if (!groups[groupLabel]) {
        groups[groupLabel] = [];
      }
      groups[groupLabel].push(order);
    });

    return Object.keys(groups).map((date, index) => ({
      id: index,
      date,
      orders: groups[date]
    }));
  };

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
    switch (status.toLowerCase()) {
      case 'completed':
      case 'delivered':
        return 'bg-green-100 text-green-700';
      case 'cancelled':
      case 'rejected':
        return 'bg-red-100 text-red-700';
      case 'returned':
        return 'bg-orange-100 text-orange-700';
      case 'accepted':
        return 'bg-blue-100 text-blue-700';
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
                className={`py-2 px-3 rounded-xl text-sm transition-colors ${filter === 'all'
                  ? 'bg-orange-500 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
                  }`}
              >
                All Orders
              </button>

              <button
                onClick={() => setFilter('delivered')} // Updated to match API status
                className={`py-2 px-3 rounded-xl text-sm transition-colors ${filter === 'delivered'
                  ? 'bg-orange-500 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
                  }`}
              >
                Delivered
              </button>

              <button
                onClick={() => setFilter('cancelled')}
                className={`py-2 px-3 rounded-xl text-sm transition-colors ${filter === 'cancelled'
                  ? 'bg-orange-500 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
                  }`}
              >
                Cancelled
              </button>

              <button
                onClick={() => setFilter('accepted')}
                className={`py-2 px-3 rounded-xl text-sm transition-colors ${filter === 'accepted'
                  ? 'bg-orange-500 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
                  }`}
              >
                Accepted
              </button>
            </div>
          </div>
        )}
      </div>

      {/* History List */}
      <div className="p-4">
        {loading ? (
          <div className="text-center py-12 text-gray-500">Loading history...</div>
        ) : filteredData.length === 0 ? (
          <div className="text-center py-12 text-gray-500">No orders found</div>
        ) : (
          filteredData.map((day) => (
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
                        {(order.status === 'completed' || order.status === 'delivered') && (
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
          )))}
      </div>

      <BottomNav
        currentScreen="history"
        navigateTo={navigateTo}
      />
    </div>
  );
}
