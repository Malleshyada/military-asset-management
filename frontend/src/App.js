import React, { useState, useEffect } from 'react';
import Dashboard from './components/Dashboard';
import Purchases from './components/Purchases';
import Transfers from './components/Transfers';
import Assignments from './components/Assignments';

const App = () => {
  const [userRole, setUserRole] = useState('Admin'); // Simulated user role
  const [userBase, setUserBase] = useState('Base1'); // Simulated user base
  const [activeTab, setActiveTab] = useState('dashboard');

  // Simulated login (replace with actual login logic)
  useEffect(() => {
    fetch('http://localhost:3000/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: 'admin', password: 'password' })
    })
      .then(res => res.json())
      .then(data => localStorage.setItem('token', data.token))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Military Asset Management System</h1>
      <nav className="mb-4">
        <button 
          className={`mr-2 p-2 ${activeTab === 'dashboard' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`} 
          onClick={() => setActiveTab('dashboard')}
          disabled={userRole === 'Logistics Officer'}
        >
          Dashboard
        </button>
        <button 
          className={`mr-2 p-2 ${activeTab === 'purchases' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`} 
          onClick={() => setActiveTab('purchases')}
        >
          Purchases
        </button>
        <button 
          className={`mr-2 p-2 ${activeTab === 'transfers' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`} 
          onClick={() => setActiveTab('transfers')}
        >
          Transfers
        </button>
        <button 
          className={`p-2 ${activeTab === 'assignments' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`} 
          onClick={() => setActiveTab('assignments')}
          disabled={userRole === 'Logistics Officer'}
        >
          Assignments & Expenditures
        </button>
      </nav>

      {activeTab === 'dashboard' && <Dashboard userRole={userRole} userBase={userBase} />}
      {activeTab === 'purchases' && <Purchases userRole={userRole} userBase={userBase} />}
      {activeTab === 'transfers' && <Transfers userRole={userRole} userBase={userBase} />}
      {activeTab === 'assignments' && <Assignments userRole={userRole} userBase={userBase} />}
    </div>
  );
};

export default App;