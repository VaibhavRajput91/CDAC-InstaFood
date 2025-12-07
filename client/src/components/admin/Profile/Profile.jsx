import ProfileAvatar from "../../common/ProfileAvatar/ProfileAvatar";

function Profile() {
    return (
        <div className="min-h-screen flex justify-center items-start pt-16 bg-gray-100">
            <div className="w-[90%] max-w-2xl bg-white rounded-2xl shadow-lg p-8">
                <center>
                    <ProfileAvatar />
                    <br />
                </center>
                {/* Admin Info */}
                <div className="text-center">
                    <h2 className="text-2xl font-semibold mb-2">Admin Name</h2>

                    <div className="text-gray-700 mb-1">
                        <span className="font-medium">Email:</span> admin@example.com
                    </div>

                    <div className="text-gray-700 mb-1">
                        <span className="font-medium">Phone:</span> +91 9876543210
                    </div>
                </div>

            </div>
        </div>
    );
}

export default Profile