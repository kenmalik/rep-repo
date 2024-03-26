import Link from "next/link";

export default function Header() {
  return (
    <div
      className="bg-gray-200 text-gray-800 py-4 sm:py-6 px-24 flex items-center
        justify-center sm:justify-between"
    >
      <div className="text-3xl sm:text-4xl font-extrabold italic">REP REPO</div>
      <div className="hidden sm:block">
        <Link href="/">Log out</Link>
      </div>
    </div>
  );
}
