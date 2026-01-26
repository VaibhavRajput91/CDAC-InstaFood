import React, { useState, useEffect } from 'react';
//import { useNavigate } from 'react-router-dom';
import CustomerNavbar from '../../../components/customer/CustomerNavbar/CustomerNavbar';
import { getCustomerOrders } from '../../../services/customer/customerOrders';
import './CustomerOrders.css';

function CustomerOrders() {
  //const navigate = useNavigate();

  
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const userId = sessionStorage.getItem('userId') || 2; // Default to 2 if not found
        const response = await getCustomerOrders(userId);
        
        if (response) {
          // Map API response to UI structure
          // API returns array of objects: { restaurantName, deliveryName, orderDate, totalAmount, dishesWithQuantities, orderStatus }
          // We need: { id, restaurantName, status, image, items, total }
          
          const mappedOrders = response.map((order, index) => ({
            id: order.orderId || `ORD-${Date.now()}-${index}`, // Fallback ID
            restaurantName: order.restaurantName,
            status: order.orderStatus,
            image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=500&q=60', // Placeholder
            items: Object.entries(order.dishesWithQuantities || {}).map(([dish, qty]) => `${qty}x ${dish}`),
            total: order.totalAmount,
            date: order.orderDate
          }));

          // Sort by date (newest first) or status if needed. 
          // Here keeping the status priority logic or just displaying as is. 
          // Let's sort by date for now, or just reverse to show newest.
          setOrders(mappedOrders.reverse());
        }
      } catch (error) {
        console.error("Failed to fetch orders", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  // Sort orders according to status - Optional, can be re-enabled if client wants specific sorting
  const statusPriority = {
    'PLACED': 1,
    'ACCEPTED': 2,
    'PREPARING': 3,
    'OUT_FOR_DELIVERY': 4,
    'DELIVERED': 5,
    'CANCELLED': 6
  };

  const sortedOrders = [...orders].sort((a, b) => {
    const priorityA = statusPriority[a.status] || 99;
    const priorityB = statusPriority[b.status] || 99;
    return priorityA - priorityB;
  });

  // const handleOrderClick = (orderId) => {
  //   // Navigate to detailed order view (to be implemented later )
  //   console.log(`Navigating to details for order: ${orderId}`);
  //   navigate(`/orders/${orderId}`);
  // };

  const getStatusColor = (status) => {
    switch (status) {
      case 'DELIVERED':
        return 'text-green-600 bg-green-100';
      case 'OUT_FOR_DELIVERY':
        return 'text-blue-600 bg-blue-100';
      case 'CANCELLED':
        return 'text-red-600 bg-red-100';
      case 'PLACED':
      case 'ACCEPTED':
      case 'PREPARING':
        return 'text-yellow-600 bg-yellow-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="customer-orders-page bg-orange-50 min-h-screen">
      <CustomerNavbar />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">My Orders</h1>
        
        {loading ? (
             <div className="flex justify-center items-center h-64">
                 <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
             </div>
        ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedOrders.map((order) => (
            <div 
              key={order.id} 
              className="order-card bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 cursor-pointer overflow-hidden border border-orange-100"
              // onClick={() => handleOrderClick(order.id)}
            >
              <div className="relative h-48">
                <img 
                  src={order.image} 
                  alt={order.restaurantName} 
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-0 right-0 m-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(order.status)}`}>
                    {order.status}
                  </span>
                </div>
              </div>
              
              <div className="p-5">
                <div className="flex justify-between items-start mb-2">
                   <h3 className="text-xl font-bold text-gray-800">{order.restaurantName}</h3>
                   <div className="text-right">
                     <span className="text-sm text-gray-500 font-medium block">{order.id}</span>
                     <span className="text-xs text-gray-400">{order.date}</span>
                   </div>
                </div>
                
                <p className="text-gray-600 text-sm mb-4 line-clamp-1">
                    {order.items.join(', ')}
                </p>

                <div className="pt-4 border-t border-orange-100 flex justify-between items-center text-sm">
                    <span className="text-gray-500">Total Bill</span>
                    <span className="font-bold text-gray-900">₹{order.total}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
        )}
      </main>
    </div>
  );
}

export default CustomerOrders;
