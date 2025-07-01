import { useEffect, useState } from 'react'
import { auth } from "../../firebase";
import { useAuth } from "../../features/Auth/useAuth"
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { showSuccess, showError, showLoading, updateToast } from '../../utils/toastUtils';

import "./LogoutButton.css"

export default function LogoutButton() {
  const [userType, setUserType] = useState("");
  const navigate = useNavigate();

  const { logout } = useAuth();

  useEffect(() => {
      const loginForm = sessionStorage.getItem("LoggedInAs") || localStorage.getItem("LoggedInAs");
  
      if (loginForm) {
        setUserType(loginForm);
      }
    }, []);
  
  const handleLogout = async () => {
    const toastId = showLoading("Đang đăng xuất...");
    try {
      if (userType === 'AccountIndex'){
        await logout();

        window.dispatchEvent(new Event("storage"));
        setTimeout(() => {
          navigate("/");
        }, 20);
        updateToast(toastId, "success", "Đăng xuất thành công.");
      }
      else {
        await logout();
        await signOut(auth);

        window.dispatchEvent(new Event("storage"));

        setTimeout(() => {
          navigate("/");
        }, 20);
        updateToast(toastId, "success", "Đăng xuất thành công.");
      }
    } catch (error) {
      updateToast(toastId, "error", "Something went wrong while logging out.");
      console.error("Logout Failed:", error);
    }
  };

  return (
    <button type="primary" onClick={handleLogout} className='logout-Btn'>Đăng xuất</button>
  )
}