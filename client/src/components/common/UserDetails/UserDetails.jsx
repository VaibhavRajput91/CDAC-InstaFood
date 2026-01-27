export default function UserDetails({ user }) {
  if (!user) return null;

  const fullAddress = [user.lineOne, user.lineTwo, user.city, user.state]
    .filter(part => part && part.trim() !== "")
    .join(", ");

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

      <div className="p-4 border rounded-lg shadow-sm bg-white border-orange-100 hover:border-orange-200 transition-colors">
        <p className="text-sm text-gray-500 font-medium">Full Name</p>
        <p className="text-lg font-bold text-gray-800">{user.firstName} {user.lastName}</p>
      </div>

      <div className="p-4 border rounded-lg shadow-sm bg-white border-orange-100 hover:border-orange-200 transition-colors">
        <p className="text-sm text-gray-500 font-medium">Email</p>
        <p className="text-lg font-bold text-gray-800">{user.email}</p>
      </div>

      <div className="p-4 border rounded-lg shadow-sm bg-white border-orange-100 hover:border-orange-200 transition-colors">
        <p className="text-sm text-gray-500 font-medium">Phone</p>
        <p className="text-lg font-bold text-gray-800">{user.phone}</p>
      </div>

      <div className="p-4 border rounded-lg shadow-sm bg-white border-orange-100 hover:border-orange-200 transition-colors">
        <p className="text-sm text-gray-500 font-medium">Role</p>
        <p className="text-lg font-bold text-gray-800">{user.role.replace('ROLE_', '')}</p>
      </div>

      <div className="p-4 border rounded-lg shadow-sm bg-white border-orange-100 hover:border-orange-200 transition-colors md:col-span-2">
        <p className="text-sm text-gray-500 font-medium">Address</p>
        <p className="text-lg font-bold text-gray-800">{fullAddress || 'Not provided'}</p>
      </div>

      <div className="p-4 border rounded-lg shadow-sm bg-white border-orange-100 hover:border-orange-200 transition-colors">
        <p className="text-sm text-gray-500 font-medium">Postal Code</p>
        <p className="text-lg font-bold text-gray-800">{user.postalCode || 'Not provided'}</p>
      </div>

    </div>
  );
}
