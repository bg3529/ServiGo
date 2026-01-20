import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import authorizedUsers from "../Data/LoginData";
import "./Auth.css";

function LoginForm({ onLoginSuccess }) {
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  function handleChange(event) {
    setLoginData({ ...loginData, [event.target.name]: event.target.value });
  }

  function handleSubmit(event) {
    event.preventDefault();

    const user = authorizedUsers.find(
      (u) => u.email === loginData.email && u.password === loginData.password
    );

    if (user) {
      onLoginSuccess(user); 
      navigate("/home");
    } else {
      alert("Invalid email or password. Please try again.");
    }
  }

  return (
    <div className="auth-layout">
      <div className="auth-image-section">
        <img src="images/servigologo.png" alt="logo" />
      </div>

      <div className="auth-form-section">
        <form className="auth-form" onSubmit={handleSubmit}>
          <h2>Login</h2>
          <p>Welcome back! Please enter your details.</p>
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={loginData.email}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={loginData.password}
            onChange={handleChange}
            required
          />
          <div className="form-options">
             <a href="/forgot-password">Forgot password?</a>
          </div>
          <button type="submit">Login</button>
          
          <p className="auth-footer-text">
            Don't have an account? <a href="/register">Sign Up</a>
          </p>
        </form>
      </div>
    </div>
  );
}

export default LoginForm;