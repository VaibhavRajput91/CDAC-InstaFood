import React, { useState } from 'react'
import CustomerNavbar from '../../../components/customer/CustomerNavbar/CustomerNavbar';

function Dashboard() {
    const [pincode, setPincode] = useState('123456');

    const restaurants = [
        {
            id: 1,
            name: "Burger King",
            image: "https://placehold.co/600x400/orange/white?text=Burger+King",
            rating: "4.5 ★",
            cuisine: "American • Burgers • Fast Food",
            time: "25-35 min",
            delivery: "Free delivery",
            pincode: "123456"
        },
        {
            id: 2,
            name: "Pizza Hut",
            image: "https://placehold.co/600x400/red/white?text=Pizza+Hut",
            rating: "4.2 ★",
            cuisine: "Italian • Pizza • Pasta",
            time: "30-45 min",
            delivery: "₹49 delivery",
            pincode: "654321"
        },
        {
            id: 3,
            name: "Subway",
            image: "https://placehold.co/600x400/green/white?text=Subway",
            rating: "4.0 ★",
            cuisine: "Healthy • Sandwiches • Salads",
            time: "15-25 min",
            delivery: "₹99 delivery",
            pincode: "123456"
        },
        {
            id: 4,
            name: "KFC",
            image: "https://placehold.co/600x400/blue/white?text=KFC",
            rating: "4.3 ★",
            cuisine: "American • Chicken • Fast Food",
            time: "20-30 min",
            delivery: "Free delivery",
            pincode: "112233"
        }
    ];

    const filteredRestaurants = pincode.length === 6
        ? restaurants.filter(r => r.pincode === pincode)
        : [];

    return (
        <div>
           <CustomerNavbar /> 
            <div className="min-h-screen bg-orange-50 py-8">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="mb-8">
                    <h1 className="text-gray-900 mb-2 text-2xl font-bold">Welcome "Name"</h1>
                    <p className="text-gray-600">Restaurant Available for You</p>
                </div>
                <div>
                    {/*Search Bar*/}
                </div>
                <div>
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-gray-900 font-semibold text-lg">Restaurants</h2>
                        <div className="flex items-center bg-white rounded-full shadow-sm border border-orange-200 px-4 py-2 w-64 hover:shadow-md transition-shadow">
                             <svg className="w-5 h-5 text-gray-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                             <input
                                type="text"
                                placeholder="Enter Pincode"
                                value={pincode}
                                onChange={(e) => {
                                    const val = e.target.value;
                                    if (/^\d*$/.test(val)) {
                                        setPincode(val);
                                    }
                                }}
                                maxLength={6}
                                className="bg-transparent border-none focus:ring-0 text-sm text-gray-700 w-full placeholder-gray-400 outline-none"
                            />
                        </div>
                    </div>

                    <div id="restaurant-container" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredRestaurants.map((restaurant) => (
                            <div key={restaurant.id} className="bg-white rounded-lg shadow-md border border-orange-100 overflow-hidden hover:shadow-lg transition-shadow duration-300">
                                <img src={restaurant.image} alt={restaurant.name} className="w-full h-48 object-cover" />
                                <div className="p-4">
                                    <div className="flex justify-between items-start mb-2">
                                        <h3 className="text-xl font-semibold text-gray-900">{restaurant.name}</h3>
                                        <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded">{restaurant.rating}</span>
                                    </div>
                                    <p className="text-gray-600 text-sm mb-2">{restaurant.cuisine}</p>
                                    <div className="flex justify-between items-center text-sm text-gray-500">
                                        <span>{restaurant.time}</span>
                                        <span>{restaurant.delivery}</span>
                                    </div>
                                    <div className="mt-2 text-xs text-gray-400">
                                        Pincode: {restaurant.pincode}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    {filteredRestaurants.length === 0 && (
                        <div className="text-center text-gray-500 py-8">
                            No restaurants found for this pincode.
                        </div>
                    )}
                </div>
                <div id="page number"> 
                </div>
            </div>
            </div>
        </div>
    )
}

export default Dashboard