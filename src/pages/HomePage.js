import React from 'react';

function HomePage({ announcements }) {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Announcements</h1>
      <div className="flex flex-wrap gap-4">
        {announcements?.length > 0 ? (
          announcements.map((announcement) => (
            <div
              key={announcement.id}
              className="w-96 p-4 bg-white shadow-md rounded-lg break-words flex-shrink-0"
            >
              <strong>ID:</strong> {announcement.id} <br />
              <strong>Text:</strong> {announcement.text}
            </div>
          ))
        ) : (
          <p>No announcements available.</p>
        )}
      </div>
    </div>
  );
}

export default HomePage;
