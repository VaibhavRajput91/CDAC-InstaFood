import { useEffect, useState } from "react";
import { getDeliveryStatsData } from "../../../../services/admin/adminDeliveryStatistics";

function DeliveryData() {
    const [stats, setStats] = useState({
        totalDeliveries: 0,
        weeklyDeliveries: 0,
        deliveryPartnerRanking: []
    });

    useEffect(() => {
        const fetchStats = async () => {
            const data = await getDeliveryStatsData();
            if (data) {
                setStats(data);
            }
        };
        fetchStats();
    }, []);
    return (
        <div>
            <div className="w-[95%] mx-auto mt-6">

                {/* Button Boxes */}
                <div className="flex justify-center gap-6">
                    <div className="px-6 py-3 border-2 border-black rounded-md font-semibold cursor-pointer hover:bg-gray-100 flex flex-col items-center min-w-[200px]">
                        <span>Total Deliveries</span>
                        <span className="text-2xl mt-2">{stats.totalDeliveries}</span>
                    </div>
                    <div className="px-6 py-3 border-2 border-black rounded-md font-semibold cursor-pointer hover:bg-gray-100 flex flex-col items-center min-w-[200px]">
                        <span>Weekly New Deliveries</span>
                        <span className="text-2xl mt-2">{stats.weeklyDeliveries}</span>
                    </div>
                </div>

                {/* Ranking Box */}
                <div className="border-2 border-black mt-10 p-6 rounded-md">
                    <h2 className="text-xl font-bold mb-6 text-center">Top Delivery Partners - Ranking</h2>
                    <div className="overflow-x-auto">
                        <table className="min-w-full table-auto">
                            <thead>
                                <tr className="bg-gray-100">
                                    <th className="px-4 py-2 text-left border-b">Rank</th>
                                    <th className="px-4 py-2 text-left border-b">Delivery Partner Name</th>
                                    <th className="px-4 py-2 text-left border-b">Total Deliveries</th>
                                </tr>
                            </thead>
                            <tbody>
                                {stats.deliveryPartnerRanking.length > 0 ? (
                                    stats.deliveryPartnerRanking.map((partner, index) => (
                                        <tr key={index} className="hover:bg-gray-50">
                                            <td className="px-4 py-3 border-b font-semibold">{partner.rank}</td>
                                            <td className="px-4 py-3 border-b">{partner.deliveryPartnerName}</td>
                                            <td className="px-4 py-3 border-b font-medium">
                                                {partner.totalDeliveries}
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="3" className="text-center py-10 text-gray-500">
                                            No delivery data available yet.
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

export default DeliveryData