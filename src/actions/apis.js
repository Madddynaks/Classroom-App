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

export default {
  login,
  fetchAnnouncements,
};
