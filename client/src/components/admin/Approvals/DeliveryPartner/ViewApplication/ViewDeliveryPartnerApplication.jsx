import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import ProfileAvatar from "../../../../common/ProfileAvatar/ProfileAvatar";
import { getDeliveryPartnerApplicationDetails, approveDeliveryPartner, rejectDeliveryPartner } from "../../../../../services/admin/deliveryPartnerApprovals";
import { toast } from "react-toastify";

function ViewDeliveryPartnerApplication() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [application, setApplication] = useState(null);

    useEffect(() => {
        loadApplicationDetails();
    }, [id]);

    const loadApplicationDetails = async () => {
        const data = await getDeliveryPartnerApplicationDetails(id);
        if (data) {
            setApplication(data);
        }
    };
     const handleAccept = async () => {
        const result = await approveDeliveryPartner(id);
        if (result) {
            toast.success("Application Accepted");
            navigate("/admin/approvals/delivery-partners");
        } else {
            toast.error("Failed to accept application");
        }
    };

    const handleReject = async () => {
        const result = await rejectDeliveryPartner(id);
        if (result) {
            toast.success("Application Rejected");
            navigate("/admin/approvals/delivery-partners");
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

                {/* Avatar Centered */}
                <center>
                    <ProfileAvatar />
                    <br />
                </center>

                {/* Table */}
                <table className="w-full border border-gray-300 rounded-lg overflow-hidden">
                    <tbody className="divide-y divide-gray-300">

                        <tr>
                            <td className="bg-gray-100 font-semibold p-3 w-1/3">Partner Name</td>
                            <td className="p-3">{application.deliveryPartnerName}</td>
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
                            <td className="bg-gray-100 font-semibold p-3">Vehicle Type</td>
                            <td className="p-3">{application.vehicheType}</td>
                        </tr>

                        <tr>
                            <td className="bg-gray-100 font-semibold p-3">Vehicle Number</td>
                            <td className="p-3">{application.licenseNumber}</td>
                        </tr>

                        <tr>
                            <td className="bg-gray-100 font-semibold p-3">Address</td>
                            <td className="p-3">{application.address}</td>
                        </tr>

                    </tbody>
                </table>

                {/* Buttons */}
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

export default ViewDeliveryPartnerApplication;
