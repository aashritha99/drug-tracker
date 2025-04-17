import React from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '../../components/Card';
import Footer from '../../components/Footer';

const Dashboard = ({ user, handleLogout }) => {
  const navigate = useNavigate();

  return (
    <div className="p-8 font-sans bg-gray-100 min-h-screen">
      {/* Header Section */}
      <header className="flex justify-between items-center border-b-2 border-gray-300 pb-4">
        <h1 className="text-2xl font-bold text-gray-800">DrugTrack</h1>
        <button
          onClick={handleLogout}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
        >
          Sign Out
        </button>
      </header>

      {/* Main Content */}
      <div className="text-center mt-8">
        <h2 className="text-xl font-semibold text-gray-700">Welcome, {user?.email}</h2>
        <p className="text-gray-600 mt-2">
          Here is your dashboard where you can manage your drugs and view the history.
        </p>
        
        <div className="flex items-center justify-center min-h-[50vh] bg-gradient-to-r from-blue-500 to-purple-600">
  <h1 className="text-5xl font-bold text-white text-center shadow-lg p-6 bg-opacity-50 rounded-lg">
    Welcome to <span className="text-yellow-300">DrugTrack</span>
  </h1>
</div>

        {/* Action Buttons */}
        <div className="mt-6 flex flex-wrap justify-center gap-4">
        <button className="px-5 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition">
            Manage Drugs
          </button>
          <button className="px-5 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition">
            View History
          </button>
          <button
            onClick={() => navigate("/About")}
            className="px-5 py-2 bg-purple-500 text-white rounded hover:bg-purple-600 transition"
          >
            about updated
          </button>
          <button
            onClick={() => navigate("/AddDrug")}
            className="px-5 py-2 bg-purple-500 text-white rounded hover:bg-purple-600 transition"
          >
            add drug
          </button>
        </div>
        </div>

        {/* Dashboard Cards */}
        <div className="mt-10">
          <Card />
          <Footer/>
        </div>
      </div>
    
  );
};

export default Dashboard;
