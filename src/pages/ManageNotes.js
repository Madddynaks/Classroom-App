import React, { useState, useEffect } from 'react';
import { getSubjectsByTeacher, addNotesTeacher } from '../actions/apis'; // Import APIs

function ManageNotes() {
  const [subjects, setSubjects] = useState([]); // List of subjects
  const [selectedSubject, setSelectedSubject] = useState(""); // Selected subject ID
  const [noteText, setNoteText] = useState(''); // Note text
  const [loading, setLoading] = useState(false); // Loading state
  const [fetchingSubjects, setFetchingSubjects] = useState(false); // State for fetching subjects

  // Fetch subjects on component mount
  useEffect(() => {
    const fetchSubjects = async () => {
      setFetchingSubjects(true);
      try {
        const response = await getSubjectsByTeacher(); // Call the API to get subjects
        setSubjects(response.subjects || []); // Set fetched subjects
        console.log(response.subjects);
      } catch (error) {
        console.error('Failed to fetch subjects:', error.message);
        alert('Failed to fetch subjects.');
      } finally {
        setFetchingSubjects(false);
      }
    };
    fetchSubjects();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!selectedSubject || !noteText) {
      alert('Please select a subject and provide a note.');
      return;
    }
  
    setLoading(true);
  
    try {
      const response = await addNotesTeacher({
        subjectId: selectedSubject,
        noteText,
        user_id: 'teacherId', // Replace this with the actual teacher ID from the session or context
        role: 'teacher', // Add the role of the user
      });
  
      alert(response.message || 'Note added successfully!');
      setSelectedSubject('');
      setNoteText('');
  
    } catch (error) {
      console.error('Failed to add note:', error.message);
      alert(error.message || 'Failed to add note.');
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Manage Notes</h1>
      <p className="text-gray-600 mb-6">Upload and manage notes here.</p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-medium">Select Subject:</label>
          {fetchingSubjects ? (
            <p className="text-gray-500">Loading subjects...</p>
          ) : (
            <select
            value={selectedSubject}
            onChange={(e) => setSelectedSubject(e.target.value)}
            className="w-full border border-gray-300 p-2 rounded"
          >
            <option value="" disabled>
              -- Select a Subject --
            </option>
            {subjects.map((subject) => (
              <option key={subject.SubjectId} value={subject.SubjectId}>
                {subject.name} {/* or you could display SubjectId */}
              </option>
            ))}
          </select>
          )}
        </div>

        <div>
          <label className="block font-medium">Note Content:</label>
          <textarea
            value={noteText}
            onChange={(e) => setNoteText(e.target.value)}
            className="w-full border border-gray-300 p-2 rounded"
            rows="5"
            placeholder="Enter note content"
          />
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          disabled={loading || fetchingSubjects}
        >
          {loading ? 'Adding Note...' : 'Add Note'}
        </button>
      </form>
    </div>
  );
}

export default ManageNotes;
