import { Box, Typography } from "@mui/material";
import MessageContainer from "./messagecontainer";
import propTypes from "prop-types";
import AnimationIcon from "../animation";

function ChatContainer({
  messages,
  animate,
  setAnimate,
  loadingMessage,
  viewRef,
  fetchedMessage,
  desktop1,
  isMobile2,
}) {
  return (
    <Box
      sx={{
        flexGrow: 1,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        position: "relative",
        gap: messages?.length > 0 ? "0px" : "32px",
        padding: "0rem 0rem 2.5rem 0rem",
        width: "100%",
        boxSizing: "border-box",
      }}
    >
      {fetchedMessage ? (
        <AnimationIcon />
      ) : !fetchedMessage && messages && messages?.length > 0 ? (
        <MessageContainer
          messages={messages}
          animate={animate}
          setAnimate={setAnimate}
          loadingMessage={loadingMessage}
          viewRef={viewRef}
          fetchedMessage={fetchedMessage}
          desktop1={desktop1}
          isMobile2={isMobile2}
        />
      ) : (
        <Typography
          variant="h2"
          sx={{
            fontSize: isMobile2 ? "16px" : "24px",
            fontWeight: "bold",
            background:
              "radial-gradient(circle, rgba(40,0,80,1) 30%, rgba(0,0,0,1) 90%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          I will give you knowledge, ask anything.
        </Typography>
      )}
    </Box>
  );
}

export default ChatContainer;

ChatContainer.propTypes = {
  messages: propTypes.array,
  animate: propTypes.bool,
  setAnimate: propTypes.func,
  loadingMessage: propTypes.bool,
  viewRef: propTypes.any,
  fetchedMessage: propTypes.bool,
  desktop1: propTypes.any,
  isMobile2: propTypes.any,
};
