// src/components/Header.js
import React from 'react';
import { useNavigate } from 'react-router-dom';

const Header = ({ role }) => {
  const navigate = useNavigate();

  const handleSignOut = () => {
    if(localStorage.getItem("manufacturer")){
      localStorage.removeItem("manufacturer");
    }
    if(localStorage.getItem("user")){
      localStorage.removeItem("user");
    }
    navigate("/login");
  };

  return (
    <header className="flex justify-between items-center px-6 py-4 bg-white shadow-md">
      <h1 className="text-2xl font-bold text-blue-600">DrugTrack</h1>

      <div className="flex gap-4">
        {role === "manufacturer" && (
          <>
            <button
              onClick={() => navigate("/add-drug")}
              className="text-sm text-gray-700 hover:text-blue-500"
            >
              Add Drug
            </button>
            <button
              onClick={() => navigate("/my-batches")}
              className="text-sm text-gray-700 hover:text-blue-500"
            >
              My Batches
            </button>
          </>
        )}

        {role === "user" && (
          <>
            <button
              onClick={() => navigate("/dashboard")}
              className="text-sm text-gray-700 hover:text-blue-500"
            >
              Dashboard
            </button>
            <button
              onClick={() => navigate("/history")}
              className="text-sm text-gray-700 hover:text-blue-500"
            >
              History
            </button>
          </>
        )}

        <button
          onClick={handleSignOut}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
        >
          Sign Out
        </button>
      </div>
    </header>
  );
};

export default Header;
