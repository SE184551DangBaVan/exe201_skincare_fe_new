import React, { useState, useEffect } from "react";
import "./SkincareSchedule.css";
import { showLoading, updateToast } from "../../utils/toastUtils";
import { useNavigate } from "react-router-dom";
import AIConsultation from "../Consultation/AIConsultation";

const SkincareSchedule = () => {
  const [routine, setRoutine] = useState(null);
  const [weekProgress, setWeekProgress] = useState([]);
  const [dailyRoutines, setDailyRoutines] = useState({});
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
  const handleNavigate = () => {
    navigate("/consultation");
  };

  // Get current week dates
  const getCurrentWeekDates = () => {
    const today = new Date();
    const currentDay = today.getDay();
    const monday = new Date(today);
    monday.setDate(today.getDate() - currentDay + 1);

    const weekDates = [];
    for (let i = 0; i < 7; i++) {
      const date = new Date(monday);
      date.setDate(monday.getDate() + i);
      weekDates.push(date);
    }
    return weekDates;
  };

  const weekDates = getCurrentWeekDates();
  const dayNames = ["Thứ 2", "Thứ 3", "Thứ 4", "Thứ 5", "Thứ 6", "Thứ 7", "CN"];

  const CheckIcon = ({ size = 24 }) => (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <polyline points="20,6 9,17 4,12" />
    </svg>
  );

  const CalendarIcon = ({ size = 24 }) => (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
    </svg>
  );

  const StarIcon = ({ size = 24 }) => (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
    </svg>
  );

  const RefreshIcon = ({ size = 24 }) => (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <polyline points="23,4 23,10 17,10" />
      <polyline points="1,20 1,14 7,14" />
      <path d="M20.49,9A9,9,0,0,0,5.64,5.64L1,10m22,4-4.64,4.36A9,9,0,0,1,3.51,15" />
    </svg>
  );

  // Fetch current routine
  const fetchRoutine = async () => {
    try {
      const response = await fetch(
        "https://skincareapp.somee.com/SkinCare/Routine/current",
        {
          credentials: "include",
        }
      );
      if (response.ok) {
        const data = await response.json();
        setRoutine(data.data);
      }
    } catch (error) {
      console.error("Error fetching routine:", error);
    }
  };

  // Fetch week progress
  const fetchWeekProgress = async () => {
    try {
      const response = await fetch(
        "https://skincareapp.somee.com/SkinCare/Routine/progress/week",
        {
          credentials: "include",
        }
      );
      if (response.ok) {
        const data = await response.json();
        setWeekProgress(data.data);
      }
    } catch (error) {
      console.error("Error fetching week progress:", error);
    }
  };

  // Fetch daily routine cho một ngày cụ thể
  const fetchDailyRoutine = async (date) => {
    try {
      const dateString = date.toISOString().split("T")[0];
      const response = await fetch(
        `https://skincareapp.somee.com/SkinCare/Routine/daily?date=${dateString}`,
        {
          credentials: "include",
        }
      );
      if (response.ok) {
        const data = await response.json();
        return { dateString, data: data.data };
      }
    } catch (error) {
      console.error(`Error fetching daily routine for ${date}:`, error);
    }
    return null;
  };

  // Fetch daily routines cho cả tuần
  const fetchAllDailyRoutines = async () => {
    try {
      const promises = weekDates.map((date) => fetchDailyRoutine(date));
      const results = await Promise.all(promises);

      const dailyData = {};
      results.forEach((result) => {
        if (result) {
          dailyData[result.dateString] = result.data;
        }
      });

      setDailyRoutines(dailyData);
    } catch (error) {
      console.error("Error fetching all daily routines:", error);
    }
  };

  // Check product usage
  const checkProduct = async (productId, session, usageDate) => {
    const toastId = showLoading("Đang đánh dấu sản phẩm...");
    try {
      const response = await fetch(
        "https://skincareapp.somee.com/SkinCare/Routine/check",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            routineId: routine.routineId,
            productId: productId,
            session: session,
            usageDate: usageDate,
            isChecked: true,
          }),
        }
      );

      if (response.ok) {
        // Refresh data sau khi check
        await Promise.all([fetchWeekProgress(), fetchAllDailyRoutines()]);
        updateToast(toastId, "success", "Đánh dấu sản phẩm thành công!");
      } else {
        updateToast(toastId, "error", "Có lỗi khi đánh dấu sản phẩm!");
      }
    } catch (error) {
      console.error("Error checking product:", error);
      updateToast(toastId, "error", "Không thể kết nối tới server!");
    }
  };

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      await Promise.all([
        fetchRoutine(),
        fetchWeekProgress(),
        fetchAllDailyRoutines(),
      ]);
      setLoading(false);
    };
    loadData();
  }, []);

  // Get session number for API
  const getSessionNumber = (timeOfDay) => {
    switch (timeOfDay) {
      case "morning":
        return 0;
      case "noon":
        return 1;
      case "night":
        return 2;
      default:
        return 0;
    }
  };

  // Get progress for specific date
  const getProgressForDate = (date) => {
    const dateString = date.toISOString().split("T")[0];
    const dailyData = dailyRoutines[dateString];

    if (dailyData) {
      return {
        total: dailyData.total,
        checked: dailyData.checked,
        percent: dailyData.percent,
      };
    }

    // Fallback to week progress if daily data not available
    return (
      weekProgress.find(
        (p) => new Date(p.usageDate).toISOString().split("T")[0] === dateString
      ) || { total: 0, checked: 0, percent: 0 }
    );
  };

  // Check if product is checked từ API data
  const isProductChecked = (productId, timeOfDay, date) => {
    const dateString = date.toISOString().split("T")[0];
    const dailyData = dailyRoutines[dateString];

    if (!dailyData || !dailyData[timeOfDay]) {
      return false;
    }

    const product = dailyData[timeOfDay].find((p) => p.productId === productId);
    return product ? product.isChecked : false;
  };

  // Get products for specific date and session
  const getProductsForSession = (timeOfDay, date) => {
    const dateString = date.toISOString().split("T")[0];
    const dailyData = dailyRoutines[dateString];

    if (dailyData && dailyData[timeOfDay]) {
      return dailyData[timeOfDay];
    }

    // Fallback to routine data if daily data not available
    return routine[timeOfDay] || [];
  };

  const ProductCell = ({ timeOfDay, date }) => {
    const session = getSessionNumber(timeOfDay);
    const products = getProductsForSession(timeOfDay, date);

    return (
      <td className="schedule-cell">
        <div className="cell-content">
          {products.map((product, index) => {
            const isChecked = isProductChecked(
              product.productId,
              timeOfDay,
              date
            );
            return (
              <div
                key={`${product.productId}-${index}`}
                className={`product-item ${isChecked ? "checked" : ""}`}
                onClick={() =>
                  !isChecked &&
                  checkProduct(product.productId, session, date.toISOString())
                }
              >
                <div className="product-image-wrapper">
                  <img
                    src={product.imageLink}
                    alt={product.name}
                    className="product-thumbnail"
                  />
                  {isChecked && (
                    <div className="check-overlay">
                      <CheckIcon size={14} />
                    </div>
                  )}
                </div>
                <div className="product-info">
                  <div className="product-name">{product.name}</div>
                  <div className="product-categories">
                    {product.categories.map((cat, idx) => (
                      <span key={idx} className="category-badge">
                        {cat}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </td>
    );
  };

  if (loading) {
    return (
      <div className="schedule-container">
        <div className="loading-section">
          <div className="loading-spinner">
            <RefreshIcon size={48} />
          </div>
          <p className="loading-text">Đang tải thời khóa biểu...</p>
        </div>
      </div>
    );
  }

  if (!routine) {
    return (
      <div className="schedule-container">
        <div className="no-routine-section">
          <div className="no-routine-icon">
            <StarIcon size={64} />
          </div>
          <h2 className="no-routine-title">Chưa có thời khóa biểu</h2>
          <p className="no-routine-description">
            Vui lòng tạo routine skincare để xem thời khóa biểu
          </p>
          <button className="create-routine-btn" onClick={handleNavigate}>
            Tạo routine ngay
          </button>
        </div>
        <div className="maskModal"></div>
        <AIConsultation />
      </div>
    );
  }

  return (
    <div className="schedule-container">
      {/* Header */}
      <div className="schedule-header">
        <div className="header-content">
          <div className="header-main">
            <div className="header-icon">
              <CalendarIcon size={40} />
            </div>
            <div>
              <h1 className="header-title">Thời khóa biểu Skincare</h1>
              <p className="header-subtitle">
                Theo dõi routine chăm sóc da hàng ngày
              </p>
            </div>
          </div>

          {/* Weekly Stats */}
          <div className="weekly-stats">
            {weekDates.map((date, index) => {
              const progress = getProgressForDate(date);
              return (
                <div key={index} className="day-stat">
                  <div className="day-name">{dayNames[index]}</div>
                  <div className="progress-circle">
                    <svg viewBox="0 0 36 36">
                      <path
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        fill="none"
                        stroke="rgba(255,255,255,0.3)"
                        strokeWidth="2"
                      />
                      <path
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        fill="none"
                        stroke="#4ADE80"
                        strokeWidth="2"
                        strokeDasharray={`${progress.percent}, 100`}
                      />
                    </svg>
                    <div className="progress-text">{progress.percent}%</div>
                  </div>
                  <div className="day-stats">
                    {progress.checked}/{progress.total}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Schedule Table */}
      <div className="schedule-content">
        <div className="schedule-table-container">
          <table className="schedule-table">
            <thead>
              <tr>
                <th className="time-header">Thời gian</th>
                {weekDates.map((date, index) => (
                  <th key={index} className="date-header">
                    <div className="date-content">
                      <span className="day-name">{dayNames[index]}</span>
                      <span className="date-number">
                        {date.getDate()}/{date.getMonth() + 1}
                      </span>
                      <div className="day-progress">
                        {(() => {
                          const progress = getProgressForDate(date);
                          return `${progress.checked}/${progress.total}`;
                        })()}
                      </div>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {/* Morning */}
              <tr className="time-row">
                <td className="time-cell morning">
                  <div className="time-content">
                    <div className="time-info">
                      <div className="time-label">Buổi sáng</div>
                    </div>
                  </div>
                </td>
                {weekDates.map((date, index) => (
                  <ProductCell
                    key={`morning-${index}`}
                    timeOfDay="morning"
                    date={date}
                  />
                ))}
              </tr>

              {/* Noon */}
              <tr className="time-row">
                <td className="time-cell noon">
                  <div className="time-content">
                    <div className="time-info">
                      <div className="time-label">Buổi trưa</div>
                    </div>
                  </div>
                </td>
                {weekDates.map((date, index) => (
                  <ProductCell
                    key={`noon-${index}`}
                    timeOfDay="noon"
                    date={date}
                  />
                ))}
              </tr>

              {/* Night */}
              <tr className="time-row">
                <td className="time-cell night">
                  <div className="time-content">
                    <div className="time-info">
                      <div className="time-label">Buổi tối</div>
                    </div>
                  </div>
                </td>
                {weekDates.map((date, index) => (
                  <ProductCell
                    key={`night-${index}`}
                    timeOfDay="night"
                    date={date}
                  />
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default SkincareSchedule;
