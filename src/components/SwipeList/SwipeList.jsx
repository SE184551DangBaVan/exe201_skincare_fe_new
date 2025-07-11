import React, { useContext, useRef, useState } from "react";
import "./SwipeList.css";
import { Swiper, SwiperSlide } from "swiper/react";
import { useScroll, useMotionValueEvent, useTransform, motion } from "framer-motion";
import "swiper/css";
import { Autoplay } from 'swiper/modules';
import 'swiper/css/autoplay';

import ImageList1 from "../../assets/ImageList1.png";
import ImageList2 from "../../assets/ImageList2.png";
import ImageList3 from "../../assets/ImageList3.png";
import ImageList4 from "../../assets/ImageList4.png";
import ImageList5 from "../../assets/ImageList5.png";

import ImageList1Back from "../../assets/ImageList1Back.jpg";
import ImageList2Back from "../../assets/ImageList2Back.jpg";
import ImageList3Back from "../../assets/ImageList3Back.jpg";
import ImageList4Back from "../../assets/ImageList4Back.jpg";
import ImageList5Back from "../../assets/ImageList5Back.jpg";

import { themeContext } from "../../Context";

const SwipeList = () => {
  const theme = useContext(themeContext);
  const darkMode = theme.state.darkMode;

  const imageTrackRef = useRef(null);
  const swiperRef = useRef(null);

  const [activeIndex, setActiveIndex] = useState(0);
  const backgroundImages = [
    ImageList5Back,
    ImageList1Back,
    ImageList2Back,
    ImageList3Back,
    ImageList4Back
  ];

  const { scrollYProgress } = useScroll();


  const transitionSmooth = {
    duration: 2,
    type: "all",
  };
  useMotionValueEvent(scrollYProgress, "change");
  const mainPosition = useTransform(scrollYProgress, [0.3, 0.6], ["translateY(0px)", "translateY(-150px)"]);
  const framePosition = useTransform(scrollYProgress, [0.3, 0.6], ["translateY(10px)", "translateY(-300px)"]);
  const position = useTransform(scrollYProgress, [0.3, 0.6], ["translateY(0px)", "translateY(-200px)"]);

  return (
    <div
      className="swipeList"
      id="swipeList"
      ref={imageTrackRef}
    >
      {/* BACKGROUND IMAGE SLIDESHOW */}
      <motion.div className="swipe-background-wrapper" style={{ transform: mainPosition, transition: "all 0.2s ease" }} transition={transitionSmooth}>
        {backgroundImages.map((bg, i) => (
          <div>
            <motion.img
              key={i}
              src={bg}
              alt=""
              className="swipe-background-image"
              initial={{ opacity: 0, scale: 1 }}
              animate={{
                opacity: i === activeIndex ? 1 : 0,
                objectPosition: i === activeIndex ? '0px 0' : '20px 0',
                zIndex: i === activeIndex ? 1 : 0
              }}
              transition={{ duration: 1.2, ease: "easeOut" }}
            />
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="backgoundTextBlock"
            >
              <span>HÃY THEO <span><br/> CHÚNG TÔI</span></span>
              <span>Hành Trình Của Bạn Chỉ Vừa Mới Bắt Đầu</span>
              <div className="swipeBGImgMask" />
            </motion.div>
          </div>
        ))}
      </motion.div>
      
      {/* SWIPER FOREGROUND */}
      <motion.div className="swipeList-container" style={{ transform: framePosition, zIndex: 5, transition: "all 0.2s ease" }} transition={transitionSmooth}>
      <Swiper
        spaceBetween={40}
        slidesPerView={2}
        grabCursor={true}
        modules={[Autoplay]}
        autoplay={{ delay: 5000 }}
        loop={true}
        freeMode={true}
        onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
        onSwiper={(swiper) => (swiperRef.current = swiper)}
        style={{ transform: framePosition, transition: "all 0.2s ease" }} transition={transitionSmooth}
        className="swipeList-slider"
      >
        {[ImageList1, ImageList2, ImageList3, ImageList4, ImageList5].map(
          (imgSrc, i) => (
            <SwiperSlide key={i}>
              <motion.img
                initial={{ objectPosition: '0% center' }}
                animate={{
                  objectPosition:
                    i === activeIndex
                      ? '0% center'
                      : i === (activeIndex + 1) % 5
                        ? '50% center'
                        : '100% center',
                }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
                src={imgSrc}
                alt="" className="parallax-image"
              />
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="textBlock"
              >
                <span>{
                  [
                    "Cộng đồng",
                    "Tư vấn AI",
                    "Kho sản phẩm",
                    "Cá nhân hóa",
                    "Uy tín cao",
                  ][i]
                }</span>
                <span>{
                  [
                    "Chia sẻ kinh nghiệm và kết nối với người yêu chăm sóc da",
                    "Nhận gợi ý chăm sóc da cá nhân hóa",
                    "Khám phá đánh giá và thông tin sản phẩm đã kiểm duyệt",
                    "Theo dõi tiến trình và hành trình làn da của bạn",
                    "Luôn đảm bảo dịch vụ tốt nhất cho bạn",
                  ][i]
                }</span>
                <div className="swipeImgMask" />
              </motion.div>
            </SwiperSlide>
          )
        )}
      </Swiper>
      </motion.div>
      <motion.span className="letterPoke" style={{ transform: mainPosition, transition: "all 0.2s ease" }} transition={transitionSmooth}>HÃY</motion.span>
    </div>
  );
};

export default SwipeList;