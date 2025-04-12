import React, { useState } from "react";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "../firebase-config.js";
import axios from "axios";

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState(null);

  const handleSignup = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/signup",
        {
          name,
          email,
          password,
        }
      );

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
      });

      alert("Google signup successful!");
    } catch (error) {
      console.error("❌ Google signup failed:", error.message);
      setError(error.message);
    }
  };

  return (
    <div>
      <h2>Signup</h2>
      {error && (
        <div style={{ color: "red", marginBottom: "10px" }}>{error}</div>
      )}

      <form onSubmit={handleSignup} style={{ marginBottom: "20px" }}>
        <div style={{ marginBottom: "10px" }}>
          <input
            type="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Name"
            style={{ padding: "8px", width: "100%", maxWidth: "300px" }}
            required
          />
        </div>
        <div style={{ marginBottom: "10px" }}>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            style={{ padding: "8px", width: "100%", maxWidth: "300px" }}
            required
          />
        </div>
        <div style={{ marginBottom: "10px" }}>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            style={{ padding: "8px", width: "100%", maxWidth: "300px" }}
            required
          />
        </div>
        <button
          type="submit"
          style={{
            padding: "8px 16px",
            backgroundColor: "#4285F4",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          SignUp with Email
        </button>
      </form>

      <button
        onClick={handleGoogleSignup}
        style={{
          padding: "8px 16px",
          backgroundColor: "#DB4437",
          color: "white",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
        }}
      >
        Signup with Google
      </button>
    </div>
  );
}
