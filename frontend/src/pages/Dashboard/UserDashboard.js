import React from 'react';
import { useNavigate } from 'react-router-dom';

const UserDashboard = ({ user, handleLogout }) => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-gray-50 py-10 px-6">
      <div className="max-w-4xl mx-auto text-center">
      <button
          onClick={handleLogout}
          className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
        >
          Sign Out
        </button>
        <h1 className="text-4xl font-bold text-blue-700 mb-4">Welcome, User!</h1>
        <p className="text-lg text-gray-700">This is your dashboard. You can view your tracked drugs and receive alerts here.</p>
      
      </div>
    </div>
  );
};

export default UserDashboard;
