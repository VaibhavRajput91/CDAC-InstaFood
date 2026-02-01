import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { UtensilsCrossed } from 'lucide-react';
import Toast from '../../../components/restaurant/UI/Toast';
import { restaurantAPI } from '../../../services/Restaurant/api';

export default function RestaurantApply() {
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [toast, setToast] = useState(null);
  const [formData, setFormData] = useState({
    userId: '',
    restaurantName: '',
    openingTime: '',
    closingTime: '',
    status: 'PENDING',
    restaurantImage: '',
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.restaurantName.trim()) {
      newErrors.restaurantName = 'Restaurant name is required';
    }

    if (!formData.openingTime) {
      newErrors.openingTime = 'Opening time is required';
    } else {
      const [hours, minutes] = formData.openingTime.split(':').map(Number);
      if (hours < 0 || hours >= 24) {
        newErrors.openingTime = 'Hours must be between 0 and 23';
      } else if (minutes < 0 || minutes >= 60) {
        newErrors.openingTime = 'Minutes must be between 0 and 59';
      }
    }

    if (!formData.closingTime) {
      newErrors.closingTime = 'Closing time is required';
    } else {
      const [hours, minutes] = formData.closingTime.split(':').map(Number);
      if (hours < 0 || hours >= 24) {
        newErrors.closingTime = 'Hours must be between 0 and 23';
      } else if (minutes < 0 || minutes >= 60) {
        newErrors.closingTime = 'Minutes must be between 0 and 59';
      }
    }

    if (formData.openingTime && formData.closingTime && formData.openingTime >= formData.closingTime) {
      newErrors.closingTime = 'Closing time must be after opening time';
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
      setSubmitting(true);

      const submitData = {
        userId: sessionStorage.getItem('userId'),

        restaurantName: formData.restaurantName,
        openingTime: formData.openingTime,
        closingTime: formData.closingTime,
        status: formData.status,
        restaurantImage: formData.restaurantImage,
      };

      await restaurantAPI.apply(submitData);

      setSuccess(true);
      setToast({
        message: 'Application submitted successfully!',
        type: 'success',
      });

      // Reset form and navigate after delay
      setTimeout(() => {
        setFormData({
          userId: '',
          restaurantName: '',
          openingTime: '',
          closingTime: '',
          status: 'PENDING',
          restaurantImage: '',
        });
        setErrors({});
        setSuccess(false);
        navigate('/restaurant/apply/approve');
      }, 1500);
    } catch (error) {
      setToast({
        message: 'Failed to submit application. Please try again.',
        type: 'error',
      });
    } finally {
      setSubmitting(false);
    }
  };

  // Hide global navbar when this page mounts and restore on unmount
  useEffect(() => {
    const navs = Array.from(document.querySelectorAll('nav'));
    const hidden = [];
    navs.forEach((n) => {
      const cls = n.className || '';
      if (cls.includes('bg-red-600') || cls.includes('fixed bottom-0') || cls.includes('md:hidden')) {
        hidden.push({ el: n, original: n.style.display });
        n.style.display = 'none';
      }
    });
    return () => {
      hidden.forEach((h) => {
        h.el.style.display = h.original || '';
      });
    };
  }, []);

  if (success) {

  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-6">
      <div className="absolute right-6 top-6 z-50">
        <button
          onClick={() => {
            sessionStorage.clear();
            navigate('/');
          }}
          className="px-4 py-2 bg-white border border-orange-400 text-orange-600 rounded-lg shadow-sm hover:bg-orange-50"
        >
          Logout
        </button>
      </div>
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-500 rounded-lg flex items-center justify-center">
              <UtensilsCrossed className="w-6 h-6 text-white" />
            </div>
            <h1 className="font-bold text-3xl text-gray-900">Insta Food</h1>
          </div>
          <h2 className="font-semibold text-xl text-gray-700">
            Restaurant Partner Application
          </h2>
          <p className="text-gray-600 mt-2">
            Join our platform and start reaching more customers today
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
          <div className="space-y-6">
            {/* Restaurant Information */}
            <div>
              <h3 className="font-semibold text-lg text-gray-900 mb-4 pb-2 border-b border-gray-200">
                Restaurant Information
              </h3>
              <div className="space-y-4">
                <input
                  type="hidden"
                  id="userId"
                  name="userId"
                  value={formData.userId}
                  onChange={handleChange}
                />

                <div>
                  <label htmlFor="restaurantName" className="block font-medium text-gray-700 mb-2">
                    Restaurant Name *
                  </label>
                  <input
                    type="text"
                    id="restaurantName"
                    name="restaurantName"
                    value={formData.restaurantName}
                    onChange={handleChange}
                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent ${errors.restaurantName ? 'border-red-500' : 'border-gray-300'
                      }`}
                    placeholder="Enter restaurant name"
                  />
                  {errors.restaurantName && (
                    <p className="mt-1 text-sm text-red-600">{errors.restaurantName}</p>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="openingTime" className="block font-medium text-gray-700 mb-2">
                      Opening Time *
                    </label>
                    <input
                      type="time"
                      id="openingTime"
                      name="openingTime"
                      value={formData.openingTime}
                      onChange={handleChange}
                      className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent ${errors.openingTime ? 'border-red-500' : 'border-gray-300'}`}
                    />
                    {errors.openingTime && (
                      <p className="mt-1 text-sm text-red-600">{errors.openingTime}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="closingTime" className="block font-medium text-gray-700 mb-2">
                      Closing Time *
                    </label>
                    <input
                      type="time"
                      id="closingTime"
                      name="closingTime"
                      value={formData.closingTime}
                      onChange={handleChange}
                      className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent ${errors.closingTime ? 'border-red-500' : 'border-gray-300'}`}
                    />
                    {errors.closingTime && (
                      <p className="mt-1 text-sm text-red-600">{errors.closingTime}</p>
                    )}
                  </div>
                </div>

                <div>
                  <label htmlFor="restaurantImage" className="block font-medium text-gray-700 mb-2">
                    Restaurant Image (Banner/Logo)
                  </label>
                  <input
                    type="file"
                    id="restaurantImage"
                    name="restaurantImage"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files[0];
                      if (file) {
                        const reader = new FileReader();
                        reader.onloadend = () => {
                          setFormData(prev => ({ ...prev, restaurantImage: reader.result }));
                        };
                        reader.readAsDataURL(file);
                      }
                    }}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                  <p className="mt-1 text-xs text-gray-400">
                    Upload a high-quality image of your restaurant or logo
                  </p>
                </div>

                <input
                  type="hidden"
                  id="status"
                  name="status"
                  value={formData.status}
                />
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-6">
              <button
                type="submit"
                className="w-full px-6 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors disabled:opacity-50 font-medium"
                disabled={submitting}
              >
                {submitting ? 'Submitting Application...' : 'Submit Application'}
              </button>
            </div>
          </div>
        </form>
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
