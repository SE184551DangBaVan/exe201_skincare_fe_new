import React, { useState, useEffect } from "react";
import "./SkincareSchedule.css";
import { showLoading, updateToast } from "../../utils/toastUtils";
import { useNavigate } from "react-router-dom";
import RoutineReviewModal from "./RoutineReviewModal";

const SkincareSchedule = () => {
  const [routine, setRoutine] = useState(null);
  const [weekProgress, setWeekProgress] = useState([]);
  const [dailyRoutines, setDailyRoutines] = useState({});
  const [loading, setLoading] = useState(true);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);

  const navigate = useNavigate();
  const handleNavigate = () => {
    navigate("/consultation");
  };

  // Get current week dates
  const getCurrentWeekDates = () => {
    const today = new Date();
    const currentDay = today.getDay();
    const dayIndex = currentDay === 0 ? 6 : currentDay - 1;
    const monday = new Date(today);
    monday.setDate(today.getDate() - dayIndex);

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
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
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
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="3" y="4" width="18" height="18" rx="3" ry="3" />
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
      fill="currentColor"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
    </svg>
  );

  const RefreshIcon = ({ size = 24, className = "" }) => (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8" />
      <path d="M21 3v5h-5" />
      <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16" />
      <path d="M3 21v-5h5" />
    </svg>
  );

  const SunIcon = ({ size = 24 }) => (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2" />
      <path d="M12 20v2" />
      <path d="m4.93 4.93 1.41 1.41" />
      <path d="m17.66 17.66 1.41 1.41" />
      <path d="M2 12h2" />
      <path d="M20 12h2" />
      <path d="m6.34 17.66-1.41 1.41" />
      <path d="m19.07 4.93-1.41 1.41" />
    </svg>
  );

  const CloudSunIcon = ({ size = 24 }) => (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 2v2" />
      <path d="m4.93 4.93 1.41 1.41" />
      <path d="M20 12h2" />
      <path d="m19.07 4.93-1.41 1.41" />
      <path d="M15.947 12.65a4 4 0 0 0-5.925-4.128" />
      <path d="M13 22H7a5 5 0 1 1 4.9-6H13a3 3 0 0 1 0 6Z" />
    </svg>
  );

  const MoonIcon = ({ size = 24 }) => (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
    </svg>
  );

  const SparkleIcon = ({ size = 24 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0L14.59 8.41L22 9L14.59 9.59L12 18L9.41 9.59L2 9L9.41 8.41L12 0Z" />
      <path d="M19 4L20.18 7.82L24 9L20.18 10.18L19 14L17.82 10.18L14 9L17.82 7.82L19 4Z" />
      <path d="M5 14L6.18 17.82L10 19L6.18 20.18L5 24L3.82 20.18L0 19L3.82 17.82L5 14Z" />
    </svg>
  );

  const AddCircleIcon = ({ size = 24 }) => (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="8" x2="12" y2="16" />
      <line x1="8" y1="12" x2="16" y2="12" />
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

  // Fetch daily routine for a specific date
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

  // Fetch daily routines for the whole week
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
    const toastId = showLoading("✨ Đang đánh dấu sản phẩm...");
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
        await Promise.all([fetchWeekProgress(), fetchAllDailyRoutines()]);
        updateToast(toastId, "success", "🎉 Đánh dấu sản phẩm thành công!");
      } else {
        updateToast(toastId, "error", "❌ Có lỗi khi đánh dấu sản phẩm!");
      }
    } catch (error) {
      console.error("Error checking product:", error);
      updateToast(toastId, "error", "🔌 Không thể kết nối tới server!");
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

    return (
      weekProgress.find(
        (p) => new Date(p.usageDate).toISOString().split("T")[0] === dateString
      ) || { total: 0, checked: 0, percent: 0 }
    );
  };

  const isProductChecked = (productId, timeOfDay, date) => {
    const dateString = date.toISOString().split("T")[0];
    const dailyData = dailyRoutines[dateString];

    if (!dailyData || !dailyData[timeOfDay]) {
      return false;
    }

    const product = dailyData[timeOfDay].find((p) => p.productId === productId);
    return product ? product.isChecked : false;
  };

  const getProductsForSession = (timeOfDay, date) => {
    const dateString = date.toISOString().split("T")[0];
    const dailyData = dailyRoutines[dateString];

    if (dailyData && dailyData[timeOfDay]) {
      return dailyData[timeOfDay];
    }

    // Fallback logic
    if (
      routine &&
      routine[timeOfDay] &&
      routine.applicableDays &&
      routine.applicableDays.includes(date.getDay() === 0 ? 7 : date.getDay())
    ) {
      return routine[timeOfDay];
    }

    return [];
  };

  const getTimeInfo = (timeOfDay) => {
    switch (timeOfDay) {
      case "morning":
        return {
          icon: <SunIcon size={20} />,
          label: "Sáng",
          description: "Khởi đầu ngày",
        };
      case "noon":
        return {
          icon: <CloudSunIcon size={20} />,
          label: "Trưa",
          description: "Giữa ngày",
        };
      case "night":
        return {
          icon: <MoonIcon size={20} />,
          label: "Tối",
          description: "Phục hồi",
        };
      default:
        return {
          icon: <SunIcon size={20} />,
          label: "Sáng",
          description: "Khởi đầu ngày",
        };
    }
  };

  const ProductCell = ({ timeOfDay, date, isToday }) => {
    const session = getSessionNumber(timeOfDay);
    const products = getProductsForSession(timeOfDay, date);

    return (
      <td className={`schedule-cell ${!isToday ? "disabled" : ""}`}>
        <div className="cell-content">
          {products.length === 0 ? (
            <div>
              <AddCircleIcon size={28} />
            </div>
          ) : (
            products.map((product, index) => {
              const isChecked = isProductChecked(
                product.productId,
                timeOfDay,
                date
              );
              const canClick = isToday && !isChecked;

              return (
                <div
                  key={`${product.productId}-${index}`}
                  className={`product-item ${isChecked ? "checked" : ""} ${
                    !isToday ? "disabled" : ""
                  }`}
                  onClick={() =>
                    canClick &&
                    checkProduct(product.productId, session, date.toISOString())
                  }
                  style={{
                    cursor: canClick
                      ? "pointer"
                      : !isToday
                      ? "not-allowed"
                      : "default",
                  }}
                >
                  <div className="product-image-wrapper">
                    <img
                      src={product.imageLink}
                      alt={product.name}
                      className="product-thumbnail"
                      onError={(e) => {
                        e.target.src =
                          "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGRGZWZ9PGxpbmVhckdyYWRpZW50IGlkPSJncmFkaWVudCIgeDI9IjEiIHkyPSIxIj4KPHN0b3Agb2Zmc2V0PSIwJSIgc3RvcC1jb2xvcj0iI2Y5ZmFmYiIvPgo8c3RvcCBvZmZzZXQ9IjEwMCUiIHN0b3AtY29sb3I9IiNlNWU3ZWIiLz4KPC9saW5lYXJHcmFkaWVudD4KPC9kZWZzPgo8cmVjdCB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHJ4PSI4IiBmaWxsPSJ1cmwoI2dyYWRpZW50KSIvPgo8c3ZnIHg9IjEwIiB5PSIxMCIgd2lkdGg9IjIwIiBoZWlnaHQ9IjIwIiB2aWV3Qm94PSIwIDAgMjQgMjQiIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzljYTNhZiIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiPgo8cmVjdCB4PSIzIiB5PSIzIiB3aWR0aD0iMTgiIGhlaWdodD0iMTgiIHJ4PSIyIiByeT0iMiIvPgo8Y2lyY2xlIGN4PSI4LjUiIGN5PSI4LjUiIHI9IjEuNSIvPgo8cG9seWxpbmUgcG9pbnRzPSIyMSwxNSAxNiw5IDUsMjEiLz4KPC9zdmc+Cjwvc3ZnPgo=";
                      }}
                    />
                    {isChecked && (
                      <div className="check-overlay">
                        <CheckIcon size={12} />
                      </div>
                    )}
                  </div>
                  <div className="product-info">
                    <div className="product-name" title={product.name}>
                      {product.name}
                    </div>
                    <div className="product-categories">
                      {product.categories &&
                        product.categories.slice(0, 1).map((cat, idx) => (
                          <span
                            key={idx}
                            className="category-badge"
                            title={cat}
                          >
                            {cat.length > 8 ? cat.substring(0, 6) + "..." : cat}
                          </span>
                        ))}
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </td>
    );
  };

  if (loading) {
    return (
      <div className="schedule-container">
        <div className="loading-section">
          <RefreshIcon size={48} className="loading-spinner" />
          <p className="loading-text">
            ✨ Đang tải thời khóa biểu skincare của bạn...
          </p>
        </div>
      </div>
    );
  }

  if (!routine) {
    return (
      <div className="schedule-container">
        <div className="no-routine-section">
          <div className="no-routine-icon">
            <StarIcon size={80} />
          </div>
          <h2 className="no-routine-title">Chưa có thời khóa biểu skincare</h2>
          <p className="no-routine-description">
            🌟 Hãy bắt đầu hành trình chăm sóc da tuyệt vời của bạn! Chúng tôi
            sẽ giúp bạn tạo một routine skincare hoàn hảo, phù hợp với loại da
            và lối sống của bạn.
          </p>
          <button className="create-routine-btn" onClick={handleNavigate}>
            <SparkleIcon size={18} />
            Tạo routine ngay thôi
          </button>
        </div>
        <div className="maskModal"></div>
      </div>
    );
  }

  return (
    <div className="schedule-container">
      <RoutineReviewModal
        isOpen={isReviewModalOpen}
        onClose={() => setIsReviewModalOpen(false)}
        routineData={routine}
      />
      <div className="schedule-header">
        <div className="header-content">
          <div className="header-icon">
            <CalendarIcon size={32} />
          </div>
          <div>
            <h1 className="header-title">Thời khóa biểu Skincare</h1>
            <p className="header-subtitle">
              ✨ Theo dõi và thực hiện routine chăm sóc da hàng ngày
            </p>
          </div>
        </div>
        <button
          className="review-routine-btn"
          onClick={() => setIsReviewModalOpen(true)}
        >
          <SparkleIcon size={16} />
          Xem lại Routine & Lời khuyên
        </button>
      </div>

      <div className="schedule-content">
        <div className="schedule-table-container">
          <table className="schedule-table">
            <thead>
              <tr>
                <th className="time-header">Thời gian</th>
                {weekDates.map((date, index) => {
                  const progress = getProgressForDate(date);
                  const isToday =
                    date.toDateString() === new Date().toDateString();
                  return (
                    <th
                      key={index}
                      className={`date-header ${isToday ? "today" : ""}`}
                    >
                      <div className="date-content">
                        <span className="day-name">{dayNames[index]}</span>
                        <span className="date-number">
                          {date.getDate()}/{date.getMonth() + 1}
                        </span>
                        <div className="day-progress">
                          {`${progress.checked}/${progress.total} xong`}
                        </div>
                      </div>
                    </th>
                  );
                })}
              </tr>
            </thead>
            <tbody>
              {["morning", "noon", "night"].map((timeOfDay) => {
                const timeInfo = getTimeInfo(timeOfDay);
                return (
                  <tr key={timeOfDay} className="time-row">
                    <td className={`time-cell ${timeOfDay}`}>
                      <div className="time-content">
                        <div className="time-info">
                          <div className="time-label">{timeInfo.label}</div>
                          <div className="time-desc">
                            {timeInfo.description}
                          </div>
                        </div>
                      </div>
                    </td>
                    {weekDates.map((date, index) => {
                      const isToday =
                        date.toDateString() === new Date().toDateString();
                      return (
                        <ProductCell
                          key={`${timeOfDay}-${index}`}
                          timeOfDay={timeOfDay}
                          date={date}
                          isToday={isToday}
                        />
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default SkincareSchedule;
