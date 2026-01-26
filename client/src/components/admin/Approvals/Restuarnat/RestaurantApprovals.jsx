import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getPendingRestaurants } from "../../../../services/admin/restaurantApprovals";

function RestaurantApprovals() {
    const navigate = useNavigate();
    const [applications, setApplications] = useState([]);

    useEffect(() => {
        loadApplications();
    }, []);

    const loadApplications = async () => {
        const data = await getPendingRestaurants();
        if (data) {
            setApplications(data);
        }
    };
    return (
        <div className="min-h-screen flex justify-center items-start pt-16 bg-gray-100">
            <div className="w-[90%] max-w-xl bg-white rounded-2xl shadow-lg p-10">

                {/* Page Title */}
                <h1 className="text-center text-xl font-semibold mb-10">
                    Restaurant Approvals
                </h1>

                {/* Application Items */}
                <div className="flex flex-col gap-6">
                {applications.length === 0 ? (
                        <div className="text-center text-gray-500">No pending applications</div>
                    ) : (
                        applications.map((app) => (
                            <div key={app.id} className="w-full flex items-center justify-between border rounded-lg px-4 py-3">
                                <div className="text-gray-600">{app.restaurantName}</div>
                                
                    
                   <button className="border px-4 py-1 rounded-md bg-red-500 text-white"
                          onClick={() => navigate(`view-application/${app.id}`)}>                            
                            Visit Application
                        </button>
                    </div>
                ))
                   )}
                    

                </div>

            </div>
        </div>
    );
}

export default RestaurantApprovals