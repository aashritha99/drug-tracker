import React from 'react';

const Dashboard = ({ user, handleLogout }) => {
  return (
    <div style={{ padding: '2rem', textAlign: 'center' }}>
      <h2>Welcome, {user?.email}</h2>
      
      <button 
        onClick={handleLogout}
        style={{
          marginTop: '1rem',
          padding: '10px 20px',
          backgroundColor: '#f44336',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer'
        }}
      >
        Sign Out
      </button>
    </div>
  );
};

export default Dashboard;
