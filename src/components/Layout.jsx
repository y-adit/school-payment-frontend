import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import Header from './Header';

// This is a placeholder component.
// In a real app, you would pass down filter state and handlers.
const DummyHeader = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem('authToken');
    navigate('/login');
  };
  return (
    <header className="bg-white shadow-sm p-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-800">Payments Dashboard</h1>
          <button onClick={handleLogout} className="px-4 py-2 text-sm bg-red-500 text-white rounded-md hover:bg-red-600">
              Logout
          </button>
        </div>
    </header>
  );
};

// Layout specifically for the main dashboard page
export const DashboardLayout = ({ filters, updateFilters }) => {
  const token = localStorage.getItem('authToken');
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Header filters={filters} updateFilters={updateFilters}/>
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <Outlet />
      </main>
    </div>
  );
};

// A general-purpose layout for other protected pages
export const ProtectedLayout = () => {
  const token = localStorage.getItem('authToken');
  if (!token) {
    return <Navigate to="/login" replace />;
  }
  return (
     <div className="min-h-screen bg-gray-100">
      <DummyHeader />
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <Outlet />
      </main>
    </div>
  )
}