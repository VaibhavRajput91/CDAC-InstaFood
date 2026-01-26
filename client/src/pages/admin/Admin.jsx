import { Link, Route, Routes, Navigate } from "react-router-dom";
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

function Admin() {
    return (
        <div>
            <nav className="w-full bg-red-600 shadow-sm sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 flex items-center justify-center py-4 md:justify-between md:py-3">

                    {/* CENTER LOGO ON MOBILE */}
                    <div className="text-2xl m-px font-semibold text-white absolute left-1/2 -translate-x-1/2 md:static md:translate-x-0">
                        InstaFood
                    </div>

                    {/* Desktop Menu */}
                    {/* We can add more links accordingly or maybe use conditional rendering to display different navbar for different user roles */}
                    <ul className="hidden md:flex space-x-8 text-white">
                        <li><Link to="/admin/dashboard" className="hover:text-gray-900">Home</Link></li>
                        <li><Link to="/admin/statistics" className="hover:text-gray-900">Statistics</Link></li>
                        <li><Link to="/admin/approvals" className="hover:text-gray-900">Approvals</Link></li>
                        <li><Link to="/admin/profile" className="hover:text-gray-900">Profile</Link></li>
                    </ul>

                    {/* Desktop Login Button */}
                    <button className="hidden md:block bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg">
                        Login
                    </button>
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
                    path="approvals/delivery-partners/view-application"
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