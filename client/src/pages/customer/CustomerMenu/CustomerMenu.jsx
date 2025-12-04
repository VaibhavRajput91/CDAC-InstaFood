import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './CustomerMenu.css';
import CustomerNavbar from '../../../components/customer/CustomerNavbar/CustomerNavbar';

const DISHES = [
  {
    id: 1,
    name: 'Margherita Pizza',
    description: 'Classic delight with 100% Real Mozzarella Cheese.',
    price: 150,
    image: null, 
  },
  {
    id: 2,
    name: 'Farmhouse Pizza',
    description: 'Delightful combination of onion, capsicum, tomato & grilled mushroom.',
    price: 200,
    image: null,
  },
  {
    id: 3,
    name: 'Veggie Paradise',
    description: 'Goldern Corn, Black Olives, Capsicum & Red Paprika.',
    price: 220,
    image: null,
  },
  {
    id: 4,
    name: 'Peppy Paneer',
    description: 'Chunky paneer with crisp capsicum and spicy red pepper.',
    price: 240,
    image: null,
  },
  {
    id: 5,
    name: 'Mexican Green Wave',
    description: 'A pizza loaded with crunchy onions, crisp capsicum, juicy tomatoes and jalapeno.',
    price: 260,
    image: null,
  },
  {
    id: 6,
    name: 'Deluxe Veggie',
    description: 'For a vegetarian looking for a BIG treat that goes easy on the spices.',
    price: 280,
    image: null,
  },
];

function CustomerMenu() {
  const [cart, setCart] = useState({});
  const navigate = useNavigate();

  const getQuantity = (id) => cart[id] || 0;

  const increment = (id) => {
    setCart((prev) => ({
      ...prev,
      [id]: (prev[id] || 0) + 1,
    }));
  };

  const decrement = (id) => {
    setCart((prev) => {
      const currentQty = prev[id] || 0;
      if (currentQty <= 0) return prev;
      const newQty = currentQty - 1;
      const newCart = { ...prev, [id]: newQty };
      if (newQty === 0) delete newCart[id];
      return newCart;
    });
  };

  return (
    <div className="min-h-screen bg-orange-50 font-sans">
      <CustomerNavbar />
      <div className="py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="bg-white rounded-xl shadow-sm border border-orange-100 p-4 mb-6 text-center relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-orange-400 to-red-500"></div>
          <h1 className="text-2xl font-bold text-gray-900">Restaurant Name</h1>
          <p className="text-orange-600 mt-1 font-medium text-sm">Delicious food delivered to you</p>
        </div>

        {/* Menu Items Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-20">
          {DISHES.map((dish) => (
            <div key={dish.id} className="bg-white border border-orange-100 rounded-lg p-3 shadow-sm hover:shadow-md transition-all duration-300 flex flex-row items-center gap-3 group">
              
              {/* Dish Image/Placeholder */}
              <div className="h-16 w-16 flex-shrink-0 rounded-md bg-orange-100 flex items-center justify-center text-orange-500 text-xs font-bold overflow-hidden group-hover:scale-105 transition-transform duration-300">
                {dish.image ? (
                  <img src={dish.image} alt={dish.name} className="h-full w-full object-cover" />
                ) : (
                  <span className="text-center px-1">{dish.name}</span>
                )}
              </div>

              {/* Dish Info */}
              <div className="flex-1 w-full min-w-0">
                <div className="flex justify-between items-start">
                  <h3 className="text-base font-bold text-gray-800 group-hover:text-orange-600 transition-colors truncate pr-2">{dish.name}</h3>
                  <span className="text-base font-bold text-orange-600 whitespace-nowrap">₹{dish.price}</span>
                </div>
                <p className="text-xs text-gray-500 mt-0.5 line-clamp-2">{dish.description}</p>
                
                {/* Controls */}
                <div className="flex items-center justify-end mt-2">
                  <div className="flex items-center bg-orange-50 rounded border border-orange-200 h-7">
                    <button
                      onClick={() => decrement(dish.id)}
                      className="w-7 h-full flex items-center justify-center text-orange-600 hover:bg-orange-100 rounded-l transition-colors focus:outline-none"
                      aria-label="Decrease quantity"
                    >
                      -
                    </button>
                    <span className="w-6 text-center font-semibold text-gray-900 text-xs">{getQuantity(dish.id)}</span>
                    <button
                      onClick={() => increment(dish.id)}
                      className="w-7 h-full flex items-center justify-center text-orange-600 hover:bg-orange-100 rounded-r transition-colors focus:outline-none"
                      aria-label="Increase quantity"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Footer / Checkout */}
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-orange-100 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] p-4 z-10">
          <div className="max-w-7xl mx-auto flex justify-between items-center">
            <div className="text-gray-600">
               <span className="font-bold text-gray-900">{Object.values(cart).reduce((a, b) => a + b, 0)}</span> Items added
            </div>
            <button 
              onClick={() => {
                const orderItems = DISHES.filter(dish => cart[dish.id]).map(dish => ({
                  ...dish,
                  quantity: cart[dish.id]
                }));
                navigate('/customer/order-summary', { state: { orderItems } });
              }}
              className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-8 rounded-lg shadow-lg hover:shadow-orange-500/30 transition-all duration-300 transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500">
              Checkout
            </button>
          </div>
        </div>

      </div>
      </div>
    </div>
  );
}

export default CustomerMenu;
