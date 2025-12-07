function RestaurantData() {
    return (
        <div>
            <div className="w-[95%] mx-auto mt-6">

                {/* Button Boxes */}
                <div className="flex justify-center gap-6">
                    <div className="px-6 py-3 border-2 border-black rounded-md font-semibold cursor-pointer hover:bg-gray-100">
                        Total Restaurants
                    </div>
                    <div className="px-6 py-3 border-2 border-black rounded-md font-semibold cursor-pointer hover:bg-gray-100">
                        Weekly New Restaurants
                    </div>
                </div>

                {/* Ranking Box */}
                <div className="border-2 border-black h-64 mt-10 flex items-center justify-center text-lg font-semibold">
                    Ranking based on different parameters
                </div>

            </div>
        </div>
    )
}

export default RestaurantData