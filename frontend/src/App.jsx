import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { Toaster } from 'react-hot-toast';

import Navbar from "./Components/Navbar/Navbar";
import Footer from "./Components/Footer/Footer";
import LoginForm from "./Components/LoginForm";
import RegisterForm from "./Components/RegisterForm";
import ForgotPassword from "./Components/forgotpassword";
import Home from "./Pages/Home/Home";
import ResetPassword from "./Components/ResetPassword";
import Profile from "./Pages/Profile/Profile";
import SubCategoryPage from "./Pages/SubCategory/SubCategoryPage";
import ProviderListPage from "./Pages/Providers/ProvidersListPage";
import MyBookings from "./Pages/MyBookings/MyBookings";
import ServicesPage from "./Pages/Services/ServicesPage";
import HelpPage from "./Pages/Help/HelpPage";
import AboutUs from "./Pages/AboutUs/AboutUs";
import BecomeProvider from "./Pages/BecomeProvider/BecomeProvider";
import ChatWidget from "./Components/ChatBot/ChatWidget";
import Terms from "./Pages/Terms/Terms";
import "./App.css";
import { testConnection } from "./services/api";

function App() {
  const [currentUser, setCurrentUser] = useState(null);

  const location = useLocation();
  const authPaths = ["/login", "/register", "/forgot-password", "/"];
  const isAuthPage = authPaths.includes(location.pathname);

  const handleLogin = (user) => {
    setCurrentUser(user);
  };

  const handleLogout = () => {
    setCurrentUser(null);
  };

  const updateUser = (updatedData) => {
    setCurrentUser(prev => {
      const newUser = { ...prev, ...updatedData };
      localStorage.setItem('user', JSON.stringify(newUser));
      return newUser;
    });
  };

  return (
    <div className="app-wrapper">
      {!isAuthPage && <Navbar currentUser={currentUser} onLogout={handleLogout} />}

      <main className="main-content">
        <Routes>
          <Route path="/" element={<Navigate to="/register" />} />
          <Route path="/register" element={<RegisterForm />} />

          <Route
            path="/login"
            element={<LoginForm onLoginSuccess={handleLogin} />}
          />

          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password/:uid/:token" element={<ResetPassword />} />

          <Route
            path="/home"
            element={currentUser ? <Home currentUser={currentUser} /> : <Navigate to="/login" />}
          />

          {/* Dashboard redirects to Home */}
          <Route
            path="/dashboard"
            element={<Navigate to="/home" replace />}
          />

          <Route
            path="/profile"
            element={currentUser ? <Profile currentUser={currentUser} onUpdateUser={updateUser} /> : <Navigate to="/login" />}
          />

          <Route
            path="/my-bookings"
            element={currentUser ? (
              <MyBookings />
            ) : (
              <Navigate to="/login" />
            )}
          />

          <Route path="/services/:id" element={<SubCategoryPage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/help" element={<HelpPage />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/become-provider" element={<BecomeProvider />} />

          <Route
            path="/providers/:subId"
            element={<ProviderListPage />}
          />
        </Routes>
      </main>

      {!isAuthPage && <Footer />}
      <Toaster position="top-right" />
      <ChatWidget />
    </div>
  );
}

export default App;