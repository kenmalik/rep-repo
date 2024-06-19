import Link from "next/link";

export default function Header() {
  return (
    <div
      className="flex items-center justify-center bg-gray-200 px-24 py-4 text-gray-800
        sm:justify-between sm:py-6"
    >
      <div className="text-3xl font-extrabold italic sm:text-4xl">REP REPO</div>
      <div className="hidden sm:block">
        <Link href="/">Log out</Link>
      </div>
    </div>
  );
}
