import { Edit2, Trash2 } from 'lucide-react';
import { ImageWithFallback } from '../../../components/restaurant/menu/ImageWithFallback';

export default function DishCard({ dish, onToggle, onEdit, onDelete }) {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
      {/* Dish Image */}
      <div className="relative h-48 bg-gradient-to-br from-orange-100 to-red-100">
        {dish.image ? (
          <img
            src={dish.image}
            alt={dish.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <span className="text-6xl">🍽️</span>
          </div>
        )}
        {!dish.available && (
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <span className="bg-red-600 text-white px-3 py-1 rounded-full text-sm font-medium">
              Unavailable
            </span>
          </div>
        )}
      </div>

      {/* Dish Info */}
      <div className="p-4">
        <div className="flex items-start justify-between mb-2">
          <div className="flex-1">
            <h3 className="font-semibold text-lg text-gray-900 mb-1">{dish.name}</h3>
          </div>
          <p className="font-bold text-xl text-orange-600">₹{dish.price}</p>
        </div>

        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {dish.description || 'No description available'}
        </p>

        {/* Actions */}
        <div className="flex items-center gap-3">
          {/* Toggle Switch */}
          <label className="flex items-center gap-2 cursor-pointer flex-1">
            <div className="relative">
              <input
                type="checkbox"
                checked={dish.available}
                onChange={() => onToggle(dish.dishId, dish.available)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-orange-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-500" />
            </div>
            <span className="text-sm text-gray-700">
              {dish.available ? 'Available' : 'Disabled'}
            </span>
          </label>

          {/* Edit Button */}
          <button
            onClick={() => onEdit(dish.dishId)}
            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
            title="Edit dish"
          >
            <Edit2 className="w-4 h-4" />
          </button>

          {/* Delete Button */}
          <button
            onClick={() => onDelete(dish)}
            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            title="Delete dish"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
