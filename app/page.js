import Link from "next/link";

export default function Splash() {
  return (
    <main className="bg-gray-200 text-gray-800 flex justify-center md:justify-normal h-full">
      <div className="items-stretch flex flex-col mt-16 md:mt-0 md:flex-row md:ml-24 lg:ml-48 md:self-center">
        <div className="text-center md:text-right md:my-auto">
          <div className="font-bold italic text-4xl">REP REPO</div>
        </div>
        <div className="border-r-gray-500 border-b-2 md:border-r-2 mx-12"></div>
        <Buttons />
      </div>
    </main>
  );
}

function Buttons() {
  const inputStyles = "bg-gray-100 block";
  const buttonStyles =
    "px-6 py-1 text-white bg-green-600 hover:bg-green-500 mr-4 rounded-lg";

  return (
    <div className="py-8">
      <form className="mb-4">
        <label className="block mb-4">
          Username
          <input
            id="username"
            type="text"
            className={inputStyles}
            autoComplete="on"
          />
        </label>
        <label className="block mb-8">
          Password
          <input id="password" type="password" className={inputStyles} />
        </label>
        <div className="mb-12">
          <button className={buttonStyles}>Log in</button>
          <button className={buttonStyles}>Sign up</button>
        </div>
      </form>
      <Link href="your-repo" className="hover:underline">
        Continue as guest
      </Link>
    </div>
  );
}
