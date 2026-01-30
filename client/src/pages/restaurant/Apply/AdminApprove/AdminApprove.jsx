import { useNavigate } from 'react-router';
import { CheckCircle, Clock, RefreshCw, XCircle } from 'lucide-react';
import { useState } from 'react';
import { restaurantAPI } from '../../../../services/Restaurant/api';

export default function AdminApprove() {
    const navigate = useNavigate();
    const [isApproved, setIsApproved] = useState(false);
    const [isRejected, setIsRejected] = useState(false);
    const [lastChecked, setLastChecked] = useState(null);

    const checkApprovalStatus = async () => {
        try {
            const restaurantId = sessionStorage.getItem('restaurantId');
            if (!restaurantId) return;

            const applicationStatus = await restaurantAPI.getAdminApproveStatus(restaurantId);
            console.log("For Restaurant_Id:", restaurantId, ", Application status:", applicationStatus.data);

            if (applicationStatus.data === 'AVAILABLE' || applicationStatus.data === 'UNAVAILABLE') {
                setIsApproved(true);
            }
            else if (applicationStatus.data === 'REJECTED') {
                setIsRejected(true);
            }
            setLastChecked(new Date());
        } catch (error) {
            console.error('Error checking approval status:', error);
            setLastChecked(new Date());
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
            <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-12 text-center max-w-md">
                <div className={`w-20 h-20 ${isApproved ? 'bg-green-50' : isRejected ? 'bg-red-50' : 'bg-yellow-50'} rounded-full flex items-center justify-center mx-auto mb-6`}>
                    {(isApproved && !isRejected) ? (
                        <CheckCircle className="w-12 h-12 text-green-600" />
                    ) : isRejected ? (
                        <XCircle className="w-12 h-12 text-red-600" />
                    ) : (
                        <Clock className="w-12 h-12 text-yellow-600" />
                    )}
                </div>

                {(isApproved && !isRejected) ? (
                    <>
                        <h2 className="font-bold text-2xl text-gray-900 mb-4">Application Approved!</h2>
                        <p className="text-gray-600 mb-6">
                            Congratulations! Your application has been approved. You can now access your restaurant dashboard.
                        </p>
                        <button
                            onClick={() => navigate('/restaurant')}
                            className="px-6 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors"
                        >
                            Go to Dashboard
                        </button>
                    </>
                ) : isRejected ? (
                    <>
                        <h2 className="font-bold text-2xl text-gray-900 mb-4">Application Rejected</h2>
                        <p className="text-gray-600 mb-6">
                            Unfortunately, your application has been rejected. You can only apply with a new account.
                        </p>
                        <button
                            onClick={() => navigate('/register')}
                            className="px-6 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors"
                        >
                            Create New Account
                        </button>
                    </>
                ) : (
                    <>
                        <h2 className="font-bold text-2xl text-gray-900 mb-4">
                            Application Pending
                        </h2>
                        <p className="text-gray-600 mb-4">
                            Thank you for applying to join Insta Food. We'll review your application and get back to you within 2-3 business days.
                        </p>
                        <p className="text-sm text-gray-500 mb-6">
                            Last checked: {lastChecked ? lastChecked.toLocaleTimeString() : 'Not checked yet'}
                        </p>
                        <div className="flex items-center justify-center gap-4">
                            <button
                                onClick={checkApprovalStatus}
                                className="px-4 py-3 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 flex items-center gap-2"
                            >
                                <RefreshCw className={`w-4 h-4`} />
                                Refresh
                            </button>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}