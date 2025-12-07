import { useNavigate } from "react-router-dom";

function DeliveryPartnerApprovals() {
    const navigate = useNavigate()
    return (
        <div className="min-h-screen flex justify-center items-start pt-16 bg-gray-100">
            <div className="w-[90%] max-w-xl bg-white rounded-2xl shadow-lg p-10">

                {/* Page Title */}
                <h1 className="text-center text-xl font-semibold mb-10">
                    Delivery Partner Approvals
                </h1>

                {/* Application Items */}
                <div className="flex flex-col gap-6">

                    {/* Row 1 */}
                    <div className="w-full flex items-center justify-between border rounded-lg px-4 py-3">
                        <div className="text-gray-600">Application Name</div>
                        <button className="border px-4 py-1 rounded-md bg-red-500 text-white"
                            onClick={() => navigate("view-application")}>
                            Visit Application
                        </button>
                    </div>

                    {/* Row 2 */}
                    <div className="w-full flex items-center justify-between border rounded-lg px-4 py-3">
                        <div className="text-gray-600">Application Name</div>
                        <button className="border px-4 py-1 rounded-md bg-red-500 text-white"
                            onClick={() => navigate("view-application")}>
                            Visit Application
                        </button>
                    </div>

                    {/* Row 3 */}
                    <div className="w-full flex items-center justify-between border rounded-lg px-4 py-3">
                        <div className="text-gray-600">Application Name</div>
                        <button className="border px-4 py-1 rounded-md bg-red-500 text-white"
                            onClick={() => navigate("view-application")}>
                            Visit Application
                        </button>
                    </div>

                </div>

            </div>
        </div>
    );
}

export default DeliveryPartnerApprovals