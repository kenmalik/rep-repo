import Link from "next/link";

export default function Splash() {
  return (
    <main className="flex h-full justify-center bg-gray-200 text-gray-800 md:justify-normal">
      <div className="mt-16 flex flex-col items-stretch md:ml-24 md:mt-0 md:flex-row md:self-center lg:ml-48">
        <div className="text-center md:my-auto md:text-right">
          <div className="text-4xl font-bold italic">REP REPO</div>
        </div>
        <div className="mx-12 border-b-2 border-r-gray-500 md:border-r-2"></div>
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
        <label className="mb-4 block">
          Username
          <input
            id="username"
            type="text"
            className={inputStyles}
            autoComplete="on"
          />
        </label>
        <label className="mb-8 block">
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
