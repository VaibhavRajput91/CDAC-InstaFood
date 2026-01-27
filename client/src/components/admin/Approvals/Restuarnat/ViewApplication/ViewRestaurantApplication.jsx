import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import ProfileAvatar from "../../../../common/ProfileAvatar/ProfileAvatar";
import { getRestaurantApplicationDetails, approveRestaurant, rejectRestaurant } from "../../../../../services/admin/restaurantApprovals";
import { toast } from "react-toastify";

function ViewRestaurantApplication() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [application, setApplication] = useState(null);

    useEffect(() => {
        loadApplicationDetails();
    }, [id]);

    const loadApplicationDetails = async () => {
        const data = await getRestaurantApplicationDetails(id);
        if (data) {
            setApplication(data);
        }
    };
    const handleAccept = async () => {
        const result = await approveRestaurant(id);
        if (result) {
            toast.success("Application Accepted");
            navigate("/admin/approvals/restaurants");
        } else {
            toast.error("Failed to accept application");
        }
    };

    const handleReject = async () => {
        const result = await rejectRestaurant(id);
        if (result) {
            toast.success("Application Rejected");
            navigate("/admin/approvals/restaurants");
        } else {
            toast.error("Failed to reject application");
        }
    };

    if (!application) {
        return <div className="text-center pt-20">Loading...</div>;
    }
    return (
        <div className="min-h-screen flex justify-center items-start pt-16 bg-gray-100">
            <div className="w-[90%] max-w-2xl bg-white rounded-2xl shadow-lg p-8">
                <center>
                    <ProfileAvatar />
                    <br />
                </center>

                <table className="w-full border border-gray-300 rounded-lg overflow-hidden">
                    <tbody className="divide-y divide-gray-300">

                        <tr>
                            <td className="bg-gray-100 font-semibold p-3 w-1/3">Restaurant Name</td>
                            <td className="p-3">{application.restaurantName}</td>
                        </tr>

                        <tr>
                            <td className="bg-gray-100 font-semibold p-3">Owner Name</td>
                            <td className="p-3">{application.ownerName}</td>
                        </tr>

                        <tr>
                            <td className="bg-gray-100 font-semibold p-3">Email</td>
                            <td className="p-3">{application.email}</td>
                        </tr>

                        <tr>
                            <td className="bg-gray-100 font-semibold p-3">Phone</td>
                            <td className="p-3">{application.phone}</td>
                        </tr>

                        <tr>
                            <td className="bg-gray-100 font-semibold p-3">Address Line 1</td>
                            <td className="p-3">{application.addressLine1}</td>
                        </tr>

                        <tr>
                            <td className="bg-gray-100 font-semibold p-3">Address Line 2</td>
                            <td className="p-3">{application.addressLine2}</td>
                        </tr>

                    </tbody>
                </table>
                <div className="flex justify-center gap-6 mt-6">
                    <button
                        onClick={handleAccept}
                        className="px-8 py-2 rounded-md bg-green-600 text-white font-semibold hover:bg-green-700">
                        Accept
                    </button>

                    <button
                        onClick={handleReject}
                        className="px-8 py-2 rounded-md bg-red-700 text-white font-semibold hover:bg-red-800">
                        Reject
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ViewRestaurantApplication