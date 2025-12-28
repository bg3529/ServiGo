import React, { useState } from "react";
import "./Auth.css";

function LoginForm() {
  const [loginData, setLoginData] = useState({ email: "", password: "" });

  function handleChange(event) {
    setLoginData({ ...loginData, [event.target.name]: event.target.value });
  }

  function handleSubmit(event) {
    event.preventDefault();
    alert("Login successful!");
  }

  return (
    <div className="auth-layout">
      <div className="auth-image-section">
        <img src="/assets/servigologo.png" alt="logo" />

      </div>
      <form className="auth-form" onSubmit={handleSubmit}>
        <h2>Login</h2>
        <input
          type="email"
          name="email"
          placeholder="Email"
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
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default LoginForm;