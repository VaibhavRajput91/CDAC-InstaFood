import { useNavigate } from "react-router-dom";


function Statistics() {

    const navigate = useNavigate();

    return (
       <div className="bg-gray-100 min-h-screen flex justify-center items-start pt-16">
            <div className="w-[95%] max-w-3xl bg-white border shadow-lg rounded-2xl p-10 min-h-[70vh]">

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