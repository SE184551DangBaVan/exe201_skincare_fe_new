import { Typography, Box, useTheme } from "@mui/material";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import axios from "axios";

const ExcelAccess = ({ icon, title, link, fname }) => {
  const theme = useTheme();
  const motionValue = useMotionValue(0);
  const spring = useSpring(motionValue, { stiffness: 100, damping: 30 });

  const handleDownload = async () => {
    try {
        console.log("Link", link);
        const response = await axios.get(link, {
        withCredentials: true,
        responseType: 'blob',
        });

        const blob = new Blob([response.data], {
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        });

        let filename = `${fname}`;
        console.log("Initial fname prop:", filename);

        const contentDisposition = response.headers['content-disposition'];
        if (contentDisposition) {
        const fileNameMatch = contentDisposition.match(/filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/);
        if (fileNameMatch && fileNameMatch[1]) {
            filename = fileNameMatch[1].replace(/['"]/g, ''); // Remove quotes if any
        }
        }
        console.log("Resolved filename:", filename);


        const url = window.URL.createObjectURL(blob);
        const downloadLink = document.createElement('a');
        downloadLink.href = url;
        downloadLink.setAttribute('download', filename);

        document.body.appendChild(downloadLink);
        downloadLink.click();
        downloadLink.remove();
        window.URL.revokeObjectURL(url);
    } catch (error) {
        console.error("Download failed:", error.response || error.message || error);
    }
    };


  return (
    <Box className="trackerBox" padding={5}>
      <div className="folder" style={{display: 'flex', justifyContent: 'end', overflow: 'hidden'}}>
        {icon}
        <div className="downloadButton" onClick={handleDownload} style={{fontWeight: "700", zIndex: "-10", position: "absolute" }}>
          <div className="downloadText">Download</div>
        </div>
      </div>
      <Typography fontSize={18} fontWeight={600} color="black" sx={{ margin: "0 0 65px 0", padding: '10px' }} 
                  boxShadow='0 0px 4px rgba(0,0,0,0.5)'>
        {title}
      </Typography>
    </Box>
  );
};

export default ExcelAccess;