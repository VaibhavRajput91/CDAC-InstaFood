import { useState, useEffect } from 'react';
import { ShoppingBag, Clock, DollarSign, User, MapPin, RefreshCw } from 'lucide-react';
import Toast from '../../../components/restaurant/UI/Toast';
import { restaurantAPI } from '../../../services/Restaurant/api';

export default function RestaurantOrders() {
  const [activeTab, setActiveTab] = useState('new');
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    fetchOrders();
  }, [activeTab]);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      let ordersData = [];

      if (activeTab === 'completed') {
        // Fetch completed orders from backend
        const restaurantId = sessionStorage.getItem('restaurantId');
        if (restaurantId) {
          const response = await restaurantAPI.getAllCompletedOrdersList(restaurantId);
          ordersData = response.data || [];
        }
      } else if (activeTab === 'new') {
        // Fetch new placed orders from backend; if restaurantId missing, fall back to getOrders()
        const restaurantId = sessionStorage.getItem('restaurantId');
        if (restaurantId) {
          const response = await restaurantAPI.getNewOrders(restaurantId);
          ordersData = response.data || [];
        } else {
          console.warn('restaurantId not found in sessionStorage — falling back to getOrders() for New tab');
          const response = await restaurantAPI.getOrders();
          ordersData = response.data || [];
        }
      } else {
        // Fetch all orders for filtering (ongoing)
        const response = await restaurantAPI.getOrders();
        ordersData = response.data || [];
      }

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
        };
      });

      // Filter by active tab (backend already returns correct status for new/completed)
      const filteredOrders = mappedOrders.filter(order => {
        if (activeTab === 'new') {
          return ['PLACED', 'pending'].includes(order.status);
        } else if (activeTab === 'ongoing') {
          return ['ASSIGNED', 'PREPARING', 'preparing', 'ready'].includes(order.status);
        } else if (activeTab === 'completed') {
          return ['DELIVERED', 'delivered', 'CANCELLED', 'cancelled'].includes(order.status);
        }
        return true;
      });

      setOrders(mappedOrders);
    } catch (error) {
      // Mock data
      const mockOrders = [
        {
          id: 'ORD-001',
          customerName: 'John Doe',
          customerPhone: '+1 (555) 123-4567',
          status: 'pending',
          items: [
            { name: 'Margherita Pizza', quantity: 2, price: 12.99 },
            { name: 'Caesar Salad', quantity: 1, price: 7.99 },
          ],
          total: 33.97,
          orderDate: '2026-01-26T10:30:00',
          deliveryAddress: '123 Main St, Apt 4B, New York, NY 10001',
        },
        {
          id: 'ORD-002',
          customerName: 'Jane Smith',
          customerPhone: '+1 (555) 234-5678',
          status: 'preparing',
          items: [
            { name: 'Chicken Burger', quantity: 1, price: 9.99 },
            { name: 'Fish & Chips', quantity: 1, price: 14.99 },
          ],
          total: 24.98,
          orderDate: '2026-01-26T11:15:00',
          deliveryAddress: '456 Oak Ave, Brooklyn, NY 11201',
        },
        {
          id: 'ORD-003',
          customerName: 'Mike Johnson',
          customerPhone: '+1 (555) 345-6789',
          status: 'ready',
          items: [
            { name: 'Spaghetti Carbonara', quantity: 1, price: 13.99 },
          ],
          total: 13.99,
          orderDate: '2026-01-26T11:45:00',
          deliveryAddress: '789 Elm St, Queens, NY 11354',
        },
        {
          id: 'ORD-004',
          customerName: 'Sarah Williams',
          customerPhone: '+1 (555) 456-7890',
          status: 'delivered',
          items: [
            { name: 'Margherita Pizza', quantity: 1, price: 12.99 },
            { name: 'Chocolate Brownie', quantity: 2, price: 6.99 },
          ],
          total: 26.97,
          orderDate: '2026-01-26T09:00:00',
          deliveryAddress: '321 Pine St, Manhattan, NY 10002',
        },
        {
          id: 'ORD-005',
          customerName: 'Tom Brown',
          customerPhone: '+1 (555) 567-8901',
          status: 'cancelled',
          items: [
            { name: 'Caesar Salad', quantity: 1, price: 7.99 },
          ],
          total: 7.99,
          orderDate: '2026-01-26T08:30:00',
          deliveryAddress: '654 Maple Dr, Bronx, NY 10451',
        },
      ];

      const filteredMockOrders = mockOrders.filter(order => {
        if (activeTab === 'new') {
          return ['pending'].includes(order.status);
        } else if (activeTab === 'ongoing') {
          return ['preparing', 'ready'].includes(order.status);
        } else if (activeTab === 'completed') {
          return ['delivered', 'cancelled'].includes(order.status);
        }
        return true;
      });

      const mappedOrders = filteredMockOrders.map(order => ({
        id: order.id,
        customerName: order.customerName,
        customerPhone: order.customerPhone,
        address: order.deliveryAddress,
        total: order.total,
        itemsCount: order.items ? order.items.length : 0,
        status: order.status,
        orderDate: order.orderDate,
        items: order.items,
      }));

      setOrders(mappedOrders);
    } finally {
      setLoading(false);
    }
  };

  const getCardBorderColor = (status) => {
    switch (status) {
      case 'PLACED':
      case 'pending':
        return 'border-l-4 border-l-yellow-500 bg-yellow-50/30';
      case 'ASSIGNED':
      case 'PREPARING':
      case 'preparing':
        return 'border-l-4 border-l-blue-500 bg-blue-50/30';
      case 'ready':
        return 'border-l-4 border-l-green-500 bg-green-50/30';
      case 'DELIVERED':
      case 'delivered':
        return 'border-l-4 border-l-green-600 bg-green-50/40';
      case 'CANCELLED':
      case 'cancelled':
        return 'border-l-4 border-l-red-500 bg-red-50/30';
      default:
        return 'border-l-4 border-l-gray-400 bg-gray-50/20';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending':
      case 'PLACED':
        return 'bg-yellow-50 text-yellow-700';
      case 'preparing':
      case 'PREPARING':
        return 'bg-blue-50 text-blue-700';
      case 'ready':
        return 'bg-green-50 text-green-700';
      case 'delivered':
      case 'DELIVERED':
        return 'bg-gray-50 text-gray-700';
      case 'cancelled':
      case 'CANCELLED':
        return 'bg-red-50 text-red-700';
      default:
        return 'bg-gray-50 text-gray-700';
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
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

  const handleAcceptOrder = async (orderId) => {
    try {
      console.log('Accepting order:', orderId);
      // TODO: Call API to accept order
      // await restaurantAPI.acceptOrder(orderId);
      setToast({ message: 'Order accepted!', type: 'success' });
      fetchOrders(); // Refresh list
    } catch (error) {
      setToast({ message: 'Failed to accept order', type: 'error' });
      console.error('Error accepting order:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 p-4 sticky top-0 z-10">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-xl font-semibold">Orders</h1>
          <button
            onClick={fetchOrders}
            disabled={loading}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors disabled:opacity-50"
            title="Refresh orders"
          >
            <RefreshCw className={`w-5 h-5 text-gray-600 ${loading ? 'animate-spin' : ''}`} />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex gap-3 justify-center pb-2">
          {['new', 'ongoing', 'completed'].map((status) => (
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
                  <Clock className="w-4 h-4" />
                  {formatFullDate(order.orderDate)}
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
              {activeTab === 'completed' && order.deliveryExecutiveName && (
                <div className="mt-3 pt-3 border-t border-gray-100">
                  <p className="text-xs text-gray-600 font-medium">Delivered by:</p>
                  <p className="text-xs text-gray-500">{order.deliveryExecutiveName}</p>
                </div>
              )}

              {/* Accept Button for New Orders */}
              {activeTab === 'new' && (
                <div className="flex justify-end mt-4">
                  <button
                    onClick={() => handleAcceptOrder(order.id)}
                    className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-semibold py-2 px-6 rounded-xl transition-all shadow-md hover:shadow-lg active:scale-95"
                  >
                    ✓ Accept Order
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
