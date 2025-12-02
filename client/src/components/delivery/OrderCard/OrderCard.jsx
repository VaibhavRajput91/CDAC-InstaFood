const OrderCard = ({ orderId, onAccept, onReject }) => {
  return (
    <div className="border rounded-lg shadow p-4 bg-gray-50">
      <div className="h-32 bg-white border rounded-md flex items-center justify-center">
        <p className="text-gray-500">Order Details</p>
      </div>

      <h3 className="text-center mt-4 font-semibold text-lg">Order {orderId}</h3>

      <div className="flex justify-around mt-4">
        <button
          className="bg-green-500 text-white px-4 py-2 rounded-full hover:bg-green-600"
          onClick={() => onAccept(orderId)}
        >
          Accept
        </button>

        <button
          className="bg-red-500 text-white px-4 py-2 rounded-full hover:bg-red-600"
          onClick={() => onReject(orderId)}
        >
          Reject
        </button>
      </div>
    </div>
  );
};

export default OrderCard;
