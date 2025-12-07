import ProfileAvatar from "../../../../common/ProfileAvatar/ProfileAvatar";

function ViewDeliveryPartnerApplication() {
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
                            <td className="p-3">delivery-partner-name</td>
                        </tr>

                        <tr>
                            <td className="bg-gray-100 font-semibold p-3">Email</td>
                            <td className="p-3">partner@gmail.com</td>
                        </tr>

                        <tr>
                            <td className="bg-gray-100 font-semibold p-3">Phone</td>
                            <td className="p-3">+91 XXXXX XXXXX</td>
                        </tr>

                        <tr>
                            <td className="bg-gray-100 font-semibold p-3">Vehicle Type</td>
                            <td className="p-3">Bike / Scooter</td>
                        </tr>

                        <tr>
                            <td className="bg-gray-100 font-semibold p-3">Vehicle Number</td>
                            <td className="p-3">MH12 AB 1234</td>
                        </tr>

                        <tr>
                            <td className="bg-gray-100 font-semibold p-3">Address</td>
                            <td className="p-3">partner-address</td>
                        </tr>

                    </tbody>
                </table>

                {/* Buttons */}
                <div className="flex justify-center gap-6 mt-6">
                    <button className="px-8 py-2 rounded-md bg-green-600 text-white font-semibold hover:bg-green-700">
                        Accept
                    </button>

                    <button className="px-8 py-2 rounded-md bg-red-700 text-white font-semibold hover:bg-red-800">
                        Reject
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ViewDeliveryPartnerApplication;
