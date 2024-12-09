import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { deleteCookie } from '../actions/cookie';

function Sidebar() {
  const navigate = useNavigate(); // Replace useHistory with useNavigate

  // Navigation items
  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Notes', path: '/notes' },
    { name: 'Feedback', path: '/feedback' },
    { name: 'Manage Notes', path: '/manage-notes' },
    { name: 'Add Announcement', path: '/add-announcement' },
  ];

  // Logout function
  const handleLogout = () => {
    deleteCookie()
  };

  return (
    <div className="w-64 bg-white shadow-lg h-full">
      <div className="p-4 text-center text-blue-600 text-xl font-bold">Classroom App</div>
      <nav>
        {/* Render the navigation links */}
        {navItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            className={({ isActive }) =>
              `block px-4 py-2 text-gray-700 hover:bg-gray-200 ${
                isActive ? 'bg-blue-100 text-blue-600' : ''
              }`
            }
          >
            {item.name}
          </NavLink>
        ))}
      </nav>
      
      {/* Logout Button */}
      <button
        className="block px-4 py-2 mt-4 w-full text-gray-700 hover:bg-gray-200 bg-red-500" onClick={handleLogout}
      >
        Logout
      </button>
    </div>
  );
}

export default Sidebar;
