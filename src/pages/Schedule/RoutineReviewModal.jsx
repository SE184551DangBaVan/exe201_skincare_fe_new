import React from "react";
import "./RoutineReviewModal.css";

const RoutineReviewModal = ({ isOpen, onClose, routineData }) => {
  if (!isOpen || !routineData) return null;

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const options = { year: "numeric", month: "2-digit", day: "2-digit" };
    return new Date(dateString).toLocaleDateString("vi-VN", options);
  };

  const renderProductList = (products) => {
    if (!products || products.length === 0) {
      return (
        <p className="no-products-text">Không có sản phẩm cho buổi này.</p>
      );
    }
    return products.map((product) => (
      <div key={product.productId} className="modal-product-item">
        <img
          src={product.imageLink}
          alt={product.name}
          className="modal-product-image"
        />
        <p className="modal-product-name">{product.name}</p>
      </div>
    ));
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Tổng quan Routine</h2>
          <button onClick={onClose} className="close-button">
            &times;
          </button>
        </div>
        <div className="modal-body">
          <div className="modal-section advice-section">
            <h3>📝 Lời khuyên từ AI</h3>
            <p>{routineData.advice || "Không có lời khuyên nào."}</p>
          </div>

          <div className="modal-section routine-details">
            <h3>🗓️ Thời gian áp dụng</h3>
            <p>
              Từ <strong>{formatDate(routineData.startDate)}</strong> đến{" "}
              <strong>{formatDate(routineData.endDate)}</strong>
            </p>
          </div>

          <div className="modal-section">
            <h3>☀️ Buổi Sáng</h3>
            <div className="modal-product-list">
              {renderProductList(routineData.morning)}
            </div>
          </div>
          <div className="modal-section">
            <h3>🏙️ Buổi Trưa</h3>
            <div className="modal-product-list">
              {renderProductList(routineData.noon)}
            </div>
          </div>
          <div className="modal-section">
            <h3>🌙 Buổi Tối</h3>
            <div className="modal-product-list">
              {renderProductList(routineData.night)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoutineReviewModal;
