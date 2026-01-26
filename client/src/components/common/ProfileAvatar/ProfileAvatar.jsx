export default function ProfileAvatar({ user }) {
  const getInitials = () => {
    if (!user) return '👤';
    const first = user.firstName ? user.firstName[0].toUpperCase() : '';
    const last = user.lastName ? user.lastName[0].toUpperCase() : '';
    return first + last || '👤';
  };

  return (
    <div className="w-32 h-32 rounded-full border-4 border-orange-200 flex items-center justify-center bg-orange-100 shadow-sm text-orange-600 font-bold text-3xl">
      {getInitials()}
    </div>
  );
}
