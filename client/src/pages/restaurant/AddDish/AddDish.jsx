import React, { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { restaurantAPI } from '../../../services/Restaurant/api'
import Toast from '../../../components/restaurant/UI/Toast'


export default function AddDish() {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [isAvailable] = useState(true);
  const [toast, setToast] = useState(null);
  const fileInputRef = useRef(null);

  const handleImageClick = () => {
    fileInputRef.current?.click();
  }

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setImagePreview(reader.result);
    reader.readAsDataURL(file);
  }

  useEffect(() => {
    // Fetch categories for selection (fallbacks are handled silently)
    const fetchCategories = async () => {
      try {
        const resp = await restaurantAPI.getCategories();
        const data = resp?.data || [];
        setCategories(Array.isArray(data) ? data : data?.data || []);
      } catch (err) {
        console.warn('Failed to load categories', err);
      }
    }
    fetchCategories();
  }, []);

  const toggleCategory = (id) => {
    setSelectedCategories((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setSubmitting(true);
      const MENU_ID = sessionStorage.getItem('menuId');

      if (!MENU_ID || MENU_ID === 'null') {
        throw new Error('Menu ID not found. Please go to Menu page first.');
      }

      const payload = {
        name: name,
        description: description,
        price: parseFloat(price),
        isAvailable: isAvailable,
        categoryIds: selectedCategories, // Array of category IDs (backend expects categoryIds)
      };

      await restaurantAPI.addDish(MENU_ID, payload);

      setToast({
        message: 'Dish Added successfully',
        type: 'success',
      });

      // Navigate back after a short delay
      setTimeout(() => {
        navigate('/restaurant/menu/dishes');
      }, 1500);
    } catch (err) {
      console.error('Add dish error:', err);
      setToast({
        message: 'Failed to add dish. ' + (err.response?.data?.message || err.message),
        type: 'error',
      });
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex justify-center px-4 py-12">
        <div className="w-full max-w-md bg-white shadow-lg rounded-xl p-8 border border-orange-100">
          <h5 className="text-center text-2xl font-extrabold text-gray-900 tracking-wide mb-6">
            Add New Dish
          </h5>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* <div className="flex flex-col items-center">
              <button type="button" onClick={handleImageClick} className="w-28 h-28 bg-orange-50 border-2 border-orange-200 rounded-full flex items-center justify-center cursor-pointer hover:bg-orange-100 transition">
                {imagePreview ? (
                  <img src={imagePreview} alt="preview" className="w-28 h-28 rounded-full object-cover" />
                ) : (
                  <span className="text-orange-400 text-sm">Add Image</span>
                )}
              </button>
              <input ref={fileInputRef} type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
              <p className="text-xs text-gray-400 mt-2">Optional: Upload a clear image of the dish</p>
            </div> */}

            <div>
              <label className="text-sm text-gray-600">Dish Name</label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                type="text"
                placeholder="e.g. Classic Pizza"
                required
                className="mt-1 w-full p-3 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-300"
              />
            </div>

            <div>
              <label className="text-sm text-gray-600">Categories: -</label>
              <div className="mt-2 grid grid-cols-3 gap-3 p-3 bg-gray-50 rounded-md border border-gray-100">
                {categories.length === 0 ? (
                  <p className="text-sm text-gray-400">No categories available</p>
                ) : (
                  categories.map((c) => (
                    <label key={c.id || c.category_id || c.categoryId} className="flex items-center gap-2 text-sm cursor-pointer hover:text-orange-600">
                      <input
                        type="checkbox"
                        checked={selectedCategories.includes(c.id ?? c.category_id ?? c.categoryId)}
                        onChange={() => toggleCategory(c.id ?? c.category_id ?? c.categoryId)}
                        className="form-checkbox cursor-pointer"
                      />
                      <span className="text-gray-700">{c.name}</span>
                    </label>
                  ))
                )}
              </div>
            </div>

            <div>
              <label className="text-sm text-gray-600">Description</label>
              <input
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                type="text"
                placeholder="Short description (optional)"
                className="mt-1 w-full p-3 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-300"
              />
            </div>

            <div>
              <label className="text-sm text-gray-600">Price</label>
              <input
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                type="number" step="any"
                placeholder="0.00"
                required
                className="mt-1 w-full p-3 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-300"
              />
            </div>

            <div className="flex gap-3">
              <button type="button" onClick={() => navigate('/restaurant/menu/dishes')} className="flex-1 bg-gray-400 hover:bg-gray-500 text-white py-3 rounded-md font-semibold">
                Cancel
              </button>
              <button disabled={submitting} type="submit" className="flex-1 bg-green-600 hover:bg-green-700 text-white py-3 rounded-md font-semibold disabled:opacity-60">
                {submitting ? 'Saving...' : 'Save Dish'}
              </button>
            </div>
          </form>

          {toast && (
            <Toast
              message={toast.message}
              type={toast.type}
              onClose={() => setToast(null)}
            />
          )}
        </div>
      </div>
    </div>
  )
}
