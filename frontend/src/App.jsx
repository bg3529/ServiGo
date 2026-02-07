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
import "./App.css";
import { testConnection } from "./services/api";

function App() {
  const [currentUser, setCurrentUser] = useState(null);

  const [bookings, setBookings] = useState(() => {
    const savedBookings = localStorage.getItem("userBookings");
    return savedBookings ? JSON.parse(savedBookings) : [];
  });

  useEffect(() => {
    localStorage.setItem("userBookings", JSON.stringify(bookings));
  }, [bookings]);

  const location = useLocation();
  const authPaths = ["/login", "/register", "/forgot-password", "/"];
  const isAuthPage = authPaths.includes(location.pathname);

  const handleLogin = (user) => {
    setCurrentUser(user);
  };

  const handleLogout = () => {
    setCurrentUser(null);
  };

  const addBooking = (newBooking) => {
    setBookings((prev) => [newBooking, ...prev]);
  };

  const cancelBooking = (id) => {
    setBookings((prev) => prev.filter(booking => booking.id !== id));
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
            element={currentUser ? <Profile currentUser={currentUser} /> : <Navigate to="/login" />}
          />

          <Route
            path="/my-bookings"
            element={currentUser ? (
              <MyBookings bookings={bookings} onCancel={cancelBooking} />
            ) : (
              <Navigate to="/login" />
            )}
          />

          <Route path="/services/:id" element={<SubCategoryPage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/help" element={<HelpPage />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/become-provider" element={<BecomeProvider />} />

          <Route
            path="/providers/:subId"
            element={<ProviderListPage onAddBooking={addBooking} />}
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