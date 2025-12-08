import React from 'react'
import Navbar from '../../../components/common/Navbar/Navbar'
function Apply() {
  return (
    <div className="min-h-screen bg-gray-100">
  <Navbar />

  
  <h1 className="text-center text-2xl font-bold mt-4 mb-2">
    Restaurant Apply Form
  </h1>

  <div className="max-w-4xl mx-auto mt-4 bg-white border p-8 shadow">

    
    <div className="flex flex-col md:flex-row gap-6">

      
      <div className="flex-1 space-y-4">

        
        <div>
          <label className="text-sm font-medium block text-left">Owner Name</label>
          <input
            type="text"
            placeholder="Owner Name"
            className="w-full border px-4 py-2 rounded"
          />
        </div>

        
        <div>
          <label className="text-sm font-medium block text-left">Restaurant Name</label>
          <input
            type="text"
            placeholder="Restaurant Name"
            className="w-full border px-4 py-2 rounded"
          />
        </div>

        
        <div>
          <label className="text-sm font-medium block text-left">Address</label>
          <textarea
            placeholder="Address"
            rows="3"
            className="w-full border px-4 py-2 rounded resize-none"
          ></textarea>
        </div>

        
        <div>
          <label className="text-sm font-medium block text-left">Cuisine Types</label>
          <input
            type="text"
            placeholder="Cuisine Type"
            className="w-full border px-4 py-2 rounded"
          />
        </div>

        
        <div className="grid grid-cols-2 gap-4">

          <div>
            <label className="text-sm font-medium block text-left">Opening Time</label>
            <input
              type="time"
              className="w-full border px-4 py-2 rounded"
            />
          </div>

          <div>
            <label className="text-sm font-medium block text-left">Closing Time</label>
            <input
              type="time"
              className="w-full border px-4 py-2 rounded"
            />
          </div>

        </div>

        
        <div>
          <label className="text-sm font-medium block text-left">Phone Number</label>
          <input
            type="text"
            placeholder="Phone Number"
            className="w-full border px-4 py-2 rounded"
          />
        </div>

      </div>

      {/* IMAGE PLACEHOLDER */}
     {/* <div className="w-48 h-48 border border-gray-400 flex items-center justify-center bg-gray-50 rounded">
        <p className="text-gray-500 text-sm text-center">Restaurant Image</p>
      </div>*/}

    </div>

    
    <div className="text-center mt-6">
      <button className="border px-6 py-2 bg-orange-500 hover:bg-red-500 rounded-lg">
        Submit
      </button>
    </div>

  </div>

  
</div>

  )
}

export default Apply
