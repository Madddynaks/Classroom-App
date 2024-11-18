import React, { useState } from "react";

function FeedbackPage() {
  // Faculty list and corresponding subjects
  const facultyList = [
    { name: "Dr. Smith", subjects: ["Maths I", "Maths II", "Algebra"] },
    { name: "Prof. Johnson", subjects: ["Physics", "Electromagnetism"] },
    { name: "Dr. Lee", subjects: ["Computer Science", "Operating Systems"] },
  ];

  // State variables
  const [selectedFaculty, setSelectedFaculty] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("");
  const [feedback, setFeedback] = useState("");

  // Handle faculty selection
  const handleFacultyChange = (e) => {
    setSelectedFaculty(e.target.value);
    setSelectedSubject(""); // Reset subject when faculty changes
  };

  // Get subjects for the selected faculty
  const subjectsForFaculty =
    facultyList.find((faculty) => faculty.name === selectedFaculty)?.subjects || [];

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Feedback submitted:\nFaculty: ${selectedFaculty}\nSubject: ${selectedSubject}\nFeedback: ${feedback}`);
    setSelectedFaculty("");
    setSelectedSubject("");
    setFeedback("");
  };

  return (
    <div>
      <h1 className="text-2xl font-bold">Feedback</h1>
      <p className="mt-4 text-gray-600">Submit feedback about teachers or the portal here.</p>

      <form onSubmit={handleSubmit} className="mt-6 space-y-4">
        {/* Faculty Dropdown */}
        <div>
          <label className="block font-medium">Select Faculty:</label>
          <select
            value={selectedFaculty}
            onChange={handleFacultyChange}
            className="w-full mt-1 p-2 border border-gray-300 rounded"
          >
            <option value="" disabled>
              -- Select Faculty --
            </option>
            {facultyList.map((faculty, index) => (
              <option key={index} value={faculty.name}>
                {faculty.name}
              </option>
            ))}
          </select>
        </div>

        {/* Subject Dropdown */}
        <div>
          <label className="block font-medium">Select Subject:</label>
          <select
            value={selectedSubject}
            onChange={(e) => setSelectedSubject(e.target.value)}
            className="w-full mt-1 p-2 border border-gray-300 rounded"
            disabled={!selectedFaculty}
          >
            <option value="" disabled>
              {selectedFaculty ? "-- Select Subject --" : "Select a faculty first"}
            </option>
            {subjectsForFaculty.map((subject, index) => (
              <option key={index} value={subject}>
                {subject}
              </option>
            ))}
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
          disabled={!selectedFaculty || !selectedSubject || !feedback}
        >
          Submit Feedback
        </button>
      </form>
    </div>
  );
}

export default FeedbackPage;
