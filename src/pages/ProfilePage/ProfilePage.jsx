import { useEffect, useState } from "react";
import { User, Mail, Shield, UserCheck, Crown } from "lucide-react";
import { useNavigate } from "react-router-dom";
import "./ProfilePage.css";
import BGImage from "../../components/BGImage/BGImage";
import axios from "axios";

export default function ProfilePage() {
  const [userProfile, setUserProfile] = useState({
    username: "",
    email: "",
    role: "",
    vipExpiration: "",
  });
  const navigate = useNavigate();
   const loadUserProfile = () => {
    const storedName = sessionStorage.getItem("username") || localStorage.getItem("username");
    const storedEmail = sessionStorage.getItem("email") || localStorage.getItem("email");
    const storedRole = sessionStorage.getItem("role") || localStorage.getItem("role");
    const vipExpirationDate = sessionStorage.getItem("VIPExperation") || localStorage.getItem("VIPExperation");
    setUserProfile({
      username: storedName || "Unknown",
      email: storedEmail || "Not Found",
      role: storedRole || "Undeserving",
      vipExpiration: vipExpirationDate,
    });
  };

  useEffect(() => {
    loadUserProfile();

    // Khi tab chuyển focus hoặc có sự kiện storage
    window.addEventListener("focus", loadUserProfile);
    window.addEventListener("storage", loadUserProfile);
    return () => {
      window.removeEventListener("focus", loadUserProfile);
      window.removeEventListener("storage", loadUserProfile);
    };
  }, []);

  useEffect(() => {
    const fetchProfileInterval = async () => {
      try {
        const response = await axios.get("https://skincareapp.somee.com/SkinCare/Profile", {
          withCredentials: true
        });
        if (response.data) {
          localStorage.setItem("VIPExperation", formatDate(response.data.vipExpirationDate) || "");
          loadUserProfile();
        }
      } catch (error) {
        console.error("Failed to fetch Profile interval.", error);
      }
    };

    fetchProfileInterval();
    const interval = setInterval(fetchProfileInterval, 30000);
    return () => clearInterval(interval);
  }, []);

  const formatDate = (isoString) => {
    if (!isoString) return ""; // Null or empty
    const date = new Date(isoString);
    if (isNaN(date)) return ""; // Invalid date
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };


  return (
    <div className="profilePage">
      <BGImage />

      <div className="profileContainer">
        <div className="profileCard">
          <div className="profileHeader">
            <div className="avatarContainer">
              <div className="avatar">
                <User />
              </div>
              {userProfile.vipExpiration && <Crown className="vipBadgeIcon"/>}
              <div className="statusBadge"></div>
            </div>
            <div className="userName">
              {userProfile.username || "Loading..."} {userProfile.vipExpiration && <div className="vipBadge">VIP</div>}
            </div>
            {userProfile.vipExpiration ?
            (<div className="vipExp paid">
              Hạn VIP: <span>{userProfile.vipExpiration || "Loading..."}</span>
            </div>) : (
            <div className="vipExp">
              Chưa kích hoạt VIP
            </div>)}
            <div className="userRole">{userProfile.role} - {userProfile.role === 'Admin' ? (<a className="dashBoardNav" onClick={() => navigate("/AdminPage/Dashboard")}>Dashboard</a>) : (<div>(Role)</div>)}</div>
          </div>

          <div className="profileDetails">
            <div className="detailItem">
              <UserCheck className="detailIcon" />
              <div className="detailContent">
                <div className="detailLabel">Tên</div>
                <div className="detailValue">{userProfile.username}</div>
              </div>
            </div>

            <div className="detailItem">
              <Mail className="detailIcon" />
              <div className="detailContent">
                <div className="detailLabel">Địa chỉ email</div>
                <div className="detailValue">{userProfile.email}</div>
              </div>
            </div>

            <div className="detailItem">
              <Shield className="detailIcon" />
              <div className="detailContent">
                <div className="detailLabel">Vai trò</div>
                <div className="detailValue">{userProfile.role}</div>
              </div>
            </div>
          </div>

          <div className="actionButtons">
            <button className="actionButton primaryButton" onClick={() => navigate("/editprofile")}>
              Cập nhật hồ sơ
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
