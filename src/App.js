import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import HomePage from "./pages/HomePage";
import NotesPage from "./pages/NotesPage";
import FeedbackPage from "./pages/FeedbackPage";
import ManageNotes from "./pages/ManageNotes";
import AddAnnouncement from "./pages/AddAnnouncement";
import NotFound from "./pages/NotFound";
import Login from "./components/Login";
import Signup from "./components/Signup"; // Import Signup component
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  // const isAuthenticated = localStorage.getItem("token") ? true : false;

  return (
    <Router>
      <div className="flex h-screen">
        {/* Sidebar */}
        {/* {isAuthenticated && <Sidebar />} */}
        <Sidebar/>

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

            <Route path="/home" element={<HomePage/>}></Route>
            <Route path="/notes" element={<NotesPage />} />
            <Route path="/feedback" element={<FeedbackPage />} />
            <Route path="/manage-notes" element={<ManageNotes />} />
            <Route path="/add-announcement" element={<AddAnnouncement />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
