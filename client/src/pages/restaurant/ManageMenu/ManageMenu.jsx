import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { Search, Edit2, Trash2, Plus, UtensilsCrossed } from 'lucide-react';
import DishCard from '../../../components/restaurant/menu/DishCard';
import LoadingSkeleton from '../../../components/restaurant/UI/LoadingSkeleton';
import EmptyState from '../../../components/restaurant/UI/EmptyState';
import ConfirmModal from '../../../components/restaurant/UI/ConfirmModal';
import Toast from '../../../components/restaurant/UI/Toast';
import { restaurantAPI, MENU_ID, RESTAURANT_ID } from '../../../services/Restaurant/api';


export default function MenuDishes() {
  const navigate = useNavigate();
  const [dishes, setDishes] = useState([]);
  const [filteredDishes, setFilteredDishes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm] = useState('');
  const [deleteModal, setDeleteModal] = useState({ isOpen: false, dish: null });
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    fetchDishes();
  }, []);

  useEffect(() => {
    if (searchTerm) {
      setFilteredDishes(
        dishes.filter((dish) =>
          dish.name.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    } else {
      setFilteredDishes(dishes);
    }
  }, [searchTerm, dishes]);

  const fetchDishes = async () => {
    try {
      setLoading(true);
      const response = await restaurantAPI.getDishes(RESTAURANT_ID);
      console.log('API Response:', response);
      console.log('Response Data:', response.data);

      // Handle both direct array and wrapped response
      const dishes = Array.isArray(response.data) ? response.data : response.data?.data || [];
      console.log('Processed dishes:', dishes);

      // Map field names if needed (check first dish structure)
      if (dishes.length > 0) {
        console.log('First dish structure:', Object.keys(dishes[0]), dishes[0]);
      }

      setDishes(dishes);
      setFilteredDishes(dishes);
    } catch (error) {
      console.error('Fetch error:', error);
      setToast({
        message: 'Failed to load dishes. Using mock data.',
        type: 'error',
      });
      // Mock data on error
      const mockDishes = [];
      setDishes(mockDishes);
      setFilteredDishes(mockDishes);
    } finally {
      setLoading(false);
    }
  };

  const handleToggleAvailability = async (dishId, currentStatus) => {
    try {
      const response = await restaurantAPI.toggleDish(dishId);
      console.log('Toggle response:', response);

      if (response.status === 200) {
        // Update local state to reflect new availability
        setDishes((prevDishes) =>
          prevDishes.map((dish) =>
            dish.dishId === dishId ? { ...dish, available: !currentStatus } : dish
          )
        );

        setToast({
          message: response.data?.message || `Dish ${!currentStatus ? 'enabled' : 'disabled'} successfully`,
          type: 'success',
        });
      } else {
        setToast({
          message: 'Failed to update dish availability',
          type: 'error',
        });
      }
    } catch (error) {
      console.error('Toggle error:', error);
      setToast({
        message: 'Failed to update dish availability',
        type: 'error',
      });
    }
  };

  const handleDeleteClick = (dish) => {
    setDeleteModal({ isOpen: true, dish });
  };

  const handleDeleteConfirm = async () => {
    if (!deleteModal.dish) return;

    try {
      setDeleteLoading(true);
      await restaurantAPI.deleteDish(MENU_ID, deleteModal.dish.dishId);

      // Remove from list
      setDishes((prevDishes) =>
        prevDishes.filter((dish) => dish.dishId !== deleteModal.dish.dishId)
      );

      setToast({
        message: 'Dish deleted successfully',
        type: 'success',
      });

      setDeleteModal({ isOpen: false, dish: null });
    } catch {
      setToast({
        message: 'Failed to delete dish',
        type: 'error',
      });
    } finally {
      setDeleteLoading(false);
    }
  };

  const handleEdit = (dishId) => {
    // Find the dish object from the filtered dishes
    const dishToEdit = filteredDishes.find(dish => dish.dishId === dishId);
    navigate(`/restaurant/dish/edit/${MENU_ID}/${dishId}`, { state: { dish: dishToEdit } });
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <h2 className="font-bold text-2xl text-gray-900">Menu Management</h2>
        <LoadingSkeleton type="table" count={5} />
      </div>
    );
  }

  return (
    <>

      <br />
      <div className="space-y-6 pl-4 sm:pl-6 lg:pl-8">
        <div className="flex items-center justify-between">
          <h2 className="font-bold text-2xl text-gray-900">Menu Management</h2>
          <button className="flex items-center gap-2 px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors">
            <Plus className="w-4 h-4" />
            Add New Dish
          </button>
        </div>

        {/* Dishes List */}
        {filteredDishes.length === 0 ? (
          <EmptyState
            icon={UtensilsCrossed}
            title="No dishes found"
            description={
              searchTerm
                ? 'No dishes match your search. Try different keywords.'
                : 'Start by adding your first dish to the menu.'
            }
            action={
              !searchTerm && (
                <button className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors">
                  Add First Dish
                </button>
              )
            }
          />
        ) : (
          <div className="mx-4 sm:mx-6 lg:mx-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 auto-rows-max">
              {filteredDishes.map((dish) => (
                <DishCard
                  key={dish.dishId}
                  dish={dish}
                  onToggle={handleToggleAvailability}
                  onEdit={handleEdit}
                  onDelete={handleDeleteClick}
                />
              ))}
            </div>
          </div>
        )}

        {/* Delete Confirmation Modal */}
        <ConfirmModal
          isOpen={deleteModal.isOpen}
          onClose={() => setDeleteModal({ isOpen: false, dish: null })}
          onConfirm={handleDeleteConfirm}
          title="Delete Dish"
          message={`Are you sure you want to delete "${deleteModal.dish?.name}"? This action cannot be undone.`}
          loading={deleteLoading}
        />

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
