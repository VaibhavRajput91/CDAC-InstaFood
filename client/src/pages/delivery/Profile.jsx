import Navbar from '../../components/common/Navbar';
import ProfileActions from '../../components/common/ProfileActions';
import ProfileAvatar from './../../components/common/ProfileAvatar';
import UserDetails from './../../components/common/UserDetails';

export default function Profile() {
  return (
    <>
      <Navbar />
      <div className="max-w-3xl mx-auto px-4 py-8">

        {/* Profile Avatar */}
        <div className="flex justify-center mb-8">
          <ProfileAvatar />
        </div>

        {/* User Details */}
        <UserDetails />

        {/* Action Buttons */}
        <div className="mt-10 flex justify-center space-x-6">
          <ProfileActions />
        </div>
      </div>
    </>
  );
}
