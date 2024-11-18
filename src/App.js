import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import HomePage from "./pages/HomePage";
import NotesPage from "./pages/NotesPage";
import FeedbackPage from "./pages/FeedbackPage";
import ManageNotes from "./pages/ManageNotes";
import AddAnnouncement from "./pages/AddAnnouncement";
import NotFound from "./pages/NotFound";

function App() {
  // Notes State
  const [notes, setNotes] = useState([]);

  // Function to add a note
  const addNote = (note) => {
    setNotes((prevNotes) => [...prevNotes, note]);
  };

  return (
    <Router>
      <div className="flex h-screen">
        {/* Sidebar */}
        <Sidebar />

        {/* Main Content */}
        <div className="flex-1 p-4 bg-gray-100 overflow-y-auto">
          <Routes>
            {/* Routes */}
            <Route path="/home" element={<HomePage />} />
            <Route path="/notes" element={<NotesPage notes={notes} />} />
            <Route path="/feedback" element={<FeedbackPage />} />
            <Route path="/manage-notes" element={<ManageNotes addNote={addNote} />} />
            <Route path="/add-announcement" element={<AddAnnouncement />} />
            <Route path="/" element={<HomePage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
