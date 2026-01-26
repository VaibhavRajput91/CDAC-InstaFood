import { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router';
import { ArrowLeft, Save } from 'lucide-react';
import LoadingSkeleton from '../../../components/restaurant/UI/LoadingSkeleton';
import Toast from '../../../components/restaurant/UI/Toast';
import { restaurantAPI } from '../../../services/Restaurant/api';

export default function EditDish() {
  const { menuId, dishId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const dishFromState = location.state?.dish;

  // Debug: Log the parameters
  useEffect(() => {
    console.log('EditDish - menuId:', menuId, 'dishId:', dishId);
  }, [menuId, dishId]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    dishId: '',
    isAvailable: true,
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    fetchDishDetails();
  }, [menuId, dishId]);

  const fetchDishDetails = async () => {
    try {
      setLoading(true);

      // If dish data was passed through navigation state, use it
      if (dishFromState) {
        console.log('Using dish data from navigation state:', dishFromState);
        setFormData({
          name: dishFromState.name || '',
          description: dishFromState.description || '',
          price: dishFromState.price || '',
          isAvailable: (dishFromState.isAvailable ?? dishFromState.available) !== false,
          dishId: dishFromState.dishId ?? dishId,
        });
        return;
      }

      // Otherwise, fetch from API
      console.log('Fetching dish details - menuId:', menuId, 'dishId:', dishId);
      const response = await restaurantAPI.getDishDetails(menuId, dishId);
      console.log('Dish details response:', response.data);
      setFormData({
        name: response.data.name || '',
        description: response.data.description || '',
        price: response.data.price || '',
        isAvailable: (response.data.isAvailable ?? response.data.available) !== false,
        dishId: response.data.dishId ?? dishId,
      });
    } catch (error) {
      console.error('Error fetching dish details:', error);
      console.error('Error response:', error.response?.status, error.response?.data);
      setToast({
        message: 'Failed to load dish details. Using mock data.',
        type: 'error',
      });
      // Mock data
      setFormData({
        name: 'Margherita Pizza',
        description: 'Classic pizza with tomato sauce, mozzarella, and fresh basil',
        price: '12.99',
        isAvailable: true,
        dishId: dishId,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
    // Clear error for this field
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Dish name is required';
    }

    if (!formData.price || parseFloat(formData.price) <= 0) {
      newErrors.price = 'Valid price is required';
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      setToast({
        message: 'Please fix the errors in the form',
        type: 'error',
      });
      return;
    }

    try {
      setSaving(true);
      await restaurantAPI.updateDish(menuId, dishId, {
        dishId: formData.dishId,
        name: formData.name,
        description: formData.description,
        price: parseFloat(formData.price),
        isAvailable: !!formData.isAvailable,
      });

      setToast({
        message: 'Dish updated successfully',
        type: 'success',
      });

      // Navigate back after a short delay
      setTimeout(() => {
        navigate('/menu');
      }, 1500);
    } catch (error) {
      setToast({
        message: 'Failed to update dish',
        type: 'error',
      });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <h2 className="font-bold text-2xl text-gray-900">Edit Dish</h2>
        <LoadingSkeleton type="card" count={1} />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 py-8 px-4">
      <div className="w-full max-w-2xl space-y-6">
        <div className="flex items-center justify-start gap-4">
          <button
            onClick={() => navigate('/menu')}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-gray-600" />
          </button>
          <h2 className="font-bold text-2xl text-gray-900">Edit Dish</h2>
        </div>

        <form onSubmit={handleSubmit} className="w-full">
          <div className="bg-white rounded-lg shadow-md border border-orange-200 p-8 space-y-6 text-center">
            {/* Dish Name */}
            <div className="text-left">
              <label htmlFor="name" className="block font-medium text-gray-700 mb-2">
                Dish Name *
              </label>
              {/* hidden dishId so it is submitted with form updates */}
              <input type="hidden" name="dishId" value={formData.dishId} />
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                readOnly
                className={`w-full px-4 py-2 border rounded-lg bg-gray-100 cursor-not-allowed focus:ring-2 focus:ring-orange-500 focus:border-transparent ${errors.name ? 'border-red-500' : 'border-gray-300'
                  }`}
                placeholder="Enter dish name"
              />
              {errors.name && (
                <p className="mt-1 text-sm text-red-600">{errors.name}</p>
              )}
            </div>

            {/* Description */}
            <div className="text-left">
              <label htmlFor="description" className="block font-medium text-gray-700 mb-2">
                Description *
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={4}
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent ${errors.description ? 'border-red-500' : 'border-gray-300'
                  }`}
                placeholder="Describe your dish"
              />
              {errors.description && (
                <p className="mt-1 text-sm text-red-600">{errors.description}</p>
              )}
            </div>

            {/* Price */}
            <div className="grid grid-cols-1 gap-6 text-left">
              <div>
                <label htmlFor="price" className="block font-medium text-gray-700 mb-2">
                  Price (₹) *
                </label>
                <input
                  type="number"
                  id="price"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  step="0.01"
                  min="0"
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent ${errors.price ? 'border-red-500' : 'border-gray-300'
                    }`}
                  placeholder="0.00"
                />
                {errors.price && (
                  <p className="mt-1 text-sm text-red-600">{errors.price}</p>
                )}
              </div>
            </div>

            {/* Availability */}
            <div className="text-left">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  name="isAvailable"
                  checked={formData.isAvailable}
                  onChange={handleChange}
                  className="w-4 h-4 text-orange-600 border-gray-300 rounded focus:ring-orange-500"
                />
                <span className="font-medium text-gray-700">
                  Dish is available for ordering
                </span>
              </label>
            </div>

            {/* Actions */}
            <div className="flex gap-3 pt-4 justify-center">
              <button
                type="button"
                onClick={() => navigate('/restaurant/menu/dishes')}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                disabled={saving}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors disabled:opacity-50"
                disabled={saving}
              >
                <Save className="w-4 h-4" />
                {saving ? 'Saving...' : 'Save Changes'}
              </button>
            </div>
          </div>
        </form>

        {/* Toast Notification */}
        {toast && (
          <Toast
            message={toast.message}
            type={toast.type}
            onClose={() => setToast(null)}
          />
        )}
      </div>
    </div>
  );
}
