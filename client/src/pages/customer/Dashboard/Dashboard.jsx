import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import CustomerNavbar from '../../../components/customer/CustomerNavbar/CustomerNavbar'
import { getRestaurants } from '../../../services/customer/dashboard'

function Dashboard() {
  const navigate = useNavigate()
  const [pincode, setPincode] = useState(sessionStorage.getItem('postalCode') || '')
  const [restaurants, setRestaurants] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const storedPincode = sessionStorage.getItem('postalCode');
    fetchRestaurants(storedPincode)
  }, [])

  const fetchRestaurants = async (searchPincode) => {
    try {
      setLoading(true)
      const response = await getRestaurants(searchPincode)
        console.log(response)
      // map backend response to UI structure
      const mappedRestaurants = response.map(r => ({
        id: r.id,
        name: r.name,
        openingTime: r.openingTime,
        closingTime: r.closingTime,
        pincode: r.postalCode,
        restaurantImage: r.restaurantImage,
      }))

      setRestaurants(mappedRestaurants)
    } catch (error) {
      console.error('Failed to load restaurants', error)
    } finally {
      setLoading(false)
    }
  }

  const filteredRestaurants =
    pincode.length === 6
      ? restaurants.filter(r => r.pincode === pincode)
      : restaurants

  return (
    <div>
      <CustomerNavbar />

      <div className="min-h-screen bg-orange-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="mb-8">
            <h1 className="text-gray-900 mb-2 text-2xl font-bold">
              Welcome
            </h1>
            <p className="text-gray-600">
              Restaurants available for you
            </p>
          </div>

          {/* Pincode Search */}
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-gray-900 font-semibold text-lg">
              Restaurants
            </h2>

            <div className="flex items-center bg-white rounded-full shadow-sm border border-orange-200 px-4 py-2 w-64">
              <input
                type="text"
                placeholder="Enter Pincode"
                value={pincode}
                maxLength={6}
                onChange={(e) => {
                  const val = e.target.value
                  if (/^\d*$/.test(val)) {
                    setPincode(val)
                    if (val.length === 6) {
                      fetchRestaurants(val)
                    } else if (val.length === 0) {
                      fetchRestaurants()
                    }
                  }
                }}
                className="bg-transparent border-none focus:ring-0 text-sm w-full outline-none"
              />
            </div>
          </div>

          {/* Restaurant Cards */}
          {loading && (
            <div className="text-center text-gray-500 py-8">
              Loading restaurants...
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredRestaurants.map((restaurant) => (
              <div
                key={restaurant.id}
                onClick={() => navigate(`/customer/menu/${restaurant.id}`)}
                className="bg-white rounded-lg shadow-md border border-orange-100 overflow-hidden cursor-pointer hover:shadow-lg transition-shadow duration-300"
              >
                <div className="h-40 w-full bg-orange-100 relative">
                    {restaurant.restaurantImage ? (
                        <img 
                            src={restaurant.restaurantImage} 
                            alt={restaurant.name} 
                            className="w-full h-full object-cover"
                        />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center text-orange-200">
                             <span className="text-4xl font-bold opacity-20">{restaurant.name.charAt(0)}</span>
                        </div>
                    )}
                </div>
                <div className="p-4">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {restaurant.name}
                    </h3>

                    <p className="text-sm text-gray-600">
                    ⏰ {restaurant.openingTime} – {restaurant.closingTime}
                    </p>

                    <p className="text-xs text-gray-400 mt-2">
                    Pincode: {restaurant.pincode}
                    </p>
                </div>
              </div>
            ))}
          </div>

          {!loading && filteredRestaurants.length === 0 && pincode.length === 6 && (
            <div className="text-center text-gray-500 py-8">
              No restaurants found for this pincode.
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Dashboard
