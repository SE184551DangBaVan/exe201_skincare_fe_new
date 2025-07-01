import { Check } from '@mui/icons-material'
import { motion, useScroll, useMotionValueEvent, useTransform } from "framer-motion";
import './VIPPurchasePage.css'

import WaterSurface from '../../assets/daniel-sinoca-AANCLsb0sU0-unsplash.jpg'
import Bottle from '../../assets/product_transparent_bottle.png'
import Bottle1 from '../../assets/alex-ware-fWJt5zarh30-unsplash.png'
import Bottle2 from '../../assets/lora-seis-k1tSnHMHHWk-unsplash.png'
import { useNavigate } from 'react-router-dom';

export default function VIPPurchasePage() {
  const { scrollYProgress } = useScroll();
  useMotionValueEvent(scrollYProgress, "change");
  
  const Paralax = useTransform(scrollYProgress, [0.1, 0.2], ["translateY(-100px)", "translateY(-200px)"]);
  const ParalaxBg = useTransform(scrollYProgress, [0, 0.3], ["0", "-300px"]);
  const ParalaxMisc = useTransform(scrollYProgress, [0.15, 0.25], ["600px", "650px"]);
  const ParalaxBgFade = useTransform(scrollYProgress, [0, 0.1], ["1", "0.1"]);
  const ParalaxMiscFade = useTransform(scrollYProgress, [0.15, 0.25], ["0.1", "0.5"]);
  const ParalaxRays = useTransform(scrollYProgress, [0.15, 0.25], ["0.2", "0.8"]);
  const transition = { duration: 2, type: "spring" };
    
  const navigate = useNavigate();

  return (
    <div className='purchasePage'>
      <motion.img style={{top: ParalaxBg, opacity: ParalaxBgFade}} transition={transition} className='waterSurfaceImg' src={WaterSurface} alt='' />
      <motion.ul className="light-rays" style={{opacity: ParalaxRays}} transition={transition}>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        
        <li></li>
        <li></li>
      </motion.ul>
      <motion.img style={{top: ParalaxMisc, opacity: ParalaxMiscFade, filter: 'blur(12px)'}} transition={transition} className='productFloatImg' src={Bottle} alt='' />
      <motion.img style={{top: ParalaxMisc, opacity: ParalaxMiscFade, filter: 'blur(3px)'}} transition={transition} className='productFloatImg1' src={Bottle1} alt='' />
      <motion.img transition={transition} className='productFloatImg2' src={Bottle2} alt='' />
      <motion.div className='purchaseContainer' style={{transform: Paralax}} transition={transition}>
        <div className='content'>
          <div className='title'>Tư vấn chăm sóc da VIP độc quyền</div>
          <div className='pricing'>180,000 VND / Tháng</div>
          <div className='benefits'>Quyền lợi thành viên VIP:</div>
          <p className='block'>
            <div>
              <Check /> <span>Liệu trình chăm sóc da cá nhân hóa dựa trên phân tích AI</span>
            </div>
            <div>
              <Check /> <span>Ưu tiên tiếp cận sản phẩm chăm sóc da mới và độc quyền</span>
            </div>
            <div>
              <Check /> <span>Theo dõi tiến trình mỗi tháng và được AI nhắc lịch</span>
            </div>
            <div>
              <Check /> <span>Hỗ trợ chăm sóc da 24/7 và tư vấn khẩn cấp</span>
            </div>
          </p>
          <button className='joinServiceBtn' onClick={() => navigate('/payment-page')}>Tham gia ngay</button>
        </div>
      </motion.div>
      <div className='canvas'>
        <div className='bubble'></div>
        <div className='bubble'></div>
        <div className='bubble'></div>
        <div className='bubble'></div>
        <div className='bubble'></div>
        <div className='bubble'></div>
        <div className='bubble'></div>
        <div className='bubble'></div>
        <div className='bubble'></div>
        <div className='bubble'></div>
        <div className='bubble'></div>
        <div className='bubble'></div>
        <div className='bubble'></div>
        <div className='bubble'></div>
        <div className='bubble'></div>
        <div className='bubble'></div>
        <div className='bubble'></div>
        <div className='bubble'></div>
        <div className='bubble'></div>
        <div className='bubble'></div>
        <div className='bubble'></div>
        <div className='bubble'></div>
        <div className='bubble'></div>
        <div className='bubble'></div>
        <div className='bubble'></div>
        <div className='bubble'></div>
        <div className='bubble'></div>
        <div className='bubble'></div>
        <div className='bubble'></div>
        <div className='bubble'></div>
        <div className='bubble'></div>
        <div className='bubble'></div>
        <div className='bubble'></div>
        <div className='bubble'></div>
        <div className='bubble'></div>
        <div className='bubble'></div>
        <div className='bubble'></div>
        <div className='bubble'></div>
        <div className='bubble'></div>
        <div className='bubble'></div>
        <div className='bubble'></div>
        <div className='bubble'></div>
        <div className='bubble'></div>
        <div className='bubble'></div>
        <div className='bubble'></div>
        <div className='bubble'></div>
        <div className='bubble'></div>
        <div className='bubble'></div>
        <div className='bubble'></div>
        <div className='bubble'></div>
      </div>
    </div>
  )
}
