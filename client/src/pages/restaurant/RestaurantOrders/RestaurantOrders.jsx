import { useState, useEffect } from 'react';
import { ShoppingBag, ChevronLeft, ChevronRight } from 'lucide-react';
import OrderCard from '../../../components/restaurant/orders/OrderCard';
import LoadingSkeleton from '../../../components/restaurant/UI/LoadingSkeleton';
import EmptyState from '../../../components/restaurant/UI/EmptyState';
import Toast from '../../../components/restaurant/UI/Toast';
import { restaurantAPI } from '../../../services/Restaurant/api';

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(10);
  const [totalOrders, setTotalOrders] = useState(0);

  useEffect(() => {
    fetchOrders();
  }, [currentPage]);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const response = await restaurantAPI.getOrders(pageSize);
      setOrders(response.data);
      setTotalOrders(response.data.length);
    } catch (error) {
      setToast({
        message: 'Failed to load orders. Using mock data.',
        type: 'error',
      });
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
      setOrders(mockOrders);
      setTotalOrders(mockOrders.length);
    } finally {
      setLoading(false);
    }
  };

  const totalPages = Math.ceil(totalOrders / pageSize);

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <h2 className="font-bold text-2xl text-gray-900">Orders</h2>
        <LoadingSkeleton type="table" count={5} />
      </div>
    );
  }

  return (
    <div className="space-y-6 mx-4 md:mx-8 lg:mx-12">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-bold text-2xl text-gray-900">Orders</h2>
          <p className="text-gray-600 mt-1">
            Showing {orders.length} order{orders.length !== 1 ? 's' : ''}
          </p>
        </div>
        <button
          onClick={fetchOrders}
          className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors"
        >
          Refresh
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-2 flex gap-2 overflow-x-auto">
        {['all', 'pending', 'preparing', 'ready', 'delivered', 'cancelled'].map((status) => (
          <button
            key={status}
            className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors whitespace-nowrap ${status === 'all'
              ? 'bg-orange-600 text-white'
              : 'text-gray-700 hover:bg-gray-100'
              }`}
          >
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </button>
        ))}
      </div>

      {/* Orders List */}
      {orders.length === 0 ? (
        <EmptyState
          icon={ShoppingBag}
          title="No orders yet"
          description="When customers place orders, they will appear here."
        />
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <OrderCard key={order.id} order={order} />
          ))}
        </div>
      )}

      {/* Pagination */}
      {orders.length > 0 && totalPages > 1 && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-600">
              Page {currentPage} of {totalPages}
            </p>
            <div className="flex gap-2">
              <button
                onClick={handlePreviousPage}
                disabled={currentPage === 1}
                className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronLeft className="w-4 h-4" />
                Previous
              </button>
              <button
                onClick={handleNextPage}
                disabled={currentPage === totalPages}
                className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

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
