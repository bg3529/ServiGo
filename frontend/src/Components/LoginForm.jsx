import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthService } from "../services/api";
import "./Auth.css";

function LoginForm({ onLoginSuccess }) {
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  function handleChange(event) {
    setLoginData({ ...loginData, [event.target.name]: event.target.value });
    setError(""); // Clear error on typing
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const data = await AuthService.login(loginData.email, loginData.password);
      // The backend response structure might vary, but usually contains user info + tokens
      // Assuming 'data' contains the user object or we reconstruct it
      const user = data.user || { email: loginData.email, ...data };

      onLoginSuccess(user);
      navigate("/home");
    } catch (err) {
      console.error("Login failed", err);
      // specific error message from backend
      const msg = err.response?.data?.detail || err.response?.data?.error || "Invalid email or password. Please try again.";
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
          <h2>Login</h2>
          <p>Welcome back! Please enter your details.</p>

          {error && <div className="error-message" style={{ color: 'red', marginBottom: '10px' }}>{error}</div>}

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
          <button type="submit" disabled={isLoading}>
            {isLoading ? "Logging in..." : "Login"}
          </button>

          <p className="auth-footer-text">
            Don't have an account? <a href="/register">Sign Up</a>
          </p>
        </form>
      </div>
    </div>
  );
}

export default LoginForm;