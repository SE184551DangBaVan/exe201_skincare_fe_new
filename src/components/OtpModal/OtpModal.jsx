import { createPortal } from 'react-dom';
import { useState } from 'react';
import './OtpModal.css';
import axios from 'axios';

import { showSuccess, showError, showLoading, updateToast } from '../../utils/toastUtils.js';

export default function OtpModal({ email, forgotPass, onClose, onSuccess }) {
  const [otp, setOtp] = useState("");
  const [resetEmail, setResetEmail] = useState("");
  const [resetEmailConfirm, setResetEmailConfirm] = useState(false)
  const [newPassword, setNewPassword] = useState("");
  const [error, setError] = useState(null);
  const passRetrieve = forgotPass;

  const handleVerify = async () => {
    const toastId = showLoading("Verifying OTP...");
    try {
      const response = await fetch("https://skincareapp.somee.com/SkinCare/Auth/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to verify OTP");
      }
  
      updateToast(toastId, "success", "OTP Verified.");

      onSuccess();
    } catch (err) {
      updateToast(toastId, "error", "Failed to verify OTP.");
      setError(err.message || "Failed to verify OTP.");
    }
  };

  const handleForgot = async () => {
    const toastId = showLoading("Sending OTP...");
    setResetEmailConfirm(false);
    try {
      const response = await axios.post("https://skincareapp.somee.com/SkinCare/Auth/forgot-password",
        { email: resetEmail },
      );

      if (!response) {
        updateToast(toastId, "error", "Invalid Email or Account Not Found");
        throw new Error(data.message || "Invalid Email or Account Not Found");
      }

      else if (response) {
        updateToast(toastId, "success", "OTP sent to your email.");
        setResetEmailConfirm(true);

      }
      
    } catch (err) {
      setError(err.message || "Failed to reset password.");
    }
  };

  const handleReset = async () => {
    const toastId = showLoading("Verifying OTP...");
    try {
      const response = await axios.post("https://skincareapp.somee.com/SkinCare/Auth/verify-forgot-password",
        { email: resetEmail, otp, newPassword },
      );

      if (!response) {
        throw new Error(data.message || "Failed to verify OTP");
      }

      updateToast(toastId, "success", "Password reset successfully.");
      onSuccess();
    } catch (err) {
      updateToast(toastId, "error", "Invalid OTP. Failed to reset password.");
      setError(err.message || "Failed to verify OTP.");
    }
  };

  const modalContent = (
    <>
    {passRetrieve ? (
    <div className="otp-modal-overlay">
      <div className="otp-modal">
        <h3>Reset Password</h3>
        {resetEmailConfirm ? (
        <>
          <input
            type="email"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
          />
          <input className='seccondInput'
            type="text"
            placeholder="Enter New Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          {error && <p className="error-messages">{error}</p>}
          <div className="otp-actions">
            <button onClick={handleReset}>Confirm</button>
            <button className="cancel" onClick={onClose}>Cancel</button>
          </div>
        </>
        ) : (
        <>
          <input
            type="text"
            placeholder="Enter Email"
            value={resetEmail}
            onChange={(e) => setResetEmail(e.target.value)}
          />
          {error && <p className="error-messages">{error}</p>}
          <div className="otp-actions">
            <button onClick={handleForgot}>Send OTP</button>
            <button className="cancel" onClick={onClose}>Cancel</button>
          </div>
        </>)}
      </div>
    </div>
    ) : (
    <div className="otp-modal-overlay">
      <div className="otp-modal">
        <h3>Verify OTP</h3>
        <p>We’ve sent a code to: <b>{email}</b></p>
        <input
          type="text"
          placeholder="Enter OTP"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
        />
        {error && <p className="error-messages">{error}</p>}
        <div className="otp-actions">
          <button onClick={handleVerify}>Verify</button>
          <button className="cancel" onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>)}
    </>
  );

  return createPortal(modalContent, document.getElementById("modal-root"));
}
