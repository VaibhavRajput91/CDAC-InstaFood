
export default function UserDetails() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

      <div className="p-4 border rounded-lg shadow-sm bg-white">
        <p className="text-sm text-gray-500">Owner Name</p>
        <p className="text-lg font-semibold">John Doe</p>
      </div>

      <div className="p-4 border rounded-lg shadow-sm bg-white">
        <p className="text-sm text-gray-500">Restaurant Name</p>
        <p className="text-lg font-semibold">Sunshine</p>
      </div>
      <div className="p-4 border rounded-lg shadow-sm bg-white">
        <p className="text-sm text-gray-500">Email</p>
        <p className="text-lg font-semibold">johndoe@email.com</p>
      </div>

      <div className="p-4 border rounded-lg shadow-sm bg-white">
        <p className="text-sm text-gray-500">Phone</p>
        <p className="text-lg font-semibold">9879856450</p>
      </div>

      <div className="p-4 border rounded-lg shadow-sm bg-white">
        <p className="text-sm text-gray-500">City</p>
        <p className="text-lg font-semibold">Pune</p>
      </div>

      <div className="p-4 border rounded-lg shadow-sm bg-white">
        <p className="text-sm text-gray-500">Address</p>
        <p className="text-lg font-semibold">Sunbeam Infotech Pvt. Ltd.</p>
      </div>

    </div>
  );
}
