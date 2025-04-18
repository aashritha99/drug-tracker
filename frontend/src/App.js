import React, { useState, useEffect } from "react";
import Login from "./pages/Login.js";
import Signup from "./pages/Signup.js";
import Dashboard from "./pages/Dashboard/Dashboard.js";
import { auth } from './firebase-config.js';
import { onAuthStateChanged, signOut } from "firebase/auth";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import './index.css';
import About from "./components/About.js";
import AddDrug from "./pages/AddDrug.js";
import Footer from "./components/Footer.js";
import UserDashboard from "./pages/Dashboard/UserDashboard.js";
import Contact from "./pages/Contact.js";

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
              <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-200 via-white to-slate-300 font-sans">
  <div className="p-8 max-w-2xl w-full bg-white/60 backdrop-blur-md rounded-lg shadow-lg">
    <h1 className=" text-3xl  font-extrabold text-center text-purple-600 mb-6 tracking-wide leading-snug ">
      DrugTrack 
    </h1>

    <div>
      <div className="flex justify-center mb-6 ">
        <button
          onClick={() => setActiveTab('login')}
          className={`px-5 py-2 rounded-l-md  transition-colors duration-300 ${
            activeTab === 'login'
              ? 'bg-purple-600 text-white'
              : 'bg-gray-200 text-gray-800'
          }`}
        >
          Login
        </button>
        <button
          onClick={() => setActiveTab('signup')}
          className={`px-5 py-2 rounded-r-md  transition-colors duration-300 ${
            activeTab === 'signup'
              ? 'bg-red-500 text-white'
              : 'bg-gray-200 text-gray-800'
          }`}
        >
          Signup
        </button>
      </div>

      {activeTab === 'login' ? <Login /> : <Signup />}
    </div>
  </div>
</div>

            )
          }
        />
        <Route path="*" element={<Navigate to="/" />} />
        <Route path="/About" element={<About/>}/>
        <Route path="/UserDashboard" element={<UserDashboard/>}/>
        <Route path="/AddDrug" element={<AddDrug/>}/>
        <Route path="/Contact" element={<Contact/>}/>
        <Route path="/Footer" element={<Footer/>}/>
      </Routes>
    </Router>
  );
}

export default App;
