export default function Modal({ children, onExit }) {
  return (
    <div className="fixed left-0 top-0 flex h-full w-full items-center justify-center bg-black bg-opacity-30">
      <div className="w-3/4 overflow-hidden rounded-lg sm:w-3/5 md:w-1/2">
        <div className="bg-gray-400 px-4 py-2 text-right text-xl text-gray-700">
          <button className="text-red" onClick={onExit}>
            &times;
          </button>
        </div>
        <div className="min-h-16 bg-gray-200 px-6 py-4 text-gray-800">
          {children}
        </div>
      </div>
    </div>
  );
}
