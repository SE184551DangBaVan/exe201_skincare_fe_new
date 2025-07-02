import { useContext } from "react";
import "./Services.css";
import Rock1 from './images/rock1.png'
import Rock2 from './images/bottle1.png'
import Rock3 from './images/bottle2.png'

import Brand1 from './images/bg3.jpg'
import Brand2 from './images/bg4.jpg'

import BarCode from './images/code.png'

import { themeContext } from "../../Context";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const Services = () => {
  const navigate = useNavigate();
  // context
  const theme = useContext(themeContext);
  const darkMode = theme.state.darkMode;

  // transition
  const transitionImg = {
    duration: 1,
    type: "slide",
  };

  return (
    <div className="services" id="services">
      <motion.div
        initial={{ top: "-100px" }}
        whileInView={{ top: "0" }}
        transition={transitionImg}
        className="bannerImg">
          <div className="animation-canvas">
            <div className="bannerHeader">
              <div className="left">
                  <h1>Gói VIP</h1>
                  <img src="./images/2.png" alt="" />
              </div>
              <div className="author">
                  <h3>SkinSense</h3>
                  <div >
                      <p>Tư Vấn</p>
                      <p> VIP Độc Quyền</p>
                  </div>
                  <div>
                      <p>Chăm Sóc Da</p>
                      <p>Hưởng Lợi</p>
                  </div>
                  <img src={BarCode} alt="" />
              </div>
          </div>
          <div className="banner">
              <div className="product">
                   <div
                    className="soda"
                    style={{ "--url": `url(${Brand1})`}}
                  ></div>
                  <div
                    className="soda"
                    style={{ "--url": `url(${Brand2})` }}
                  ></div>
              </div>


              <div className="rock">
                  <img src={Rock1} alt='' />
                  <img src={Rock2} alt='' />
                  <img src={Rock3} alt='' />
              </div>
          </div>
        </div>
      </motion.div>
      <div className="s-title">Tham gia cộng đồng cùng chúng tôi</div>
      <button className="getStartedButton" onClick={() => navigate("/VIP-purchase")}>Mua gói VIP</button>
    </div>
  );
};

export default Services;