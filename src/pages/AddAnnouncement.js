import React, { useState, useEffect } from 'react';
import { getSubjectsByTeacher } from '../actions/apis';


function AddAnnouncement({ addAnnouncement }) {
  const [announcement, setAnnouncement] = useState('');
  const [subjects,setSubjects] = useState([])


  useEffect(() => {
    const assignSubjects = async () => {
      const sub = await getSubjectsByTeacher();
      setSubjects(sub);
      console.log(sub)
    }
    assignSubjects();
  },[])

  // Handle form submission to add announcement
  const handleSubmit = (e) => {
    e.preventDefault();

    // Add the announcement to the list
    const newAnnouncement = {
      id: Date.now(),
      text: announcement,
    };

    // Call the function to add the announcement
    addAnnouncement(newAnnouncement);
    setAnnouncement(''); // Clear the input field
    alert('Announcement added!');
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Add Announcement</h1>
      <form onSubmit={handleSubmit} className="mt-4">
        <textarea
          value={announcement}
          onChange={(e) => setAnnouncement(e.target.value)}
          className="w-full p-2 border rounded"
          placeholder="Enter announcement text"
          required
        />
        <button
          type="submit"
          className="mt-2 px-4 py-2 bg-blue-500 text-white rounded"
        >
          Add Announcement
        </button>
      </form>
    </div>
  );
}

export default AddAnnouncement;
