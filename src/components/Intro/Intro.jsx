import { useContext, useEffect } from "react";
import "./Intro.css";
import FloatinDiv from "../FloatingDiv/FloatingDiv";
import skincareIntro from "../../assets/image 4.png";
import skincareIntroTransp from "../../assets/image 4(transparent).png";
import skincareAIHand from "../../assets/—Pngtree—robot hand transparent_15514339.png";
import { themeContext } from "../../Context";
import { useScroll, useMotionValueEvent, useTransform, delay, motion } from "framer-motion";
import { Link } from "react-scroll";
import { useNavigate } from "react-router-dom";
const Intro = () => {
  const navigate = useNavigate();
  // Transition
  const transition = { duration: 2, type: "spring" };

  // context
  const theme = useContext(themeContext);
  const darkMode = theme.state.darkMode;

  const handleDirect = () => {
    navigate("/schedule");
  };

  useEffect(() => {
    const ballsLeft = document.querySelectorAll('.sub-container-propeller--left > .ball');
    const ballsRight = document.querySelectorAll('.sub-container-propeller--right > .ball');

    for (let i = 0; i < ballsLeft.length; i++) {
      ballsLeft[i].style.animationDelay = `${i}00ms`;
      if (ballsRight[i]) {
        ballsRight[i].style.animationDelay = `${i}00ms`;
      }
    }
  }, []);

  const { scrollYProgress } = useScroll();


  const transitionSmooth = {
    duration: 2,
    type: "all",
  };
  useMotionValueEvent(scrollYProgress, "change");
  const mainPosition = useTransform(scrollYProgress, [0.05, 0.4], ["translateY(0px)", "translateY(-150px)"]);
  const framePosition = useTransform(scrollYProgress, [0.05, 0.4], ["translateY(0px)", "translateY(-300px)"]);
  const position = useTransform(scrollYProgress, [0.05, 0.4], ["translateY(0px)", "translateY(-200px)"]);

  return (
    <div className="Intro" id="Intro">
      <motion.div className="introBG" style={{ transform: mainPosition, transition: "all 0.2s ease" }} transition={transitionSmooth}></motion.div>
      <div className="i-left" >
        <motion.div
            initial={{ paddingLeft: "0%" }}
            whileInView={{ paddingLeft: "10%" }}
            transition={transition} className="i-background">
            <motion.img src={skincareIntro} alt="" style={{ transform: position, transition: "all 0.2s ease" }} transition={transitionSmooth}/>
            <motion.img src={skincareIntroTransp} alt="" style={{ transform: position, transition: "all 0.2s ease" }} transition={transitionSmooth}/>
            <motion.div style={{ transform: position, transition: "all 0.2s ease" }} transition={transitionSmooth}/>
            <motion.div style={{ transform: framePosition, transition: "all 0.2s ease" }} transition={transitionSmooth}/>
        </motion.div>
        <div className="DNA-wrapper" >
          <div className="box box--top"></div>
          <div className="container-message">
            <h1 className="DNA-title">Analysing...</h1>
          </div>
          <div className="container-propeller">
            <div className="sub-container-propeller--left">
              <div className="ball"></div>
              <div className="ball"></div>
              <div className="ball"></div>
              <div className="ball"></div>
              <div className="ball"></div>
              <div className="ball"></div>
              <div className="ball"></div>
              <div className="ball"></div>
              <div className="ball"></div>
              <div className="ball"></div>
              <div className="ball"></div>
              <div className="ball"></div>
              <div className="ball"></div>
              <div className="ball"></div>
              <div className="ball"></div>
              <div className="ball"></div>
              <div className="ball"></div>
              <div className="ball"></div>
              <div className="ball"></div>
              <div className="ball"></div>
              <div className="ball"></div>
              <div className="ball"></div>
              <div className="ball"></div>
              <div className="ball"></div>
              <div className="ball"></div>
              <div className="ball"></div>
              <div className="ball"></div>
              <div className="ball"></div>
              <div className="ball"></div>
              <div className="ball"></div>
              <div className="ball"></div>
              <div className="ball"></div>
              <div className="ball"></div>
              <div className="ball"></div>
              <div className="ball"></div>
              <div className="ball"></div>
              <div className="ball"></div>
              <div className="ball"></div>
              <div className="ball"></div>
              <div className="ball"></div>
            </div>
            <div className="sub-container-propeller--right">
              <div className="ball"></div>
              <div className="ball"></div>
              <div className="ball"></div>
              <div className="ball"></div>
              <div className="ball"></div>
              <div className="ball"></div>
              <div className="ball"></div>
              <div className="ball"></div>
              <div className="ball"></div>
              <div className="ball"></div>
              <div className="ball"></div>
              <div className="ball"></div>
              <div className="ball"></div>
              <div className="ball"></div>
              <div className="ball"></div>
              <div className="ball"></div>
              <div className="ball"></div>
              <div className="ball"></div>
              <div className="ball"></div>
              <div className="ball"></div>
              <div className="ball"></div>
              <div className="ball"></div>
              <div className="ball"></div>
              <div className="ball"></div>
              <div className="ball"></div>
              <div className="ball"></div>
              <div className="ball"></div>
              <div className="ball"></div>
              <div className="ball"></div>
              <div className="ball"></div>
              <div className="ball"></div>
              <div className="ball"></div>
              <div className="ball"></div>
              <div className="ball"></div>
              <div className="ball"></div>
              <div className="ball"></div>
              <div className="ball"></div>
              <div className="ball"></div>
              <div className="ball"></div>
              <div className="ball"></div>
            </div>
          </div>
          <div className="box box--bottom"></div>
        </div>
        <motion.img initial={{ left: "-20%" }}
            whileInView={{ left: "12%" }}
            transition={transition} src={skincareAIHand} alt="" className="roboHand"/>
      </div>
      <motion.div className="i-right" style={{ transform: framePosition, transition: "all 0.2s ease" }} transition={transitionSmooth}>
        <motion.div
          initial={{ left: "35%" }}
          whileInView={{ top: "0%", left: "30%" }}
          transition={transition}
          className="i-name">
          <span>Hành trình</span>
          <span>chăm sóc da</span>
          <span>cá nhân hóa</span>
          <span>bằng trí tuệ nhân tạo</span>
          <span>
            Tham gia cộng đồng yêu thích chăm sóc da và nhận gợi ý riêng dành cho bạn, được hỗ trợ bởi AI.
          </span>
        </motion.div>
        <motion.div
          initial={{ left: "20%" }}
          whileInView={{ left: "10%" }}
          transition={transition} style={{ position: 'relative' }}>
          <button className="frontPageButton i-button" onClick={() => handleDirect()}>Phân tích miễn phí</button>
        </motion.div>
        {/* animation */}
        {/* <motion.img
          initial={{ left: "100%" }}
          whileInView={{ left: "0%" }}
          transition={transition}
          src={}
          alt=""
        /> */}

      </motion.div>
      <motion.div className="introRippleContainer" style={{ transform: mainPosition, transition: "all 0.2s ease" }} transition={transitionSmooth}><div className="wave"></div></motion.div>
      <motion.div className="introRippleContainer2" style={{ transform: mainPosition, transition: "all 0.2s ease" }} transition={transitionSmooth}><div className="wave"></div></motion.div>
    </div>
  );
};

export default Intro;