import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { deleteCookie, getCookie } from "../actions/cookie";
import { validateToken } from "../actions/utils";

function Sidebar() {
  // Logout function
  const handleLogout = () => {
    deleteCookie();
  };

  const [role, setRole] = useState("");

  useEffect(() => {
    const handleAuthentication = async () => {
      const auth = getCookie();
      if (auth) {
        const result = await validateToken(auth);
        const userRole = result.role;
        setRole(userRole);
        console.log("Role is", userRole);
      }
    };

    handleAuthentication();
  }, []);

  return (
    <div className="w-64 bg-white shadow-lg h-full">
      <div className="p-4 text-center text-blue-600 text-xl font-bold">
        Classroom App
      </div>
      <nav>
        {/* Static navigation links */}
        <NavLink
          to="/"
          className={({ isActive }) =>
            `block px-4 py-2 text-gray-700 hover:bg-gray-200 ${
              isActive ? "bg-blue-100 text-blue-600" : ""
            }`
          }
        >
          Home
        </NavLink>

        <NavLink
          to="/notes"
          className={({ isActive }) =>
            `block px-4 py-2 text-gray-700 hover:bg-gray-200 ${
              isActive ? "bg-blue-100 text-blue-600" : ""
            }`
          }
        >
          Notes
        </NavLink>

        {role === "Student" && (
          <NavLink
            to="/feedback"
            className={({ isActive }) =>
              `block px-4 py-2 text-gray-700 hover:bg-gray-200 ${
                isActive ? "bg-blue-100 text-blue-600" : ""
              }`
            }
          >
            Feedback
          </NavLink>
        )}

        {role !== "Student" && (
          <NavLink
            to="/manage-notes"
            className={({ isActive }) =>
              `block px-4 py-2 text-gray-700 hover:bg-gray-200 ${
                isActive ? "bg-blue-100 text-blue-600" : ""
              }`
            }
          >
            Manage Notes
          </NavLink>
        )}

        {role !== "Student" && (
          <NavLink
            to="/add-announcement"
            className={({ isActive }) =>
              `block px-4 py-2 text-gray-700 hover:bg-gray-200 ${
                isActive ? "bg-blue-100 text-blue-600" : ""
              }`
            }
          >
            Add Announcement
          </NavLink>
        )}
      </nav>

      {/* Logout Button */}
      <button
        className="block px-4 py-2 mt-4 w-full text-gray-700 hover:bg-gray-200 bg-red-500"
        onClick={handleLogout}
      >
        Logout
      </button>
    </div>
  );
}

export default Sidebar;
