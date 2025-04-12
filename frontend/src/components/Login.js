import React, { useState } from "react";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "../firebase-config.js";
import axios from "axios";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const handleEmailLogin = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/login",
        {
          email,
          password,
        }
      );

      console.log("✅ User logged in via backend:", response.data);

      // Delay alert to let the UI reflect the login
      setTimeout(() => {
        alert(response.data.message || "Login successful");
      }, 0);
    } catch (error) {
      console.error(
        "❌ Backend login error:",
        error.response?.data || error.message
      );
      setError(error.response?.data?.message || error.message);
    }
  };

  const handleGoogleLogin = async () => {
    setError(null);

    const provider = new GoogleAuthProvider();

    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      console.log("✅ Logged in with Google:", user);

      const token = await user.getIdToken();

      await axios.post("http://localhost:5000/api/auth/firebase-login", {
        token,
      });

      console.log("Google login success and sent to backend");
    } catch (error) {
      console.error("❌ Google login failed:", error.message);
      setError(error.message);
    }
  };

  return (
    <div>
      <h2>Login</h2>
      {error && (
        <div style={{ color: "red", marginBottom: "10px" }}>{error}</div>
      )}

      <form onSubmit={handleEmailLogin} style={{ marginBottom: "20px" }}>
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
          Login with Email
        </button>
      </form>

      <button
        onClick={handleGoogleLogin}
        style={{
          padding: "8px 16px",
          backgroundColor: "#DB4437",
          color: "white",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
        }}
      >
        Login with Google
      </button>
    </div>
  );
}
