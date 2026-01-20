import React, { useState } from "react";
import "./Auth.css";

function RegisterForm() {
  const [formData, setFormData] = useState({ username: "", email: "", password: "" });

  function handleChange(event) {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  }

  function handleSubmit(event) {
    event.preventDefault();
    alert("Account created!");
  }

  return (
    <div className="auth-layout">
      <div className="auth-image-section">
        <img src="images/servigologo.png" alt="logo" />
      </div>
      
      <div className="auth-form-section">
        <form className="auth-form" onSubmit={handleSubmit}>
          <h2>Register</h2>
          <p>Join ServiGo to find the best services in Dhulikhel.</p>
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <button type="submit">Sign Up</button>
          
          <p className="auth-footer-text">
            Already have an account? <a href="/login">Log In</a>
          </p>
        </form>
      </div>
    </div>
  );
}

export default RegisterForm;