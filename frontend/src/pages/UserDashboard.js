import React from 'react';

const UserDashboard = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-10 px-6">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-4xl font-bold text-blue-700 mb-4">Welcome, User!</h1>
        <p className="text-lg text-gray-700">This is your dashboard. You can view your tracked drugs and receive alerts here.</p>
      </div>
    </div>
  );
};

export default UserDashboard;
