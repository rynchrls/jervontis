import { Box, Stack } from "@mui/material";
import propTypes from "prop-types";
import MessageBox from "./message";
import { useEffect } from "react";

function MessageContainer({
  messages,
  animate,
  setAnimate,
  loadingMessage,
  viewRef,
  desktop1,
  isMobile2,
}) {
  useEffect(() => {
    // const isAtBottom =
    //   viewRef?.current?.scrollHeight - viewRef?.current?.scrollTop ===
    //   viewRef?.current?.clientHeight;

    // // If the user is at the bottom, we can scroll to the bottom after the messages change
    // if (isAtBottom) {
    setTimeout(() => {
      viewRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 20); // Adding a slight delay to allow the DOM to update
  }, [messages, viewRef]);

  return (
    <Box
      sx={{
        flexGrow: 1,
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Stack
        sx={{
          position: "relative",
          width: desktop1 ? (isMobile2 ? "88%" : "80%") : "80%",
          display: "flex",
          flexDirection: "column",
          gap: isMobile2 ? "16px" : "24px",
          boxSizing: "border-box",
        }}
      >
        {messages?.length > 0 &&
          messages.map((data, idx) => {
            const isLast = idx === messages.length - 1; // Determine if it's the last index
            return (
              <Box
                key={idx}
                sx={{
                  display: "flex",
                  justifyContent:
                    data.from === "assistant" ? "flex-start" : "flex-end", // Left for assistant, right for others
                  width: "auto",
                }}
              >
                <MessageBox
                  data={data}
                  isLast={isLast}
                  animate={animate}
                  setAnimate={setAnimate}
                  loadingMessage={loadingMessage}
                  desktop1={desktop1}
                  isMobile2={isMobile2}
                />
              </Box>
            );
          })}
        <div ref={viewRef}></div>
      </Stack>
    </Box>
  );
}

export default MessageContainer;

MessageContainer.propTypes = {
  messages: propTypes.array,
  animate: propTypes.bool,
  setAnimate: propTypes.func,
  loadingMessage: propTypes.bool,
  viewRef: propTypes.any,
  desktop1: propTypes.any,
  isMobile2: propTypes.any,
};
