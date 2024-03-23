export default function Modal({ children, onExit }) {
  return (
    <div className="flex justify-center items-center bg-black bg-opacity-30 w-full h-full fixed top-0 left-0">
      <div className="w-3/4 sm:w-3/5 md:w-1/2 rounded-lg overflow-hidden">
        <div className="text-gray-700 bg-gray-400 text-xl px-4 py-2 text-right">
          <button className="text-red" onClick={onExit}>
            &times;
          </button>
        </div>
        <div className="bg-gray-200 text-gray-800 min-h-16 py-4 px-6">
          {children}
        </div>
      </div>
    </div>
  );
}
