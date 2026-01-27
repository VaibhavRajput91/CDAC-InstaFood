import { useEffect, useState } from "react";
import { getTotalOrdersDetails } from "../../../services/admin/dashboardStats";


function Dashboard() {
    const [stats, setStats] = useState({
        totalOrders: 0,
        totalMoneySpent: 0,
        totalDishesOffered: 0,
        totalCategoriesOffered: 0
    });

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        const data = await getTotalOrdersDetails();
        if (data) {
            setStats(data);
        }
    };

    

    return (
        <div className="bg-gray-100 min-h-screen p-10">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-3xl font-bold mb-8 text-gray-800">Dashboard Overview</h1>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {/* Total Orders Card */}
                    <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-blue-500 hover:shadow-lg transition-shadow">
                        <div className="text-gray-500 font-medium mb-2">Total Orders</div>
                        <div className="text-4xl font-bold text-gray-800">{stats.totalOrders}</div>
                    </div>

                    {/* Total Revenue Card */}
                    <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-green-500 hover:shadow-lg transition-shadow">
                        <div className="text-gray-500 font-medium mb-2">Total Revenue</div>
                        <div className="text-4xl font-bold text-gray-800">₹{stats.totalMoneySpent}</div>
                    </div>

                    {/* Total Dishes Card */}
                    <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-orange-500 hover:shadow-lg transition-shadow">
                        <div className="text-gray-500 font-medium mb-2">Total Dishes</div>
                        <div className="text-4xl font-bold text-gray-800">{stats.totalDishesOffered}</div>
                    </div>

                    {/* Total Categories Card */}
                    <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-purple-500 hover:shadow-lg transition-shadow">
                        <div className="text-gray-500 font-medium mb-2">Categories</div>
                        <div className="text-4xl font-bold text-gray-800">{stats.totalCategoriesOffered}</div>
                    </div>
                </div>
            </div>

           
        </div>
    );
}

export default Dashboard;