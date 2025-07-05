import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DashboardPage from './Pages/DashboardPage';
import OtpRegistrationPage from './Pages/OtpRegistrationPage';
import LoginPage from './Pages/LoginPage'; // Assuming there's a LoginPage component
import NotFoundPage from './Pages/NotFoundPage'; // Assuming there's a NotFoundPage component

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<DashboardPage />} />
        <Route path="/otp-registration" element={<OtpRegistrationPage />} />
        <Route path="/loginpage" element={<LoginPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
};

export default App;