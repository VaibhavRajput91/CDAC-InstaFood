import { Link, Route, Routes, Navigate, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import Navbar from "../../components/common/Navbar/Navbar";
import Dashboard from "../../components/admin/Dashboard/Dashboard";
import Statistics from "../../components/admin/Statistics/Statistics";
import CustomerData from "../../components/admin/Statistics/SubStatistics/CustomerData";
import RestaurantData from "../../components/admin/Statistics/SubStatistics/RestaurantData";
import DeliveryData from "../../components/admin/Statistics/SubStatistics/DeliveryData";
import Approvals from "../../components/admin/Approvals/Approvals";
import RestaurantApprovals from "../../components/admin/Approvals/Restuarnat/RestaurantApprovals";
import DeliveryPartnerApprovals from "../../components/admin/Approvals/DeliveryPartner/DeliveryPartnerApproval";
import ViewRestaurantApplication from "../../components/admin/Approvals/Restuarnat/ViewApplication/ViewRestaurantApplication";
import ViewDeliveryPartnerApplication from "../../components/admin/Approvals/DeliveryPartner/ViewApplication/ViewDeliveryPartnerApplication";
import Profile from "../../components/admin/Profile/Profile"
import { getAdminProfile } from "../../services/admin/adminProfile";

function Admin() {
    const navigate = useNavigate();
    const [adminProfile, setAdminProfile] = useState(null);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    useEffect(() => {
        loadProfile();
    }, []);

    const loadProfile = async () => {
        const data = await getAdminProfile();
        if (data) {
            setAdminProfile(data);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/");
    };

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <nav className="w-full bg-red-600 shadow-lg sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        {/* Mobile menu button */}
                        <div className="flex md:hidden">
                            <button
                                onClick={toggleMenu}
                                className="inline-flex items-center justify-center p-2 rounded-md text-white hover:bg-red-700 focus:outline-none transition-colors duration-200"
                            >
                                {isMenuOpen ? (
                                    <X className="block h-6 w-6" aria-hidden="true" />
                                ) : (
                                    <Menu className="block h-6 w-6" aria-hidden="true" />
                                )}
                            </button>
                        </div>

                        {/* Logo */}
                        <div className="flex-shrink-0 flex items-center">
                            <span className="text-2xl font-bold text-white tracking-wider">
                                InstaFood
                            </span>
                        </div>

                        {/* Desktop Menu */}
                        <div className="hidden md:block">
                            <div className="ml-10 flex items-baseline space-x-4">
                                <Link to="/admin/dashboard" className="text-white hover:bg-red-700 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200">Home</Link>
                                <Link to="/admin/statistics" className="text-white hover:bg-red-700 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200">Statistics</Link>
                                <Link to="/admin/approvals" className="text-white hover:bg-red-700 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200">Approvals</Link>
                                <Link to="/admin/profile" className="text-white hover:bg-red-700 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200">Profile</Link>
                            </div>
                        </div>

                        {/* Right Side: Admin Name + Logout */}
                        <div className="flex items-center space-x-4">
                            {adminProfile && (
                                <span className="text-white font-medium hidden lg:inline">
                                    {adminProfile.firstName} {adminProfile.lastName}
                                </span>
                            )}
                            <button
                                onClick={handleLogout}
                                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-red-600 bg-white hover:bg-gray-100 transition-colors duration-200 focus:outline-none shadow-md"
                            >
                                Logout
                            </button>
                        </div>
                    </div>
                </div>

                {/* Mobile Menu */}
                <div className={`${isMenuOpen ? 'block' : 'hidden'} md:hidden bg-red-700 shadow-xl`}>
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                        <Link
                            to="/admin/dashboard"
                            onClick={() => setIsMenuOpen(false)}
                            className="text-white block px-3 py-2 rounded-md text-base font-medium hover:bg-red-800 transition-colors duration-200"
                        >
                            Home
                        </Link>
                        <Link
                            to="/admin/statistics"
                            onClick={() => setIsMenuOpen(false)}
                            className="text-white block px-3 py-2 rounded-md text-base font-medium hover:bg-red-800 transition-colors duration-200"
                        >
                            Statistics
                        </Link>
                        <Link
                            to="/admin/approvals"
                            onClick={() => setIsMenuOpen(false)}
                            className="text-white block px-3 py-2 rounded-md text-base font-medium hover:bg-red-800 transition-colors duration-200"
                        >
                            Approvals
                        </Link>
                        <Link
                            to="/admin/profile"
                            onClick={() => setIsMenuOpen(false)}
                            className="text-white block px-3 py-2 rounded-md text-base font-medium hover:bg-red-800 transition-colors duration-200"
                        >
                            Profile
                        </Link>
                        {adminProfile && (
                            <div className="pt-4 pb-3 border-t border-red-800">
                                <div className="flex items-center px-5 text-white font-medium">
                                    {adminProfile.firstName} {adminProfile.lastName}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </nav>


            <Routes>
                <Route
                    path="/"
                    element={<Navigate to="dashboard" />}
                />

                <Route
                    path="dashboard"
                    element={<Dashboard />}
                />

                <Route
                    path="statistics"
                    element={<Statistics />}
                />

                <Route
                    path="statistics/customer-data"
                    element={<CustomerData />}
                />

                <Route
                    path="statistics/restaurant-data"
                    element={<RestaurantData />}
                />

                <Route
                    path="statistics/delivery-data"
                    element={<DeliveryData />}
                />

                <Route
                    path="approvals"
                    element={<Approvals />}
                />

                <Route
                    path="approvals/restaurants"
                    element={<RestaurantApprovals />}
                />

                <Route
                    path="approvals/delivery-partners"
                    element={<DeliveryPartnerApprovals />}
                />

                <Route
                    path="approvals/restaurants/view-application/:id"
                    element={<ViewRestaurantApplication />}
                />

                <Route
                    path="approvals/delivery-partners/view-application/:id"
                    element={<ViewDeliveryPartnerApplication />}
                />

                <Route
                    path="profile"
                    element={<Profile />}
                />

            </Routes>

        </div>
    )
}

export default Admin