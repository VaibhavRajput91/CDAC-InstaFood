import { useEffect, useState } from 'react';
import adminLogo from "../../../images/admin-logo.png";
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
                     <div className="w-32 h-32 rounded-full border-4 border-orange-200 overflow-hidden shadow-sm mb-4">
                        <img src={adminLogo} alt="Admin Logo" className="w-full h-full object-cover" />
                    </div>
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