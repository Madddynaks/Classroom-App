import React, { useEffect, useState } from "react";
import { validateToken } from "../actions/utils";
import { getCookie } from "../actions/cookie";

export default function Profile() {
    const [role, setRole] = useState("");
    const [userId, setUserId] = useState("");

    useEffect(() => {
        const handleAuthentication = async () => {
          const auth = getCookie();
          if (auth) {
            const result = await validateToken(auth);
            const userRole = result.role;
            const Id = result.user_id;
            setRole(userRole);
            setUserId(Id);
            console.log("Role is", userRole);
          }
        };
    
        handleAuthentication();
      }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      {/* Avatar */}
      <div className="relative mb-6">
        <svg
          className="mx-auto rounded-full hover:scale-110 transform transition-all duration-300 shadow-lg shadow-gray-500"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 448 512"
          height={200}
          fill=""
        >
          <path d="M96 128a128 128 0 1 0 256 0A128 128 0 1 0 96 128zm94.5 200.2l18.6 31L175.8 483.1l-36-146.9c-2-8.1-9.8-13.4-17.9-11.3C51.9 342.4 0 405.8 0 481.3c0 17 13.8 30.7 30.7 30.7l131.7 0c0 0 0 0 .1 0l5.5 0 112 0 5.5 0c0 0 0 0 .1 0l131.7 0c17 0 30.7-13.8 30.7-30.7c0-75.5-51.9-138.9-121.9-156.4c-8.1-2-15.9 3.3-17.9 11.3l-36 146.9L238.9 359.2l18.6-31c6.4-10.7-1.3-24.2-13.7-24.2L224 304l-19.7 0c-12.4 0-20.1 13.6-13.7 24.2z" />
        </svg>
      </div>

      {/* User Info */}
      <div className="text-center p-6 bg-white shadow-lg rounded-lg max-w-md w-full transform transition-all duration-300 hover:scale-105">
        <p className="text-xl font-semibold text-gray-800 mb-2">Madhav Nakra</p>
        <p className="text-lg text-gray-600">Role: <span className="font-medium">{role}</span></p>
        <p className="text-lg text-gray-600 mb-4">Email: <span className="font-medium">madhav.nakra2002@gmail.com</span></p>

        <div className="bg-blue-100 p-4 rounded-lg shadow-inner">
          <p className="text-md text-gray-700"><strong>Semester:</strong> {role !== "Student" && "-"} </p>
          <p className="text-md text-gray-700"><strong>Branch:</strong> {role !== "Student" && "-"}</p>
        </div>

        {/* Hover effect for "Edit" button */}
        <button className="mt-6 px-4 py-2 text-white bg-blue-500 rounded-lg shadow-md hover:bg-blue-600 transition-all duration-300 transform hover:scale-105">
          Edit Profile
        </button>
      </div>
    </div>
  );
}
