import { useEffect, useState } from 'react';
import ProfileAvatar from "../../common/ProfileAvatar/ProfileAvatar";
import { getAdminProfile } from '../../../services/admin/adminProfile';

function Profile() {
    const [admin, setAdmin] = useState(null);

    useEffect(() => {
        loadProfile();
    }, []);

    const loadProfile = async () => {
        const data = await getAdminProfile();
        if (data) {
            setAdmin(data);
        }
    };
    return (
        <div className="min-h-screen flex justify-center items-start pt-16 bg-gray-100">
            <div className="w-[90%] max-w-2xl bg-white rounded-2xl shadow-lg p-8">
                <center>
                    <ProfileAvatar />
                    <br />
                </center>
                {/* Admin Info */}
                <div className="text-center">
                    <h2 className="text-2xl font-semibold mb-2">
                        {admin ? `${admin.firstName} ${admin.lastName}` : 'Loading...'}
    
                    </h2>

                    <div className="text-gray-700 mb-1">
                        <span className="font-medium">Email:</span> {admin?.email}
                    </div>

                    <div className="text-gray-700 mb-1">
                        <span className="font-medium">Phone:</span> {admin?.phone}
                    </div>
                </div>

            </div>
        </div>
    );
}

export default Profile