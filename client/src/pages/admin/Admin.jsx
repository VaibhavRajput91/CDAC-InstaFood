import { Route, Routes, Navigate } from "react-router-dom";
import Navbar from "../../components/common/Navbar/Navbar";
import Dashboard from "../../components/admin/Dashboard/Dashboard";
import Statistics from "../../components/admin/Statistics/Statistics";
import CustomerData from "../../components/admin/Statistics/SubStatistics/CustomerData";
import RestaurantData from "../../components/admin/Statistics/SubStatistics/RestaurantData";
import DeliveryData from "../../components/admin/Statistics/SubStatistics/DeliveryData";

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
                    path="/dashboard"
                    element={<Dashboard />}
                />

                <Route
                    path="/statistics"
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

            </Routes>

        </div>
    )
}

export default Admin