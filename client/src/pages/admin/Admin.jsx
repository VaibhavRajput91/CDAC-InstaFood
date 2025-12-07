import { Route, Routes, Navigate } from "react-router-dom";
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
            <Navbar />
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
                    path="approvals/restaurants/view-application"
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