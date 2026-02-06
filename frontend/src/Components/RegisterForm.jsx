import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthService } from "../services/api";
import "./Auth.css";

function RegisterForm() {
  const [formData, setFormData] = useState({ username: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  function handleChange(event) {
    setFormData({ ...formData, [event.target.name]: event.target.value });
    setError("");
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setIsLoading(true);
    setError("");

    // Backend expects password1 and password2
    const payload = {
      ...formData,
      password1: formData.password,
      password2: formData.password
    };
    // remove password field from payload to avoid confusion/errors if strict
    delete payload.password;

    try {
      await AuthService.register(payload);
      alert("Account created! Please log in.");
      navigate("/login");
    } catch (err) {
      console.error("Registration failed", err);
      const msg = err.response?.data?.email?.[0] ||
        err.response?.data?.username?.[0] ||
        err.response?.data?.password1?.[0] || // Check password1 error
        "Registration failed. Please try again.";
      setError(msg);
    } finally {
      setIsLoading(false);
    }
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

          {error && <div className="error-message" style={{ color: 'red', marginBottom: '10px' }}>{error}</div>}

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
          <button type="submit" disabled={isLoading}>
            {isLoading ? "Signing up..." : "Sign Up"}
          </button>

          <p className="auth-footer-text">
            Already have an account? <a href="/login">Log In</a>
          </p>
        </form>
      </div>
    </div>
  );
}

export default RegisterForm;