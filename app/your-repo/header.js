import { useRouter } from "next/navigation.js";
import { getAuth, signOut } from "firebase/auth";

export default function Header() {
  const router = useRouter();

  function handleSignOut() {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        router.push("/");
      })
      .catch((error) => {
        console.error(error);
      });
  }

  return (
    <div className="flex items-center justify-between bg-gray-200 px-6 py-4 text-gray-800 sm:flex-row sm:py-6">
      <div className="text-3xl font-extrabold italic sm:text-4xl">REP REPO</div>
      <button onClick={() => handleSignOut()}>Log out</button>
    </div>
  );
}
