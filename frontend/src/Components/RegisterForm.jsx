import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthService } from "../services/api";
import toast from 'react-hot-toast';
import "./Auth.css";

function RegisterForm() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    full_name: "",
    phone: "",
    address: "",
    security_question: "",
    security_answer: ""
  });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  function handleChange(event) {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setIsLoading(true);

    if (!formData.security_question) {
      toast.error("Please select a security question");
      setIsLoading(false);
      return;
    }

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
      toast.success("Account created successfully! Please log in.");
      navigate("/login");
    } catch (err) {
      console.error("Registration failed", err);

      const errorData = err.response?.data;
      if (errorData && typeof errorData === 'object') {
        // Extract all error messages
        const errorMessages = Object.entries(errorData).map(([key, value]) => {
          const fieldName = key.charAt(0).toUpperCase() + key.slice(1).replace('_', ' ');
          const message = Array.isArray(value) ? value[0] : value;
          return `${fieldName}: ${message}`;
        });

        if (errorMessages.length > 0) {
          toast.error(errorMessages[0]); // Show the first error in a toast
          console.log("Full error report:", errorMessages.join(", "));
        } else {
          toast.error("Registration failed. Please check your information.");
        }
      } else {
        toast.error("An unexpected error occurred. Please try again later.");
      }
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

          <input
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="full_name"
            placeholder="Full Name"
            value={formData.full_name}
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
            type="text"
            name="phone"
            placeholder="Phone Number"
            value={formData.phone}
            onChange={handleChange}
          />
          <input
            type="text"
            name="address"
            placeholder="Address"
            value={formData.address}
            onChange={handleChange}
          />
          <select
            name="security_question"
            value={formData.security_question}
            onChange={handleChange}
            required
          >
            <option value="" disabled>Select a Security Question</option>
            <option value="mother_maiden">What is your mother's maiden name?</option>
            <option value="first_pet">What was the name of your first pet?</option>
            <option value="first_school">What was the name of your first school?</option>
            <option value="birth_city">In what city were you born?</option>
            <option value="favorite_book">What is your favorite book?</option>
          </select>
          <input
            type="text"
            name="security_answer"
            placeholder="Answer to Security Question"
            value={formData.security_answer}
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