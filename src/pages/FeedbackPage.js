import React, { useState, useEffect } from "react";
import { getSubjectsByStudent, addFeedback } from "../actions/apis"; // Assuming these APIs are imported

function FeedbackPage() {
  // State variables
  const [subjects, setSubjects] = useState([]); // To hold the fetched subjects
  const [selectedSubject, setSelectedSubject] = useState(""); // Selected subject
  const [feedback, setFeedback] = useState(""); // Feedback text
  const [loading, setLoading] = useState(false); // Loading state for the API call
  const [error, setError] = useState(""); // Error handling state

  // Fetch subjects when the component mounts
  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        const response = await getSubjectsByStudent(); // Fetch subjects from the backend
        if (response && response.subjects) {
          setSubjects(response.subjects);
          console.log(response.subjects)
        }
      } catch (error) {
        console.error("Failed to fetch subjects:", error);
        setError("Failed to load subjects. Please try again later.");
      }
    };
    fetchSubjects();
  }, []);

  // Handle form submission
  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   if (!selectedSubject || !feedback) {
  //     setError("Please select a subject and provide feedback.");
  //     return;
  //   }

  //   setLoading(true);

  //   try {

  //     const response = await addFeedback({
  //       subjectId: selectedSubject,
  //       feedback,
  //       user_id: 'teacherId', // Replace this with the actual teacher ID from the session or context
  //       role: 'Student', // Add the role of the user
  //     });
  //       alert(response.message);
  //       setFeedback(""); // Reset feedback form after successful submission
  //       setSelectedSubject(""); // Reset subject dropdown
  //   } catch (error) {
  //     console.error("Failed to add feedback:", error);
  //     setError(error.message || "Failed to add feedback.");
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!selectedSubject || !feedback) {
      setError("Please select a subject and provide feedback.");
      return;
    }
  
    console.log("Selected Subject:", selectedSubject);  // Log selected subject
    console.log("Feedback:", feedback);  // Log feedback content
  
    setLoading(true);
  
    try {
      const response = await addFeedback({
        subjectID: selectedSubject,
        feedback,
        user_id: 'studentId', // Replace with actual student ID
        role: 'Student',
      });
  
      alert(response.message);
      setFeedback(""); // Reset feedback form after successful submission
      setSelectedSubject(""); // Reset subject dropdown
    } catch (error) {
      console.error("Failed to add feedback:", error);
      setError(error.message || "Failed to add feedback.");
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <div>
      <h1 className="text-2xl font-bold">Submit Feedback</h1>
      <p className="mt-4 text-gray-600">Please provide your feedback below.</p>

      {/* Display error message if any */}
      {error && <p className="text-red-500">{error}</p>}

      <form onSubmit={handleSubmit} className="mt-6 space-y-4">
        {/* Subject Dropdown */}
        <div>
          <label className="block font-medium">Select Subject:</label>
          <select
            value={selectedSubject}
            onChange={(e) => setSelectedSubject(e.target.value)}
            className="w-full mt-1 p-2 border border-gray-300 rounded"
          >
            <option value="" disabled>
              -- Select Subject --
            </option>
            {subjects.length > 0 ? (
              subjects.map((subject) => (
                <option key={subject.SubjectId} value={subject.SubjectId}>
                  {subject.name}
                </option>
              ))
            ) : (
              <option disabled>No subjects available</option>
            )}
          </select>
        </div>

        {/* Feedback Text Area */}
        <div>
          <label className="block font-medium">Feedback:</label>
          <textarea
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            className="w-full mt-1 p-2 border border-gray-300 rounded"
            placeholder="Enter your feedback (max 500 characters)"
            maxLength={500}
            rows={4}
          />
          <p className="text-sm text-gray-500">{feedback.length}/500 characters</p>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          disabled={loading || !selectedSubject || !feedback}
        >
          {loading ? "Submitting..." : "Submit Feedback"}
        </button>
      </form>
    </div>
  );
}

export default FeedbackPage;
