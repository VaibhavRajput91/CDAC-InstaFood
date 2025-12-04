import { Route, Routes } from "react-router-dom";
import Navbar from "../../components/common/Navbar/Navbar";
import Dashboard from "../../components/admin/Dashboard/Dashboard";
import Statistics from "../../components/admin/Statistics/Statistics";
import CustomerData from "../../components/admin/Statistics/SubStatistics/CustomerData";

function Admin() {
    return (
        <div>
            <Navbar />
            <Routes>
                <Route
                    path="/dashboard"
                    element={<Dashboard />}
                />

                <Route
                    path="/statistics"
                    element={<Statistics />}
                />

                <Route
                    path="admin/statistics/customer-data"
                    element={<CustomerData />}
                />

            </Routes>

        </div>
    )
}

export default Admin