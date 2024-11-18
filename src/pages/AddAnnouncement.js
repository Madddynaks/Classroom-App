import React, { useState } from 'react';

function AddAnnouncement() {
  const [announcement, setAnnouncement] = useState('');

  // Handle form submission to add announcement
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Send the announcement to the backend
    try {
      const response = await fetch('http://localhost:5000/api/announcements', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: announcement }),
      });

      if (!response.ok) {
        throw new Error('Failed to add announcement');
      }

      const data = await response.json();
      console.log('Announcement added:', data); // Check the added data in the console

      alert('Announcement added!');
      setAnnouncement(''); // Clear the input field
    } catch (error) {
      console.error('Error adding announcement:', error);
      alert('Failed to add announcement');
    }
  };

  return (
    <div>
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
