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
        <div>
            <div className="w-[95%] mx-auto mt-6">

                {/* Statistics Cards */}
                <div className="flex justify-center gap-6">
                    <div className="px-6 py-4 border-2 border-black rounded-md font-semibold text-center min-w-[200px] shadow-sm bg-white">
                        <div className="text-gray-600 mb-1">Total Restaurants</div>
                        <div className="text-3xl font-bold text-blue-600">{stats.totalRestaurants}</div>
                    </div>
                    <div className="px-6 py-4 border-2 border-black rounded-md font-semibold text-center min-w-[200px] shadow-sm bg-white">
                        <div className="text-gray-600 mb-1">Weekly New Restaurants</div>
                        <div className="text-3xl font-bold text-green-600">{stats.weeklyNewRestaurants}</div>
                    </div>
                </div>

                {/* Ranking List */}
                <div className="mt-10">
                    <h3 className="text-xl font-bold mb-4 ml-1">Restaurant Rankings</h3>
                    <div className="border-2 border-black rounded-lg overflow-hidden">
                        <table className="w-full text-left bg-white">
                            <thead className="bg-gray-100 border-b-2 border-black">
                                <tr>
                                    <th className="px-6 py-3 font-bold text-center w-24">Rank</th>
                                    <th className="px-6 py-3 font-bold">Restaurant Name</th>
                                    <th className="px-6 py-3 font-bold text-center">Rating</th>
                                    <th className="px-6 py-3 font-bold text-center">Reviews</th>
                                </tr>
                            </thead>
                            <tbody>
                                {stats.restaurantRanking?.length > 0 ? (
                                    stats.restaurantRanking.map((restaurant) => (
                                        <tr key={restaurant.restaurantId} className="border-b last:border-b-0 hover:bg-gray-50 transition-colors">
                                            <td className="px-6 py-3 text-center font-bold text-gray-700">#{restaurant.ranking}</td>
                                            <td className="px-6 py-3 font-medium">{restaurant.name}</td>
                                            <td className="px-6 py-3 text-center">
                                                <span className="bg-yellow-100 text-yellow-800 text-xs font-semibold px-2.5 py-0.5 rounded border border-yellow-400">
                                                    {restaurant.averageRating} ★
                                                </span>
                                            </td>
                                            <td className="px-6 py-3 text-center text-gray-600">{restaurant.reviewCount}</td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="4" className="px-6 py-8 text-center text-gray-500">
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
    )
}

export default RestaurantData