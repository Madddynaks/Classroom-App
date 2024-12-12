import React, { useState } from "react";
import { login } from "../actions/apis"; // Import the login API function
import { useNavigate } from "react-router-dom"; // Import useNavigate

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false); // For loading state
  const navigate = useNavigate(); // Initialize the useNavigate hook

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true); // Start loading state
    setError(""); // Clear any previous errors
    setSuccess(""); // Clear success message

    try {
      const data = await login(email, password); // Call the login API
      setSuccess("Login successful!");
      console.log("Login response:", data); // Use the login response as needed

      // Store the token in cookies (if you're doing that in the login function)
      // Redirect to home page after successful login
      navigate("/"); 
    } catch (err) {
      setError("Login failed. Please check your credentials.");
    } finally {
      setLoading(false); // Stop loading state
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <div className="w-full sm:w-96 p-8 bg-white rounded-lg shadow-lg shadow-gray-600">
        <h1 className="text-2xl font-semibold text-center mb-6">Login</h1>
        
        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-2 p-2 w-full border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
              placeholder="Enter your email"
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-2 p-2 w-full border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
              placeholder="Enter your password"
              required
            />
          </div>

          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
          {success && <p className="text-green-500 text-sm mt-2">{success}</p>}

          <button
            type="submit"
            className={`w-full py-2 bg-blue-500 text-white rounded-lg font-semibold transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-300 disabled:bg-blue-300`}
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
