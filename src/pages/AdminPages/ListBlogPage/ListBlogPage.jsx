import React, { useEffect, useState } from "react";
import BGImage from "../../../components/BGImage/BGImage";
import { motion, useScroll, useTransform } from "framer-motion";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./ListBlogPage.css";

// Custom Toast Confirm Component
const ToastConfirm = ({ onConfirm, onCancel }) => (
  <div style={{ minWidth: 180 }}>
    <div style={{ marginBottom: 12 }}>Bạn có muốn xóa blog này?</div>
    <div style={{ display: "flex", gap: 8, justifyContent: "flex-end" }}>
      <button
        style={{
          background: "#e44",
          color: "#fff",
          border: "none",
          borderRadius: 4,
          padding: "6px 16px",
          cursor: "pointer"
        }}
        onClick={onConfirm}
      >
        Xóa
      </button>
      <button
        style={{
          background: "#eee",
          color: "#333",
          border: "none",
          borderRadius: 4,
          padding: "6px 16px",
          cursor: "pointer"
        }}
        onClick={onCancel}
      >
        Hủy
      </button>
    </div>
  </div>
);

export default function ListBlogPage() {
  const { scrollYProgress } = useScroll();
  const position = useTransform(scrollYProgress, [0, 0.3], ["0%", "10%"]);
  const scale = useTransform(scrollYProgress, [0, 0.3], [1, 0.92]);
  const opacity = useTransform(scrollYProgress, [0, 0.3], [1, 0.85]);
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
const [editBlog, setEditBlog] = useState(null); 

  const fetchBlogs = () => {
    setLoading(true);
    fetch("https://skincareapp.somee.com/SkinCare/Blog")
      .then((res) => res.json())
      .then((data) => setBlogs(data))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  // Toast confirm logic
  const showDeleteToast = (onConfirm) => {
    const toastId = toast(
      ({ closeToast }) => (
        <ToastConfirm
          onConfirm={() => {
            onConfirm();
            closeToast();
          }}
          onCancel={closeToast}
        />
      ),
      {
        position: "top-center",
        autoClose: false,
        closeOnClick: false,
        closeButton: false,
        draggable: false,
      }
    );
  };

  const handleDelete = async (id) => {
    showDeleteToast(async () => {
      try {
        const resp = await fetch(
          `https://skincareapp.somee.com/SkinCare/Blog/${id}`,
          {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
          }
        );
        if (resp.ok) {
          toast.success("Xóa Blog thành công!!");
          fetchBlogs();
        } else {
          toast.error("Xóa Blog thất bại!");
        }
      } catch (err) {
        toast.error("Somthing went wrong!");
      }
    });
  };

const handleEdit = (id) => {
  const blog = blogs.find((b) => b.id === id);
  if (blog) {
    setEditBlog({
      id: blog.id,
      title: blog.title,
      content: blog.content,
      productId: blog.productId,
      externalProductLink: blog.externalProductLink
    });
  }
};

  return (
    
    <div className="listBlogPage-admin">
      <BGImage />
      <motion.div
        className="adminBlogListContainer"
        style={{ y: position, scale, opacity }}
      >
        <h2 className="adminBlogTitle">Quản lí Blog</h2>
        {loading ? (
          <div className="adminBlogLoading">Đanm tải...</div>
        ) : blogs.length === 0 ? (
          <div className="adminBlogNoData">Không có Blog.</div>
        ) : (
          <div className="adminBlogList">
            {blogs.map((blog) => (
              <div className="adminBlogListItem" key={blog.id}>
                <div className="adminBlogListImageBox">
                  <img
                    src={blog.product?.imageLink}
                    alt={blog.product?.name}
                    className="adminBlogListImage"
                  />
                </div>
                <div className="adminBlogListContent">
                  <div className="adminBlogListTitle">{blog.title}</div>
                  <div className="adminBlogListDesc">{blog.content}</div>
                  <a
                    href={blog.externalProductLink}
                    className="adminBlogListLink"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {blog.externalProductLink}
                  </a>
                  <div className="adminBlogListMeta">
                    <span>
                      {new Date(blog.createdAt).toLocaleString("vi-VN", {
                        hour12: false,
                        timeZone: "Asia/Ho_Chi_Minh",
                        day: "2-digit",
                        month: "2-digit",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit"
                      })}
                    </span>
                    <span className="adminBlogListProduct">
                      {blog.product?.name}
                    </span>
                  </div>
                  <div className="adminBlogListActions">
                    <button
                      className="adminBlogListBtn adminBlogListEdit"
                      onClick={() => handleEdit(blog.id)}
                    >
                      Chỉnh sửa
                    </button>
                    <button
                      className="adminBlogListBtn adminBlogListDelete"
                      onClick={() => handleDelete(blog.id)}
                    >
                      Xóa
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </motion.div>
      {editBlog && (
 <div className="adminBlogModal">
  <div className="adminBlogModalContent">
    <h3>Cập nhật Blog</h3>

    <div className="form-group">
      <label className="form-label" htmlFor="edit-title">Tiêu dề</label>
      <input
        id="edit-title"
        value={editBlog.title}
        onChange={(e) => setEditBlog({ ...editBlog, title: e.target.value })}
        placeholder="Nhập tiêu đề..."
      />
    </div>

    <div className="form-group">
      <label className="form-label" htmlFor="edit-content">Nội dung</label>
      <textarea
        id="edit-content"
        value={editBlog.content}
        onChange={(e) => setEditBlog({ ...editBlog, content: e.target.value })}
        placeholder="Nhập nội dung..."
      />
    </div>

    <div className="form-group">
      <label className="form-label" htmlFor="edit-link">Link</label>
      <input
        id="edit-link"
        value={editBlog.externalProductLink}
        onChange={(e) =>
          setEditBlog({ ...editBlog, externalProductLink: e.target.value })
        }
        placeholder="Link sản phẩm..."
      />
    </div>

    <div style={{ display: "flex", gap: 8, justifyContent: "flex-end" }}>
      <button
        style={{
          background: "#4caf50",
          color: "#fff",
          border: "none",
          padding: "6px 12px",
          borderRadius: 4,
          cursor: "pointer"
        }}
        onClick={async () => {
          try {
            const resp = await fetch(
              `https://skincareapp.somee.com/SkinCare/Blog/${editBlog.id}`,
              {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  title: editBlog.title,
                  content: editBlog.content,
                  productId: editBlog.productId,
                  externalProductLink: editBlog.externalProductLink
                }),
                credentials: "include"
              }
            );
            if (resp.ok) {
              toast.success("Blog Updated Successfully!");
              fetchBlogs();
              setEditBlog(null);
            } else {
              toast.error("Failed to update blog!");
            }
          } catch {
            toast.error("An error occurred while updating!");
          }
        }}
      >
        Lưu
      </button>
      <button
        style={{
          background: "#eee",
          color: "#333",
          border: "none",
          padding: "6px 12px",
          borderRadius: 4,
          cursor: "pointer"
        }}
        onClick={() => setEditBlog(null)}
      >
        Hủy
      </button>
    </div>
  </div>
</div>

)}

      <ToastContainer
        position="top-right"
        autoClose={2500}
        hideProgressBar={false}
        closeOnClick
        pauseOnHover
        draggable
        theme="light"
      />
    </div>
  );
}
