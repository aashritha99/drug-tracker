import React, { useState } from "react";
import { signInWithPopup, GoogleAuthProvider, createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase-config.js";
import axios from "axios";

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [role, setRole] = useState('');


  const handleSignup = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const firebaseUser = userCredential.user;
      const token = await firebaseUser.getIdToken();

      const response = await axios.post("http://localhost:5000/api/auth/signup", {
        name,
        email,
        password,
        token,
        role,
      });

      if (response.data && response.data.message) {
        console.log("✅ User signed up via backend:", response.data);
      } else {
        throw new Error("Signup succeeded but no message returned.");
      }
    } catch (error) {
      const errorMsg = error.response?.data?.message || error.message;
      console.error("❌ Backend signup error:", errorMsg);
      setError(errorMsg);
    }
  };

  const handleGoogleSignup = async () => {
    setError(null);

    const provider = new GoogleAuthProvider();

    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      console.log("✅ Signed up with Google:", user);

      const token = await user.getIdToken();

      await axios.post("http://localhost:5000/api/auth/firebase-login", {
        token,
        role: 'user', // Default role for Google signup
      });

      alert("Google signup successful!");
    } catch (error) {
      console.error("❌ Google signup failed:", error.message);
      setError(error.message);
    }
  };

  return (
    <div className="min-h-[70vh]  flex items-center justify-center">
      <div className="bg-white/30 backdrop-blur-md shadow-lg rounded-lg p-8 w-full max-w-md">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Sign up</h2>

        {error && (
          <div className="text-red-600 text-sm text-center mb-4 font-medium">{error}</div>
        )}

        <form onSubmit={handleSignup} className="space-y-4">
          <div>
            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
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
          
        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="w-full p-2 border rounded mb-4"
        >
          <option value="" disabled>
    -- Select Role --
  </option>

          <option value="manufacturer">Manufacturer</option>
          <option value="user">User</option>
        </select>

          <button
            type="submit"
            className="w-full bg-purple-600 text-white py-2 rounded-md hover:bg-purple-700 transition duration-300"
          >
            Sign Up with Email
          </button>
        </form>

        <div className="mt-6 flex items-center justify-center">
          <button
            onClick={handleGoogleSignup}
            className="w-full bg-red-500 text-white py-2 rounded-md hover:bg-red-600 transition duration-300"
          >
            Signup with Google
          </button>
        </div>

        <p className="mt-6 text-center text-sm text-gray-700">
          Already have an account?{" "}
          <a href="/login" className="text-purple-700 hover:underline font-medium">
            Login here
          </a>
        </p>
      </div>
    </div>
  );
}
