import { useState } from "react";
import ContactInput from "../../../components/common/Contact/ContactInput";
import TextArea from "../../../components/common/Contact/TextArea";
import SubmitButton from "../../../components/common/Contact/SubmitButton";

export default function ContactUs() {
  
  const [query, setQuery] = useState({
    name: "",
    email: "",
    message: ""
  });

  const handleSubmit = () => {
    alert("Thank you! We will get back to you shortly.");
  };

  return (
    <div className="min-h-[calc(100vh-80px)] flex flex-col items-center px-5 py-10 pb-[100px]">

      {/* Title */}
      <h1 className="text-3xl font-extrabold text-center mb-8 text-gray-800">
        Contact Support
      </h1>

      {/* Card */}
      <div className="w-full max-w-xl bg-white rounded-xl shadow-lg border p-6 space-y-5">

        <ContactInput 
          label="Your Name" 
          value={query.name} 
          onChange={(e) => setQuery({ ...query, name: e.target.value })} 
        />

        <ContactInput 
          type="email"
          label="Email Address" 
          value={query.email} 
          onChange={(e) => setQuery({ ...query, email: e.target.value })} 
        />

        <TextArea 
          label="Describe Your Issue"
          value={query.message}
          onChange={(e) => setQuery({ ...query, message: e.target.value })}
        />

        <SubmitButton text="Submit Query" onClick={handleSubmit} />

      </div>

      {/* Bottom message */}
      <p className="mt-6 text-sm text-gray-600 text-center w-full">
        We usually respond within <span className="font-semibold text-red-500">1-4 hours</span>.
      </p>
    </div>
  );
}
