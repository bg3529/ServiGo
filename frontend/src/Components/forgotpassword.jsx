import React, { useState } from "react";
import { AuthService } from "../services/api";
import "./Auth.css";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    setError("");

    try {
      await AuthService.requestPasswordReset(email);
      setMessage("If an account exists with this email, you will receive a password reset link.");
    } catch (err) {
      setError("Failed to process request. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-layout">
      <div className="auth-image-section">
        <img src="images/servigologo.png" alt="logo" />
      </div>
      <div className="auth-form-section">
        <form className="auth-form" onSubmit={handleSubmit}>
          <h2>Forgot Password</h2>
          <p>Enter your email to receive a password reset link.</p>

          {message && <div className="success-message" style={{ color: 'green', marginBottom: '10px' }}>{message}</div>}
          {error && <div className="error-message" style={{ color: 'red', marginBottom: '10px' }}>{error}</div>}

          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button type="submit" disabled={loading}>
            {loading ? "Sending..." : "Send Reset Link"}
          </button>

          <p className="auth-footer-text">
            Remembered? <a href="/login">Log In</a>
          </p>
        </form>
      </div>
    </div>
  );
}

export default ForgotPassword;