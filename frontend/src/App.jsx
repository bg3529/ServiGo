import React from "react";
import { Routes, Route, Navigate, Link } from "react-router-dom";
import LoginForm from "./Components/LoginForm";
import RegisterForm from "./Components/RegisterForm";
import "./Components/Auth.css";
import ForgotPassword from "./Components/forgotpassword";

function App() {
  return (
    <div className="app-container">
      <div className="nav-bar">
        <Link to="/register">Register</Link>
        <Link to="/login">Login</Link>
      </div>

      <Routes>
        <Route path="/" element={<Navigate to="/register" />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/login" element={<LoginForm />} />
         <Route path="/forgot-password" element={<ForgotPassword />} />
      </Routes>
    </div>
  );
}

export default App;