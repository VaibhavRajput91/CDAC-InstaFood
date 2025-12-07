import React from 'react';
import Navbar from '../../../components/common/Navbar/Navbar';
import ProfileAvatar from '../../../components/common/ProfileAvatar/ProfileAvatar';
import UserDetails from '../../../components/common/UserDetails/UserDetails';
import { useNavigate } from 'react-router-dom';
import './CustomerProfile.css';

function CustomerProfile() {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />
            <div className="max-w-4xl mx-auto py-10 px-4 sm:px-6 lg:px-8">
                <div className="bg-white shadow rounded-lg overflow-hidden">
                    <div className="bg-white p-6 flex flex-col items-center border-b border-gray-200">
                         <div className="mb-4">
                            <ProfileAvatar />
                        </div>
                    </div>
                    
                    <div className="p-6">
                        <UserDetails />
                        
                        <div className="mt-8 flex justify-center">
                            <button
                                onClick={() => navigate('/customer/edit-profile')}
                                className="bg-black text-white px-6 py-2 rounded-md hover:bg-gray-800 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900"
                            >
                                Edit Profile
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CustomerProfile;
