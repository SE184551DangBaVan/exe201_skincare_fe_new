import React, { useContext } from "react";
import "./SwipeList.css";
import { Swiper, SwiperSlide } from "swiper/react"
import { delay, motion } from "framer-motion";
import "swiper/css";
import ImageList1 from "../../assets/ImageList1.png";
import ImageList2 from "../../assets/ImageList2.png";
import ImageList3 from "../../assets/ImageList3.png";
import ImageList4 from "../../assets/ImageList4.png";
import { themeContext } from "../../Context";
const SwipeList = () => {
  const transition = { delay: 0, duration: 1, type: "spring" };
  const transition2 = { delay: 0.2, duration: 1, type: "spring" };
  const transition3 = { delay: 0.4, duration: 1, type: "spring" };
  const transition4 = { delay: 0.6, duration: 1, type: "spring" };
  const theme = useContext(themeContext);
  const darkMode = theme.state.darkMode;
  return (
    <div className="swipeList" id="swipeList">

      {/* slider */}
      <Swiper
        spaceBetween={60}
        slidesPerView={4}
        grabCursor={true}
        className="swipeList-slider"
      >
        <SwiperSlide>
          <motion.img 
            initial={{ top: "20%" }}
            whileInView={{ top: "0%" }}
            transition={transition} src={ImageList1} alt="" />
          <span>Cộng đồng</span>
          <span>Chia sẻ kinh nghiệm và kết nối với người yêu chăm sóc da</span>
        </SwiperSlide>
        <SwiperSlide>
          <motion.img 
            initial={{ top: "20%" }}
            whileInView={{ top: "0%" }}
            transition={transition2} src={ImageList2} alt="" />
          <span>Tư vấn AI</span>
          <span>Nhận gợi ý chăm sóc da cá nhân hóa</span>
        </SwiperSlide>
        <SwiperSlide>
          <motion.img 
            initial={{ top: "20%" }}
            whileInView={{ top: "0%" }}
            transition={transition3} src={ImageList3} alt="" />
          <span>Kho sản phẩm</span>
          <span>Khám phá đánh giá và thông tin sản phẩm đã kiểm duyệt</span>
        </SwiperSlide>
        <SwiperSlide>
          <motion.img 
            initial={{ top: "20%" }}
            whileInView={{ top: "0%" }}
            transition={transition4} src={ImageList4} alt="" />
          <span>Cá nhân hóa</span>
          <span>Theo dõi tiến trình và hành trình làn da của bạn</span>
        </SwiperSlide>
        <SwiperSlide>
          <motion.img 
            initial={{ top: "10%" }}
            whileInView={{ top: "0%" }}
            transition={transition} src={ImageList1} alt="" />
          <span>Cộng đồng</span>
          <span>Chia sẻ kinh nghiệm và kết nối với người yêu chăm sóc da</span>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default SwipeList;