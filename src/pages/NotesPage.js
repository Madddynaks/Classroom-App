import React, { useState, useEffect } from "react";
import { fetchAllSubjects, viewNotesStudent, viewNotesTeacher } from "../actions/apis";
import { getCookie } from "../actions/cookie";
import { validateToken } from "../actions/utils";

function NotesPage() {
  const [notes, setNotes] = useState([]); // Array of notes from the API
  const [subjects, setSubjects] = useState([]); // Array of subjects
  const [selectedSubject, setSelectedSubject] = useState(""); // Selected subject ID
  const [filteredNotes, setFilteredNotes] = useState([]); // Notes for the selected subject
  const [role, setRole] = useState("");

  useEffect(() => {
    const handleAuthentication = async () => {
      const auth = getCookie();
      if (auth) {
        try {
          const result = await validateToken(auth);
          setRole(result.role || "");
          console.log("Role is", result.role);
        } catch (error) {
          console.error("Error validating token:", error);
        }
      }
    };

    handleAuthentication();
  }, []);

  // Fetch data from the API
  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const response =
          role === "Teacher" ? await viewNotesTeacher() : await viewNotesStudent();
        setNotes(response.notes || []);

        const subjectsResponse = await fetchAllSubjects();
        const uniqueSubjects = response.notes.reduce((acc, note) => {
          const subject = subjectsResponse.subjects.find(
            (subject) => subject.SubjectId === note.subjectID
          );
          if (subject && !acc.find((item) => item.id === subject.SubjectId)) {
            acc.push({ id: subject.SubjectId, name: subject.name });
          }
          return acc;
        }, []);

        setSubjects(uniqueSubjects);
      } catch (error) {
        console.error("Error fetching data:", error);
        setNotes([]);
        setSubjects([]);
      }
    };

    if (role) fetchNotes();
  }, [role]);

  // Handle subject dropdown change
  const handleSubjectChange = (event) => {
    const selected = event.target.value; // Get selected subject ID
    setSelectedSubject(selected);

    // Filter notes based on the selected subject ID
    const filtered = notes.filter((note) => note.subjectID === selected);
    setFilteredNotes(filtered);
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Notes</h1>
      <p className="text-lg text-gray-600 mb-6">Select a subject to view notes.</p>

      {/* Dropdown for selecting subject */}
      <div className="relative inline-block mb-8">
        <select
          value={selectedSubject}
          onChange={handleSubjectChange}
          className="block w-72 p-3 border border-gray-300 rounded-lg shadow-sm bg-white text-gray-700 focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition duration-300 ease-in-out hover:shadow-lg cursor-pointer"
        >
          <option value="">-- Select Subject --</option>
          {subjects.map((subject) => (
            <option key={subject.id} value={subject.id}>
              {subject.name}
            </option>
          ))}
        </select>
      </div>

      {/* Display notes for the selected subject */}
      {selectedSubject && (
        <div className="mt-8">
          {filteredNotes.length === 0 ? (
            <p className="text-gray-500">No notes available for this subject.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredNotes.map((note) => (
                <div
                  key={note._id}
                  className="p-4 border rounded-lg shadow-md bg-white hover:shadow-lg transition-shadow duration-200"
                >
                  <p className="text-gray-600 text-sm mb-4">User ID: {note.userID}</p>
                  <p className="text-lg text-gray-800 mb-2">{note.note}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default NotesPage;
