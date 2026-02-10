import React, { useState } from "react";
import { AuthService } from "../services/api";
import toast from 'react-hot-toast';
import "./Auth.css";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [securityQuestion, setSecurityQuestion] = useState("");
  const [securityAnswer, setSecurityAnswer] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [resetTokens, setResetTokens] = useState({ uidb64: "", token: "" });
  const [step, setStep] = useState(1); // 1: Email, 2: Security Question, 3: New Password
  const [loading, setLoading] = useState(false);

  const handleFetchQuestion = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const data = await AuthService.getSecurityQuestion(email);
      setSecurityQuestion(data.question);
      setStep(2);
      toast.success("Security question retrieved.");
    } catch (err) {
      toast.error(err.response?.data?.error || "User not found or question not set.");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyAnswer = async (e) => {
    e.preventDefault();
    if (!securityAnswer) {
      toast.error("Please answer the security question.");
      return;
    }
    setLoading(true);
    try {
      const data = await AuthService.verifySecurityAnswer(email, securityAnswer);
      setResetTokens({ uidb64: data.uidb64, token: data.token });
      setStep(3);
      toast.success("Answer verified! Please set your new password.");
    } catch (err) {
      toast.error(err.response?.data?.error || "Incorrect answer.");
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }
    if (newPassword.length < 8) {
      toast.error("Password must be at least 8 characters.");
      return;
    }
    setLoading(true);
    try {
      await AuthService.confirmPasswordReset(resetTokens.uidb64, resetTokens.token, newPassword);
      toast.success("Password reset successfully! Redirecting to login...");
      setTimeout(() => window.location.href = "/login", 2000);
    } catch (err) {
      console.error("Password reset failed", err);
      const errorData = err.response?.data;
      if (errorData && typeof errorData === 'object') {
        const errorMessages = Object.entries(errorData).map(([key, value]) => {
          const fieldName = key.charAt(0).toUpperCase() + key.slice(1).replace('_', ' ');
          const message = Array.isArray(value) ? value[0] : value;
          return key === 'message' ? message : `${fieldName}: ${message}`;
        });

        if (errorMessages.length > 0) {
          toast.error(errorMessages[0]);
          console.log("Full error report:", errorMessages.join(", "));
        } else {
          toast.error("Failed to reset password. Please try again.");
        }
      } else {
        toast.error("An unexpected error occurred. Please try again later.");
      }
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
        <form className="auth-form" onSubmit={
          step === 1 ? handleFetchQuestion :
            step === 2 ? handleVerifyAnswer :
              handleResetPassword
        }>
          <h2>Forgot Password</h2>

          {step === 1 && (
            <>
              <p>Enter your email to retrieve your security question.</p>
              <input
                type="email"
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <button type="submit" disabled={loading}>
                {loading ? "Checking..." : "Verify Email"}
              </button>
            </>
          )}

          {step === 2 && (
            <>
              <p>Please answer your security question to continue.</p>
              <div className="security-question-box">
                <strong>Question:</strong> {securityQuestion}
              </div>
              <input
                type="text"
                placeholder="Your Answer"
                value={securityAnswer}
                onChange={(e) => setSecurityAnswer(e.target.value)}
                required
                autoFocus
              />
              <button type="submit" disabled={loading}>
                {loading ? "Verifying..." : "Confirm Answer"}
              </button>
              <button
                type="button"
                className="auth-back-btn"
                onClick={() => setStep(1)}
              >
                Back to Email
              </button>
            </>
          )}

          {step === 3 && (
            <>
              <p>Set a secure new password for your account.</p>
              <input
                type="password"
                placeholder="New Password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
                autoFocus
              />
              <input
                type="password"
                placeholder="Confirm New Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
              <button type="submit" disabled={loading}>
                {loading ? "Resetting..." : "Reset Password"}
              </button>
            </>
          )}

          <p className="auth-footer-text">
            Remembered? <a href="/login">Log In</a>
          </p>
        </form>
      </div>
    </div>
  );
}

export default ForgotPassword;