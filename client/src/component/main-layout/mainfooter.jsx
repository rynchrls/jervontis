import { Typography } from "@mui/material";

function MainFooter() {
  return (
    <Typography
      variant="body1"
      sx={{
        fontSize: "12px",
        color: "rgba(10, 0, 21, 0.5)",
        fontWeight: "medium",
        position: "absolute",
        bottom: "8px",
        backgroundColor: "white",
        width: "100%",
        textAlign: "center",
      }}
    >
      This is just a personal project.
    </Typography>
  );
}

export default MainFooter;
