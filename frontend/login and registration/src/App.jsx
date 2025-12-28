import React from "react";
import { Routes, Route, Navigate, Link } from "react-router-dom";
import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";
import "./components/Auth.css";

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
      </Routes>
    </div>
  );
}

export default App;