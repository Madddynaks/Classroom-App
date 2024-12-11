import React, { useEffect, useState } from "react";
import { fetchAnnouncements } from "../actions/apis"; // Import the fetchAnnouncements API function
import { getCookie } from "../actions/cookie";
import { validateToken } from "../actions/utils";

function HomePage() {
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const getAnnouncements = async () => {
      try {
        setLoading(true); // Set loading to true before the request
        const data = await fetchAnnouncements(); // Use the imported function
        console.log(data)
        setAnnouncements(data.data); // Set the fetched announcements
        console.log(announcements)
      } catch (error) {
        setError("Failed to fetch announcements."); // Set error if the request fails
      } finally {
        setLoading(false); // Set loading to false once the request completes
      }
    };

    getAnnouncements();
  }, []); // Empty dependency array to fetch announcements only once when the component mounts


      // Handle authentication token
  useEffect(() => {
    const handleAuthentication = async () => {
      const auth = getCookie();
      if (auth) {
        const result = await  validateToken(auth);
        console.log("result", result);
      }
    };

    handleAuthentication();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Announcements</h1>
      {loading ? (
        <p>Loading announcements...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <div className="flex flex-wrap gap-4">
          {announcements.length > 0 ? (
            announcements.map((announcement) => (
              <div
                key={announcement._id} // Use `_id` because Mongoose assigns this
                className="w-96 p-4 bg-white shadow-md rounded-lg break-words flex-shrink-0"
              >
                <p>
                  <strong>Teacher ID:</strong> {announcement.TeacherId}
                </p>
                <p>
                  <strong>Semester:</strong> {announcement.semester}
                </p>
                <p>
                  <strong>Branch:</strong> {announcement.branch}
                </p>
                <p>
                  <strong>Announcement:</strong> {announcement.announcement}
                </p>
              </div>
            ))
          ) : (
            <p>No announcements available.</p>
          )}
        </div>
      )}
    </div>
  );
}

export default HomePage;
