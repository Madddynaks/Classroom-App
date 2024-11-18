import React, { useEffect, useState } from 'react';

function HomePage() {
  const [announcements, setAnnouncements] = useState([]);

  // Fetch announcements when the component mounts
  useEffect(() => {
    fetch('http://localhost:5000/api/announcements')
      .then((response) => response.json())
      .then((data) => setAnnouncements(data))
      .catch((error) => console.error('Error fetching announcements:', error));
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Announcements</h1>
      <div className="flex flex-wrap gap-4">
        {announcements.length > 0 ? (
          announcements.map((announcement) => (
            <div
              key={announcement._id}
              className="w-96 p-4 bg-white shadow-md rounded-lg break-words flex-shrink-0"
            >
              {announcement._id} <br />
              {announcement.text}
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
