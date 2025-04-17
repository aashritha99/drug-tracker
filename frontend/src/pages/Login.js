import React, { useState } from "react";
import { signInWithPopup, GoogleAuthProvider, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase-config.js";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // for navigation after login

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // Hook to navigate to different pages

  // Handle email login
  const handleEmailLogin = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      const token = await user.getIdToken();

      console.log("✅ Firebase login successful:", user.email);

      // Send token to backend for further processing (role, etc.)
      const response = await axios.post("http://localhost:5000/api/auth/firebase-login", {
        token,
      });

      const { user: backendUser } = response.data;
      const role = backendUser.role;

      // Redirect based on role
      if (role === "manufacturer") {
        navigate("/Dashboard");
      } else if (role === "user") {
        navigate("/UserDashboard");
      } else {
        alert("Unexpected role.");
      }

      alert("Login successful!");
    } catch (error) {
      console.error("❌ Firebase login failed:", error.message);
      setError(error.message);
    }
  };

  // Handle Google login
  const handleGoogleLogin = async () => {
    setError(null);
    const provider = new GoogleAuthProvider();

    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      console.log("✅ Logged in with Google:", user);

      const token = await user.getIdToken();

      // Send token to backend for further processing (role, etc.)
      const response = await axios.post("http://localhost:5000/api/auth/firebase-login", {
        token,
      });

      const { user: backendUser } = response.data;
      const role = backendUser.role;

      // Redirect based on role
      if (role === "manufacturer") {
        navigate("/Dashboard");
      } else if (role === "user") {
        navigate("/UserDashboard");
      } else {
        alert("Unexpected role.");
      }

      console.log("Google login success and sent to backend");
    } catch (error) {
      console.error("❌ Google login failed:", error.message);
      setError(error.message);
    }
  };
    

  return (
    <div className="min-h-[70vh]  flex items-center justify-center">
      <div className="bg-white/30 backdrop-blur-md shadow-lg rounded-lg p-8 w-full max-w-md">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Sign in to your account
        </h2>

        {error && (
          <div className="text-red-600 text-sm text-center mb-4 font-medium">{error}</div>
        )}

        <form onSubmit={handleEmailLogin} className="space-y-4">
          <div>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
          <div>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-purple-600 text-white py-2 rounded-md hover:bg-purple-700 transition duration-300"
          >
            Login with Email
          </button>
        </form>

        <div className="mt-6">
          <button
            onClick={handleGoogleLogin}
            className="w-full bg-red-500 text-white py-2 rounded-md hover:bg-red-600 transition duration-300"
          >
            Login with Google
          </button>
        </div>

        <p className="mt-6 text-center text-sm text-gray-700">
          Don’t have an account?{" "}
          <a href="/signup" className="text-purple-700 hover:underline font-medium">
            Sign up here
          </a>
        </p>
      </div>
    </div>
  );
}

