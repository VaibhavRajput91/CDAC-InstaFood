import { useState, useEffect } from 'react';
import api from '../../../services/api';
import { useDelivery } from '../../../context/DeliveryContext';
import { ArrowLeft, MapPin, Phone, Navigation, Clock, Package } from 'lucide-react';

export function OrderDetails({ navigateTo, orderId }) {
  const [orderDetails, setOrderDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [accepting, setAccepting] = useState(false);

  const { activeOrderId, setActiveOrderId, checkActiveOrder, loadingContext } = useDelivery();

  useEffect(() => {
    if (orderId) {
      fetchOrderDetails();
    }
  }, [orderId]);

  const fetchOrderDetails = async () => {
    setLoading(true);
    try {
      const response = await api.get(`/delivery/orders/order-details`, {
        params: { orderId },

      });
      setOrderDetails(response.data);
    } catch (error) {
      console.error("Error fetching order details:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAcceptOrder = async () => {
    const deliveryPartnerId = sessionStorage.getItem('deliveryPartnerId');
    if (!deliveryPartnerId) {
      alert("Delivery Partner ID not found. Please relogin.");
      return;
    }

    setAccepting(true);
    try {
      const response = await api.patch(
        `/delivery/orders/accept`,
        {},
        {
          params: { orderId, deliveryPartnerId }
        }
      );

      if (response.data.status === "SUCCESS") {
        await checkActiveOrder(); // Update context
        await fetchOrderDetails(); // Update local details
      } else {
        alert("Failed to accept order: " + (response.data.message || "Unknown error"));
      }
    } catch (error) {
      console.error("Error accepting order:", error);
      alert("Error accepting order. Please try again.");
    } finally {
      setAccepting(false);
    }
  };

  const handleDeliveredOrder = async () => {
    const deliveryPartnerId = sessionStorage.getItem('deliveryPartnerId');
    setAccepting(true);
    try {
      const response = await api.patch(`/delivery/orders/delivered/${deliveryPartnerId}/${orderId}`);

      if (response.data.status === "SUCCESS") {
        setActiveOrderId(null);
        await checkActiveOrder();
        await fetchOrderDetails();
      } else {
        alert("Failed to mark delivered: " + (response.data.message || "Unknown error"));
      }
    } catch (error) {
      console.error("Error marking delivered:", error);
      alert("Error updating order. Please try again.");
    } finally {
      setAccepting(false);
    }
  };

  if (loading || loadingContext) {
    return <div className="min-h-screen flex items-center justify-center bg-gray-50 text-gray-500">Loading details...</div>;
  }

  if (!orderDetails) {
    return <div className="min-h-screen flex items-center justify-center bg-gray-50 text-gray-500">Order not found</div>;
  }

  const { pickup, drop, restaurantName, customerName, customerPhone, orderItems = [], orderStatus } = orderDetails;

  // Calculate totals
  const itemTotal = orderItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const deliveryFee = 30;
  const taxes = Math.round(itemTotal * 0.05);
  const total = itemTotal + deliveryFee + taxes;

  // Logic for buttons
  // 1. If this order is the active one -> Show Deliver (if status allows)
  // 2. If this order is NOT the active one, but we have an active one -> Show Warning/Disabled Accept
  // 3. If no active order -> Show Accept

  const isActiveOrder = activeOrderId === orderId || (activeOrderId && activeOrderId.toString() === orderId.toString());
  const isOtherOrderActive = activeOrderId && !isActiveOrder;

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
                <p className="text-gray-900">{restaurantName}</p>
                <p className="text-xs text-gray-500">{pickup}</p>
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
              <p className="text-gray-900">{drop}</p>
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
              <p className="text-gray-900">{customerName}</p>
              <p className="text-sm text-gray-500">{customerPhone}</p>
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
                  <p className="text-gray-900">{item.dishName}</p>
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

        {/* Action Buttons */}
        <div className="flex gap-3 pb-4">

          {/* Case 1: Active Order owned by user - Show Deliver */}
          {isActiveOrder && orderStatus !== 'DELIVERED' && orderStatus !== 'CANCELLED' && (
            <button
              onClick={handleDeliveredOrder}
              disabled={accepting}
              className={`flex-1 bg-green-600 text-white py-4 rounded-2xl hover:bg-green-700 transition-colors flex items-center justify-center gap-2 ${accepting ? 'opacity-70 cursor-not-allowed' : ''}`}
            >
              <Package className="w-5 h-5" />
              {accepting ? 'Updating...' : 'Mark Delivered'}
            </button>
          )}

          {/* Case 2: Other Order is Active - Prevent Accept */}
          {isOtherOrderActive && (
            <button
              disabled
              className="flex-1 bg-gray-300 text-gray-500 py-4 rounded-2xl cursor-not-allowed flex items-center justify-center gap-2"
            >
              <Package className="w-5 h-5" />
              Finish Active Order First
            </button>
          )}

          {/* Case 3: No Active Order - Allow Accept (if status is appropriate) */}
          {!activeOrderId && (orderStatus === 'AVAILABLE' || orderStatus === 'PLACED' || orderStatus === 'PREPARING') && (
            <button
              onClick={handleAcceptOrder}
              disabled={accepting}
              className={`flex-1 bg-orange-500 text-white py-4 rounded-2xl hover:bg-orange-600 transition-colors flex items-center justify-center gap-2 ${accepting ? 'opacity-70 cursor-not-allowed' : ''}`}
            >
              <Navigation className="w-5 h-5" />
              {accepting ? 'Accepting...' : 'Accept Order'}
            </button>
          )}

          {/* Fallback/Status display if delivered */}
          {orderStatus === 'DELIVERED' && (
            <div className="flex-1 bg-green-50 text-green-700 py-4 rounded-2xl flex items-center justify-center gap-2">
              Order Delivered
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
