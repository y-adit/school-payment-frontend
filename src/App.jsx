import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/login';
import TransactionsOverviewPage from './pages/TransactionOverview';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<TransactionsOverviewPage />} />
        {/* You can add more routes here, for example: */}
        {/* <Route path="/school/:schoolId" element={<TransactionsBySchoolPage />} /> */}
      </Routes>
    </Router>
  );
}

export default App;