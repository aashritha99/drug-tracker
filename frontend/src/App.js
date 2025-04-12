import React, { useState, useEffect } from "react";
import Login from "./components/Login";
import Signup from "./components/signup";
import { auth } from './firebase-config.js';
import { onAuthStateChanged, signOut } from "firebase/auth";
import './App.css';

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('login');

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      console.log("User signed out");
    } catch (error) {
      console.error("Error signing out:", error.message);
    }
  };

  if (loading) {
    return (
      <div style={{ 
        padding: "2rem", 
        fontFamily: "Arial",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh"
      }}>
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div style={{ 
      padding: "2rem", 
      fontFamily: "Arial",
      maxWidth: "800px",
      margin: "0 auto",
      backgroundColor: "#f9f9f9",
      borderRadius: "8px",
      boxShadow: "0 2px 10px rgba(0,0,0,0.1)"
    }}>
      <h1 style={{ 
        color: "#333", 
        textAlign: "center",
        marginBottom: "2rem"
      }}>
        DrugTrack – Auth Portal
      </h1>

      {user ? (
        <div style={{ textAlign: "center" }}>
          <h2>Welcome, {user.displayName || user.email}</h2>
          {user.photoURL && (
            <img 
              src={user.photoURL} 
              alt="Profile" 
              style={{ 
                width: "100px", 
                height: "100px", 
                borderRadius: "50%",
                margin: "1rem auto"
              }} 
            />
          )}
          <p>You are logged in with: {user.email}</p>
          <button 
            onClick={handleLogout}
            style={{ 
              padding: "8px 16px", 
              backgroundColor: "#f44336", 
              color: "white", 
              border: "none", 
              borderRadius: "4px",
              cursor: "pointer",
              marginTop: "1rem"
            }}
          >
            Logout
          </button>
        </div>
      ) : (
        <div>
          <div style={{ 
            display: "flex", 
            justifyContent: "center",
            marginBottom: "2rem"
          }}>
            <button 
              onClick={() => setActiveTab('login')}
              style={{ 
                padding: "10px 20px", 
                backgroundColor: activeTab === 'login' ? "#4285F4" : "#e0e0e0", 
                color: activeTab === 'login' ? "white" : "#333", 
                border: "none", 
                borderRadius: "4px 0 0 4px",
                cursor: "pointer"
              }}
            >
              Login
            </button>
            <button 
              onClick={() => setActiveTab('signup')}
              style={{ 
                padding: "10px 20px", 
                backgroundColor: activeTab === 'signup' ? "#4285F4" : "#e0e0e0", 
                color: activeTab === 'signup' ? "white" : "#333", 
                border: "none", 
                borderRadius: "0 4px 4px 0",
                cursor: "pointer"
              }}
            >
              Signup
            </button>
          </div>
          
          {activeTab === 'login' ? <Login /> : <Signup />}
        </div>
      )}
    </div>
  );
}

export default App;
