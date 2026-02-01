import { useState, useEffect } from 'react';
import { IndianRupee, ShoppingBag, TrendingUp } from 'lucide-react';
import LoadingSkeleton from '../../../components/restaurant/UI/LoadingSkeleton';
import Toast from '../../../components/restaurant/UI/Toast';
import { restaurantAPI } from '../../../services/Restaurant/api';

export default function Dashboard() {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState(null);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    fetchStatistics();
  }, []);

  const fetchStatistics = async () => {
    try {
      setLoading(true);
      const RESTAURANT_ID = sessionStorage.getItem('restaurantId');
      if (!RESTAURANT_ID) {
        throw new Error("Restaurant ID missing");
      }
      const response = await restaurantAPI.getStatistics(RESTAURANT_ID);
      setStats(response.data);
    } catch (error) {
      setToast({
        message: 'Failed to load statistics. Using mock data.',
        type: 'error',
      });
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <>
        <div className="max-w-7xl mx-auto px-4 py-8 space-y-6">
          <h2 className="font-bold text-2xl text-gray-900">Dashboard Overview</h2>
          <LoadingSkeleton type="card" count={4} />
        </div>
      </>
    );
  }


  return (
    <>
      <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-bold text-3xl text-gray-900">Restaurant Overview</h2>
            {/* <p className="text-gray-600 mt-1">Monitor your restaurant's performance</p> */}
          </div>
          <button
            onClick={fetchStatistics}
            className="px-6 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors font-medium"
          >
            Refresh Data
          </button>
        </div>

        {/* Statistics Cards - Horizontal Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-semibold text-gray-700">Total Orders</h3>
              <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                <ShoppingBag className="w-5 h-5 text-orange-600" />
              </div>
            </div>
            <div className="space-y-1">
              <p className="text-3xl font-bold text-gray-900">{stats?.totalOrders || 0}</p>
              <p className="text-green-600 font-medium text-sm">Orders Received</p>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-semibold text-gray-700">Total Revenue</h3>
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <IndianRupee className="w-5 h-5 text-green-600" />
              </div>
            </div>
            <div className="space-y-1">
              <p className="text-3xl font-bold text-gray-900">₹{(stats?.totalRevenue || 0).toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
              <p className="text-green-600 font-medium text-sm">Amount in Rupees</p>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-semibold text-gray-700">Average Rating</h3>
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-purple-600" />
              </div>
            </div>
            <div className="space-y-1">
              <p className="text-3xl font-bold text-gray-900">{stats?.averageRating ? stats.averageRating.toFixed(1) : '1.0'}/5</p>
              {/* <p className="text-gray-500 text-sm">customer satisfaction</p> */}
              <p className="text-green-600 font-medium text-sm">Customer Satisfaction</p>
            </div>
          </div>
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
    </>
  );
}
