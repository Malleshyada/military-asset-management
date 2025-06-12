import React from 'react';
import Navbar from '../components/Navbar';
import Dashboard from '../components/Dashboard';
import Purchases from '../components/Purchases';
import Transfers from '../components/Transfers';
import Assignments from '../components/Assignments';

function Home({ user, currentPage, setCurrentPage }) {
  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar userRole={user.role} setCurrentPage={setCurrentPage} />
      <main className="p-4 max-w-7xl mx-auto">
        {currentPage === 'dashboard' && <Dashboard user={user} />}
        {currentPage === 'purchases' && (user.role === 'Admin' || user.role === 'Logistics Officer') && (
          <Purchases user={user} />
        )}
        {currentPage === 'transfers' && (user.role === 'Admin' || user.role === 'Logistics Officer') && (
          <Transfers user={user} />
        )}
        {currentPage === 'assignments' && (user.role === 'Admin' || user.role === 'Base Commander') && (
          <Assignments user={user} />
        )}
        {currentPage !== 'dashboard' && !(
          (currentPage === 'purchases' && (user.role === 'Admin' || user.role === 'Logistics Officer')) ||
          (currentPage === 'transfers' && (user.role === 'Admin' || user.role === 'Logistics Officer')) ||
          (currentPage === 'assignments' && (user.role === 'Admin' || user.role === 'Base Commander'))
        ) && (
          <div className="text-center text-red-600">
            <h2 className="text-xl font-semibold">Access Denied</h2>
            <p>You do not have permission to view this page.</p>
          </div>
        )}
      </main>
    </div>
  );
}

export default Home;