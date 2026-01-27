import { useState } from 'react';
import { useNavigate } from 'react-router';
import { UtensilsCrossed, CheckCircle } from 'lucide-react';
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
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error for this field
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

    // if (!formData.ownerName.trim()) {
    //   newErrors.ownerName = 'Owner name is required';
    // }

    // if (!formData.email.trim() || !/\S+@\S+\.\S+/.test(formData.email)) {
    //   newErrors.email = 'Valid email is required';
    // }

    // if (!formData.phone.trim()) {
    //   newErrors.phone = 'Phone number is required';
    // }

    // if (!formData.address.trim()) {
    //   newErrors.address = 'Address is required';
    // }

    // if (!formData.city.trim()) {
    //   newErrors.city = 'City is required';
    // }

    // if (!formData.state.trim()) {
    //   newErrors.state = 'State is required';
    // }

    // if (!formData.cuisineType.trim()) {
    //   newErrors.cuisineType = 'Cuisine type is required';
    // }

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

      // Transform form data to match backend DTO
      const submitData = {
        userId: sessionStorage.getItem('userId'),
        // userId: formData.userId ? parseInt(formData.userId) : null,
        restaurantName: formData.restaurantName,
        openingTime: formData.openingTime,
        closingTime: formData.closingTime,
        status: formData.status,
      };

      await restaurantAPI.apply(submitData);

      setSuccess(true);
      setToast({
        message: 'Application submitted successfully!',
        type: 'success',
      });

      // Reset form after short delay
      setTimeout(() => {
        navigate('/');
      }, 3000);
    } catch (error) {
      setToast({
        message: 'Failed to submit application. Please try again.',
        type: 'error',
      });
    } finally {
      setSubmitting(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
        <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-12 text-center max-w-md">
          <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-12 h-12 text-green-600" />
          </div>
          <h2 className="font-bold text-2xl text-gray-900 mb-4">
            Application Submitted!
          </h2>
          <p className="text-gray-600 mb-6">
            Thank you for applying to join Insta Food. We'll review your application and get back to you within 2-3 business days.
          </p>
          <button
            onClick={() => navigate('/')}
            className="px-6 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors"
          >
            Go to Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-6">
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

                <input
                  type="hidden"
                  id="status"
                  name="status"
                  value={formData.status}
                />

                {/* <div>
                  <label htmlFor="cuisineType" className="block font-medium text-gray-700 mb-2">
                    Cuisine Type *
                  </label>
                  <input
                    type="text"
                    id="cuisineType"
                    name="cuisineType"
                    value={formData.cuisineType}
                    onChange={handleChange}
                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent ${errors.cuisineType ? 'border-red-500' : 'border-gray-300'
                      }`}
                    placeholder="e.g., Italian, Chinese, Mexican"
                  />
                  {errors.cuisineType && (
                    <p className="mt-1 text-sm text-red-600">{errors.cuisineType}</p>
                  )}
                </div> */}

                {/* <div>
                  <label htmlFor="description" className="block font-medium text-gray-700 mb-2">
                    Restaurant Description
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    rows={3}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    placeholder="Tell us about your restaurant"
                  />
                </div> */}
              </div>
            </div>

            {/* Owner Details
            <div>
              <h3 className="font-semibold text-lg text-gray-900 mb-4 pb-2 border-b border-gray-200">
                Owner Details
              </h3>
              <div className="space-y-4">
                <div>
                  <label htmlFor="ownerName" className="block font-medium text-gray-700 mb-2">
                    Owner Name *
                  </label>
                  <input
                    type="text"
                    id="ownerName"
                    name="ownerName"
                    value={formData.ownerName}
                    onChange={handleChange}
                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent ${errors.ownerName ? 'border-red-500' : 'border-gray-300'
                      }`}
                    placeholder="Enter owner name"
                  />
                  {errors.ownerName && (
                    <p className="mt-1 text-sm text-red-600">{errors.ownerName}</p>
                  )}
                </div>
              </div>
            </div> */}

            {/* Contact Information */}
            {/* <div>
              <h3 className="font-semibold text-lg text-gray-900 mb-4 pb-2 border-b border-gray-200">
                Contact Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="email" className="block font-medium text-gray-700 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent ${errors.email ? 'border-red-500' : 'border-gray-300'
                      }`}
                    placeholder="email@example.com"
                  />
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="phone" className="block font-medium text-gray-700 mb-2">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent ${errors.phone ? 'border-red-500' : 'border-gray-300'
                      }`}
                    placeholder="+1 (555) 123-4567"
                  />
                  {errors.phone && (
                    <p className="mt-1 text-sm text-red-600">{errors.phone}</p>
                  )}
                </div>
              </div>
            </div> */}

            {/* Address */}
            {/* <div>
              <h3 className="font-semibold text-lg text-gray-900 mb-4 pb-2 border-b border-gray-200">
                Address
              </h3>
              <div className="space-y-4">
                <div>
                  <label htmlFor="address" className="block font-medium text-gray-700 mb-2">
                    Street Address *
                  </label>
                  <input
                    type="text"
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent ${errors.address ? 'border-red-500' : 'border-gray-300'
                      }`}
                    placeholder="123 Main Street"
                  />
                  {errors.address && (
                    <p className="mt-1 text-sm text-red-600">{errors.address}</p>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label htmlFor="city" className="block font-medium text-gray-700 mb-2">
                      City *
                    </label>
                    <input
                      type="text"
                      id="city"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent ${errors.city ? 'border-red-500' : 'border-gray-300'
                        }`}
                      placeholder="City"
                    />
                    {errors.city && (
                      <p className="mt-1 text-sm text-red-600">{errors.city}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="state" className="block font-medium text-gray-700 mb-2">
                      State *
                    </label>
                    <input
                      type="text"
                      id="state"
                      name="state"
                      value={formData.state}
                      onChange={handleChange}
                      className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent ${errors.state ? 'border-red-500' : 'border-gray-300'
                        }`}
                      placeholder="State"
                    />
                    {errors.state && (
                      <p className="mt-1 text-sm text-red-600">{errors.state}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="zipCode" className="block font-medium text-gray-700 mb-2">
                      ZIP Code
                    </label>
                    <input
                      type="text"
                      id="zipCode"
                      name="zipCode"
                      value={formData.zipCode}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      placeholder="12345"
                    />
                  </div>
                </div>
              </div>
            </div> */}

            {/* Submit Button */}
            <div className="pt-6">
              <button
                type="submit"
                className="w-full px-6 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors disabled:opacity-50 font-medium"
                disabled={submitting}
              >
                {submitting ? 'Submitting Application...' : 'Submit Application'}
              </button>
              <p className="text-center text-sm text-gray-600 mt-4">
                Already have an account?{' '}
                <a href="/" className="text-orange-600 hover:text-orange-700 font-medium">
                  Go to Dashboard
                </a>
              </p>
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
