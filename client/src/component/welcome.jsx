import { Typography, Box, Button, useMediaQuery } from "@mui/material";
import { v4 as uuidv4 } from "uuid";
import jervontis from "../../public/jervontis.mp3";
import { useEffect, useState } from "react";

function WelcomePage() {
  const uniqueId = uuidv4();
  const isMobile2 = useMediaQuery("(max-width: 704px)");

  const [open, setOpen] = useState(true);

  useEffect(() => {
    const sound = new Audio(jervontis);

    if (!open) {
      sound.play().catch((error) => {
        console.error("Audio play error:", error);
      });

      return () => {
        sound.pause();
        sound.currentTime = 0;
      };
    }
  }, [open]);

  const handleClose = () => {
    setOpen(false);
  };

  const onClick = () => {
    localStorage.setItem("userId", JSON.stringify(uniqueId));
    window.location.href = "/";
  };
  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        gap: isMobile2 ? "1rem" : "1.5rem",
        background:
          "radial-gradient(circle, rgba(40,0,80,1) 20%, rgba(0,0,0,1) 90%)", // Darker violet center, black at the edges
      }}
    >
      {!open && (
        <Typography
          variant="h2"
          sx={{
            color: "white", // Text itself is transparent so the gradient shows through
            fontWeight: "bold",
            fontSize: isMobile2 && "28px",
            opacity: 0,
            transform: "translateY(20px)", // Start 20px below
            animation: "fadeInFromBottom 2s ease-out forwards", // Set to 2 seconds
            "@keyframes fadeInFromBottom": {
              "0%": {
                opacity: 0,
                transform: "translateY(20px)", // Start 20px below
              },
              "100%": {
                opacity: 1,
                transform: "translateY(0)", // Final position (no vertical movement)
              },
            },
          }}
        >
          Welcome, To{" "}
          <Typography
            component="span"
            variant="h2"
            sx={{
              color: "magenta", // Text itself is transparent so the gradient shows through
              fontWeight: "bold",
              fontSize: isMobile2 && "28px",
            }}
          >
            Jervontis
          </Typography>
        </Typography>
      )}
      {!open && (
        <Typography
          variant="body2"
          sx={{
            color: "rgba(255, 255, 255, 0.8)",
            fontWeight: "lighter",
            fontSize: isMobile2 ? "10px" : "24px",
            letterSpacing: "0.2rem",
            opacity: 0,
            transform: "translateY(20px)",
            animation: "fadeInFromBottom 1s ease-out 2s forwards", // 2s duration, 1s delay
            "@keyframes fadeInFromBottom": {
              "0%": {
                opacity: 0,
                transform: "translateY(20px)", // Start 20px below
              },
              "100%": {
                opacity: 1,
                transform: "translateY(0)", // Final position (no vertical movement)
              },
            },
          }}
        >
          Where Innovation Meets Intelligence
        </Typography>
      )}
      <Button
        onClick={open ? handleClose : onClick}
        sx={{
          backgroundColor: "magenta",
          color: "white",
          fontWeight: "bold",
          fontSize: isMobile2 ? ".8rem " : "1.2rem",
          padding: isMobile2 ? ".5rem 1rem" : "1rem 1.5rem",
          borderRadius: isMobile2 ? ".5rem" : "1rem",
          opacity: !open && 0,
          transform: !open && "translateY(20px)",
          animation: !open && "fadeInFromBottom 1s ease-out 6s forwards", // 2s duration, 1s delay
          "@keyframes fadeInFromBottom": {
            "0%": {
              opacity: !open && 0,
              transform: !open && "translateY(20px)", // Start 20px below
            },
            "100%": {
              opacity: 1,
              transform: !open && "translateY(0)", // Final position (no vertical movement)
            },
          },
        }}
      >
        {open ? "Welcome to the experience" : "Get Started"}
      </Button>
    </Box>
  );
}

export default WelcomePage;
