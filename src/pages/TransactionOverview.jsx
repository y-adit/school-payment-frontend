import React from 'react';
import { useTransactions } from '../hooks/useTransactions';
import TransactionTable from '../components/TransactionTable';
import Pagination from '../components/Pagination';
import { DashboardLayout } from '../components/Layout';

const TransactionsOverview = () => {
  const { transactions, loading, error, totalPages, currentPage, filters, updateFilters } = useTransactions();

  return (
    <>
      <div className="bg-white shadow rounded-lg">
          <TransactionTable
            transactions={transactions}
            loading={loading}
            error={error}
            filters={filters}
            updateFilters={updateFilters}
          />
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={(page) => updateFilters({ page })}
      />
    </>
  );
};


// This is the wrapper component that gets exported
const TransactionsOverviewPage = () => {
  const { filters, updateFilters } = useTransactions();
  return (
    <DashboardLayout filters={filters} updateFilters={updateFilters}>
      <TransactionsOverview/>
    </DashboardLayout>
  )
}

// =======================================================
// THIS IS THE MOST IMPORTANT LINE - MAKE SURE IT EXISTS
// =======================================================
export default TransactionsOverviewPage;