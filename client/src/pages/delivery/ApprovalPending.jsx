import React, { useState } from 'react';
import api from '../../services/api';
import { Clock, RefreshCw, AlertCircle } from 'lucide-react';

export function ApprovalPending({ navigateTo }) {
    const [checking, setChecking] = useState(false);
    const [error, setError] = useState('');

    const checkStatus = async () => {
        const deliveryPartnerId = sessionStorage.getItem('deliveryPartnerId');
        if (!deliveryPartnerId) {
            navigateTo('apply');
            return;
        }

        setChecking(true);
        setError('');

        try {
            const response = await api.get(`/delivery/status`, {
                params: { deliveryPartnerId }
            });

            const status = response.data.status;

            if (status === 'REJECTED') {
                navigateTo('register');
            } else if (status !== 'PENDING') {
                navigateTo('dashboard');
            } else {
                setError('Status is still Pending. Please wait for admin approval.');
            }
        } catch (err) {
            console.error("Error checking status:", err);
            setError('Failed to check status. Please try again.');
        } finally {
            setChecking(false);
        }
    };

    return (
        <div className="min-h-screen bg-orange-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl shadow-lg p-8 max-w-md w-full text-center border border-orange-100">
                <div className="w-20 h-20 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Clock className="w-10 h-10 text-orange-600" />
                </div>

                <h2 className="text-2xl font-bold text-gray-900 mb-3">Application Pending</h2>
                <p className="text-gray-600 mb-8">
                    Your delivery partner application is currently under review.
                    Please check back later or refresh the status.
                </p>

                {error && (
                    <div className="bg-red-50 text-red-600 p-3 rounded-xl mb-6 text-sm flex items-center gap-2 justify-center">
                        <AlertCircle className="w-4 h-4" />
                        {error}
                    </div>
                )}

                <button
                    onClick={checkStatus}
                    disabled={checking}
                    className="w-full bg-orange-500 text-white py-4 rounded-xl font-semibold hover:bg-orange-600 transition-all flex items-center justify-center gap-2 disabled:opacity-70"
                >
                    <RefreshCw className={`w-5 h-5 ${checking ? 'animate-spin' : ''}`} />
                    {checking ? 'Checking Status...' : 'Refresh Status'}
                </button>

                <button
                    onClick={() => {
                        sessionStorage.clear();
                        window.location.reload(); // Or navigate to main login if available
                    }}
                    className="mt-4 text-gray-500 text-sm hover:text-gray-700 underline"
                >
                    Log out
                </button>
            </div>
        </div>
    );
}
