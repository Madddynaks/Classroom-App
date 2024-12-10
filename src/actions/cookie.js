import Cookies from 'js-cookie';

// Function to get the 'admin' token from cookies
export const getCookie = () => {
  try {
    const auth = Cookies.get('token'); // Get the 'admin' cookie
    return auth || null; // Return the value or null if not set
  } catch (error) {
    console.error("Error getting 'admin' cookie:", error);
    return null;
  }
};

// Function to set the 'admin' token in cookies
export const setCookie = (token) => {
  try {
    Cookies.set('token', token); // Set the 'admin' cookie
  } catch (error) {
    console.error("Error setting 'admin' cookie:", error);
  }
};

// Function to delete (invalidate) the 'admin' token in cookies
export const deleteCookie = () => {
  try {
    Cookies.remove('token'); // Removes the 'token' cookie
    console.log("'token' cookie deleted successfully");
  } catch (error) {
    console.error("Error deleting 'token' cookie:", error);
  }
};

