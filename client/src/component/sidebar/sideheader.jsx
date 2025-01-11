import { Box } from "@mui/material";
import { BsLayoutSidebarInset } from "react-icons/bs";
// import { IoSearch } from "react-icons/io5";
import propTypes from "prop-types";

function SideHeader({ isMobile }) {
  return (
    <Box
      sx={{
        height: "40px",
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "1rem 2rem 1rem 1rem",
        boxSizing: "border-box",
      }}
    >
      {!isMobile && (
        <Box
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
          <BsLayoutSidebarInset size={"20px"} color="rgba(10, 0, 21, 0.8)" />
        </Box>
      )}
      {/* <Box
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
        <IoSearch
          size={isMobile ? "16px" : "20px"}
          color="rgba(10, 0, 21, 0.8)"
        />
      </Box> */}
    </Box>
  );
}

export default SideHeader;

SideHeader.propTypes = {
  isMobile: propTypes.any,
};
