import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import LandingPage from './components/LandingPage';
import AlertFeed from './components/AlertFeed';
import ReportAlert from './components/ReportAlert';
import Login from './components/Login';
import Register from './components/Register';
import UsersList from './components/UsersList';
import GlobalNotification from './components/GlobalNotification';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <GlobalNotification />
        <main className="pt-16">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/dashboard" element={<AlertFeed />} />
            <Route path="/report" element={<ReportAlert />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/admin/users" element={<UsersList />} />
            {/* Add more routes as needed */}
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
