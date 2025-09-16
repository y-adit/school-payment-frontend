import { useState, useEffect, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import api from '../services/api';

export const useTransactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [totalPages, setTotalPages] = useState(0);

  const [searchParams, setSearchParams] = useSearchParams();

  // Get state from URL or set defaults
  const page = parseInt(searchParams.get('page')) || 1;
  const limit = parseInt(searchParams.get('limit')) || 10;
  const sortBy = searchParams.get('sortBy') || 'payment_time';
  const order = searchParams.get('order') || 'desc';
  const status = searchParams.get('status') || '';
  const schoolId = searchParams.get('schoolId') || '';

  const fetchTransactions = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      // Build query parameters from state
      const params = new URLSearchParams({
        page,
        limit,
        sortBy,
        order,
      });
      if (status) params.append('status', status);
      if (schoolId) params.append('schoolId', schoolId);

      const response = await api.get(`/api/transactions?${params.toString()}`);
      setTransactions(response.data.data);
      setTotalPages(response.data.pages);
    } catch (err) {
      setError('Failed to fetch transactions. Please try again later.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [page, limit, sortBy, order, status, schoolId]);

  useEffect(() => {
    fetchTransactions();
  }, [fetchTransactions]);
  
  // Function to update URL search params, which triggers a re-fetch
  const updateFilters = (newFilters) => {
    const newSearchParams = new URLSearchParams(searchParams);
    Object.entries(newFilters).forEach(([key, value]) => {
      if (value) {
        newSearchParams.set(key, value);
      } else {
        newSearchParams.delete(key);
      }
    });
    // Reset to page 1 on filter change
    if(newFilters.status || newFilters.schoolId) {
        newSearchParams.set('page', 1);
    }
    setSearchParams(newSearchParams);
  };

  return {
    transactions,
    loading,
    error,
    totalPages,
    currentPage: page,
    filters: { sortBy, order, status, schoolId },
    updateFilters,
  };
};