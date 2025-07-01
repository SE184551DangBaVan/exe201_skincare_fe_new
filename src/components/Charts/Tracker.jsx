import { Typography, Box, useTheme } from "@mui/material";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useEffect } from "react";

const Tracker = ({ icon, title, number }) => {
  const theme = useTheme();
  const motionValue = useMotionValue(0);
  const spring = useSpring(motionValue, { stiffness: 100, damping: 30 });
  const rounded = useTransform(spring, latest => Math.floor(latest));

  useEffect(() => {
    motionValue.set(number);
  }, [number]);

  return (
    <Box className="trackerBox" padding={5}>
      <div className="folder" style={{display: 'flex', justifyContent: 'end', overflow: 'hidden'}}>
        {icon}
        <motion.div style={{fontSize: "36px", fontWeight: "700", maxWidth: '80%', color: "cadetblue", margin: "20px 20px 0 0", zIndex: "-10", position: "absolute", overflowWrap: 'break-word'}}>
          {rounded}
        </motion.div>
      </div>
      <Typography fontSize={18} fontWeight={600} color="black" sx={{ margin: "0 0 50px 0", padding: '5px' }} 
                  boxShadow='0 0px 4px rgba(0,0,0,0.5)'>
        {title}
      </Typography>
    </Box>
  );
};

export default Tracker;