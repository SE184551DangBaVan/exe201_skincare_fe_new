import React from "react";
import "./Footer.css";
import Logo from "/logo skincare 2.svg";
import { Facebook, LinkedIn, Instagram, YouTube } from "@mui/icons-material";
const Footer = () => {
  return (
    <div className="footer">
      <div className="f-content-left">
        <img src={Logo} alt="" />
        <div>
          <span>Nhóm 202</span>
          <span>Chăm sóc da thông minh với AI</span>
        </div>
      </div>
      <div className="f-content-right">
        <div> <span>Tính năng</span> <span>Cộng đồng</span> <span>Tư vấn AI</span> <span>Kho sản phẩm</span> </div>
        <div> <span>Công ty</span> <span>Về chúng tôi</span> <span>Blog</span> <span>Liên hệ</span> </div>
        <div> <span>Theo dõi chúng tôi</span>
          <span className="f-icons">
            <a href='https://www.facebook.com/profile.php?id=61576623442340'>
              <Facebook style={{ color: "gray", size: "3rem" }} />
            </a>
            <a href="https://www.instagram.com/skincareservice847/" >
              <Instagram style={{ color: "gray", size: "3rem" }} />
            </a>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Footer;