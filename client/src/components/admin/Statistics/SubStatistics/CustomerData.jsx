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
        <div className="pb-8">
            <div className="w-[95%] lg:w-[90%] mx-auto mt-6">

                {/* Statistics Cards */}
                <div className="flex flex-col md:flex-row justify-center items-center gap-6">
                    <div className="w-full md:w-auto px-6 py-6 border-2 border-black rounded-xl font-semibold text-center md:min-w-[240px] shadow-lg bg-white transform transition-transform hover:scale-105">
                        <div className="text-gray-500 uppercase text-xs tracking-wider mb-2">Total Customers</div>
                        <div className="text-4xl font-black text-blue-600">{stats.totalCustomers}</div>
                    </div>
                    <div className="w-full md:w-auto px-6 py-6 border-2 border-black rounded-xl font-semibold text-center md:min-w-[240px] shadow-lg bg-white transform transition-transform hover:scale-105">
                        <div className="text-gray-500 uppercase text-xs tracking-wider mb-2">Weekly New Customers</div>
                        <div className="text-4xl font-black text-green-600">{stats.weeklyCustomers}</div>
                    </div>
                </div>

                {/* Customers List */}
                <div className="mt-12">
                    <h3 className="text-2xl font-black mb-6 ml-1 text-gray-800">Customer Details</h3>
                    <div className="border-2 border-black rounded-xl overflow-hidden shadow-xl bg-white">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left min-w-[700px]">
                                <thead className="bg-gray-50 border-b-2 border-black">
                                    <tr>
                                        <th className="px-6 py-4 font-bold text-gray-700 uppercase text-sm tracking-wider">ID</th>
                                        <th className="px-6 py-4 font-bold text-gray-700 uppercase text-sm tracking-wider">Name</th>
                                        <th className="px-6 py-4 font-bold text-gray-700 uppercase text-sm tracking-wider">Email</th>
                                        <th className="px-6 py-4 font-bold text-gray-700 uppercase text-sm tracking-wider">Phone</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200">
                                    {stats.customers.length > 0 ? (
                                        stats.customers.map((customer) => (
                                            <tr key={customer.id} className="hover:bg-blue-50 transition-colors duration-150">
                                                <td className="px-6 py-4 text-gray-500 font-mono text-sm">#{customer.id}</td>
                                                <td className="px-6 py-4 font-bold text-gray-900">{customer.name}</td>
                                                <td className="px-6 py-4 text-gray-600">{customer.email}</td>
                                                <td className="px-6 py-4 text-gray-600 font-medium">{customer.phone}</td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="4" className="px-6 py-12 text-center text-gray-500 italic">
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
        </div>
    )
}

export default CustomerData