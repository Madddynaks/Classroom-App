import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import HomePage from './pages/HomePage';
import NotesPage from './pages/NotesPage';
import FeedbackPage from './pages/FeedbackPage';
import ManageNotes from './pages/ManageNotes';
import AddAnnouncement from './pages/AddAnnouncement';
import NotFound from './pages/NotFound';
import { useAuth0 } from "@auth0/auth0-react";
import LoginButton from "./pages/LoginButton";

function App() {
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
  const { loginWithRedirect, isAuthenticated, logout } = useAuth0();

  return (
    <Router>
      {!isAuthenticated && (
        <LoginButton/>
      )}
      {isAuthenticated && (
        <div className="flex h-screen">
        {/* Sidebar */}
        <Sidebar />

        {/* Main Content */}
        <div className="flex-1 p-4 bg-gray-100 overflow-y-auto">
          <Routes>
            {/* Routes for login and signup */}
            {/* <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} /> Signup Route */}

            {/* Protected Route: HomePage */}
            {/* <Route
              path="/home"
              element={isAuthenticated ? <HomePage /> : <Navigate to="/login" />}
            /> */}

            {/* Redirect to /login if not authenticated */}
            {/* <Route
              path="/"
              element={isAuthenticated ? <Navigate to="/home" /> : <Navigate to="/login" />}
            /> */}

            <Route path="/" element={<HomePage announcements={announcements}/>}></Route>
            <Route path="/notes" element={<NotesPage notes={notes}/>} />
            <Route path="/feedback" element={<FeedbackPage />} />
            <Route path="/manage-notes" element={<ManageNotes addNote={addNote} />} />
            <Route path="/add-announcement" element={<AddAnnouncement addAnnouncement={addAnnouncement} />} />
            <Route path="/" element={<HomePage announcements={announcements} />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </div>
      )}
    </Router>
  );
}

export default App;
