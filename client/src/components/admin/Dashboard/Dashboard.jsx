import {
    PieChart, Pie, Cell,
    LineChart, Line,
    BarChart, Bar,
    XAxis, YAxis, Tooltip,
    ResponsiveContainer
} from "recharts";

function Dashboard() {

    const pieData = [
        { name: "Food Orders", value: 400 },
        { name: "Cancelled", value: 100 },
        { name: "Delivered", value: 300 },
    ];

    const COLORS = ["#ef4444", "#f97316", "#22c55e"];

    const lineData = [
        { day: "Mon", orders: 30 },
        { day: "Tue", orders: 50 },
        { day: "Wed", orders: 45 },
        { day: "Thu", orders: 60 },
        { day: "Fri", orders: 80 },
    ];

    const barData = [
        { name: "Burger", sales: 120 },
        { name: "Pizza", sales: 90 },
        { name: "Fries", sales: 70 },
    ];

    return (
        <div className="bg-gray-100 min-h-screen">

            <div className="max-w-screen mx-auto mt-10 bg-white shadow-lg rounded-lg p-10">

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mb-12">

                    <div className="h-60 border-2 border-gray-400 rounded-lg flex items-center justify-center">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie data={pieData} dataKey="value" outerRadius={60} label>
                                    {pieData.map((entry, i) => (
                                        <Cell key={i} fill={COLORS[i]} />
                                    ))}
                                </Pie>
                            </PieChart>
                        </ResponsiveContainer>
                    </div>

                    <div className="h-60 border-2 border-gray-400 rounded-lg">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={lineData}>
                                <XAxis dataKey="day" />
                                <YAxis />
                                <Tooltip />
                                <Line type="monotone" dataKey="orders" stroke="#ef4444" strokeWidth={2} />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>

                    <div className="h-60 border-2 border-gray-400 rounded-lg">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={barData}>
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip />
                                <Bar dataKey="sales" fill="#f97316" />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>

                </div>

            </div>
        </div>
    );
}

export default Dashboard