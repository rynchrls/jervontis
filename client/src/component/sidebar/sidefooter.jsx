import { Box, Stack, Typography } from "@mui/material";
import { FaBrain } from "react-icons/fa";
import propTypes from "prop-types";

function SideFooter({ isMobile }) {
  return (
    <Box
      sx={{
        width: "100%",
        height: "80px",
        display: "flex",
        justifyContent: "start",
        alignItems: "center",
        gap: "1rem",
        // backgroundColor: "greenyellow",
        background:
          "radial-gradient(circle, rgba(40,0,80,1) 30%, rgba(0,0,0,1) 90%)",
        padding: "1rem",
        boxSizing: "border-box",
      }}
    >
      <Box>
        <FaBrain size={isMobile ? "20px" : "24px"} color="magenta" />
      </Box>
      <Stack>
        <Typography
          sx={{ fontSize: isMobile ? "8px" : "10px", color: "white" }}
        >
          Powered by
        </Typography>
        <Typography
          sx={{
            fontSize: isMobile ? "11px" : "13px",
            fontWeight: "bold",
            color: "white",
            letterSpacing: "1px",
          }}
        >
          Artificial Intelligence
        </Typography>
      </Stack>
    </Box>
  );
}

export default SideFooter;

SideFooter.propTypes = {
  isMobile: propTypes.any,
};
