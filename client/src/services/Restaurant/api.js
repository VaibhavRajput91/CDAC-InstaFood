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

  getAdminApproveStatus: (restaurantId) =>
    api.get(`/restaurant/apply/approve?restaurantId=${restaurantId}`),

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
    api.get(`/restaurant/menu/dishes?restaurantId=${restaurantId}`),

  getMenuId: (restaurantId) =>
    api.get(`/restaurant/menu?restaurantId=${restaurantId}`),

  // Toggle dish availability
  toggleDish: (menuId, dishId) =>
    // Backend toggles availability via PUT /restaurant/menu/dishes?dishId={dishId}
    api.put(`/restaurant/menu/dishes?menuId=${menuId}&dishId=${dishId}`),

  // Delete dish
  deleteDish: (menuId, dishId) =>
    api.delete(`/restaurant/menu/dishes?menuId=${menuId}&dishId=${dishId}`),

  // Get dish details
  getDishDetails: (menuId, dishId) =>
    api.get(`/restaurant/menu/dishes/edit?menuId=${menuId}&dishId=${dishId}`),

  // Update dish
  updateDish: (menuId, dishId, data) =>
    api.patch(`/restaurant/menu/dishes/edit?menuId=${menuId}&dishid=${dishId}`, data),

  // Add new dish
  addDish: (menuId, data) =>
    api.post(`/restaurant/menu/dishes/add?menuId=${menuId}`, data),

  // Get categories (for dishes)
  getCategories: () =>
    api.get('/restaurant/menu/dishes/add/categories'),

  // Get orders
  getOrders: (size = 10) =>
    api.get(`/restaurant/orders?size=${size}`),

  // Get new placed orders for a restaurant
  getNewOrders: (restaurantId) =>
    api.get(`/restaurant/orders/new?restaurantId=${restaurantId}`),

  // Get completed orders
  getAllCompletedOrdersList: (restaurantId) =>
    api.get(`/restaurant/orders/completed?restaurantId=${restaurantId}`),

  // Toggle restaurant availability
  toggleRestaurantAvailability: (restaurantId) =>
    api.put(`/restaurant/availability?restaurantId=${restaurantId}`),
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
