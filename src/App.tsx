import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom';
import Login from './pages/Auth/Login';
import CoupleConnect from './pages/Auth/CoupleConnect';
import Home from './pages/Home/Home';
import QuestionAnswer from './pages/Question/QuestionAnswer';
import History from './pages/History/History';
import MissionPage from './pages/Mission/Mission';
import MissionDetail from './pages/Mission/MissionDetail'; // Import ensured
import Profile from './pages/Profile/Profile';
import './App.css';

// Component to handle global auth logic
function AuthHandler() {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Check for token in URL query params or hash
    const searchParams = new URLSearchParams(window.location.search);
    const hashParams = new URLSearchParams(window.location.hash.substring(1)); // Remove #

    const token = searchParams.get('token') || searchParams.get('accessToken') ||
      hashParams.get('token') || hashParams.get('accessToken');

    if (token) {
      console.log('Global AuthHandler: Token found in URL, saving to localStorage');
      localStorage.setItem('accessToken', token);
    }
  }, [location, navigate]);

  return null;
}

const App: React.FC = () => {
  return (
    <Router>
      <AuthHandler />
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/couple-connect" element={<CoupleConnect />} />
        <Route path="/home" element={<Home />} />
        <Route path="/question/:id" element={<QuestionAnswer />} />
        <Route path="/history" element={<History />} />
        <Route path="/mission" element={<Navigate to="/missions" replace />} />
        <Route path="/missions" element={<MissionPage />} />
        <Route path="/mission/:id" element={<MissionDetail />} />
        <Route path="/profile" element={<Profile />} />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
};

export default App;
