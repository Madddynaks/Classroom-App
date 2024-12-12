import axios from "axios";
import Cookies from "js-cookie"; // Import js-cookie to manage cookies
import { setCookie } from "./cookie";

// Set up a base URL for all API requests
const API = axios.create({
  baseURL: "http://localhost:5000/api", // Replace with your backend base URL
  headers: {
    "Content-Type": "application/json",
  },
});

// Login API function
export const login = async (email, password) => {
  try {
    const response = await API.post("/auth/login", { email, password }); // Backend login route
    if (response.data.token) {
      // Store the JWT token in cookies
      // Cookies.set("token", response.data.token); // Expires in 3 days, path set to root
      setCookie(response.data.token);
      window.location.reload();
    }
    return response.data; // Return the response data
  } catch (error) {
    console.error("Login API error:", error.response?.data || error.message);
    throw new Error(error.response?.data?.message || "Login failed" );
  }
};

export const fetchAnnouncements = async () => {
    try {
      const token = Cookies.get("token"); // Get the token from cookies
  
      // If token exists, include it in the request header as 'token'
      const response = await API.post("/announcements/fetch", {}, { // Passing empty object for body
        headers: {
          token: token, // Send token in headers
        },
      });
  
    //   console.log(response.data); // Check response data in console
      return response.data; // Return the response data
    } catch (error) {
      console.error("Fetch Announcements API error:", error.response?.data || error.message);
      throw new Error(error.response?.data?.message || "Failed to fetch announcements");
    }
  };


  export const getSubjectsByTeacher= async () => {
    try {
      const token = Cookies.get("token"); // Get the token from cookies
  
      // If token exists, include it in the request header as 'token'
      const response = await API.post("/getSubjectsByTeacher", {}, { // Passing empty object for body
        headers: {
          token: token, // Send token in headers
        },
      });
  
    //   console.log(response.data); // Check response data in console
      return response.data; // Return the response data
    } catch (error) {
      console.error("Fetch Announcements API error:", error.response?.data || error.message);
      throw new Error(error.response?.data?.message || "Failed to fetch announcements");
    }
  };

  export const getSubjectsByStudent = async () => {
    try {
      const token = Cookies.get("token"); // Ensure token is retrieved correctly
      
      const response = await API.post("/feedback/get-subjects", {}, { 
        headers: { token } // Send token in headers for authentication
      });
      
      return response.data; // Return the subjects data from response
    } catch (error) {
      console.error("Error fetching subjects:", error);
      throw new Error(error.response?.data?.message || "Failed to fetch subjects");
    }
  };

  export const viewNotesTeacher= async () => {
    try {
      const token = Cookies.get("token"); // Get the token from cookies
  
      // If token exists, include it in the request header as 'token'
      const response = await API.post("/view-notes-teacher", {}, { // Passing empty object for body
        headers: {
          token: token, // Send token in headers
        },
      });
  
    //   console.log(response.data); // Check response data in console
      return response.data; // Return the response data
    } catch (error) {
      console.error("Fetch Announcements API error:", error.response?.data || error.message);
      throw new Error(error.response?.data?.message || "Failed to fetch notes");
    }
  };

  export const viewNotesStudent= async () => {
    try {
      const token = Cookies.get("token"); // Get the token from cookies
  
      // If token exists, include it in the request header as 'token'
      const response = await API.post("/view-notes-student", {}, { // Passing empty object for body
        headers: {
          token: token, // Send token in headers
        },
      });
  
    //   console.log(response.data); // Check response data in console
      return response.data; // Return the response data
    } catch (error) {
      console.error("Fetch Announcements API error:", error.response?.data || error.message);
      throw new Error(error.response?.data?.message || "Failed to fetch notes");
    }
  };
  export const fetchAllSubjects= async () => {
    try {
      const token = Cookies.get("token"); // Get the token from cookies
  
      // If token exists, include it in the request header as 'token'
      const response = await API.get("/fetchAllSubjects", {}, { // Passing empty object for body
        headers: {
          token: token, // Send token in headers
        },
      });
  
    //   console.log(response.data); // Check response data in console
      return response.data; // Return the response data
    } catch (error) {
      console.error("Fetch Subjects API error:", error.response?.data || error.message);
      throw new Error(error.response?.data?.message || "Failed to fetch subjects");
    }
  };

  export const addNotesTeacher = async (data) => {
    try {
      const token = Cookies.get("token"); // Get the token from cookies
  
      // Send the subjectId and noteText in the request body
      const response = await API.post("/add-note-teacher", data, {
        headers: {
          token: token, // Send token in headers
        },
      });
  
      return response.data; // Return the response data
    } catch (error) {
      console.error("Fetch Announcements API error:", error.response?.data || error.message);
      throw new Error(error.response?.data?.message || "Failed to add Note");
    }
  };

  export const addFeedback = async (data) => {
    try {
      const token = Cookies.get("token"); // Get token from cookies
      
      const response = await API.post("/feedback/add-feedback", data, {
        headers: { token }
      });
  
      return response.data; // Return the server response (success message, etc.)
    } catch (error) {
      console.error("Error adding feedback:", error.response?.data || error.message);
      throw new Error(error.response?.data?.message || "Failed to add feedback");
    }
  };
  export const addAnnouncement = async (data) => {
    try {
      const token = Cookies.get("token"); // Get token from cookies
      
      const response = await API.post("/announcements/add", data, {
        headers: { token }
      });
  
      return response.data; // Return the server response (success message, etc.)
    } catch (error) {
      console.error("Error adding announcement:", error);
      throw new Error(error.response?.data?.message || "Failed to add  announcement");
    }
  };

export default {
  login,
  fetchAnnouncements,
  viewNotesStudent,
  viewNotesTeacher,
  addNotesTeacher,
};
