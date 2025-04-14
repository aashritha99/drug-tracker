import React from 'react';
import { useNavigate } from 'react-router-dom';
import Card from './Card';

const Dashboard = ({ user, handleLogout }) => {
  const Navigate = useNavigate();
  return (
    <div style={{ padding: '2rem', fontFamily: 'Arial' }}>
      {/* Header Section */}
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '1rem', borderBottom: '2px solid #ddd' }}>
        <h1 style={{ margin: 0, fontSize: '24px', color: '#333' }}>DrugTrack</h1>
        <button
          onClick={handleLogout}
          style={{
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
      </header>

      {/* Main Content */}
      <div style={{ textAlign: 'center', marginTop: '2rem' }}>
        <h2>Welcome, {user?.email}</h2>
        <p>Here is your dashboard where you can manage your drugs and view the history.</p>
        
        {/* Additional Dashboard elements */}
        <div style={{ marginTop: '20px' }}>
          <button
            style={{
              padding: '10px 20px',
              backgroundColor: '#4CAF50',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              marginRight: '10px'
            }}
          >
            Manage Drugs
          </button>
          <button
            style={{
              padding: '10px 20px',
              backgroundColor: '#2196F3',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            View History
          </button>
          <button onClick={() => Navigate("/upload")}>Click to go to upload Page</button>
        </div>
        <Card/>
      </div>
    </div>
  );
};

export default Dashboard;
