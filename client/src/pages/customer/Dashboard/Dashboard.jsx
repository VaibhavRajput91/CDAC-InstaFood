import React from 'react'
import Navbar from '../../../components/common/Navbar/Navbar';

function Dashboard() {
    return (
        <div>
           <Navbar /> 
            <div className="min-h-screen bg-gray-50 py-8">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="mb-8">
                    <h1 className="text-gray-900 mb-2 text-2xl font-bold">Welcome "Name"</h1>
                    <p className="text-gray-600">Restaurant Available for You</p>
                </div>
                <div>
                    {/*Search Bar*/}
                </div>
                <div>
                    <h2 className="text-gray-900 mb-4">Restaurants</h2>
                    <div id="restaurant-container" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {/* Sample Card 1 */}
                        <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
                            <img src="https://placehold.co/600x400/orange/white?text=Burger+King" alt="Burger King" className="w-full h-48 object-cover" />
                            <div className="p-4">
                                <div className="flex justify-between items-start mb-2">
                                    <h3 className="text-xl font-semibold text-gray-900">Burger King</h3>
                                    <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded">4.5 ★</span>
                                </div>
                                <p className="text-gray-600 text-sm mb-2">American • Burgers • Fast Food</p>
                                <div className="flex justify-between items-center text-sm text-gray-500">
                                    <span>25-35 min</span>
                                    <span>Free delivery</span>
                                </div>
                            </div>
                        </div>

                        {/* Sample Card 2 */}
                        <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
                            <img src="https://placehold.co/600x400/red/white?text=Pizza+Hut" alt="Pizza Hut" className="w-full h-48 object-cover" />
                            <div className="p-4">
                                <div className="flex justify-between items-start mb-2">
                                    <h3 className="text-xl font-semibold text-gray-900">Pizza Hut</h3>
                                    <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded">4.2 ★</span>
                                </div>
                                <p className="text-gray-600 text-sm mb-2">Italian • Pizza • Pasta</p>
                                <div className="flex justify-between items-center text-sm text-gray-500">
                                    <span>30-45 min</span>
                                    <span>$2.99 delivery</span>
                                </div>
                            </div>
                        </div>

                        {/* Sample Card 3 */}
                        <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
                            <img src="https://placehold.co/600x400/green/white?text=Subway" alt="Subway" className="w-full h-48 object-cover" />
                            <div className="p-4">
                                <div className="flex justify-between items-start mb-2">
                                    <h3 className="text-xl font-semibold text-gray-900">Subway</h3>
                                    <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded">4.0 ★</span>
                                </div>
                                <p className="text-gray-600 text-sm mb-2">Healthy • Sandwiches • Salads</p>
                                <div className="flex justify-between items-center text-sm text-gray-500">
                                    <span>15-25 min</span>
                                    <span>$1.49 delivery</span>
                                </div>
                            </div>
                        </div>

                        {/* Sample Card 4 */}
                        <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
                            <img src="https://placehold.co/600x400/blue/white?text=KFC" alt="KFC" className="w-full h-48 object-cover" />
                            <div className="p-4">
                                <div className="flex justify-between items-start mb-2">
                                    <h3 className="text-xl font-semibold text-gray-900">KFC</h3>
                                    <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded">4.3 ★</span>
                                </div>
                                <p className="text-gray-600 text-sm mb-2">American • Chicken • Fast Food</p>
                                <div className="flex justify-between items-center text-sm text-gray-500">
                                    <span>20-30 min</span>
                                    <span>Free delivery</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div id="page number"> 

                </div>
            </div>
            </div>
        </div>
    )
}

export default Dashboard