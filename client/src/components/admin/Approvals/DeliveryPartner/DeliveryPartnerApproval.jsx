import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getPendingDeliveryPartners } from "../../../../services/admin/deliveryPartnerApprovals";

function DeliveryPartnerApprovals() {
    const navigate = useNavigate();
    const [applications, setApplications] = useState([]);

    useEffect(() => {
        loadApplications();
    }, []);

    const loadApplications = async () => {
        const data = await getPendingDeliveryPartners();
        if (data) {
            setApplications(data);
        }
    };
    return (
        <div className="min-h-screen flex justify-center items-start pt-16 bg-gray-100">
            <div className="w-[95%] max-w-4xl bg-white rounded-2xl shadow-lg p-10">

                {/* Page Title */}
                <h1 className="text-center text-2xl font-bold mb-8 text-gray-800">
                    Delivery Partner Approvals
                </h1>

                {/* Application Items */}
                <div className="flex flex-col gap-4">

                   
                    {applications.length === 0 ? (
                        <div className="text-center text-gray-500 py-10">No pending applications</div>
                    ) : (
                        <>
                            {/* Column Headers */}
                            <div className="flex items-center justify-between px-6 py-3 bg-gray-50 rounded-t-lg font-semibold text-gray-700 border-b">
                                <div className="w-12 text-center">S.No</div>
                                <div className="flex-1 px-4">Partner Name</div>
                                <div className="w-40 text-center">Application Date</div>
                                <div className="w-24 text-center">Status</div>
                                <div className="w-40 text-center">Action</div>
                            </div>

                            {/* List of Applications */}
                            <div className="flex flex-col border rounded-b-lg divide-y bg-white">
                                {applications.map((app, index) => (
                                    <div key={app.id} className="flex items-center justify-between px-6 py-4 hover:bg-gray-50 transition-colors">
                                        <div className="w-12 text-center text-gray-500 font-medium">{index + 1}</div>
                                        <div className="flex-1 px-4 font-semibold text-gray-800">{app.deliveryPartnerName}</div>
                                        <div className="w-40 text-center text-gray-600">
                                            {app.applicationDate || 'N/A'}
                                        </div>
                                        <div className="w-24 text-center">
                                            <span className="px-3 py-1 text-xs font-bold uppercase rounded-full bg-yellow-100 text-yellow-700">
                                                Pending
                                            </span>
                                        </div>
                                        <div className="w-40 text-center">
                                            <button
                                                className="px-4 py-2 text-sm font-medium rounded-lg bg-orange-500 text-white hover:bg-orange-600 transition-colors shadow-sm"
                                                onClick={() => navigate(`view-application/${app.id}`)}
                                            >Visit Application
                        </button>
                    </div>

                   
                   </div>
                                ))}
                            </div>
                        </>
                    )} 

                </div>

            </div>
        </div>
    );
}

export default DeliveryPartnerApprovals