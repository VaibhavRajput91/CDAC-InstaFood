import { Clock, User, Phone, MapPin, Package } from 'lucide-react';

const statusColors = {
  pending: 'bg-yellow-50 text-yellow-700 border-yellow-200',
  preparing: 'bg-blue-50 text-blue-700 border-blue-200',
  ready: 'bg-purple-50 text-purple-700 border-purple-200',
  delivered: 'bg-green-50 text-green-700 border-green-200',
  cancelled: 'bg-red-50 text-red-700 border-red-200',
};

export default function OrderCard({ order }) {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
      <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
        {/* Order Header */}
        <div>
          <h3 className="font-semibold text-lg text-gray-900 mb-1">
            Order #{order.id}
          </h3>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Clock className="w-4 h-4" />
            <span>{formatDate(order.orderDate)}</span>
          </div>
        </div>

        {/* Status Badge */}
        <span
          className={`px-3 py-1 rounded-full text-sm font-medium border ${statusColors[order?.status] || statusColors.pending
            }`}
        >
          {order?.status ? order.status.charAt(0).toUpperCase() + order.status.slice(1) : 'Pending'}
        </span>
      </div>

      {/* Customer Info */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4 pb-4 border-b border-gray-200">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-orange-50 rounded-full flex items-center justify-center">
            <User className="w-5 h-5 text-orange-600" />
          </div>
          <div>
            <p className="text-sm text-gray-600">Customer</p>
            <p className="font-medium text-gray-900">{order.customerName}</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center">
            <Phone className="w-5 h-5 text-blue-600" />
          </div>
          <div>
            <p className="text-sm text-gray-600">Phone</p>
            <p className="font-medium text-gray-900">{order.customerPhone}</p>
          </div>
        </div>
      </div>

      {/* Delivery Address */}
      {order.deliveryAddress && (
        <div className="flex items-start gap-3 mb-4 pb-4 border-b border-gray-200">
          <MapPin className="w-5 h-5 text-gray-400 mt-0.5" />
          <div>
            <p className="text-sm text-gray-600 mb-1">Delivery Address</p>
            <p className="text-gray-900">{order.deliveryAddress}</p>
          </div>
        </div>
      )}

      {/* Order Items */}
      <div className="mb-4">
        <div className="flex items-center gap-2 mb-3">
          <Package className="w-4 h-4 text-gray-400" />
          <p className="text-sm font-medium text-gray-700">Order Items</p>
        </div>
        <div className="space-y-2">
          {order?.items && Array.isArray(order.items) && order.items.map((item, index) => (
            <div key={index} className="flex items-center justify-between text-sm">
              <span className="text-gray-700">
                {item.quantity}x {item.name}
              </span>
              <span className="font-medium text-gray-900">
                ${(item.price * item.quantity).toFixed(2)}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Total */}
      <div className="flex items-center justify-between pt-4 border-t border-gray-200">
        <span className="font-semibold text-gray-900">Total Amount</span>
        <span className="font-bold text-xl text-orange-600">
          ${order?.total ? order.total.toFixed(2) : '0.00'}
        </span>
      </div>

      {/* Actions */}
      {order?.status === 'pending' && (
        <div className="flex gap-3 mt-4 pt-4 border-t border-gray-200">
          <button className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
            Accept Order
          </button>
          <button className="flex-1 px-4 py-2 border border-red-600 text-red-600 rounded-lg hover:bg-red-50 transition-colors">
            Reject
          </button>
        </div>
      )}

      {order.status === 'preparing' && (
        <div className="flex gap-3 mt-4 pt-4 border-t border-gray-200">
          <button className="flex-1 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
            Mark as Ready
          </button>
        </div>
      )}
    </div>
  );
}
