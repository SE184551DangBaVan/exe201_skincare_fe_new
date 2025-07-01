import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Visibility, VisibilityOff, ArrowForward, Mail, Lock, Person } from '@mui/icons-material';
import { useAuth } from '../../features/Auth/useAuth';
import { signUp } from '../../features/Auth/signUp';
import { showSuccess, showError, showLoading, updateToast } from '../../utils/toastUtils'; // adjust path

import "../LoginPage/LoginPage.css";
import "./SigninPage.css";
import OtpModal from '../../components/OtpModal/OtpModal';

export default function SigninPage() {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);
  const [error, setError] = useState(null);
  
  const [showOtpModal, setShowOtpModal] = useState(false);

  const navigate = useNavigate();

  const togglePasswordVisibility = () => setShowPassword((prev) => !prev);
  const togglePasswordConfirmVisibility = () => setShowPasswordConfirm((prev) => !prev);

  const handleSignin = async (e) => {
    e.preventDefault();

    if (password !== passwordConfirm) {
      setError("Mật khẩu không khớp.");
      return;
    }

    const toastId = showLoading("Đang gửi mã OTP đến email...");

    try {
      setError("");
      const result = await signUp({
        email,
        password,
        name: userName
      });

      if (result.message == "Network Error") {
        updateToast(toastId, "error", "Network Error. Please try again.");
        setError("Network Error. Please try again later.");
      }
      else if (result.message == "Email đã tồn tại hoặc chưa xác thực OTP.") {
        updateToast(toastId, "error", result.message);
        setError(result.message);
      }

      updateToast(toastId, "success", "Vui lòng xác minh mã OTP đã được gửi đến email.");
      // Show OTP popup
      setShowOtpModal(true);
      // navigate("/login"); // Or auto-login or go to dashboard

    } catch (error) {
      updateToast(toastId, "error", "Failed to sign up.");
      setError("Failed to sign up. Please try again.");
    }
  };

  return (
    <>
      <div className='signinLable'>
        Tài khoản
        <span>Tạo thông tin đăng nhập cho tài khoản của bạn</span>
      </div>
      <form onSubmit={handleSignin} className='signInFrom1'>
        <div className="input-field">
          <label><Person /> Tên</label>
          <input type="text" className="input" placeholder="Nhập tên của bạn" value={userName} onChange={(e) => setUserName(e.target.value)} required />
        </div>
        <div className="input-field">
          <label><Mail /> Địa chỉ email</label>
          <input type="email" className="input" placeholder="Nhập địa chỉ email của bạn" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div className="input-field">
          <label><Lock /> Mật khẩu</label>
          <div className="passInput">
            <input type={showPassword ? "text" : "password"} className="input" placeholder="Nhập mật khẩu của bạn" value={password} onChange={(e) => setPassword(e.target.value)} required />
            <div className={`passToggle ${showPassword ? 'hide' : 'show'}`} onClick={togglePasswordVisibility}>
              <Visibility className={showPassword ? 'show' : ''} />
              <VisibilityOff className={showPassword ? '' : 'hide'} />
            </div>
          </div>
        </div>
        <div className="input-field">
          <label><Lock /> Xác nhận mật khẩu</label>
          <div className="passInput">
            <input type={showPasswordConfirm ? "text" : "password"} className="input" placeholder="Xác nhận mật khẩu" value={passwordConfirm} onChange={(e) => setPasswordConfirm(e.target.value)} required />
            <div className={`passToggle ${showPasswordConfirm ? 'hide' : 'show'}`} onClick={togglePasswordConfirmVisibility}>
              <Visibility className={showPasswordConfirm ? 'show' : ''} />
              <VisibilityOff className={showPasswordConfirm ? '' : 'hide'} />
            </div>
          </div>
        </div>
        {error && <p className="error-message">{error}</p>}
        <button className='loginButton' type="submit">
          Đăng nhập <ArrowForward />
        </button>
      </form>

      {showOtpModal && (
        <OtpModal
            email={email}
            forgotPass={false}
            onClose={() => setShowOtpModal(false)}
            onSuccess={() => {
            setShowOtpModal(false);
            navigate("/login");
            }}
        />
      )}
    </>
  );
}