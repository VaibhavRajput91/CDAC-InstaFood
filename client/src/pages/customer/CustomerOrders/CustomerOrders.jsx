import React from 'react';
//import { useNavigate } from 'react-router-dom';
import CustomerNavbar from '../../../components/customer/CustomerNavbar/CustomerNavbar';
import './CustomerOrders.css';

function CustomerOrders() {
  //const navigate = useNavigate();

  
  const orders = [
    {
      id: 'ORD-12345',
      restaurantName: 'Spicy Delight',
      status: 'Delivered',
      image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=500&q=60',
      items: ['Chicken Biryani', 'Raita'],
      total: 450,
    },
    {
      id: 'ORD-12346',
      restaurantName: 'Pizza Paradise',
      status: 'In Transit',
      image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=500&q=60',
      items: ['Pepperoni Pizza', 'Coke'],
      total: 600,
    },
    {
      id: 'ORD-12347',
      restaurantName: 'Burger King',
      status: 'Cancelled',
      image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=500&q=60',
      items: ['Whopper Meal'],
      total: 350,
    },
    {
      id: 'ORD-12348',
      restaurantName: 'Sushi World',
      status: 'Processing',
      image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=500&q=60',
      items: ['Salmon Roll', 'Miso Soup'],
      total: 800,
    },
     {
      id: 'ORD-12349',
      restaurantName: 'Taco Bell',
      status: 'Delivered',
      image: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?auto=format&fit=crop&w=500&q=60',
      items: ['Tacos', 'Nachos'],
      total: 250,
    }
  ];

  // Sort orders according to status
  const statusPriority = {
    'In Transit': 1,
    'Processing': 2,
    'Delivered': 3,
    'Cancelled': 4
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
      case 'Delivered':
        return 'text-green-600 bg-green-100';
      case 'In Transit':
        return 'text-blue-600 bg-blue-100';
      case 'Cancelled':
        return 'text-red-600 bg-red-100';
      case 'Processing':
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
                   <span className="text-sm text-gray-500 font-medium">{order.id}</span>
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
      </main>
    </div>
  );
}

export default CustomerOrders;
