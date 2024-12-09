import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import HomePage from './pages/HomePage';
import NotesPage from './pages/NotesPage';
import FeedbackPage from './pages/FeedbackPage';
import ManageNotes from './pages/ManageNotes';
import AddAnnouncement from './pages/AddAnnouncement';
import NotFound from './pages/NotFound';
import Login from './pages/Login';
import Cookies from 'js-cookie';

function App() {
  // State to track token
  const [token, setToken] = useState(Cookies.get("token"));

  // Notes State
  const [notes, setNotes] = useState([]);
  const [announcements, setAnnouncements] = useState([]);

  // Function to add a note
  const addNote = (note) => {
    setNotes((prevNotes) => [...prevNotes, note]);
  };

  // Function to add an announcement
  const addAnnouncement = (announcement) => {
    setAnnouncements((prevAnnouncements) => [...prevAnnouncements, announcement]);
  };

  // Update token state if it changes in cookies
  useEffect(() => {
    const tokenFromCookie = Cookies.get("token");
    setToken(tokenFromCookie);
  }, []); // Empty dependency array ensures this effect runs only once

  return (
    <Router>
      <div className="flex h-screen">
        {/* Sidebar is always visible except on the login page */}
        {window.location.pathname !== '/login' && <Sidebar />}

        {/* Main Content */}
        <div className="flex-1 p-4 bg-gray-100 overflow-y-auto">
          <Routes>
            <Route path='/login' element={<Login />} />

            {/* Protect routes by checking if the token exists */}
            <Route 
              path="/" 
              element={token ? <HomePage announcements={announcements} /> : <Navigate to="/login" />} 
            />
            <Route 
              path="/notes" 
              element={token ? <NotesPage notes={notes} /> : <Navigate to="/login" />} 
            />
            <Route 
              path="/feedback" 
              element={token ? <FeedbackPage /> : <Navigate to="/login" />} 
            />
            <Route 
              path="/manage-notes" 
              element={token ? <ManageNotes addNote={addNote} /> : <Navigate to="/login" />} 
            />
            <Route 
              path="/add-announcement" 
              element={token ? <AddAnnouncement addAnnouncement={addAnnouncement} /> : <Navigate to="/login" />} 
            />

            {/* Catch-all route for 404 */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
