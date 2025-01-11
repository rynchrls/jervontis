import { Box, Button, Tooltip, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { FaBrain } from "react-icons/fa";
import { PiWarningCircle } from "react-icons/pi";
import propTypes from "prop-types";
import { BsLayoutSidebarInset } from "react-icons/bs";

function MainHeader({ generates, isMobile, setOpen }) {
  const [gen, setGen] = useState(0);
  useEffect(() => {
    setGen(generates);
  }, [generates]);
  return (
    <Box
      sx={{
        width: "100%",
        height: "40px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: isMobile ? "1rem" : "2rem",
        boxSizing: "border-box",
        position: "sticky",
        top: 0,
        backgroundColor: "white",
        zIndex: 1,
        flexDirection: isMobile && "row-reverse",
      }}
    >
      <Typography
        variant={isMobile ? "h6" : "h5"}
        sx={{
          background:
            "radial-gradient(circle, rgba(40,0,80,1) 30%, rgba(0,0,0,1) 90%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          fontWeight: "bold",
          fontSize: isMobile && "18px",
        }}
      >
        Jervontis
      </Typography>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "0.5rem",
        }}
      >
        <Typography
          variant="body2"
          sx={{ fontSize: isMobile ? "10px" : "12px" }}
        >
          {gen} generate(s) left.
        </Typography>
        <Tooltip
          title="Contact the admin to get more generates/response."
          arrow
        >
          <Button
            disableRipple
            sx={{
              minWidth: "unset", // Remove default button width
              padding: 0, // Remove padding around the icon
            }}
          >
            <PiWarningCircle size={"16px"} color="rgba(10, 0, 21, 0.8)" />
          </Button>
        </Tooltip>
      </Box>
      {!isMobile ? (
        <Box>
          <FaBrain size={"24px"} color="magenta" />
        </Box>
      ) : (
        <Box
          onClick={() => setOpen(true)}
          sx={{
            borderRadius: "8px", // Optional for rounded corners
            "&:hover": {
              background: "rgba(20,0,20,0.1)", // Darker gradient on hover
            },
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxSizing: "border-box",
            padding: "8px",
            cursor: "pointer",
          }}
        >
          <BsLayoutSidebarInset
            size={isMobile ? "16px" : "20px"}
            color="rgba(10, 0, 21, 0.8)"
          />
        </Box>
      )}
    </Box>
  );
}

export default MainHeader;

MainHeader.propTypes = {
  generates: propTypes.number,
  isMobile: propTypes.any,
  setOpen: propTypes.func,
};
