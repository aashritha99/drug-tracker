import React, { useEffect } from 'react';
import Header from '../../components/Header';
import { useNavigate } from 'react-router-dom';

const UserDashboard = ({ user, handleLogout }) => {
  const Navigate = useNavigate();
  useEffect(() => {
    const manufacturer = JSON.parse(localStorage.getItem("manufacturer"));
    const user = JSON.parse(localStorage.getItem("user"));
    console.log(user);
    if(manufacturer.role == "manufacturer"){
      console.log(manufacturer);
      Navigate("/Dashboard");
      
    }
  } ,[])
  return (
    <div className="min-h-screen bg-gray-50">
      {/* ✅ Reusable Header */}
      <Header role="user" handleLogout={handleLogout} />

      <div className="max-w-4xl mx-auto text-center py-10 px-6">
        <h1 className="text-4xl font-bold text-blue-700 mb-4">Welcome, User!</h1>
        <p className="text-lg text-gray-700">
          This is your dashboard. You can view your tracked drugs and receive alerts here.
        </p>
      </div>
    </div>
  );
};

export default UserDashboard;
