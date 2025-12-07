export default function OrderCard({ order }) {
  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition border p-4 min-w-[200px]">

      {/* Image section */}
      <div className="w-full h-28 rounded-md overflow-hidden mb-3 bg-gray-200">
        {order.image ? (
          <img src={order.image} alt={order.restaurant} className="object-cover w-full h-full" />
        ) : (
          <div className="flex items-center justify-center h-full text-gray-400 text-xs">
            No Image
          </div>
        )}
      </div>

      {/* Order Details */}
      <p className="text-sm font-semibold text-gray-700">Order #{order.id}</p>
      <p className="text-xs text-gray-500 mb-1">{order.date}</p>

      <p className="text-sm font-medium text-gray-600">Restaurant:</p>
      <p className="text-xs text-gray-500 mb-2">{order.restaurant}</p>

      <div className="flex justify-between items-center">
        <p className="text-green-600 font-bold">₹{order.earnings}</p>
        <button className="text-blue-500 text-sm hover:underline">View Details</button>
      </div>
    </div>
  );
}
