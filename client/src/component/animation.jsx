import { Box } from "@mui/material";

function AnimationIcon() {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gap: "8px",
      }}
    >
      {Array.from({ length: 3 }).map((_, index) => (
        <Box
          key={index}
          sx={{
            width: "8px",
            height: "8px",
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(40,0,80,1) 30%, rgba(0,0,0,1) 90%)",
            animation: "dotFlashing 1.5s infinite",
            animationDelay: `${index * 0.3}s`,
          }}
        />
      ))}

      {/* CSS Keyframes */}
      <style>
        {`
      @keyframes dotFlashing {
        0% { opacity: 0.3; }
        50% { opacity: 1; }
        100% { opacity: 0.3; }
      }
    `}
      </style>
    </Box>
  );
}

export default AnimationIcon;
