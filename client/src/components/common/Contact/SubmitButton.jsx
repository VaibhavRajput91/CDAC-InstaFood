export default function SubmitButton({ text="Submit" }) {
  return (
    <button className="w-full sm:w-auto bg-red-500 text-white font-medium px-6 py-2 rounded-lg shadow-md hover:bg-red-600 active:scale-95 transition">
      {text}
    </button>
  );
}
