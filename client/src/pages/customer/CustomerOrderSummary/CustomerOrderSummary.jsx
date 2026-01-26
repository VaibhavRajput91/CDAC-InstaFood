import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './CustomerOrderSummary.css';
import CustomerNavbar from '../../../components/customer/CustomerNavbar/CustomerNavbar';
import { getCustomerProfile } from '../../../services/customer/customerProfile';
import { placeOrder } from '../../../services/customer/customerPlaceOrder';
import { toast } from 'react-toastify';

function CustomerOrderSummary() {
  const location = useLocation();
  const navigate = useNavigate();
  
  const [orderItems] = useState(location.state?.orderItems || []);
  const [restaurantId] = useState(location.state?.restaurantId);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
        try {
            const userId = sessionStorage.getItem('userId');
            if (userId) {
                const response = await getCustomerProfile(userId);
                if (response) {
                    setUser(response);
                }
            }
        } catch (error) {
            console.error("Error fetching profile:", error);
            toast.error("Failed to load user details");
        } finally {
            setLoading(false);
        }
    };

    fetchProfile();
  }, []);

  // Calculate Total Bill
  const totalBill = orderItems.reduce((total, item) => total + item.price * item.quantity, 0);

  const handlePlaceOrder = async () => {
    if (!orderItems.length) {
        toast.warning("Your cart is empty");
        return;
    }

    try {
        const customerId = sessionStorage.getItem('userId');
        
        // Map items to the required format: { itemId: quantity }
        const itemMap = {};
        orderItems.forEach(item => {
            itemMap[item.id] = item.quantity;
        });

        const response = await placeOrder(
            restaurantId,
            customerId,
            itemMap,
            totalBill
        );

        if (response) {
            navigate('/customer/orders', { state: { orderSuccess: true } });
        }
    } catch (error) {
        console.error("Failed to place order:", error);
        toast.error("Failed to place order. Please try again.");
    }
  };

  const fullAddress = user ? [user.lineOne, user.lineTwo, user.city, user.state]
    .filter(part => part && part.trim() !== "")
    .join(", ") : "";

  return (
    <div className="min-h-screen bg-orange-50 font-sans">
      <CustomerNavbar />
      
      <div className="py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          
          <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">Order Summary</h1>

          <div className="bg-white rounded-xl shadow-sm border border-orange-100 overflow-hidden">
            
            {/* Order Items Section */}
            <div className="p-6 border-b border-orange-100">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Your Order</h2>
              <div className="space-y-4">
                {orderItems.map((item) => (
                  <div key={item.id} className="flex justify-between items-center">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center text-orange-600 font-bold text-sm">
                        {item.quantity}x
                      </div>
                      <span className="text-gray-700 font-medium">{item.name}</span>
                    </div>
                    <span className="text-gray-900 font-bold">₹{item.price * item.quantity}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* User Details & Address Section */}
            <div className="p-6 border-b border-orange-100 bg-orange-50/30">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Delivery Details</h2>
              {loading ? (
                <div className="flex justify-center py-4">
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-orange-500"></div>
                </div>
              ) : user ? (
                <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <p className="text-xs text-gray-500 uppercase font-bold tracking-wider">Customer Name</p>
                            <p className="font-medium text-gray-800">{user.firstName} {user.lastName}</p>
                        </div>
                        <div>
                            <p className="text-xs text-gray-500 uppercase font-bold tracking-wider">Phone Number</p>
                            <p className="font-medium text-gray-800">{user.phone}</p>
                        </div>
                    </div>
                    <div>
                        <p className="text-xs text-gray-500 uppercase font-bold tracking-wider">Delivery Address</p>
                        <div className="mt-1 text-gray-600 bg-white p-4 rounded-lg border border-orange-100 shadow-sm text-sm">
                            <p className="leading-relaxed">{fullAddress || 'Address not provided'}</p>
                            {user.postalCode && <p className="mt-1 font-bold">PIN: {user.postalCode}</p>}
                        </div>
                    </div>
                </div>
              ) : (
                <p className="text-red-500 text-sm">Failed to load delivery details. Please check your profile.</p>
              )}
            </div>

            {/* Total Bill Section */}
            <div className="p-6 bg-orange-50/50">
              <div className="flex justify-between items-center mb-6">
                <span className="text-xl font-bold text-gray-800">Total Bill Amount</span>
                <span className="text-2xl font-bold text-orange-600">₹{totalBill}</span>
              </div>

              {/* Place Order Button */}
              <button 
                onClick={handlePlaceOrder}
                disabled={loading || !user || !orderItems.length}
                className={`w-full font-bold py-4 px-6 rounded-lg shadow-lg transition-all duration-300 transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-offset-2 text-lg ${
                    loading || !user || !orderItems.length
                    ? 'bg-gray-400 cursor-not-allowed text-gray-200' 
                    : 'bg-green-600 hover:bg-green-700 text-white hover:shadow-green-600/30 focus:ring-green-500'
                }`}
              >
                {loading ? 'Processing...' : 'Place Order'}
              </button>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

export default CustomerOrderSummary;
