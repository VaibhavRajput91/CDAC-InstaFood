import React from 'react'
import Navbar from '../../../components/common/Navbar/Navbar'
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
function ManageMenu() {

  const navigate = useNavigate();
   const [dishes, setDishes] = useState([
    {
      name: "Paneer Butter Masala",
      description: "Rich creamy paneer gravy",
      price: "240",
      available: true,
    },
    {
      name: "Veg Biryani",
      description: "Aromatic spicy mixed vegetable biryani",
      price: "180",
      available: false,
    },
    {
      name: "Cheese Burger",
      description: "Juicy burger loaded with melted cheese",
      price: "150",
      available: true,
    },
    {
      name: "Margherita Pizza",
      description: "Classic pizza topped with mozzarella and basil",
      price: "320",
      available: true,
    },
  ]);

  // Toggle availability button
  const toggleAvailability = (index) => {
    const updated = [...dishes];
    updated[index].available = !updated[index].available;
    setDishes(updated);
  };

  return (
    <div className="min-h-screen w-full bg-gray-50 flex flex-col flex-grow">

  
  <Navbar />

  {/* PAGE TITLE */}
  <h1 className="text-center text-3xl font-bold mt-6 mb-6 text-gray-800">
    Manage Menu
  </h1>

  {/* MAIN CONTENT WITH LEFT–RIGHT PADDING */}
  <div className="px-6 md:px-12">

    {/* DISH CARDS */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

      {dishes.map((dish, i) => (
        <div
          key={i}
          className="border shadow-md rounded-xl p-6 bg-orange-50 hover:shadow-xl transition"
        >
          {/* Top Row */}
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold text-gray-800">{dish.name}</h2>

            <span
              className={`px-3 py-1 text-sm rounded-full font-semibold ${
                dish.available
                  ? "bg-green-200 text-green-800"
                  : "bg-red-200 text-red-800"
              }`}
            >
              {dish.available ? "Available" : "Unavailable"}
            </span>
          </div>

          <p className="text-gray-600 mt-2 flex justify-items-start">{dish.description}</p>
          <p className="text-lg font-bold text-gray-900 mt-2 flex justify-items-start">₹ {dish.price}</p>

          {/* Buttons */}
          <div className="flex justify-between mt-5">
            <button
              onClick={() => toggleAvailability(i)}
              className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-yellow-600"
            >
              {dish.available ? "Mark Unavailable" : "Mark Available"}
            </button>

            <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
              Edit
            </button>

            <button className="px-5 py-2 bg-red-400 text-white rounded-lg hover:bg-red-500">
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>

    {/* ADD DISH BUTTON */}
    <div className="text-center mt-10">
      <button onClick={() => navigate("/restaurant/add-dish")} className="px-6 py-3 bg-blue-600 text-white text-lg font-semibold rounded-xl hover:bg-blue-700 shadow-md">
        Add New Dish
      </button>
    </div>

  </div>
</div>
  )
}

export default ManageMenu
