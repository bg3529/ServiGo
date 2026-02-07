import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AuthService } from "../services/api";
import toast from 'react-hot-toast';
import "./Auth.css";

export default function ResetPassword() {
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [loading, setLoading] = useState(false);

    // We expect the URL to be /reset-password/:uid/:token
    // But the backend view returns uidb64 and token.
    // The email link we generated is: /reset-password/{uidb64}/{token}
    const { uid, token } = useParams();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            toast.error("Passwords do not match");
            return;
        }

        if (password.length < 8) {
            toast.error("Password must be at least 8 characters");
            return;
        }

        setLoading(true);

        try {
            await AuthService.confirmPasswordReset(uid, token, password);
            toast.success("Password reset successful! Redirecting to login...");
            setTimeout(() => {
                navigate("/login");
            }, 2000);
        } catch (err) {
            console.error(err);
            toast.error("Failed to reset password. The link may be invalid or expired.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-layout">
            <div className="auth-image-section">
                <img src="/images/servigologo.png" alt="logo" />
            </div>
            <div className="auth-form-section">
                <form className="auth-form" onSubmit={handleSubmit}>
                    <h2>Reset Password</h2>
                    <p>Enter your new password below.</p>

                    <input
                        type="password"
                        placeholder="New Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
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
                </form>
            </div>
        </div>
    );
}
