import { useState } from 'react';
import api from '../services/api';

const StatusCheckModal = ({ isOpen, onClose }) => {
  const [orderId, setOrderId] = useState('');
  const [statusResult, setStatusResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleCheckStatus = async (e) => {
    e.preventDefault();
    if (!orderId) return;
    setLoading(true);
    setError('');
    setStatusResult(null);
    try {
      const response = await api.get(`/api/transactions/status/${orderId}`);
      setStatusResult(response.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch status.');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4">Check Transaction Status</h2>
        <form onSubmit={handleCheckStatus}>
          <input
            type="text"
            value={orderId}
            onChange={(e) => setOrderId(e.target.value)}
            placeholder="Enter Custom Order ID"
            className="w-full px-3 py-2 border border-gray-300 rounded-md mb-4"
          />
          <div className="flex justify-end gap-4">
            <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-200 rounded-md">Cancel</button>
            <button type="submit" disabled={loading} className="px-4 py-2 bg-blue-500 text-white rounded-md disabled:bg-blue-300">
              {loading ? 'Checking...' : 'Check Status'}
            </button>
          </div>
        </form>
        {error && <p className="mt-4 text-sm text-red-500">{error}</p>}
        {statusResult && (
          <div className="mt-4 p-4 bg-gray-50 rounded-md">
            <p><strong>Status:</strong> {statusResult.status}</p>
            <p><strong>Amount:</strong> ₹{statusResult.order_amount}</p>
            <p><strong>Time:</strong> {new Date(statusResult.payment_time).toLocaleString()}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default StatusCheckModal;