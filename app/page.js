import Link from "next/link";

export default function Splash() {
  return (
    <main className="bg-white text-gray-800 flex justify-center sm:justify-normal h-full">
      <div className="items-stretch flex flex-col sm:flex-row sm:ml-32 md:ml-48 lg:ml-64 mt-16 sm:self-center">
        <div className="text-center p-8">
          <p>Welcome to</p>
          <div className="font-bold italic text-4xl">REP REPO</div>
        </div>
        <div className="border-r-gray-500 border-b-2 sm:border-r-2"></div>
        <Buttons />
      </div>
    </main>
  );
}

function Buttons() {
  return (
    <div className="p-8">
      <div>Login</div>
      <Link href="your-repo">Go</Link>
    </div>
  );
}
