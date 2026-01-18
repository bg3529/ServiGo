import React, { useState } from "react";
import "./Auth.css"; 
import { useNavigate } from "react-router-dom";

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
      </form>
    </div>
  );
}

export default ForgotPassword;