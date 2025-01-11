import { Box, Button, Typography } from "@mui/material";
import { FaRegEdit } from "react-icons/fa";
import propTypes from "prop-types";
import { useNavigate } from "react-router-dom";

function CreateConvo({
  setMessages,
  setCreated,
  setSelectedConvo,
  setReachedLimit,
  isMobile,
  setOpen,
}) {
  const navigate = useNavigate();
  const onClick = () => {
    setOpen(false);
    setMessages([]);
    setCreated(true);
    navigate("/", { replace: true });
    setSelectedConvo({});
    setReachedLimit(false);
    // setConversations((prev) => {
    //   if (prev.some((data) => data.title === " ")) {
    //     return [...prev];
    //   } else {
    //     setSelectedConvo({
    //       user_id: userId,
    //       title: " ",
    //     });
    //     return [
    //       {
    //         user_id: userId,
    //         title: " ",
    //       },
    //       ...prev,
    //     ];
    //   }
    // });
  };

  return (
    <Box
      sx={{
        height: "40px",
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: isMobile ? "0rem .5rem " : "0rem 1rem",
        boxSizing: "border-box",
      }}
    >
      <Button
        onClick={onClick}
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "8px",
          background:
            "radial-gradient(circle, rgba(40,0,80,1) 30%, rgba(0,0,0,1) 90%)",
          color: "white",
          padding: isMobile ? "10px 16px" : "12px 20px",
          borderRadius: "8px",
          boxSizing: "border-box",
          transition: "background 0.3s ease, transform 0.2s ease",
          "&:hover": {
            background:
              "radial-gradient(circle, rgba(60,0,120,1) 30%, rgba(10,0,30,1) 70%)", // Richer violet blend
            transform: "scale(1.05)", // Slight scale for hover feedback
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.4)", // Subtle shadow for depth
          },
        }}
      >
        <Typography
          sx={{
            color: "white", // Text color on gradient
            textTransform: "none", // Prevent uppercase
            fontWeight: "medium",
            fontSize: isMobile ? "10px" : "12px",
          }}
          variant="body2"
        >
          Create Conversation
        </Typography>
        <FaRegEdit size={isMobile ? "13px" : "16px"} color="white" />
      </Button>
    </Box>
  );
}

export default CreateConvo;

CreateConvo.propTypes = {
  setSelectedConvo: propTypes.func,
  setConversations: propTypes.func,
  setMessages: propTypes.func,
  setCreated: propTypes.func,
  setReachedLimit: propTypes.func,
  isMobile: propTypes.any,
  setOpen: propTypes.func,
};
