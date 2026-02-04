import { useEffect, useState } from "react";
import { getRestaurantStatsData } from "../../../../services/admin/adminRestaurantStatistics";

function RestaurantData() {
    const [stats, setStats] = useState({
        totalRestaurants: 0,
        weeklyNewRestaurants: 0,
        restaurantRanking: []
    });

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        const data = await getRestaurantStatsData();
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
                        <div className="text-gray-500 uppercase text-xs tracking-wider mb-2">Total Restaurants</div>
                        <div className="text-4xl font-black text-blue-600">{stats.totalRestaurants}</div>
                    </div>
                    <div className="w-full md:w-auto px-6 py-6 border-2 border-black rounded-xl font-semibold text-center md:min-w-[240px] shadow-lg bg-white transform transition-transform hover:scale-105">
                        <div className="text-gray-500 uppercase text-xs tracking-wider mb-2">Weekly New Restaurants</div>
                        <div className="text-4xl font-black text-green-600">{stats.weeklyNewRestaurants}</div>
                    </div>
                </div>

                {/* Ranking List */}
                <div className="mt-12">
                    <h3 className="text-2xl font-black mb-6 ml-1 text-gray-800">Restaurant Rankings</h3>
                    <div className="border-2 border-black rounded-xl overflow-hidden shadow-xl bg-white">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left min-w-[700px]">
                                <thead className="bg-gray-50 border-b-2 border-black">
                                    <tr>
                                        <th className="px-6 py-4 font-bold text-gray-700 uppercase text-sm tracking-wider text-center w-24">Rank</th>
                                        <th className="px-6 py-4 font-bold text-gray-700 uppercase text-sm tracking-wider">Restaurant Name</th>
                                        <th className="px-6 py-4 font-bold text-gray-700 uppercase text-sm tracking-wider text-center">Rating</th>
                                        <th className="px-6 py-4 font-bold text-gray-700 uppercase text-sm tracking-wider text-center">Reviews</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200">
                                    {stats.restaurantRanking?.length > 0 ? (
                                        stats.restaurantRanking.map((restaurant) => (
                                            <tr key={restaurant.restaurantId} className="hover:bg-blue-50 transition-colors duration-150">
                                                <td className="px-6 py-4 text-center font-black text-gray-700">#{restaurant.ranking}</td>
                                                <td className="px-6 py-4 font-bold text-gray-900">{restaurant.name}</td>
                                                <td className="px-6 py-4 text-center">
                                                    <span className="bg-yellow-100 text-yellow-800 text-xs font-black px-3 py-1 rounded-full border border-yellow-400">
                                                        {restaurant.averageRating} ★
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 text-center text-gray-600 font-medium">{restaurant.reviewCount}</td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="4" className="px-6 py-12 text-center text-gray-500 italic">
                                                No rankings available
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

export default RestaurantData