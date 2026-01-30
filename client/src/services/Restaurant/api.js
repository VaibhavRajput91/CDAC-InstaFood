import axios from 'axios';

// Create axios instance with base configuration
const api = axios.create({
  baseURL: 'http://localhost:8080', // Replace with your actual API base URL
  headers: {
    'Content-Type': 'application/json',
  },
});

// Restaurant ID - In production, this would come from authentication
// For now, using a mock restaurant ID
export const RESTAURANT_ID = 1;
export const MENU_ID = 1;

// Restaurant API
export const restaurantAPI = {
  // Apply for restaurant
  apply: (data) => api.post('/restaurant/apply', data),

  // Get restaurant profile
  getProfile: (restaurantId) =>
    api.get(`/restaurant/profile/restaurantId?restaurantId=${restaurantId}`),

  // Update restaurant profile
  updateProfile: (restaurantId, data) =>
    api.patch(`/restaurant/profile/restaurantId/${restaurantId}`, data),

  // Get restaurant statistics
  getStatistics: (restaurantId) =>
    api.get(`/restaurant/statistics?restaurantId=${restaurantId}`),
  // Get dishes
  getDishes: (restaurantId) =>
    api.get(`/restaurant/menu/dishes?id=${restaurantId}`),

  // Toggle dish availability
  toggleDish: (dishId) =>
    // Backend toggles availability via PUT /restaurant/menu/dishes?dishId={dishId}
    api.put(`/restaurant/menu/dishes?dishId=${dishId}`),

  // Delete dish
  deleteDish: (menuId, dishId) =>
    api.delete(`/restaurant/menu?menuId=${menuId}&dishId=${dishId}`),

  // Get dish details
  getDishDetails: (menuId, dishId) =>
    api.get(`/restaurant/dish/menuId/dishId?menuId=${menuId}&dishId=${dishId}`),

  // Update dish
  updateDish: (menuId, dishId, data) =>
    api.patch(`/restaurant/dish/menuId/dishId?menuId=${menuId}&dishid=${dishId}`, data),

  // Get orders
  getOrders: (size = 10) =>
    api.get(`/restaurant/orders?size=${size}`),
};

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error);
    return Promise.reject(error);
  }
);

export default api;
