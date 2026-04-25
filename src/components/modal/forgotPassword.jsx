import React, { useState, useEffect, useContext } from "react";
import Modal from "../common/modal";
import "../../assets/styles/modal.css";
import toast from "react-hot-toast";
import { useForgotPasswordMutation } from "../../hooks/auth/forgotPassword";
import { useLoginMutation } from "../../hooks/auth/login";
import api from "../../services/api";
import { AuthContext } from "../../features/auth/AuthProvider";


const ForgotPasswordModal = ({ isOpen, onClose }) => {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [resetToken, setResetToken] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const forgotPasswordMutation = useForgotPasswordMutation();
  const loginMutation = useLoginMutation();
  const { login } = useContext(AuthContext);

  useEffect(() => {
    if (isOpen) {
      setStep(1);
      setEmail("");
      setResetToken("");
      setNewPassword("");
      setConfirmPassword("");
    }
  }, [isOpen]);

  const handleNext = async () => {
    if (!email.trim()) {
      toast.error("Please enter your email");
      return;
    }
    
    try {
      // Step 1: Request reset token
      const response = await forgotPasswordMutation.mutateAsync({ email });
      if (response && response.data && response.data.resetToken) {
        setResetToken(response.data.resetToken);
        setStep(2);
      } else {
        toast.error("Failed to generate reset token.");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Email not found or error occurred");
    }
  };

  const handleConfirm = async () => {
    if (!newPassword || !confirmPassword) {
      toast.error("Please fill in all fields");
      return;
    }
    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    try {
      // Step 2: Reset password using the token
      const payload = {
        password: newPassword,
      };
      await api.post(`/auth/reset-password/${resetToken}`, payload);
      toast.success("Password reset successfully!");
      // Auto-login with new password
      try {
        const response = await loginMutation.mutateAsync({ email, password: newPassword });
        if (response?.success && response?.data?.accessToken && response?.data?.refreshToken) {
          await login({
            accessToken: response.data.accessToken,
            refreshToken: response.data.refreshToken,
          });
          toast.success("Logged in with new password!");
        }
      } catch (err) {
        // Login failed, but password reset succeeded
      }
      onClose();
    } catch (err) {
      toast.error("Failed to reset password. Please try again.");
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Reset Password"
      showCloseButton={true}
    >
      <div style={{ padding: "10px 0" }}>
        {step === 1 ? (
          <>
            <p style={{ margin: "0 0 10px 0", fontSize: "14px", color: "#666" }}>
              Enter your email address to reset your password.
            </p>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{
                width: "100%",
                padding: "10px",
                borderRadius: "6px",
                border: "1px solid #ccc",
                fontSize: "14px",
                boxSizing: "border-box",
              }}
            />
          </>
        ) : (
          <>
            <p style={{ margin: "0 0 10px 0", fontSize: "14px", color: "#666" }}>
              Enter your new password.
            </p>
            <input
              type="password"
              placeholder="New Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              style={{
                width: "100%",
                padding: "10px",
                borderRadius: "6px",
                border: "1px solid #ccc",
                fontSize: "14px",
                boxSizing: "border-box",
                marginBottom: "10px",
              }}
            />
            <input
              type="password"
              placeholder="Confirm New Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              style={{
                width: "100%",
                padding: "10px",
                borderRadius: "6px",
                border: "1px solid #ccc",
                fontSize: "14px",
                boxSizing: "border-box",
              }}
            />
          </>
        )}

        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            gap: "12px",
            marginTop: "24px",
            borderTop: "1px solid #e0e0e0",
            paddingTop: "20px",
          }}
        >
          {step === 1 ? (
            <>
              <button
                onClick={onClose}
                style={{
                  padding: "10px 24px",
                  border: "1px solid #e0e0e0",
                  borderRadius: "6px",
                  background: "white",
                  cursor: "pointer",
                  fontSize: "14px",
                  fontWeight: "500",
                  color: "#333",
                }}
              >
                Cancel
              </button>
              <button
                onClick={handleNext}
                disabled={forgotPasswordMutation.isPending}
                style={{
                  padding: "10px 24px",
                  border: "none",
                  borderRadius: "6px",
                  background: forgotPasswordMutation.isPending ? "#999" : "#28a745",
                  color: "white",
                  cursor: forgotPasswordMutation.isPending ? "not-allowed" : "pointer",
                  fontSize: "14px",
                  fontWeight: "500",
                }}
              >
                {forgotPasswordMutation.isPending ? "Sending..." : "Next"}
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => setStep(1)}
                style={{
                  padding: "10px 24px",
                  border: "1px solid #e0e0e0",
                  borderRadius: "6px",
                  background: "white",
                  cursor: "pointer",
                  fontSize: "14px",
                  fontWeight: "500",
                  color: "#333",
                }}
              >
                Back
              </button>
              <button
                onClick={handleConfirm}
                style={{
                  padding: "10px 24px",
                  border: "none",
                  borderRadius: "6px",
                  background: "#28a745",
                  color: "white",
                  cursor: "pointer",
                  fontSize: "14px",
                  fontWeight: "500",
                }}
              >
                Confirm
              </button>
            </>
          )}
        </div>
      </div>
    </Modal>
  );
};

export default ForgotPasswordModal;
