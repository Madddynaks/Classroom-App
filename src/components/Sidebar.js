import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { deleteCookie, getCookie } from "../actions/cookie";
import { validateToken } from "../actions/utils";
import {
  FaHome,
  FaBook,
  FaComments,
  FaCog,
  FaPlus,
  FaUser,
} from "react-icons/fa"; // Importing some icons for visual appeal

function Sidebar() {
  // Logout function
  const handleLogout = () => {
    deleteCookie();
  };

  const [role, setRole] = useState("");
  const [collapsed, setCollapsed] = useState(false); // State to handle collapsing

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
    <div
      className={`w-${
        collapsed ? "20" : "64"
      } bg-white shadow-lg h-full transition-all duration-300`}
    >
      <div className="p-4 text-center text-blue-600 text-xl font-bold flex items-center justify-between">
        {/* Title */}
        {!collapsed && <span>Classroom App</span>}
        {/* Toggle Button */}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="text-gray-600 focus:outline-none"
        >
          <span
            className={`text-2xl ${
              collapsed ? "rotate-180" : ""
            } transition-all duration-300`}
          >
            ⮜
          </span>
        </button>
      </div>

      <nav className="mt-4">
        {/* Home Link */}
        <NavLink
          to="/"
          className={({ isActive }) =>
            `flex items-center px-4 py-2 text-gray-700 hover:bg-gray-200 transition duration-200 ${
              isActive ? "bg-blue-100 text-blue-600" : ""
            }`
          }
        >
          <FaHome className="mr-2" /> {!collapsed && "Home"}
        </NavLink>

        {/* Notes Link */}
        <NavLink
          to="/notes"
          className={({ isActive }) =>
            `flex items-center px-4 py-2 text-gray-700 hover:bg-gray-200 transition duration-200 ${
              isActive ? "bg-blue-100 text-blue-600" : ""
            }`
          }
        >
          <FaBook className="mr-2" /> {!collapsed && "Notes"}
        </NavLink>

        {/* Feedback Link (For Student Only) */}
        {role === "Student" && (
          <NavLink
            to="/feedback"
            className={({ isActive }) =>
              `flex items-center px-4 py-2 text-gray-700 hover:bg-gray-200 transition duration-200 ${
                isActive ? "bg-blue-100 text-blue-600" : ""
              }`
            }
          >
            <FaComments className="mr-2" /> {!collapsed && "Feedback"}
          </NavLink>
        )}

        {/* Manage Notes (For Non-Students Only) */}
        {role !== "Student" && (
          <NavLink
            to="/manage-notes"
            className={({ isActive }) =>
              `flex items-center px-4 py-2 text-gray-700 hover:bg-gray-200 transition duration-200 ${
                isActive ? "bg-blue-100 text-blue-600" : ""
              }`
            }
          >
            <FaCog className="mr-2" /> {!collapsed && "Manage Notes"}
          </NavLink>
        )}

        {/* Add Announcement (For Non-Students Only) */}
        {role !== "Student" && (
          <NavLink
            to="/add-announcement"
            className={({ isActive }) =>
              `flex items-center px-4 py-2 text-gray-700 hover:bg-gray-200 transition duration-200 ${
                isActive ? "bg-blue-100 text-blue-600" : ""
              }`
            }
          >
            <FaPlus className="mr-2" /> {!collapsed && "Add Announcement"}
          </NavLink>
        )}

        {role !== "Student" && (
          <NavLink
            to="/assign-subjects"
            className={({ isActive }) =>
              `flex items-center px-4 py-2 text-gray-700 hover:bg-gray-200 transition duration-200 ${
                isActive ? "bg-blue-100 text-blue-600" : ""
              }`
            }
          >
            <FaBook className="mr-2" /> {!collapsed && "Assign Subjects"}
          </NavLink>
        )}

        {/* Profile Link */}
        <NavLink
          to="/profile"
          className={({ isActive }) =>
            `flex items-center px-4 py-2 text-gray-700 hover:bg-gray-200 transition duration-200 ${
              isActive ? "bg-blue-100 text-blue-600" : ""
            }`
          }
        >
          <FaUser className="mr-2" /> {!collapsed && "Profile"}
        </NavLink>
      </nav>

      {/* Logout Button */}
      <button
        onClick={handleLogout}
        className="block w-full mt-6 px-4 py-2 bg-red-500 text-white hover:bg-red-600 transition duration-200"
      >
        {collapsed ? "Logout" : "Logout"}
      </button>
    </div>
  );
}

export default Sidebar;
