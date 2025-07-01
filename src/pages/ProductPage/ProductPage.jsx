import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { motion, useScroll, useMotionValueEvent, useTransform } from "framer-motion";
import "react-toastify/dist/ReactToastify.css";
import "./ProductPage.css";
import TrustedBrand from "../../assets/trusted_brand_icon.png";
import LeavesBg from "../../assets/—Pngtree—leaves_5636474.png";

export default function ProductPage() {
  const { productId } = useParams();
  const [blog, setBlog] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [showCreateReview, setShowCreateReview] = useState(false);
  const [newReviewText, setNewReviewText] = useState("");

  const { scrollYProgress } = useScroll();
  useMotionValueEvent(scrollYProgress, "change");

  const heightPop = useTransform(scrollYProgress, [0.1, 0.2], ["0", "100vh"]);
  const transition = { duration: 2, type: "spring" };

  useEffect(() => {
    fetch("https://skincareapp.somee.com/SkinCare/Blog")
      .then((res) => res.json())
      .then((blogs) => {
        const found = blogs.find(
          (item) => item.product && item.product.id === productId
        );
        setBlog(found);
      });
  }, [productId]);

  const fetchReviews = () => {
    if (!blog) return;
    fetch(`https://skincareapp.somee.com/SkinCare/Blog/Comment/blog/${blog.id}`)
      .then((res) => res.json())
      .then((data) => setReviews(data));
  };

  useEffect(() => {
    fetchReviews();
  }, [blog]);

  if (!blog) return <div style={{ textAlign: "center" }}>Đang tải...</div>;

  const product = blog.product;

  return (
    <div className="productpage-root">
      <img className="bg-leaves" src={LeavesBg} alt="" />
      <div id="leaves">
        <i></i><i></i><i></i><i></i><i></i>
        <i></i><i></i><i></i><i></i><i></i>
        <i></i><i></i><i></i><i></i><i></i>
      </div>

      <div className="productpage-section1">
        <div className="productpage-category">SKIN CARE BLOGS</div>
        <div className="productpage-item-box">
          <h1 className="productpage-title">{blog.title}</h1>
          {product.imageLink && (
            <div className="productpage-imgBox">
              <img
                src={product.imageLink}
                alt={product.name}
                className="productpage-img"
              />
            </div>
          )}
          
          <img className="trustedBrandIcon" src={TrustedBrand} alt="" />
          <div className="rippleContainer"><div className="wave"></div></div>
          <div className="rippleContainer2"><div className="wave"></div></div>
        </div>
          {blog.content && (
            <motion.div className="productpage-summary" style={{maxHeight: heightPop}}
            transition={transition}>
              {blog.content}
            </motion.div>
          )}
      </div>

      <div className="product-ecom-container">
        <div className="product-ecom-gallery">
          <img
            src={product.imageLink}
            alt={product.name}
            className="product-ecom-mainimg"
          />
        </div>
        <div className="product-ecom-info">
          <div className="product-ecom-brand">SKINCARE</div>
          <h1 className="product-ecom-title">{product.name}</h1>
          <div className="product-ecom-desc">{product.description}</div>
          <div className="product-ecom-price">
            {product.price ? `${product.price.toFixed(2)} VND` : "Liên hệ"}
          </div>
          <a
            className="product-ecom-addcart"
            href={product.productLink || "#"}
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className="cart-icon">🛒</span> Mua ngay
          </a>
        </div>
      </div>

      <div className="product-review-section">
  <div className="review-detail">
    <div className="review-detail-title">Đánh giá hàng đầu từ khách hàng</div>
    <div className="review-detail-note">
      Đánh giá và kết quả có thể khác nhau tùy theo từng người. Những đánh giá của khách hàng chỉ mang tính cá nhân.
    </div>
    <hr />
    {reviews.length === 0 && (
      <div className="review-empty">Chưa có đánh giá nào.</div>
    )}
    {reviews.map((rev) => (
      <div className="review-item" key={rev.id}>
        <div className="review-item-row">
          <img
            src={rev.user_Avatar}
            alt={rev.user_Name}
            className="review-avatar"
          />
          <div className="review-main">
            <div className="review-username">{rev.user_Name}</div>
            <div className="review-text">{rev.commentText}</div>
            <div className="review-date">
              {new Date(rev.createdAt).toLocaleDateString("en-CA")}
            </div>
            <div className="review-helpful">
              Thông tin này có hữu ích không?
              <div className="helpful-btn-group">
                <button className="helpful-btn helpful-yes">
                  <span className="helpful-icon">👍</span> <b>Có (0)</b>
                </button>
                <button className="helpful-btn helpful-no">
                  <span className="helpful-icon">👎</span> <b>Không (0)</b>
                </button>
              </div>
            </div>
            <a href="#" className="review-report">
              Báo cáo đánh giá này
            </a>
          </div>
        </div>
        <hr />
      </div>
    ))}
        <a
            className="review-create"
            onClick={() => setShowCreateReview(true)}
          >
            Tạo đánh giá
          </a>
  </div>
</div>
      {showCreateReview && (
        <div className="adminBlogModal">
          <div className="adminBlogModalContent">
            <h3>Viết đánh giá</h3>
            <textarea
              value={newReviewText}
              onChange={(e) => setNewReviewText(e.target.value)}
              placeholder="Nhập nội dung đánh giá..."
              rows={5}
            />
            <div style={{ display: "flex", gap: 8, justifyContent: "flex-end" }}>
              <button
                style={{
                  background: "#4caf50",
                  color: "#fff",
                  border: "none",
                  padding: "6px 12px",
                  borderRadius: 4
                }}
                onClick={async () => {
                  try {
                    const resp = await fetch(
                      "https://skincareapp.somee.com/SkinCare/Blog/Comment",
                      {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({
                          blogId: blog.id,
                          commentText: newReviewText
                        }),
                        credentials: "include"
                      }
                    );
                    if (resp.ok) {
                      toast.success("Gửi đánh giá thành công!");
                      fetchReviews();
                      setShowCreateReview(false);
                      setNewReviewText("");
                    } else {
                      toast.error("Gửi đánh giá thất bại!");
                    }
                  } catch {
                    toast.error("Có lỗi xảy ra khi gửi đánh giá!");
                  }
                }}
              >
                Gửi
              </button>
              <button
                style={{
                  background: "#eee",
                  color: "#333",
                  border: "none",
                  padding: "6px 12px",
                  borderRadius: 4
                }}
                onClick={() => setShowCreateReview(false)}
              >
                Hủy
              </button>
            </div>
          </div>
        </div>
      )}

      <ToastContainer />
    </div>
  );
}
