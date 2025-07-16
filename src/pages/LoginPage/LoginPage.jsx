import { useState } from 'react';
import { auth, provider } from "../../firebase";
import { signInWithPopup } from 'firebase/auth';
import { useAuth } from '../../features/Auth/useAuth';

import { Box, Checkbox, FormControlLabel } from '@mui/material';
import { Visibility, VisibilityOff, ArrowBack, ArrowForward, Mail, Lock } from '@mui/icons-material';
import { showSuccess, showError, showLoading, updateToast } from '../../utils/toastUtils';

import "./LoginPage.css";
import GoogleIcon from '../../assets/24px.svg';
import FaceIcon from '../../assets/F-32px.svg';
import { useNavigate } from 'react-router-dom';
import SigninPage from '../SigninPage/SigninPage';
import OtpModal from '../../components/OtpModal/OtpModal';

const LoginPage = ({accountAction}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [error, setError] = useState(null);
  const [switched, setSwitched] = useState(accountAction);
  const navigate = useNavigate();
  const { login, googleLogin } = useAuth();

  const [rememberMe, setRememberMe] = useState(false);
  const [showForgotOtpModal, setShowForgotOtpModal] = useState(false);

  const handleClick = () => {
    setSwitched(!switched);
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const handleGoogleLogin = async () => {
    const toastId = showLoading("Đăng nhập với Google...");
    try {
      const result = await signInWithPopup(auth, provider);

      if (result) {
        console.log("Login res", result);
        const response = await googleLogin(result.user.email, result.user.accessToken, rememberMe); 
      
        if(response.role) {
          updateToast(toastId, "success", "Đăng nhập Google thành công");
          setTimeout(() => {
            navigate(response.role === "Admin" ? "/AdminPage/Dashboard" : "/profile");
          }, 100);
        }
        else if (response.code === "ERR_NETWORK") { updateToast(toastId, "error", "Network Error. Please try again."); }
      }

    } catch (error) {
      console.error("Đăng nhập bằng Google thất bại:", error);
      updateToast(toastId, "error", "Đăng nhập bằng Google thất bại. Hãy thử lại.");
      setError("Đăng nhập thất bại. Hãy thử lại.");
    }
  };

  const handleNormalLogin = async (e) => {
    e.preventDefault();
    const toastId = showLoading("Đang đăng nhập...");
    try {
      setError("");
      const response = await login(email, password, rememberMe);
      if (response.role) {
        updateToast(toastId, "success", "Đăng nhập thành công");
        setTimeout(() => {
          navigate(response.role === "Admin" ? "/AdminPage/Dashboard" : "/profile");
        }, 100);
      }

      else if(response.code === "ERR_BAD_REQUEST") {
        updateToast(toastId, "error", response.response.data.message);
        console.log("Error Login:", response)
        setError(response.response.data.message);
      }

    } catch (error) {
      console.error("Login error:", error);
      updateToast(toastId, "error", "Network Error. Please try again.");
      setError("Đăng nhập thất bại. Hãy thử lại.");
    }
  };

  return (
    <>
    <div className='loginContainer'>
      <Box className={switched ? "signinBox" : "signinBox away"}>
        <SigninPage />
      </Box> 
        
      <Box className={switched ? "usernamePassLoginBox away" : "usernamePassLoginBox"}>
        <div className='loginLable'>
          Đăng nhập vào tài khoản của bạn
        </div>
        <form onSubmit={handleNormalLogin}>
          <div className="input-field">
            <label><Mail/> Địa chỉ email</label>
            <input
              className="input"
              type="email"
              placeholder="Nhập email của bạn"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="input-field">
            <label><Lock /> Mật khẩu</label>
            <div className="passInput">
              <input
                  className="input"
                  type={showPassword ? "text" : "password"}
                  placeholder="Nhập mật khẩu của bạn"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <div className={`passToggle ${showPassword ? 'hide' : 'show'}`} onClick={togglePasswordVisibility}>  
                  <Visibility className={showPassword ? 'show' : ''}/> <VisibilityOff className={showPassword ? '' : 'hide'}/>
                </div>
            </div>
          </div>
          {error && <p className="login-error-message">{error}</p>}
          <Box width="500px" height="20px" padding="0" display="flex" flexDirection="row" justifyContent="center" gap="200px" alignItems="center">
            <FormControlLabel 
              control={<Checkbox size="small" color="primary" checked={rememberMe} onChange={(e) => setRememberMe(e.target.checked)} />}
              label="Ghi nhớ đăng nhập"
            />
            <span className="forgot-password" onClick={() => setShowForgotOtpModal(true)}>
              Quên mật khẩu?
            </span>
          </Box>
          <button className='loginButton' type="submit">
            Đăng nhập <ArrowForward />
          </button>
        </form>
      </Box>
      <div className="account-seperation" style={{userSelect: 'none' }} >
        <div className='line' />Hoặc đăng nhập bằng<div className='line' />
      </div>
      <div className='loginMethods' >
        <button onClick={handleGoogleLogin} className='GoogleLoginButton'>
          <img src={GoogleIcon} alt='Google Icon' className='GGIcon' /> Google
        </button>
        {/* <button className='FaceLoginButton'>
          <img src={FaceIcon} alt='Face Icon' className='GGIcon' disabled={true} /> Facebook
        </button> */}
      </div>
      <div className="account-toggle" style={{userSelect: 'none' }} >
        {switched ?
          (<><div className='line' />Đã có tài khoản? <span onClick={handleClick} style={{cursor: 'pointer'}}>Đăng nhập tại đây</span><div className='line' /> </> )
            :
          (<><div className='line' />Không có tài khoản? <span onClick={handleClick} style={{cursor: 'pointer'}}>Đăng kí</span><div className='line' /> </> )
        }
      </div>

      <button className="back-btn" onClick={() => {navigate("/"); setEmail(null);}}>
        <ArrowBack />
      </button>
    </div>
    {showForgotOtpModal && (
      <OtpModal
        email={""}
        forgotPass={true}
        onClose={() => setShowForgotOtpModal(false)}
        onSuccess={() => {
          setShowForgotOtpModal(false);
          navigate("/login");
        }}
      />
    )}
    </>
  );
}

export default LoginPage;