import React, { useState } from 'react';
import axios from 'axios';
import { config } from '../../services/config';

const vehicleTypes = [
  'BICYCLE',
  'SCOOTER',
  'BIKE',
  'CAR',
  'EV',
  'OTHER'
];

export function Apply({ navigateTo }) {
  const [form, setForm] = useState({
    licenseNumber: '',
    model: '',
    vehicleType: 'BIKE'
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess(false);
    const userId = sessionStorage.getItem('userId');
    try {
      const res = await axios.post(`${config.server}/delivery/apply?userId=${userId}`, form);

      if (res.status === 200) {
        // Fetch the deliveryPartnerId after successful application
        try {
          const idRes = await axios.get(`${config.server}/delivery/delivery-id?userId=${userId}`);
          if (idRes.data) {
            sessionStorage.setItem('deliveryPartnerId', parseInt(idRes.data));
          }
        } catch (idErr) {
          console.error("Error fetching delivery ID after application", idErr);
        }

        setSuccess(true);
        setTimeout(() => {
          navigateTo && navigateTo('dashboard');
        }, 1500);
      }
    } catch (err) {
      setError('Failed to submit application');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-orange-50">
      <div className="w-full max-w-lg bg-white rounded-3xl shadow-lg p-8 border border-orange-100">
        <h2 className="text-2xl font-bold text-center text-orange-600 mb-8">Delivery Partner Application</h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm text-gray-600 mb-1">License Number</label>
            <input type="text" name="licenseNumber" value={form.licenseNumber} onChange={handleChange} className="w-full p-3 border rounded-lg" required />
          </div>
          <div>
            <label className="block text-sm text-gray-600 mb-1">Vehicle Type</label>
            <select name="vehicleType" value={form.vehicleType} onChange={handleChange} className="w-full p-3 border rounded-lg" required>
              <option value="">Select vehicle type</option>
              {vehicleTypes.map((type) => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm text-gray-600 mb-1">Vehicle Model</label>
            <input type="text" name="model" value={form.model} onChange={handleChange} className="w-full p-3 border rounded-lg" required />
          </div>
          {error && <div className="text-red-600 text-center">{error}</div>}
          {success && <div className="text-green-600 text-center">Application successful! Redirecting...</div>}
          <button type="submit" className="w-full py-3 bg-orange-500 text-white rounded-xl font-semibold hover:bg-orange-600 transition" disabled={loading}>
            {loading ? 'Submitting...' : 'Apply Now'}
          </button>
        </form>
      </div>
    </div>
  );
}
