import React, { useState, useEffect, useRef } from "react";
import {
  Upload,
  Camera,
  Clock,
  Sun,
  Moon,
  Star,
  CalendarDays,
  X,
  Crown,
  CreditCard,
} from "lucide-react";
import "./AIConsultation.css";
import { useNavigate } from "react-router-dom";

const AIConsultation = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState(null);
  const [error, setError] = useState(null);
  const [preview, setPreview] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [checkingAuth, setCheckingAuth] = useState(true);
  const [uploadMode, setUploadMode] = useState("file");
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [stream, setStream] = useState(null);
  const [showVipPopup, setShowVipPopup] = useState(false);
  const [userProfile, setUserProfile] = useState(null);

  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const navigate = useNavigate();

  const navigateToSchedule = () => {
    navigate("/schedule");
  };

  const navigateToPurchase = () => {
    navigate("/VIP-purchase");
  };

  const closeVipPopup = () => {
    setShowVipPopup(false);
    navigate("/schedule");
  };

  useEffect(() => {
    if (isCameraOpen && stream && videoRef.current) {
      videoRef.current.srcObject = stream;
      videoRef.current.play();
    }
  }, [isCameraOpen, stream]);

  // Kiểm tra trạng thái đăng nhập
  useEffect(() => {
    const checkAuthentication = () => {
      const username =
        sessionStorage.getItem("username") || localStorage.getItem("username");
      const email =
        sessionStorage.getItem("email") || localStorage.getItem("email");

      if (username && email) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
      setCheckingAuth(false);
    };

    checkAuthentication();
  }, []);

  // Kiểm tra trạng thái VIP sau khi đã authenticate
  useEffect(() => {
    const checkVipStatus = async () => {
      if (isAuthenticated && !checkingAuth) {
        try {
          const response = await fetch(
            "https://skincareapp.somee.com/SkinCare/Profile",
            {
              method: "GET",
              credentials: "include",
            }
          );

          if (response.ok) {
            const profileData = await response.json();
            setUserProfile(profileData);

            // Nếu vipExpirationDate là null thì hiển thị popup
            if (profileData.vipExpirationDate === null) {
              setShowVipPopup(true);
            }
          }
        } catch (error) {
          console.error("Error checking VIP status:", error);
        }
      }
    };

    checkVipStatus();
  }, [isAuthenticated, checkingAuth]);

  // Cleanup camera stream when component unmounts
  useEffect(() => {
    return () => {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, [stream]);

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
      setError(null);

      // Create preview
      const reader = new FileReader();
      reader.onload = (e) => setPreview(e.target.result);
      reader.readAsDataURL(file);
    }
  };

  const openCamera = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: {
          width: 700,
          height: 550,
          facingMode: "user",
        },
      });
      setStream(mediaStream);
      setIsCameraOpen(true);
    } catch (err) {
      console.log("Camera access error:", err);
      setError("Không thể truy cập camera. Vui lòng kiểm tra quyền truy cập.");
    }
  };

  const closeCamera = () => {
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
      setStream(null);
    }
    setIsCameraOpen(false);
  };

  const capturePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      const context = canvas.getContext("2d");

      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;

      context.drawImage(video, 0, 0);

      canvas.toBlob(
        (blob) => {
          const file = new File([blob], "captured-photo.jpg", {
            type: "image/jpeg",
          });
          setSelectedFile(file);
          setPreview(canvas.toDataURL());
          closeCamera();
          setError(null);
        },
        "image/jpeg",
        0.8
      );
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      setError("Vui lòng chọn ảnh trước khi phân tích");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append("Image", selectedFile);

      const response = await fetch(
        "https://skincareapp.somee.com/SkinCare/Routine/create",
        {
          method: "POST",
          body: formData,
          credentials: "include",
        }
      );

      if (!response.ok) {
        if (response.status === 401) {
          throw new Error("Bạn cần đăng nhập để sử dụng tính năng này");
        }
        const errorData = await response.json().catch(() => null);
        throw new Error(
          `${errorData?.message || "Có lỗi xảy ra khi phân tích ảnh"}`
        );
      }

      const responseData = await response.json();
      setResults(responseData.data); // Lấy data từ response
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const ProductCard = ({ product, timeIcon: TimeIcon }) => (
    <div className="product-card">
      <div className="product-image-container">
        <img
          src={product.imageLink}
          alt={product.name}
          className="product-image"
        />
        <div className="product-overlay"></div>
      </div>

      <div className="product-content">
        <h3 className="product-title">{product.name}</h3>

        <div className="product-categories">
          {product.categories.map((category, index) => (
            <span key={index} className="category-tag">
              {category}
            </span>
          ))}
        </div>
      </div>
    </div>
  );

  const TimeSection = ({
    title,
    products,
    icon: Icon,
    color,
    bgGradient,
    iconColor,
  }) => (
    <div className={`time-section ${bgGradient}`}>
      <div className="section-header">
        <div className={`section-icon ${iconColor}`}>
          <Icon size={28} />
        </div>
        <div className="section-info">
          <h2 className={`section-title ${color}`}>{title}</h2>
          <p className="section-subtitle">
            Quy trình chăm sóc da chuyên nghiệp
          </p>
        </div>
      </div>

      <div className="products-grid">
        {products.map((product) => (
          <ProductCard
            key={product.productId}
            product={product}
            timeIcon={Icon}
            timeColor={iconColor}
          />
        ))}
      </div>
    </div>
  );

  return (
    <div className="main-container">
      {/* Background Decorations */}
      <div className="bg-decorations">
        <div className="bg-decoration bg-decoration-1"></div>
        <div className="bg-decoration bg-decoration-2"></div>
        <div className="bg-decoration bg-decoration-3"></div>
      </div>

      {/* Header */}
      <div className="header">
        <div className="header-bg"></div>
        <div className="header-content">
          <div className="header-main">
            <div className="header-icon">
              <Star size={40} />
            </div>
            <div className="header-text">
              <h1 className="header-title">AI Skincare Consultation</h1>
              <p className="header-subtitle">
                Phân tích da thông minh • Tư vấn chăm sóc cá nhân hóa
              </p>
            </div>
          </div>

          {/* Features */}
          <div className="header-features">
            <div className="feature-item">
              <span className="feature-emoji">⚡</span>
              <span className="feature-text">Phân tích nhanh</span>
            </div>
            <div className="feature-item">
              <span className="feature-emoji">🛡️</span>
              <span className="feature-text">An toàn 100%</span>
            </div>
            <div className="feature-item">
              <span className="feature-emoji">🏆</span>
              <span className="feature-text">Độ chính xác cao</span>
            </div>
          </div>
        </div>
      </div>

      {/* Camera Modal */}
      {isCameraOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h3 className="modal-title">Chụp ảnh khuôn mặt</h3>
              <button onClick={closeCamera} className="modal-close">
                <X size={24} />
              </button>
            </div>

            <div className="modal-video-container">
              <video
                ref={videoRef}
                autoPlay
                muted
                playsInline
                className="modal-video"
              />
              <div className="video-overlay"></div>
            </div>

            <div className="modal-actions">
              <button onClick={capturePhoto} className="capture-btn">
                <Camera size={20} />
                Chụp ảnh
              </button>
              <button onClick={closeCamera} className="cancel-btn">
                Hủy
              </button>
            </div>
          </div>
        </div>
      )}

      {/* VIP Popup Modal */}
      {showVipPopup && (
        <div className="modal-overlay">
          <div className="modal-content vip-modal">
            <div className="modal-header">
              <h3 className="modal-title vip-title">
                <Crown size={24} />
                Nâng cấp VIP
              </h3>
            </div>

            <div className="vip-modal-body">
              <div className="vip-icon-container">
                <div className="vip-icon-large">
                  <Crown size={64} />
                </div>
              </div>

              <h4 className="vip-modal-subtitle">Bạn chưa có gói VIP</h4>

              <p className="vip-modal-description">
                Nâng cấp lên VIP để trải nghiệm đầy đủ các tính năng premium của
                ứng dụng chăm sóc da thông minh
              </p>

              <div className="vip-features">
                <div className="vip-feature-item">
                  <span className="vip-feature-icon">✨</span>
                  <span>Phân tích da chuyên sâu</span>
                </div>
                <div className="vip-feature-item">
                  <span className="vip-feature-icon">🎯</span>
                  <span>Lời khuyên cá nhân hóa</span>
                </div>
                <div className="vip-feature-item">
                  <span className="vip-feature-icon">📅</span>
                  <span>Lịch trình chăm sóc chi tiết</span>
                </div>
                <div className="vip-feature-item">
                  <span className="vip-feature-icon">🏆</span>
                  <span>Ưu tiên hỗ trợ 24/7</span>
                </div>
              </div>
            </div>

            <div className="vip-modal-actions">
              <button onClick={navigateToPurchase} className="vip-upgrade-btn">
                <CreditCard size={20} />
                Nâng cấp VIP ngay
              </button>
              <button onClick={closeVipPopup} className="vip-later-btn">
                Để sau
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Hidden canvas for photo capture */}
      <canvas ref={canvasRef} style={{ display: "none" }} />

      <div className="container">
        {checkingAuth ? (
          /* Loading Authentication Check */
          <div className="loading-container">
            <div className="card">
              <div className="loading-spinner">
                <div className="spinner"></div>
                <div className="loading-bg"></div>
              </div>
              <p className="loading-text">
                Đang kiểm tra trạng thái đăng nhập...
              </p>
            </div>
          </div>
        ) : !isAuthenticated ? (
          /* Not Authenticated */
          <div className="auth-container">
            <div className="card">
              <div className="auth-icon">🔐</div>
              <h2 className="auth-title">Yêu cầu đăng nhập</h2>
              <p className="auth-description">
                Bạn cần đăng nhập để sử dụng tính năng AI phân tích da chuyên
                nghiệp
              </p>
              <button
                onClick={() => (window.location.href = "/login")}
                className="btn-primary"
              >
                Đăng nhập ngay
              </button>
            </div>
          </div>
        ) : !results ? (
          /* Upload Section */
          <div className="upload-container">
            <div className="card">
              <div className="upload-header">
                <div className="upload-icon">
                  <Camera size={40} />
                </div>
                <h2 className="upload-title">Tải ảnh khuôn mặt của bạn</h2>
                <p className="upload-description">
                  AI sẽ phân tích làn da của bạn và đưa ra lời khuyên chăm sóc
                  da cá nhân hóa dựa trên tình trạng da hiện tại
                </p>
              </div>

              {/* Upload Mode Selector */}
              <div className="mode-selector">
                <div className="mode-container">
                  <button
                    onClick={() => setUploadMode("file")}
                    className={`mode-btn ${
                      uploadMode === "file" ? "active" : "inactive"
                    }`}
                  >
                    <Upload size={20} />
                    Tải từ thiết bị
                  </button>
                  <button
                    onClick={() => setUploadMode("camera")}
                    className={`mode-btn ${
                      uploadMode === "camera" ? "active" : "inactive"
                    }`}
                  >
                    <Camera size={20} />
                    Chụp trực tiếp
                  </button>
                </div>
              </div>

              {/* File Upload Area */}
              {uploadMode === "file" && (
                <div className="upload-area">
                  <label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileSelect}
                      className="file-input"
                    />
                    <div
                      className={`drop-zone ${selectedFile ? "has-file" : ""}`}
                    >
                      {preview ? (
                        <div className="preview-container">
                          <div className="preview-image-wrapper">
                            <img
                              src={preview}
                              alt="Preview"
                              className="preview-image"
                            />
                            <div className="preview-overlay"></div>
                          </div>
                          <p className="preview-text">
                            ✓ Ảnh đã được chọn: {selectedFile?.name}
                          </p>
                        </div>
                      ) : (
                        <div className="upload-placeholder">
                          <div className="upload-icon-large">
                            <Upload size={64} />
                            <div className="upload-icon-bg"></div>
                          </div>
                          <div>
                            <p className="upload-text-large">
                              Chọn ảnh hoặc kéo thả vào đây
                            </p>
                            <p className="upload-text-small">
                              Hỗ trợ JPG, PNG (tối đa 10MB) • Chất lượng cao cho
                              kết quả tốt nhất
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  </label>
                </div>
              )}

              {/* Camera Capture Area */}
              {uploadMode === "camera" && (
                <div className="camera-area">
                  <div className="camera-placeholder">
                    {preview ? (
                      <div className="preview-container">
                        <div className="preview-image-wrapper">
                          <img
                            src={preview}
                            alt="Captured"
                            className="preview-image"
                          />
                        </div>
                        <p className="preview-text">
                          ✓ Ảnh đã được chụp thành công
                        </p>
                        <button
                          onClick={() => {
                            setPreview(null);
                            setSelectedFile(null);
                          }}
                          className="retake-btn"
                        >
                          <span>🔄</span>
                          Chụp lại
                        </button>
                      </div>
                    ) : (
                      <div className="upload-placeholder">
                        <div className="upload-icon-large">
                          <Camera size={64} />
                          <div className="upload-icon-bg"></div>
                        </div>
                        <div>
                          <p className="upload-text-large">
                            Chụp ảnh khuôn mặt trực tiếp
                          </p>
                          <p
                            className="upload-text-small"
                            style={{ marginBottom: "24px" }}
                          >
                            Nhấn nút bên dưới để mở camera và chụp ảnh
                          </p>
                          <button onClick={openCamera} className="camera-btn">
                            <Camera size={20} />
                            Mở camera
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Error Message */}
              {error && (
                <div className="error-message">
                  <p className="error-text">{error}</p>
                </div>
              )}

              {/* Upload Button */}
              <button
                onClick={handleUpload}
                disabled={loading || !selectedFile}
                className={`upload-btn ${
                  loading || !selectedFile ? "disabled" : "enabled"
                }`}
              >
                {loading ? (
                  <div className="upload-btn-content">
                    <div className="spinner-small"></div>
                    Đang phân tích, vui lòng đợi...
                  </div>
                ) : (
                  <div className="upload-btn-content">
                    <Star size={24} />
                    Bắt đầu phân tích
                  </div>
                )}
              </button>
            </div>
          </div>
        ) : (
          /* Results Section */
          <div className="results-container">
            {/* Advice Section */}
            <div className="advice-section">
              <div className="advice-header">
                <div className="advice-icon">
                  <Star size={32} />
                </div>
                <div className="advice-info">
                  <h2>Lời khuyên chuyên gia</h2>
                  <p>Được phân tích bởi AI chuyên nghiệp</p>
                </div>
              </div>
              <div className="advice-content">
                <p className="advice-text">{results.advice}</p>
              </div>
            </div>

            {/* Morning Routine */}
            {results.morning && results.morning.length > 0 && (
              <TimeSection
                title="Buổi sáng"
                products={results.morning}
                icon={Sun}
                color="morning"
                bgGradient="morning"
                iconColor="morning"
              />
            )}

            {/* Noon Routine */}
            {results.noon && results.noon.length > 0 && (
              <TimeSection
                title="Buổi trưa"
                products={results.noon}
                icon={Clock}
                color="noon"
                bgGradient="noon"
                iconColor="noon"
              />
            )}

            {/* Evening Routine */}
            {results.evening && results.evening.length > 0 && (
              <TimeSection
                title="Buổi chiều"
                products={results.evening}
                icon={Sun}
                color="evening"
                bgGradient="evening"
                iconColor="evening"
              />
            )}

            {/* Night Routine */}
            {results.night && results.night.length > 0 && (
              <TimeSection
                title="Buổi tối"
                products={results.night}
                icon={Moon}
                color="night"
                bgGradient="night"
                iconColor="night"
              />
            )}

            {/* New Analysis Button */}
            <div className="new-analysis-container">
              <button
                onClick={() => {
                  setResults(null);
                  setSelectedFile(null);
                  setPreview(null);
                  setError(null);
                  setUploadMode("file");
                }}
                className="new-analysis-btn"
              >
                <Camera size={24} />
                Phân tích ảnh mới
              </button>
              <button
                onClick={() => navigateToSchedule()}
                className="new-analysis-btn"
              >
                <CalendarDays size={24} />
                Xem lịch trình
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AIConsultation;
