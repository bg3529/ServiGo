import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate, useLocation, Outlet } from "react-router-dom";

import Navbar from "./Components/Navbar/Navbar";
import Footer from "./Components/Footer/Footer";
import LoginForm from "./Components/LoginForm";
import RegisterForm from "./Components/RegisterForm";
import ForgotPassword from "./Components/forgotpassword";
import Sidebar from "./Components/Sidebar";

import Home from "./Pages/Home/Home";
import Profile from "./Pages/Profile/Profile";
import SubCategoryPage from "./Pages/SubCategory/SubCategoryPage";
import ProviderListPage from "./Pages/Providers/ProvidersListPage";
import MyBookings from "./Pages/MyBookings/MyBookings";
import ProviderRegistration from "./Pages/Profile/ProviderRegistration";
import MyServices from "./Pages/MyServices.jsx";
import AddServices from "./Pages/AddServices.jsx";
import Reviews from "./Pages/Reviews.jsx";
import ProviderDashboard from "./Pages/Dashboard.jsx";
import Bookings from "./Pages/Bookings.jsx";

import "./App.css";

// Dashboard Layout component using Outlet for nested content
function DashboardLayout() {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 p-6 bg-gray-100">
        <Outlet /> {/* This is where the nested route components will render */}
      </main>
    </div>
  );
}

function App() {
  const [currentUser, setCurrentUser] = useState(null);

  const location = useLocation();
  const authPaths = ["/login", "/register", "/forgot-password", "/"];
  const isAuthPage = authPaths.includes(location.pathname);

  const handleLogin = (user) => setCurrentUser(user);
  const handleLogout = () => setCurrentUser(null);

  return (
    <div className="app-wrapper">
      {!isAuthPage && <Navbar currentUser={currentUser} onLogout={handleLogout} />}

      <main className="main-content">
        <Routes>
          {/* Default Redirect */}
          <Route path="/" element={<Navigate to="/register" />} />

          {/* Auth routes */}
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/login" element={<LoginForm onLoginSuccess={handleLogin} />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />

          {/* General User routes */}
          <Route
            path="/home"
            element={currentUser ? <Home currentUser={currentUser} /> : <Navigate to="/login" />}
          />
          <Route
            path="/profile"
            element={currentUser ? <Profile currentUser={currentUser} /> : <Navigate to="/login" />}
          />
          <Route
            path="/my-bookings"
            element={
              currentUser ? <MyBookings /> : <Navigate to="/login" />
            }
          />
          <Route path="/services/:id" element={<SubCategoryPage />} />
          <Route path="/providers/:subId" element={<ProviderListPage />} />

          {/* Become Provider */}
          <Route
            path="/become-provider"
            element={
              currentUser ? (
                <ProviderRegistration
                  currentUser={currentUser}
                  onProviderRegistration={(providerData) => {
                    setCurrentUser({ ...currentUser, isProvider: true, providerData });
                  }}
                />
              ) : (
                <Navigate to="/login" />
              )
            }
          />

          {/* --- PROTECTED PROVIDER DASHBOARD ROUTES --- */}
          <Route
            element={currentUser?.isProvider ? <DashboardLayout /> : <Navigate to="/login" />}
          >
            <Route path="/dashboard" element={<ProviderDashboard currentUser={currentUser} />} />
            <Route path="/my-services" element={<MyServices currentUser={currentUser} />} />
            <Route path="/add-services" element={<AddServices currentUser={currentUser} />} />
            <Route path="/my-profile" element={<Profile currentUser={currentUser} />} />
            <Route path="/reviews" element={<Reviews currentUser={currentUser} />} />
            <Route path="/bookings" element={<Bookings currentUser={currentUser} />} />
          </Route>

          {/* Catch all */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </main>

      {!isAuthPage && <Footer />}
    </div>
  );
}

export default App;