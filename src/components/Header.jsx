import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import StatusCheckModal from './StatusCheckModal';

const Header = ({ filters, updateFilters }) => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    navigate('/login');
  };

  return (
    <>
      <header className="bg-white shadow-sm p-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-800">Payments Dashboard - V2 TEST</h1>
          <div className="flex items-center gap-4">
            <button onClick={() => setIsModalOpen(true)} className="px-4 py-2 text-sm bg-gray-100 rounded-md hover:bg-gray-200">
              Check Status
            </button>
            <button onClick={handleLogout} className="px-4 py-2 text-sm bg-red-500 text-white rounded-md hover:bg-red-600">
              Logout
            </button>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-4 flex gap-4">
            <input
                type="text"
                placeholder="Filter by School ID..."
                value={filters.schoolId || ''}
                onChange={(e) => updateFilters({ schoolId: e.target.value })}
                className="px-3 py-2 border border-gray-300 rounded-md text-sm"
            />
            <select
                value={filters.status || ''}
                onChange={(e) => updateFilters({ status: e.target.value })}
                className="px-3 py-2 border border-gray-300 rounded-md text-sm"
            >
                <option value="">All Statuses</option>
                <option value="success">Success</option>
                <option value="pending">Pending</option>
                <option value="failed">Failed</option>
            </select>
        </div>
      </header>
      <StatusCheckModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
};

export default Header;