import React, { useState } from 'react';

function ManageNotes({ addNote }) {
  const [title, setTitle] = useState('');
  const [file, setFile] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title || !file) {
      alert('Please provide a title and upload a file.');
      return;
    }

    const fileUrl = URL.createObjectURL(file);

    // Pass the new note to the parent component
    addNote({ title, fileUrl });

    // Reset the form
    setTitle('');
    setFile(null);
    alert('Note added successfully!');
  };

  return (
    <div>
      <h1 className="text-2xl font-bold">Manage Notes</h1>
      <p className="mt-4 text-gray-600">Upload, approve, and manage notes here.</p>

      <form onSubmit={handleSubmit} className="mt-4">
        <div>
          <label className="block font-medium">Note Title:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border border-gray-300 p-2 rounded w-full mt-1"
            placeholder="Enter note title"
          />
        </div>

        <div className="mt-4">
          <label className="block font-medium">Upload PDF:</label>
          <input
            type="file"
            accept="application/pdf"
            onChange={(e) => setFile(e.target.files[0])}
            className="block mt-1"
          />
        </div>

        <button
          type="submit"
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Add Note
        </button>
      </form>
    </div>
  );
}

export default ManageNotes;
