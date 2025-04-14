import React, { useState, useEffect } from "react";
import Login from "./components/Login";
import Signup from "./components/Signup.js";
import Dashboard from "./components/Dashboard";
import { auth } from './firebase-config.js';
import { onAuthStateChanged, signOut } from "firebase/auth";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import './index.css';
import Upload from "./components/Upload.js";

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
      <div className="flex items-center justify-center min-h-screen p-8 font-sans">
        <p className="text-lg">Loading...</p>
      </div>
    );
  }

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            user ? (
              <Dashboard user={user} handleLogout={handleLogout} />
            ) : (
              <div className="p-8 max-w-2xl mx-auto bg-gray-100 rounded-lg shadow-md font-sans">
                <h1 className="text-2xl text-blue-500 font-semibold text-center text-gray-800 mb-8">
                  DrugTrack – Auth Portal
                </h1>

                <div>
                  <div className="flex justify-center mb-8">
                    <button
                      onClick={() => setActiveTab('login')}
                      className={`px-5 py-2 rounded-l-md transition-colors duration-300 ${
                        activeTab === 'login'
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-300 text-gray-800'
                      }`}
                    >
                      Login
                    </button>
                    <button
                      onClick={() => setActiveTab('signup')}
                      className={`px-5 py-2 rounded-r-md transition-colors duration-300 ${
                        activeTab === 'signup'
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-300 text-gray-800'
                      }`}
                    >
                      Signup
                    </button>
                  </div>

                  {activeTab === 'login' ? <Login /> : <Signup />}
                </div>
              </div>
            )
          }
        />
        <Route path="*" element={<Navigate to="/" />} />
        <Route path="/upload" element={<Upload/>}/>
      </Routes>
    </Router>
  );
}

export default App;
