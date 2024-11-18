import React from 'react';

function NotesPage({ notes }) {
  return (
    <div>
      <h1 className="text-2xl font-bold">Notes</h1>
      <p className="mt-4 text-gray-600">Select a subject to view notes.</p>

      {notes.length === 0 ? (
        <p className="mt-4 text-gray-500">No notes available. Please add some.</p>
      ) : (
        <ul className="mt-4">
          {notes.map((note, index) => (
            <li key={index} className="mt-2">
              <a
                href={note.fileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 underline"
              >
                {note.title}
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default NotesPage;
