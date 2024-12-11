import React, { useState, useEffect } from 'react';
import { viewNotesStudent, viewNotesTeacher } from '../actions/apis';
import { getCookie } from '../actions/cookie';
import { validateToken } from '../actions/utils';

function NotesPage() {
  const [notes, setNotes] = useState([]); // Array of notes from the API
  const [subjects, setSubjects] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState(''); // Selected subject ID
  const [filteredNotes, setFilteredNotes] = useState([]); // Notes for the selected subject
  const [role, setRole] = useState('');


  useEffect(() => {
    const handleAuthentication = async () => {
      const auth = getCookie();
      if (auth) {
        const result = await  validateToken(auth);
        const userRole = result.role
        setRole(userRole);
        console.log("Role is", userRole);
      }
    };

    handleAuthentication();
  }, []);

  // Fetch data from the API
  useEffect(() => {
    const fetchTeacherNotes = async () => {
      try {
        const response = await viewNotesTeacher();
        console.log("API Response:", response); // Debug API response
        setNotes(response.notes || []); // Ensure Notes are set as an array
        const unique = response.notes.reduce((acc, note) => {
          if (!acc[note.subjectID]) {
            acc[note.subjectID] = true; // Mark subjectID as seen
          }
          return acc;
        }, {});
        setSubjects(unique);
        
      } catch (error) {
        console.error("Error fetching notes:", error);
        setNotes([]); // Fallback to empty array in case of error
      }
    };
    const fetchStudentNotes = async () => {
      try {
        const response = await viewNotesStudent();
        console.log("API Response:", response); // Debug API response
        setNotes(response.notes || []); // Ensure notes are set as an array
        const unique = response.notes.reduce((acc, note) => {
          if (!acc[note.subjectID]) {
            acc[note.subjectID] = true; // Mark subjectID as seen
            // setSubjects((prevSubjects) => [...prevSubjects, note.subjectID]); // Add unique subjectID to the state
          }
          return acc;
        }, {});
        setSubjects(unique);
        console.log(subjects);
        
      } catch (error) {
        console.error("Error fetching notes:", error);
        setNotes([]); // Fallback to empty array in case of error
      }
    };
    if(role === "Teacher"){
      fetchTeacherNotes();
    }
    if(role === "Student"){
      fetchStudentNotes();
    }

    
    
  }, []);
  

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
          {notes.map((note) => (
            <option key={note.subjectID} value={note.subjectID}>
              {note.subjectID}
            </option>
          ))}
        </select>
      </div>

      {/* Display notes for the selected subject */}
      {selectedSubject && (
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-4">Notes for Subject ID: {selectedSubject}</h2>
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
                  <p className="text-lg  text-gray-800 mb-2">{note.note}</p>
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
