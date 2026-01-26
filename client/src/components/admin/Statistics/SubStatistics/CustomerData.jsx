import { useEffect, useState } from "react";
import { getCustomerStatsData } from "../../../../services/admin/adminCustomerStatistics";

function CustomerData() {
    const [stats, setStats] = useState({
        totalCustomers: 0,
        weeklyCustomers: 0,
        customers: []
    });

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        const data = await getCustomerStatsData();
        if (data) {
            setStats(data);
        }
    };
    return (
        <div>
            <div className="w-[95%] mx-auto mt-6">

                {/* Statistics Cards */}
                <div className="flex justify-center gap-6">
                    <div className="px-6 py-4 border-2 border-black rounded-md font-semibold text-center min-w-[200px] shadow-sm bg-white">
                        <div className="text-gray-600 mb-1">Total Customers</div>
                        <div className="text-3xl font-bold text-blue-600">{stats.totalCustomers}</div>
                    </div>
                    <div className="px-6 py-4 border-2 border-black rounded-md font-semibold text-center min-w-[200px] shadow-sm bg-white">
                        <div className="text-gray-600 mb-1">Weekly New Customers</div>
                        <div className="text-3xl font-bold text-green-600">{stats.weeklyCustomers}</div>
                    </div>
                </div>

                {/* Customers List */}
                <div className="mt-10">
                    <h3 className="text-xl font-bold mb-4 ml-1">Customer Details</h3>
                    <div className="border-2 border-black rounded-lg overflow-hidden">
                        <table className="w-full text-left bg-white">
                            <thead className="bg-gray-100 border-b-2 border-black">
                                <tr>
                                    <th className="px-6 py-3 font-bold">ID</th>
                                    <th className="px-6 py-3 font-bold">Name</th>
                                    <th className="px-6 py-3 font-bold">Email</th>
                                    <th className="px-6 py-3 font-bold">Phone</th>
                                </tr>
                            </thead>
                            <tbody>
                                {stats.customers.length > 0 ? (
                                    stats.customers.map((customer) => (
                                        <tr key={customer.id} className="border-b last:border-b-0 hover:bg-gray-50 transition-colors">
                                            <td className="px-6 py-3 text-gray-700">#{customer.id}</td>
                                            <td className="px-6 py-3 font-medium">{customer.name}</td>
                                            <td className="px-6 py-3 text-gray-600">{customer.email}</td>
                                            <td className="px-6 py-3 text-gray-600">{customer.phone}</td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="4" className="px-6 py-8 text-center text-gray-500">
                                            No customers found
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

            </div>
        </div>
     )
}

export default CustomerData