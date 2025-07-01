import { useContext } from "react";
import "./Services.css";

import { themeContext } from "../../Context";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Spline from "@splinetool/react-spline";
import Scene from "../../assets/scene.splinecode";

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
        initial={{ top: "50px" }}
        whileInView={{ top: "0" }}
        transition={transitionImg}
        className="bannerImg">
          <Spline scene={Scene} />
      </motion.div>
      <div className="s-title">Tham gia cộng đồng cùng chúng tôi</div>
      <button className="getStartedButton" onClick={() => navigate("/VIP-purchase")}>Mua gói VIP</button>
    </div>
  );
};

export default Services;