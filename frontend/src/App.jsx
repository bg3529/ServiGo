import React, { useState } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";

import Navbar from "./Components/Navbar/Navbar";
import Footer from "./Components/Footer/Footer";
import LoginForm from "./Components/LoginForm";
import RegisterForm from "./Components/RegisterForm";
import ForgotPassword from "./Components/forgotpassword";
import Home from "./Pages/Home/Home";
import Profile from "./Pages/Profile/Profile"; 
import SubCategoryPage from "./Pages/SubCategory/SubCategoryPage";
import ProviderListPage from "./Pages/Providers/ProvidersListPage";
import BookingModal from "./Components/BookingForm/BookingModal";
import "./App.css";

function App() {
  const [currentUser, setCurrentUser] = useState(null); // State to store logged-in user
  const location = useLocation();
  const authPaths = ["/login", "/register", "/forgot-password", "/"];
  const isAuthPage = authPaths.includes(location.pathname);

  // Function to be called from LoginForm upon successful authentication
  const handleLogin = (user) => {
    setCurrentUser(user);
  };

  const handleLogout = () => {
    setCurrentUser(null);
  };

  return (
    <div className="app-wrapper">
      {/* Pass currentUser to Navbar to show name/avatar */}
      {!isAuthPage && <Navbar currentUser={currentUser} onLogout={handleLogout} />}

      <main className="main-content">
        <Routes>
          <Route path="/" element={<Navigate to="/register" />} />
          <Route path="/register" element={<RegisterForm />} />
          
          {/* Pass handleLogin to LoginForm */}
          <Route 
            path="/login" 
            element={<LoginForm onLoginSuccess={handleLogin} />} 
          />
          
          <Route path="/forgot-password" element={<ForgotPassword />} />
          
          {/* Dashboard: Pass currentUser to Home */}
          <Route 
            path="/home" 
            element={currentUser ? <Home currentUser={currentUser} /> 
            : <Navigate to="/login" />} 
          />

          {/* Profile: Pass currentUser to show details like Bandana Gyawali */}
          <Route 
            path="/profile" 
            element={currentUser ? <Profile currentUser={currentUser} /> :
             <Navigate to="/login" />} 
          />

          <Route path="/services/:id" element={<SubCategoryPage />} />
          <Route path="/providers/:subId" element={<ProviderListPage />} />
          <Route path="/book/:providerId" element={<BookingModal />} />
        </Routes>
      </main>

      {!isAuthPage && <Footer />}
    </div>
  );
}

export default App;