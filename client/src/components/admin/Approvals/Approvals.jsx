import { useNavigate } from "react-router-dom";

function Approvals() {
    const navigate = useNavigate()
    return (
        <div className="min-h-screen flex justify-center items-start pt-16 bg-gray-100">
            <div className="w-[90%] max-w-xl bg-white rounded-2xl shadow-lg p-10 flex flex-col gap-8">
                <div className="w-full py-4 text-lg font-semibold bg-red-500 text-white rounded-full text-center select-none"
                    onClick={() => navigate("restaurants")}>
                    Restaurant Approvals
                </div>
                <div className="w-full py-4 text-lg font-semibold bg-red-500 text-white rounded-full text-center select-none"
                    onClick={() => navigate("delivery-partners")}>
                    Delivery Partner Approvals
                </div>
            </div>
        </div>
    );
}

export default Approvals