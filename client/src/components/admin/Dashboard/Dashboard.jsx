import { useEffect, useState } from "react";
import {
    getTotalOrdersDetails,
    getOrderStatusStats,
    getOrdersPerDayStats,
    getTopSellingItemsStats
} from "../../../services/admin/dashboardStats";
import {
    PieChart, Pie, Cell,
    LineChart, Line,
    BarChart, Bar,
    XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';
function Dashboard() {
    const [stats, setStats] = useState({
        totalOrders: 0,
        totalMoneySpent: 0,
        totalDishesOffered: 0,
        totalCategoriesOffered: 0
    });
     const [orderStatusData, setOrderStatusData] = useState([]);
    const [ordersPerDayData, setOrdersPerDayData] = useState([]);
    const [topItemsData, setTopItemsData] = useState([]);

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        const data = await getTotalOrdersDetails();
        if (data) setStats(data);

        const statusData = await getOrderStatusStats();
        console.log("Status Data:", statusData);
        if (statusData && Array.isArray(statusData)) {
            setOrderStatusData(statusData);
        } else {
            console.error("Status Data is not an array:", statusData);
        }

        const perDayData = await getOrdersPerDayStats();
        console.log("Per Day Data:", perDayData);
        if (perDayData && Array.isArray(perDayData)) {
            setOrdersPerDayData(perDayData);
        } else {
            console.error("Per Day Data is not an array:", perDayData);
        }

        const itemsData = await getTopSellingItemsStats();
        console.log("Top Items Data:", itemsData);
        if (itemsData && Array.isArray(itemsData)) {
            setTopItemsData(itemsData);
        } else {
            console.error("Top Items Data is not an array:", itemsData);
        }
    };

    const COLORS = {
        'DELIVERED': '#10B981', // Green-500
        'CANCELLED': '#EF4444', // Red-500
    };

    

    return (
        <div className="bg-gray-100 min-h-screen p-10">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-3xl font-bold mb-8 text-gray-800">Dashboard Overview</h1>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
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
                 <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Pie Chart - Order Status */}
                    <div className="bg-white p-6 rounded-xl shadow-md">
                        <h2 className="text-xl font-semibold mb-6 text-gray-700">Order Fulfillment</h2>
                        <div className="h-80 w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={orderStatusData}
                                        cx="50%"
                                        cy="50%"
                                        labelLine={false}
                                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                                        outerRadius={100}
                                        fill="#8884d8"
                                        dataKey="count"
                                        nameKey="status"
                                    >
                                        {Array.isArray(orderStatusData) && orderStatusData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={COLORS[entry.status] || '#8884d8'} />
                                        ))}
                                    </Pie>
                                    <Tooltip />
                                    <Legend verticalAlign="bottom" height={36} />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    {/* Line Chart - Orders Per Day */}
                    <div className="bg-white p-6 rounded-xl shadow-md">
                        <h2 className="text-xl font-semibold mb-6 text-gray-700">Orders Trend</h2>
                        <div className="h-80 w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart data={ordersPerDayData}>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                                    <XAxis
                                        dataKey="date"
                                        axisLine={false}
                                        tickLine={false}
                                        tick={{ fill: '#6B7280', fontSize: 12 }}
                                        dy={10}
                                    />
                                    <YAxis
                                        axisLine={false}
                                        tickLine={false}
                                        tick={{ fill: '#6B7280', fontSize: 12 }}
                                    />
                                    <Tooltip
                                        contentStyle={{ backgroundColor: '#fff', borderRadius: '8px', border: 'none', shadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                                    />
                                    <Legend verticalAlign="top" align="right" height={36} />
                                    <Line
                                        type="monotone"
                                        dataKey="count"
                                        name="Daily Orders"
                                        stroke="#3B82F6"
                                        strokeWidth={3}
                                        dot={{ r: 4, fill: '#3B82F6', strokeWidth: 2, stroke: '#fff' }}
                                        activeDot={{ r: 6, strokeWidth: 0 }}
                                    />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    {/* Bar Chart - Top Selling Items */}
                    <div className="bg-white p-6 rounded-xl shadow-md lg:col-span-2">
                        <h2 className="text-xl font-semibold mb-6 text-gray-700">Top Selling Dishes</h2>
                        <div className="h-96 w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={topItemsData}>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                                    <XAxis
                                        dataKey="itemName"
                                        axisLine={false}
                                        tickLine={false}
                                        tick={{ fill: '#6B7280', fontSize: 12 }}
                                        dy={10}
                                    />
                                    <YAxis
                                        axisLine={false}
                                        tickLine={false}
                                        tick={{ fill: '#6B7280', fontSize: 12 }}
                                    />
                                    <Tooltip
                                        cursor={{ fill: '#F3F4F6' }}
                                        contentStyle={{ backgroundColor: '#fff', borderRadius: '8px', border: 'none', shadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                                    />
                                    <Legend verticalAlign="top" align="right" height={36} />
                                    <Bar
                                        dataKey="totalSold"
                                        name="Units Sold"
                                        fill="#F59E0B"
                                        radius={[4, 4, 0, 0]}
                                        barSize={40}
                                    />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </div>
            </div>

           
        </div>
    );
}

export default Dashboard;