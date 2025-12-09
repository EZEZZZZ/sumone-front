import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Onboarding from './pages/Onboarding/Onboarding';
import Login from './pages/Auth/Login';
import CoupleConnect from './pages/Auth/CoupleConnect';
import Home from './pages/Home/Home';
import QuestionAnswer from './pages/Question/QuestionAnswer';
import History from './pages/History/History';
import BanyeomongCare from './pages/Banyeomong/BanyeomongCare';
import Profile from './pages/Profile/Profile';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        {/* Onboarding & Auth Routes */}
        <Route path="/" element={<Onboarding />} />
        <Route path="/login" element={<Login />} />
        <Route path="/couple-connect" element={<CoupleConnect />} />

        {/* Main App Routes */}
        <Route path="/home" element={<Home />} />
        <Route path="/question/:id" element={<QuestionAnswer />} />
        <Route path="/history" element={<History />} />
        <Route path="/banyeomong" element={<BanyeomongCare />} />
        <Route path="/profile" element={<Profile />} />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
