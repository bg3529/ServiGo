import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Auth.css";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    if (email) {
      alert("Reset link sent to " + email);
      setEmail("");
      navigate("/login");
    } else {
      alert("Please enter your email");
    }
  }

  return (
    <div className="auth-layout">
      <div className="auth-image-section">
        <img src="images/servigologo.png" alt="ServiGo Logo" />
      </div>

      <div className="auth-form-section">
        <form className="auth-form" onSubmit={handleSubmit}>
          <h2>Forgot Password?</h2>
          <p>Enter your email and we'll send you a link to reset your password</p>
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button type="submit">Send Reset Link</button>
          
          <p className="auth-footer-text">
            Remember your password? <a href="/login">Back to Login</a>
          </p>
        </form>
      </div>
    </div>
  );
}

export default ForgotPassword;