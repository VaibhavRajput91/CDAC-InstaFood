import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, LogOut, Home, ShoppingBag, UtensilsCrossed, User, Power } from 'lucide-react';
import { restaurantAPI } from '../../../services/Restaurant/api';
import Toast from '../UI/Toast';

export default function RestaurantNavbar() {
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);
    const [isAvailable, setIsAvailable] = useState(true);
    const [toggleLoading, setToggleLoading] = useState(false);
    const [toast, setToast] = useState(null);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const handleToggleAvailability = async () => {
        try {
            setToggleLoading(true);
            const restaurantId = sessionStorage.getItem('restaurantId');
            if (!restaurantId) {
                setToast({
                    message: 'Restaurant ID not found',
                    type: 'error',
                });
                return;
            }

            const response = await restaurantAPI.toggleRestaurantAvailability(restaurantId);
            setIsAvailable((prev) => !prev);
            setToast({
                message: response.data?.data || 'Availability updated successfully',
                type: 'success',
            });
        } catch (error) {
            console.error('Toggle availability error:', error);
            setToast({
                message: 'Failed to update availability',
                type: 'error',
            });
        } finally {
            setToggleLoading(false);
        }
    };

    const handleLogout = () => {
        // Clear session storage
        sessionStorage.clear();
        // Redirect to login page
        navigate('/');
    };

    return (
        <>
            {/* TOP NAVBAR */}
            <nav className="w-full bg-gradient-to-r from-orange-600 to-red-600 shadow-md sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 py-4">
                    <div className="flex items-center justify-between">
                        {/* Logo */}
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
                                <UtensilsCrossed className="w-6 h-6 text-orange-600" />
                            </div>
                            <h1 className="text-2xl font-bold text-white hidden sm:block">InstaFood</h1>
                        </div>

                        {/* Desktop Menu */}
                        <ul className="hidden lg:flex items-center space-x-1">
                            <li>
                                <Link to="/restaurant" className="flex items-center gap-2 px-3 py-2 text-white hover:bg-white hover:bg-opacity-20 rounded-lg transition-colors">
                                    <Home className="w-5 h-5" />
                                    <span>Dashboard</span>
                                </Link>
                            </li>
                            <li>
                                <Link to="/restaurant/orders" className="flex items-center gap-2 px-3 py-2 text-white hover:bg-white hover:bg-opacity-20 rounded-lg transition-colors">
                                    <ShoppingBag className="w-5 h-5" />
                                    <span>Orders</span>
                                </Link>
                            </li>
                            <li>
                                <Link to="/restaurant/menu/dishes" className="flex items-center gap-2 px-3 py-2 text-white hover:bg-white hover:bg-opacity-20 rounded-lg transition-colors">
                                    <UtensilsCrossed className="w-5 h-5" />
                                    <span>Menu</span>
                                </Link>
                            </li>

                            <li>
                                <Link to="/restaurant/profile" className="flex items-center gap-2 px-3 py-2 text-white hover:bg-white hover:bg-opacity-20 rounded-lg transition-colors">
                                    <User className="w-5 h-5" />
                                    <span>Profile</span>
                                </Link>
                            </li>
                        </ul>

                        {/* Desktop Actions */}
                        <div className="hidden lg:flex items-center gap-4">
                            {/* Toggle Availability */}
                            <button
                                onClick={handleToggleAvailability}
                                disabled={toggleLoading}
                                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors font-medium ${isAvailable
                                    ? 'bg-green-500 text-white hover:bg-green-600'
                                    : 'bg-gray-500 text-white hover:bg-gray-600'
                                    } disabled:opacity-50`}
                                title={isAvailable ? 'Restaurant is open' : 'Restaurant is closed'}
                            >
                                <Power className="w-5 h-5" />
                                <span className="hidden sm:inline">{isAvailable ? 'Open' : 'Closed'}</span>
                            </button>
                            <button
                                onClick={handleLogout}
                                className="flex items-center gap-2 px-4 py-2 bg-white text-orange-600 rounded-lg hover:bg-gray-100 transition-colors font-medium"
                            >
                                <LogOut className="w-5 h-5" />
                                <span>Logout</span>
                            </button>
                        </div>

                        {/* Mobile Menu Button */}
                        <button
                            onClick={toggleMenu}
                            className="lg:hidden p-2 text-white hover:bg-white hover:bg-opacity-20 rounded-lg transition-colors"
                        >
                            {isOpen ? (
                                <X className="w-6 h-6" />
                            ) : (
                                <Menu className="w-6 h-6" />
                            )}
                        </button>
                    </div>

                    {/* Mobile Menu */}
                    {isOpen && (
                        <div className="lg:hidden mt-4 pb-4 border-t border-white border-opacity-20 pt-4">
                            <ul className="space-y-2">
                                <li>
                                    <Link
                                        to="/restaurant"
                                        className="flex items-center gap-2 px-3 py-2 text-white hover:bg-white hover:bg-opacity-20 rounded-lg transition-colors"
                                        onClick={() => setIsOpen(false)}
                                    >
                                        <Home className="w-5 h-5" />
                                        <span>Dashboard</span>
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        to="/restaurant/orders"
                                        className="flex items-center gap-2 px-3 py-2 text-white hover:bg-white hover:bg-opacity-20 rounded-lg transition-colors"
                                        onClick={() => setIsOpen(false)}
                                    >
                                        <ShoppingBag className="w-5 h-5" />
                                        <span>Orders</span>
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        to="/restaurant/menu/dishes"
                                        className="flex items-center gap-2 px-3 py-2 text-white hover:bg-white hover:bg-opacity-20 rounded-lg transition-colors"
                                        onClick={() => setIsOpen(false)}
                                    >
                                        <UtensilsCrossed className="w-5 h-5" />
                                        <span>Menu</span>
                                    </Link>
                                </li>

                                <li>
                                    <Link
                                        to="/restaurant/profile"
                                        className="flex items-center gap-2 px-3 py-2 text-white hover:bg-white hover:bg-opacity-20 rounded-lg transition-colors"
                                        onClick={() => setIsOpen(false)}
                                    >
                                        <User className="w-5 h-5" />
                                        <span>Profile</span>
                                    </Link>
                                </li>

                                <li className="pt-2 border-t border-white border-opacity-20">
                                    <button
                                        onClick={() => {
                                            handleToggleAvailability();
                                        }}
                                        disabled={toggleLoading}
                                        className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg transition-colors font-medium ${isAvailable
                                                ? 'bg-green-500 text-white hover:bg-green-600'
                                                : 'bg-gray-500 text-white hover:bg-gray-600'
                                            } disabled:opacity-50`}
                                    >
                                        <Power className="w-5 h-5" />
                                        <span>{isAvailable ? 'Open' : 'Closed'}</span>
                                    </button>
                                </li>

                                <li className="pt-2 border-t border-white border-opacity-20">
                                    <button
                                        onClick={() => {
                                            handleLogout();
                                            setIsOpen(false);
                                        }}
                                        className="w-full flex items-center gap-2 px-3 py-2 bg-white text-orange-600 rounded-lg hover:bg-gray-100 transition-colors font-medium"
                                    >
                                        <LogOut className="w-5 h-5" />
                                        <span>Logout</span>
                                    </button>
                                </li>
                            </ul>
                        </div>
                    )}
                </div>
            </nav>
            {toast && (
                <Toast
                    message={toast.message}
                    type={toast.type}
                    onClose={() => setToast(null)}
                />
            )}
        </>
    );
}
