import { useNavigate } from "react-router-dom";


function Statistics() {

    const navigate = useNavigate();

    return (
        <div className="bg-gray-100 min-h-screen">

            <div className="max-w-3xl mx-auto bg-white border shadow-md rounded-lg p-10 min-h-[70vh] mt-10">

                <div className="flex flex-col items-center justify-evenly h-[60vh]">

                    <button className="w-80 py-4 bg-red-500 text-white border rounded-xl shadow-sm hover:shadow-md transition"
                        onClick={() => navigate("customer-data")}>
                        Customer Data
                    </button>


                    <button className="w-80 py-4 bg-red-500 text-white border rounded-xl shadow-sm hover:shadow-md transition"
                        onClick={() => navigate("restaurant-data")}>
                        Restaurant Data
                    </button>

                    <button className="w-80 py-4 bg-red-500 text-white border rounded-xl shadow-sm hover:shadow-md transition"
                        onClick={() => navigate("delivery-data")}>
                        Delivery Partners Data
                    </button>

                </div>
            </div>
        </div>
    );
}

export default Statistics;