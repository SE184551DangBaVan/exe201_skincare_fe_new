import { useEffect, useState } from "react";
import { User, Eye, EyeOff, UploadCloud } from "lucide-react";
import { useNavigate } from "react-router-dom";
import "./EditProfilePage.css";
import BGImage from "../../components/BGImage/BGImage";
import axios from "axios";

export default function EditProfilePage() {
  const [userProfile, setUserProfile] = useState({
    username: "",
    email: "",
    role: "",
    avatar: "",
  });
  const [name, setName] = useState("");
  const [avatarPreview, setAvatarPreview] = useState("");
  const [saving, setSaving] = useState(false);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [avatarFile, setAvatarFile] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedName = sessionStorage.getItem("username") || localStorage.getItem("username");
    const storedEmail = sessionStorage.getItem("email") || localStorage.getItem("email");
    const storedRole = sessionStorage.getItem("role") || localStorage.getItem("role");
    const storedAvatar = sessionStorage.getItem("profilePicture") || localStorage.getItem("profilePicture");
    setUserProfile({
      username: storedName || "Test2",
      email: storedEmail || "pageco9516@endelite.com",
      role: storedRole || "User",
      avatar: storedAvatar || "",
    });
    setName(storedName || "Test2");
    setAvatarPreview(storedAvatar || "");
  }, []);

 const handleAvatarChange = (e) => {
  const file = e.target.files[0];
  if (file) {
    setAvatarPreview(URL.createObjectURL(file));
    setAvatarFile(file);
  }
};

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      if (oldPassword && newPassword) {
        await axios.put(
          "https://skincareapp.somee.com/SkinCare/Profile/password",
          {
            oldPassword,
            newPassword,
          },
          { withCredentials: true }
        );
      }

      const res = await axios.put(
        "https://skincareapp.somee.com/SkinCare/Profile",
        { name },
        { withCredentials: true }
      );

      if (res.data?.name) {
        sessionStorage.setItem("username", res.data.name);
        setUserProfile((prev) => ({ ...prev, username: res.data.name }));
        setName(res.data.name);
      } else {
        sessionStorage.setItem("username", name);
        setUserProfile((prev) => ({ ...prev, username: name }));
      }
      if (avatarFile) {
        const formData = new FormData();
        formData.append("ImageFile", avatarFile);

        const resAvatar = await axios.post(
          "https://skincareapp.somee.com/SkinCare/Profile/avatar",
          formData,
          {
            headers: { "Content-Type": "multipart/form-data" },
            withCredentials: true,
          }
        );
        if (resAvatar.data?.url) {
          localStorage.setItem("profilePicture", resAvatar.data.url);
          setAvatarPreview(resAvatar.data.url);
        }
      }

      navigate("/profile");
    } catch (error) {
      alert("Cập nhật thất bại!");
      console.error(error);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="profilePage">
      <BGImage />
      <div className="profileContainer">
        <div className="profileCard">
          {/* Header avatar + name */}
          <div className="profileHeader" style={{ flexDirection: "column", alignItems: "center", gap: 0 }}>
            <div className="avatarContainer" style={{ marginBottom: 24 }}>
              <label htmlFor="avatarUpload" className="avatar" style={{ cursor: "pointer" }}>
                {avatarPreview ? (
                  <img src={avatarPreview} alt="avatar" className="avatarImg" style={{ width: 120, height: 120, borderRadius: "50%", background: "#e5e5e5", boxShadow: "0 2px 16px #e6e7ea" }} />
                ) : (
                  <div style={{
                    width: 120, height: 120, borderRadius: "50%", background: "#7c68ee", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 2px 16px #e6e7ea"
                  }}>
                    <User color="#fff" size={62} />
                  </div>
                )}
               
              </label>
              <input id="avatarUpload" type="file" accept="image/*" style={{ display: "none" }} onChange={handleAvatarChange} />
                <div className="statusBadge"></div>
            </div>
            <div className="userName" style={{ fontSize: 32, fontWeight: 600, textAlign: "center", marginBottom: 6 }}>Cập nhật thông tin</div>
          </div>

          <form className="profileDetails" onSubmit={handleSave} style={{ background: "none", boxShadow: "none" }}>
            <div className="detailItem" style={{ border: "none", marginBottom: 10 }}>
              <User className="detailIcon" color="#7c68ee" />
              <div className="detailContent">
                <div className="detailLabel" style={{ color: "#a4a7b7", letterSpacing: 1, fontWeight: 600 }}>Tên</div>
                <input
                  className="editInput"
                  style={{ fontWeight: 700, fontSize: 18, textAlign: "left", border: "none", background: "none", color: "#2b3247" }}
                  type="text"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  placeholder="Username"
                />
              </div>
            </div>

            <div className="detailItem" style={{ border: "none", marginBottom: 10 }}>
              <Eye className="detailIcon" color="#7c68ee" />
              <div className="detailContent">
                <div className="detailLabel" style={{ color: "#a4a7b7", letterSpacing: 1, fontWeight: 600 }}>Mật khẩu cũ</div>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <input
                    className="editInput"
                    style={{ fontWeight: 700, fontSize: 18, textAlign: "left", border: "none", background: "none", color: "#2b3247" }}
                    type={showOldPassword ? "text" : "password"}
                    value={oldPassword}
                    onChange={e => setOldPassword(e.target.value)}
                    placeholder="Enter old password"
                  />
                  <span
                    style={{ marginLeft: 8, cursor: "pointer" }}
                    tabIndex={0}
                    role="button"
                    onClick={() => setShowOldPassword((v) => !v)}
                  >
                    {showOldPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </span>
                </div>
              </div>
            </div>

            <div className="detailItem" style={{ border: "none", marginBottom: 10 }}>
              <Eye className="detailIcon" color="#7c68ee" />
              <div className="detailContent">
                <div className="detailLabel" style={{ color: "#a4a7b7", letterSpacing: 1, fontWeight: 600 }}>Mật khẩu mới</div>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <input
                    className="editInput"
                    style={{ fontWeight: 700, fontSize: 18, textAlign: "left", border: "none", background: "none", color: "#2b3247" }}
                    type={showNewPassword ? "text" : "password"}
                    value={newPassword}
                    onChange={e => setNewPassword(e.target.value)}
                    placeholder="Enter new password"
                  />
                  <span
                    style={{ marginLeft: 8, cursor: "pointer" }}
                    tabIndex={0}
                    role="button"
                    onClick={() => setShowNewPassword((v) => !v)}
                  >
                    {showNewPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </span>
                </div>
              </div>
            </div>
  <div style={{ display: "flex", justifyContent: "center", margin: "18px 0 12px 0" }}>
    <label className="uploadAvatarBtn">
      <UploadCloud style={{ marginRight: 8 }} size={21} />
      Tải ảnh
      <input type="file" accept="image/*" style={{ display: "none" }} onChange={handleAvatarChange} />
    </label>
  </div>
            <div className="actionButtons" style={{ marginTop: 36, display: "flex", gap: 22 }}>
              <button type="submit" className="actionButton primaryButton" disabled={saving} style={{ fontWeight: 700, fontSize: 18, padding: "14px 0", background: "linear-gradient(90deg,#7c68ee,#6eb6fc)", border: "none" }}>
                {saving ? "Saving..." : "Lưu"}
              </button>
              <button type="button" className="actionButton secondaryButton" style={{ fontWeight: 700, fontSize: 18, padding: "14px 0", background: "#f6f7fa", border: "none", color: "#7c68ee" }} onClick={() => navigate("/profile")}>Hủy</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
