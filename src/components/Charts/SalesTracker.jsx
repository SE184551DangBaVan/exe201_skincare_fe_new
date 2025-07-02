import { Typography, Box, useTheme } from "@mui/material";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useEffect } from "react";

const SalesTracker = ({ icon, title, number, profit, available }) => {
  const theme = useTheme();
  const motionValue = useMotionValue(0);
  const spring = useSpring(motionValue, { stiffness: 100, damping: 30 });
  const rounded = useTransform(spring, latest => Math.floor(latest));

  useEffect(() => {
    motionValue.set(number);
  }, [number]);

  return (
    <div className="salesTrackerContainer">
      <div className="ambientShadow" />
      <Box className="salesTrackerBox" padding={5}>
          {icon}
        <motion.div style={{fontSize: '28px', fontWeight: '600', color: "black"}} >
          {rounded}
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