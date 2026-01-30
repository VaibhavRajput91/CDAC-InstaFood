import React, { useState } from 'react';
import axios from 'axios';
import { Clock, RefreshCw, AlertCircle } from 'lucide-react';
import { config } from '../../services/config';

export function ApprovalPending({ navigateTo }) {
    const [checking, setChecking] = useState(false);
    const [error, setError] = useState('');

    const checkStatus = async () => {
        const deliveryPartnerId = sessionStorage.getItem('deliveryPartnerId');
        if (!deliveryPartnerId) {
            // Should theoretically not happen if we are on this screen, but handle safe
            navigateTo('apply');
            return;
        }

        setChecking(true);
        setError('');

        try {
            // API: ${config.server}/delivery/status?deliveryPartnerId=${id}
            const response = await axios.get(`${config.server}/delivery/status`, {
                params: { deliveryPartnerId }
            });

            // Response: { "status": "PENDING" | "AVAILABLE" | "UNAVAILABLE" }
            const status = response.data.status;

            if (status === 'REJECTED') {
                navigateTo('register');
            } else if (status !== 'PENDING') {
                // Approved!
                navigateTo('dashboard');
            } else {
                // Still pending
                // Maybe show a toast or message, but for now just staying on screen is enough info?
                // Let's make it clear.
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
