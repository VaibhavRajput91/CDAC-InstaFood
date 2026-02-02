import { useState, useEffect } from 'react';
import { ShoppingBag, Clock, User, MapPin, RefreshCw } from 'lucide-react';
import Toast from '../../../components/restaurant/UI/Toast';
import { restaurantAPI } from '../../../services/Restaurant/api';
import { Navigate, useNavigate } from 'react-router-dom';

export default function RestaurantOrders() {
  const [activeTab, setActiveTab] = useState('Placed');
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchOrders();
  }, [activeTab]);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      let ordersData = [];
      const restaurantId = sessionStorage.getItem('restaurantId');
      console.log('Fetching orders for tab:', activeTab, 'restaurantId:', restaurantId);

      if (restaurantId) {
        const tabLower = activeTab.toLowerCase();
        if (tabLower === 'placed') {
          const response = await restaurantAPI.getAllPlacedOrdersList(restaurantId);
          ordersData = response.data || [];
        } else if (tabLower === 'accepted') {
          const response = await restaurantAPI.getAllAcceptedOrdersList(restaurantId);
          ordersData = response.data || [];
        } else if (tabLower === 'preparing') {
          const response = await restaurantAPI.getAllPreparingOrdersList(restaurantId);
          ordersData = response.data || [];
        } else if (tabLower === 'assigned') {
          const response = await restaurantAPI.getAllAssignedOrdersList(restaurantId);
          ordersData = response.data || [];
        } else if (tabLower === 'delivered') {
          const response = await restaurantAPI.getAllDeliveredOrdersList(restaurantId);
          ordersData = response.data || [];
        }

      } else {
        console.warn('restaurantId not found in sessionStorage');
      }

      console.log('Orders fetched:', ordersData);

      // Map orders from backend DTO to frontend format
      const mappedOrders = ordersData.map(order => {
        // Handle items: can be Map (object) or array
        let itemsArray = [];
        if (order.items) {
          if (Array.isArray(order.items)) {
            itemsArray = order.items;
          } else {
            itemsArray = Object.entries(order.items).map(([name, quantity]) => ({ name, quantity }));
          }
        }

        return {
          id: order.orderId,
          customerName: order.customerName || order.CustomerName,
          customerPhone: order.customerPhone,
          address: order.address || order.Address,
          total: order.totalAmount,
          itemsCount: itemsArray.length,
          status: order.orderStatus || order.status,
          orderDate: order.orderDate || order.createdOn,
          items: itemsArray,
          deliveryExecutiveName: order.deliveryExecutiveName,
          lastUpdated: order.deliveryDateTime || order.lastUpdated || order.deliveryDate || order.deliveryTime,
        };
      });

      console.log('Mapped orders:', mappedOrders);
      setOrders(mappedOrders);
    } catch (error) {
      console.error('Error fetching orders:', error);
      setOrders([]);
    } finally {
      setLoading(false);
    }
  };

  const getCardBorderColor = (status) => {
    switch (status) {
      case 'PLACED':
        return 'border-l-4 border-l-gray-400 bg-gray-50/20';
      case 'ACCEPTED':
        return 'border-l-4 border-l-yellow-500 bg-yellow-50/30';
      case 'PREPARING':
        return 'border-l-4 border-l-blue-500 bg-blue-50/30';
      case 'ASSIGNED':
        return 'border-l-4 border-l-green-500 bg-green-50/30';
      case 'DELIVERED':
        return 'border-l-4 border-l-indigo-500 bg-purple-50/30';
      default:
        return 'border-l-4 border-l-red-400 bg-gray-50/20';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'PLACED':
        return 'bg-gray-50 text-gray-700';
      case 'ACCEPTED':
        return 'bg-yellow-50 text-yellow-700';
      case 'PREPARING':
        return 'bg-blue-50 text-blue-700';
      case 'ASSIGNED':
        return 'bg-indigo-50 text-indigo-700';
      case 'DELIVERED':
        return 'bg-green-50 text-green-700';
      default:
        return 'bg-red-50 text-red-700';
    }
  };

  const formatFullDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const formatDateTime = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    });
  };

  const handleAcceptOrder = async (orderId) => {
    try {
      console.log('Accepting order:', orderId);
      setToast({ message: 'Order accepted!', type: 'success' });
      await restaurantAPI.acceptingOrder(orderId);
      setActiveTab('Accepted');
      fetchOrders();
    } catch (error) {
      setToast({ message: 'Failed to accept order', type: 'error' });
      console.error('Error accepting order:', error);
    }
  };
  const handleStartPreparing = async (orderId) => {
    try {
      console.log('Starting preparation for order:', orderId);
      setToast({ message: 'Order preparation started!', type: 'success' });
      await restaurantAPI.preparingOrder(orderId);
      setActiveTab('Preparing');
      fetchOrders();
    } catch (error) {
      setToast({ message: 'Failed to start preparation', type: 'error' });
      console.error('Error starting preparation:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 p-4 sticky top-0 z-10">
        <div className="flex items-center justify-between mb-4">
          {/* <h1 className="text-xl font-semibold">Orders</h1> */}
          <h2 className="font-bold text-2xl text-gray-900">Restaurant Orders</h2>
        </div>

        {/* Tabs */}
        <div className="flex items-center justify-between pb-2">
          <div className="flex-1 flex gap-3 justify-center">
            {['Placed', 'Accepted', 'Preparing', 'Assigned', 'Delivered'].map((status) => (
              <button
                key={status}
                onClick={() => setActiveTab(status)}
                className={`px-8 py-3 rounded-xl transition-all font-semibold text-base ${activeTab === status
                  ? 'bg-orange-500 text-white shadow-lg shadow-orange-200'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
              >
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </button>
            ))}
          </div>

          <button
            onClick={fetchOrders}
            disabled={loading}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors disabled:opacity-50"
            title="Refresh orders"
          >
            <RefreshCw className={`w-5 h-5 text-gray-600 ${loading ? 'animate-spin' : ''}`} />
          </button>
        </div>
      </div>

      {/* Orders List */}
      <div className="p-4 space-y-3">
        {loading ? (
          <div className="text-center py-12 text-gray-500">Loading orders...</div>
        ) : orders.length === 0 ? (
          <div className="text-center py-12">
            <ShoppingBag className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">
              No {activeTab} orders
            </p>
          </div>
        ) : (
          orders.map((order) => (
            <div
              key={order.id}
              className={`bg-white rounded-2xl p-4 shadow-sm border border-gray-200 hover:shadow-md transition-shadow ${getCardBorderColor(order.status)}`}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <h3 className="text-gray-900 font-semibold mb-1">
                    {order.customerName}
                  </h3>

                  <div className="flex items-center gap-1 text-sm text-gray-500 mb-2">
                    <User className="w-4 h-4" />
                    <span>{order.customerPhone}</span>
                  </div>

                  <div className="flex items-center gap-1 text-sm text-gray-500">
                    <MapPin className="w-4 h-4" />
                    <span className="truncate">
                      {order.address}
                    </span>
                  </div>
                </div>

                <div className="text-right">
                  <div className="flex items-center gap-1 text-green-600 mb-1">
                    <span className="text-lg font-semibold">
                      ₹{order.total}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500">
                    {order.itemsCount} item{order.itemsCount !== 1 ? 's' : ''}
                  </p>
                </div>
              </div>

              {/* Status and Time */}
              <div className="flex items-center justify-between gap-3 mb-4">
                <div className={`py-2 px-3 rounded-xl text-sm font-medium ${getStatusColor(order.status)}`}>
                  {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                </div>
                <div className="flex items-center gap-1 text-xs text-gray-500">
                  <p className="text-sm text-gray-700 mt-1">Ordered on: {formatFullDate(order.orderDate)}</p>
                </div>
              </div>

              {/* Items Preview */}
              {order.items && order.items.length > 0 && (
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <div className="flex items-center justify-between mb-3">
                    <p className="text-sm text-gray-700 font-semibold">Order Items</p>
                    <span className="bg-orange-100 text-orange-700 text-xs font-semibold px-2.5 py-1 rounded-full">
                      {order.itemsCount} item{order.itemsCount !== 1 ? 's' : ''}
                    </span>
                  </div>
                  <div className="space-y-2">
                    {order.items.slice(0, 3).map((item, idx) => (
                      <div key={idx} className="flex items-center justify-between bg-gray-50 p-2.5 rounded-lg hover:bg-gray-100 transition-colors">
                        <div className="flex items-center gap-2 flex-1">
                          <div className="bg-orange-500 text-white text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center">
                            {item.quantity}
                          </div>
                          <span className="text-sm text-gray-800 font-medium truncate">
                            {item.name || item}
                          </span>
                        </div>
                      </div>
                    ))}
                    {order.items.length > 3 && (
                      <div className="bg-blue-50 text-blue-700 p-2.5 rounded-lg text-xs font-medium">
                        +{order.items.length - 3} more item{order.items.length - 3 !== 1 ? 's' : ''}
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Delivery Executive Info for Completed Orders */}
              {activeTab === 'Assigned' && order.deliveryExecutiveName && (
                <div className="mt-3 pt-3 border-t border-gray-100">
                  <p className="text-sm text-gray-600 font-medium">Delivery Executive:</p>
                  <p className="text-sm text-blue-900 font-semibold">{order.deliveryExecutiveName}</p>
                </div>
              )}
              {/* Delivery Executive Info for Completed Orders */}
              {activeTab === 'Delivered' && order.deliveryExecutiveName && (
                <div className="mt-3 pt-3 border-t border-gray-100">
                  <p className="text-sm text-gray-600 font-medium">Delivery Executive:</p>
                  <p className="text-sm text-blue-900 font-semibold">{order.deliveryExecutiveName}</p>
                  {order.lastUpdated && (
                    <p className="text-sm text-gray-500 mt-1">Delivered at: {formatDateTime(order.lastUpdated)}</p>
                  )}
                </div>
              )}
              {activeTab === 'Placed' && (
                <div className="flex justify-end mt-4">
                  <button
                    onClick={() => handleAcceptOrder(order.id)}
                    className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-semibold py-2 px-6 rounded-xl transition-all shadow-md hover:shadow-lg active:scale-95"
                  >
                    ✓ Accept Order
                  </button>
                </div>
              )}
              {activeTab === 'Accepted' && (
                <div className="flex justify-end mt-4">
                  <button
                    onClick={() => handleStartPreparing(order.id)}
                    className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-semibold py-2 px-6 rounded-xl transition-all shadow-md hover:shadow-lg active:scale-95"
                  >
                    Start Preparing
                  </button>
                </div>
              )}
            </div>
          ))
        )}
      </div>

      {/* Toast Notification */}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  );
}
