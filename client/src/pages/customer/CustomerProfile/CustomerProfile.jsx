import React, { useState, useEffect } from 'react';
import CustomerNavbar from '../../../components/customer/CustomerNavbar/CustomerNavbar';
import ProfileAvatar from '../../../components/common/ProfileAvatar/ProfileAvatar';
import UserDetails from '../../../components/common/UserDetails/UserDetails';
import { useNavigate } from 'react-router-dom';
import { getCustomerProfile } from '../../../services/customer/customerProfile';
import './CustomerProfile.css';

function CustomerProfile() {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const userId = sessionStorage.getItem('userId') ; // Default to 2 if not found as per previous context
                const response = await getCustomerProfile(userId);
                if (response) {
                    setUser(response);
                }
            } catch (error) {
                console.error("Error fetching profile:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchProfile();
    }, []);

    return (
        <div className="min-h-screen bg-orange-50">
            <CustomerNavbar />
            <div className="max-w-4xl mx-auto py-10 px-4 sm:px-6 lg:px-8">
                <div className="bg-white shadow rounded-lg overflow-hidden border border-orange-100">
                    <div className="bg-white p-6 flex flex-col items-center border-b border-orange-200">
                         <div className="mb-4">
                            <ProfileAvatar user={user} />
                        </div>
                    </div>
                    
                    <div className="p-6">
                        {loading ? (
                            <div className="flex justify-center items-center py-10">
                                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500"></div>
                            </div>
                        ) : (
                            <UserDetails user={user} />
                        )}
                        
                        <div className="mt-8 flex justify-center gap-4">
                            <button
                                onClick={() => navigate('/customer/edit-profile')}
                                className="bg-black text-white px-6 py-2 rounded-md hover:bg-gray-800 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900"
                            >
                                Edit Profile
                            </button>
                            <button
                                onClick={() => navigate('/customer/change-password')}
                                className="bg-white text-orange-600 border border-orange-600 px-6 py-2 rounded-md hover:bg-orange-50 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 font-bold"
                            >
                                Change Password
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CustomerProfile;
