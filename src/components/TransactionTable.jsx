import React from 'react';
import { FaSort, FaSortUp, FaSortDown } from 'react-icons/fa';

const statusColors = {
  success: 'bg-green-100 text-green-800',
  pending: 'bg-yellow-100 text-yellow-800',
  failed: 'bg-red-100 text-red-800',
};

const TransactionTable = ({ transactions, loading, error, filters, updateFilters }) => {

  const handleSort = (field) => {
    const newOrder = filters.sortBy === field && filters.order === 'asc' ? 'desc' : 'asc';
    updateFilters({ sortBy: field, order: newOrder });
  };

  const renderSortIcon = (field) => {
    if (filters.sortBy !== field) return <FaSort className="text-gray-400" />;
    if (filters.order === 'asc') return <FaSortUp />;
    return <FaSortDown />;
  };

  const headers = [
    { key: 'custom_order_id', label: 'Order ID' },
    { key: 'school_id', label: 'School ID' },
    { key: 'gateway', label: 'Gateway' },
    { key: 'order_amount', label: 'Order Amount' },
    { key: 'transaction_amount', label: 'Txn Amount' },
    { key: 'status', label: 'Status' },
  ];

  if (loading) return <div className="text-center p-8">Loading transactions...</div>;
  if (error) return <div className="text-center p-8 text-red-500">{error}</div>;
  if (transactions.length === 0) return <div className="text-center p-8 text-gray-500">No transactions found.</div>;

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white">
        <thead className="bg-gray-50">
          <tr>
            {headers.map((header) => (
              <th
                key={header.key}
                onClick={() => handleSort(header.key)}
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
              >
                <div className="flex items-center gap-2">
                  {header.label}
                  {renderSortIcon(header.key)}
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {transactions.map((tx) => (
            <tr key={tx.collect_id} className="group hover:bg-gray-50 transition-colors duration-200">
              {/* This empty div is for the hover effect line */}
              <td className="w-1 bg-transparent transition-all duration-300 group-hover:bg-blue-500"></td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 transition-transform duration-300 group-hover:translate-x-1">{tx.custom_order_id}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 transition-transform duration-300 group-hover:translate-x-1">{tx.school_id}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 transition-transform duration-300 group-hover:translate-x-1">{tx.gateway}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 transition-transform duration-300 group-hover:translate-x-1">₹{tx.order_amount?.toLocaleString()}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 transition-transform duration-300 group-hover:translate-x-1">₹{tx.transaction_amount?.toLocaleString()}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm transition-transform duration-300 group-hover:translate-x-1">
                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${statusColors[tx.status] || 'bg-gray-100 text-gray-800'}`}>
                  {tx.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TransactionTable;