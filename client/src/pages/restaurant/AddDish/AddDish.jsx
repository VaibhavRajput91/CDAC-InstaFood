import React from 'react'
import Navbar from '../../../components/common/Navbar/Navbar'

function AddDish() {
  return (
    <div className="min-h-screen bg-gray-50">

 
  <Navbar />

 
  <div className="flex justify-center items-start py-10">
    
    <div className="w-full max-w-xl bg-white shadow-xl rounded-xl p-8 border border-orange-200">
      
      <h5 className="text-center text-2xl font-extrabold text-black tracking-wide mb-6 drop-shadow-sm">
  Add New Dish
</h5>
    
      {/* Image Upload Circle */}
      <div className="flex justify-center mb-6">
        <div className="w-32 h-32 bg-orange-100 border-2 border-orange-300 rounded-full flex items-center justify-center cursor-pointer hover:bg-orange-200 transition">
          <span className="text-gray-600 text-sm">Add Image</span>
        </div>
      </div>
      

      {/* DISH FORM */}
      <div className="space-y-5">

        <input
          type="text"
          placeholder="Dish Name"
          className="w-full p-3 border border-gray-400 rounded-md text-center focus:ring-2 focus:ring-orange-400"
        />

        <input
          type="text"
          placeholder="Dish Description"
          className="w-full p-3 border border-gray-400 rounded-md text-center focus:ring-2 focus:ring-orange-400"
        />

        <input
          type="number" step="any"
          placeholder="Dish Price"
          className="w-full p-3 border border-gray-400 rounded-md text-center focus:ring-2 focus:ring-orange-400"
        />

        <button className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-md font-semibold">
          Save Dish
        </button>

      </div>
    </div>
  </div>
</div>

  )
}

export default AddDish
