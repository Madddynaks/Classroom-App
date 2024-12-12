// import React, { useState, useEffect } from "react";
// import { getAvailableSubjects, assignSubjectTeacher } from "../actions/apis";
// import { getCookie } from "../actions/cookie"; // To fetch the token
// // import jwt_decode from "jwt-decode"; // To decode the token

// const AssignSubjects = () => {
//   const [subjects, setSubjects] = useState([]); // List of unassigned subjects
//   const [selectedSubject, setSelectedSubject] = useState(""); // Subject selected by teacher
//   const [teacherId, setTeacherId] = useState(""); // Teacher ID from token
//   const [message, setMessage] = useState("");

//   // Fetch the teacherId from the token on component mount
//   useEffect(() => {
//     const fetchTeacherId = () => {
//       const token = getCookie(); // Get token from cookies
//       if (token) {
//         const decoded = jwt_decode(token); // Decode the token to get userId
//         setTeacherId(decoded.user_id); // Assuming `user_id` is stored in the token
//       }
//     };

//     fetchTeacherId();
//   }, []);

//   useEffect(() => {
//     const fetchSubjects = async () => {
//       try {
//         const response = await getAvailableSubjects(); // Fetch unassigned subjects
//         setSubjects(response.unassignedSubjects);
//       } catch (error) {
//         console.error("Error fetching subjects:", error);
//       }
//     };

//     fetchSubjects();
//   }, []);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!selectedSubject) {
//       setMessage("Please select a subject.");
//       return;
//     }

//     try {
//       const response = await assignSubjectTeacher({ user_id: teacherId, subjectId: selectedSubject });
//       setMessage(response.message); // Display success message
//     } catch (error) {
//       console.error("Error assigning subject:", error);
//       setMessage("Failed to assign subject.");
//     }
//   };

//   return (
//     <div className="p-6 bg-gray-100 min-h-screen">
//       <h1 className="text-2xl font-bold text-blue-600">Assign Subjects</h1>
//       <form onSubmit={handleSubmit} className="mt-6">
//         <div className="mb-4">
//           <label className="block mb-2 font-medium">Select Subject:</label>
//           <select
//             value={selectedSubject}
//             onChange={(e) => setSelectedSubject(e.target.value)}
//             className="w-full border rounded p-2"
//           >
//             <option value="">-- Select a Subject --</option>
//             {subjects.map((subject) => (
//               <option key={subject.SubjectId} value={subject.SubjectId}>
//                 {subject.name} ({subject.SubjectId})
//               </option>
//             ))}
//           </select>
//         </div>
//         <button
//           type="submit"
//           className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
//         >
//           Assign Subject
//         </button>
//       </form>
//       {message && <p className="mt-4 text-green-600">{message}</p>}
//     </div>
//   );
// };

// export default AssignSubjects;

import React from 'react'

export default function AssignSubjects() {
  return (
    <div>
      Hello
    </div>
  )
}
