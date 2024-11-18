import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

export default function LoginButton() {
  const { loginWithRedirect, isAuthenticated, logout , loginWithPopup } = useAuth0();
  return (
    <div className="">
      <div className="card bg-gray-400 shadow-2xl shadow-black w-[40%] mx-auto my-60 rounded-xl px-10 py-24">
        <div className="my-auto">
          <div className="mx-auto text-center text-5xl font-bold text-gray-700">
            Welcome, Let's get Started!
          </div>
          <div className="mx-auto text-center mt-14">
            <button className="bg-white px-20 py-5 rounded-full text-2xl text-gray-700 font-semibold" onClick={loginWithPopup}>
              Login
            </button>
            <div className="mt-3">Don't have an account? <button className="font-bold text-gray-700" onClick={loginWithPopup}>Signup</button></div>
          </div>
        </div>
      </div>
    </div>
  );
}
