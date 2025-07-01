import { Typography, useTheme } from "@mui/material";

const Header = ({ title, subtitle }) => {
  const theme = useTheme();
  return (
    <div className="headerContainer" >
      <Typography
        variant="h4"
        fontWeight="bold"
        sx={{ m: "0 0 5px 0" }}
      >
        {title}
      </Typography>
      <Typography variant="h5" >
        {subtitle}
      </Typography>
    </div>
  );
};

export default Header;