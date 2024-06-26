"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyB_IXWafXlGzGjClrKShnzgMjP5fvfV-tY",
  authDomain: "rep-repo.firebaseapp.com",
  projectId: "rep-repo",
  storageBucket: "rep-repo.appspot.com",
  messagingSenderId: "850559429012",
  appId: "1:850559429012:web:89bfa02a83303037198781",
  measurementId: "G-T6T8MJTZG9",
};

const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

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
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSigningUp, setIsSigningUp] = useState(false);

  const router = useRouter();

  const inputStyles = "bg-gray-100 block";
  const buttonStyles =
    "px-6 py-1 text-white bg-green-600 hover:bg-green-500 mr-4 rounded-lg";

  function signIn(email, password) {
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        router.push("/your-repo");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error(`${errorCode} error with message ${errorMessage}`);
      });
  }

  function createUser(email, password) {
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed up
        const user = userCredential.user;
        console.log("User created", user.uid);
        router.push("/your-repo");
      })
      .catch((error) => {
        const errorCode = error.code;
        if (errorCode === "auth/email-already-in-use") {
          console.error("Account already exists for that email");
        } else {
          const errorMessage = error.message;
          console.error(`${errorCode} | ${errorMessage}`);
        }
      });
  }

  return (
    <div className="py-8">
      <form className="mb-4">
        <label className="mb-4 block">
          Email
          <input
            id="email"
            type="text"
            className={inputStyles}
            autoComplete="on"
            onInput={(e) => setEmail(e.target.value)}
          />
        </label>
        <label className="mb-8 block">
          Password
          <input
            id="password"
            type="password"
            className={inputStyles}
            onInput={(e) => setPassword(e.target.value)}
          />
        </label>
        <div>
          {isSigningUp ? (
            <button
              className={buttonStyles}
              onClick={(e) => {
                e.preventDefault();
                createUser(email, password);
              }}
            >
              Sign up
            </button>
          ) : (
            <button
              className={buttonStyles}
              onClick={(e) => {
                e.preventDefault();
                signIn(email, password);
              }}
            >
              Log in
            </button>
          )}
          <label className="mb-3 mt-12 block">
            {isSigningUp ? "Have an account? " : "New user? "}
          </label>
          <button
            className="hover:underline"
            onClick={(e) => {
              e.preventDefault();
              setIsSigningUp(!isSigningUp);
            }}
          >
            {isSigningUp ? "Go to sign in" : "Create account"}
          </button>
        </div>
      </form>
    </div>
  );
}
