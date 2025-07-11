import { Typography, Box, useTheme } from "@mui/material";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useEffect, useState } from "react";

const SalesTracker = ({ icon, title, number, profit, available, currency }) => {
  const theme = useTheme();
  const motionValue = useMotionValue(0);
  const spring = useSpring(motionValue, { stiffness: 100, damping: 30 });
  const rounded = useTransform(spring, latest => Math.floor(latest));

  const [formattedNumber, setFormattedNumber] = useState("0");

  useEffect(() => {
    motionValue.set(number);
  }, [number]);

  useEffect(() => {
    const unsubscribe = rounded.on("change", latest => {
      setFormattedNumber(new Intl.NumberFormat('vi-VN').format(latest));
    });
    return () => unsubscribe(); // Cleanup on unmount
  }, []);

  return (
    <div className="salesTrackerContainer">
      <div className="ambientShadow" />
      <Box className="salesTrackerBox" padding={5}>
        {icon}
        <motion.div style={{ maxWidth: '80%', minWidth: '80%', minHeight: '50px', fontSize: '28px', fontWeight: '600', color: "black", 
          display: 'flex', flexDirection: 'row', alignItems: 'baseline', justifyContent: 'space-evenly', overflowX: 'auto', overflowY: 'hidden' }}>
          {formattedNumber} {currency && <span className="salesTrackerCurrncy"> VND</span>}
        </motion.div>
        <Typography fontSize={14} fontWeight={200} color="darkgray" sx={{ m: "0 0 20px 0" }}>
          {title}
        </Typography>
        <Typography fontSize={10} fontWeight={200} sx={{ m: "0 0 20px 0" }} className={available ? "" : "unavailable"}>
          {profit}
        </Typography>
      </Box>
    </div>
  );
};

export default SalesTracker;