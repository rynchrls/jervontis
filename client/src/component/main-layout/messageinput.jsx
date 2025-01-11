import { Box, Button, TextField, Typography } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { IoSendOutline } from "react-icons/io5";
import propTypes from "prop-types";
import { generateResponse } from "../../api/connectToBE";
import { useNavigate, useParams } from "react-router-dom";
import { PiWarningCircle } from "react-icons/pi";

function MessageInput({
  created,
  selectedConvo,
  setMessages,
  setAnimate,
  setLoadingMessage,
  reachedLimit,
  generates,
  isMobile,
  isMobile2,
  loadingMessage,
}) {
  const [value, setValue] = useState("");
  const textAreaRef = useRef(null);
  const navigate = useNavigate();
  const totalGenerates = JSON.parse(localStorage.getItem("generates"));

  const { cId } = useParams();

  useEffect(() => {
    if (created && textAreaRef.current) {
      textAreaRef.current.focus();
    }
  }, [created]);

  const handleKeyDown = async (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      if (value.trim() === "" || loadingMessage) return;
      try {
        setMessages((prev) => [
          ...prev,
          { from: "user", message: value },
          { from: "assistant", message: "" },
        ]);
        setValue(""); // Reset the TextField
        setLoadingMessage(true);
        const { data } = await generateResponse(
          value,
          selectedConvo?._id || cId
        );
        if (data.message === "successful") {
          setTimeout(() => {
            // setConversation((prev) => [{ ...data?.data?.conversation }, ...prev]);
            setMessages((prev) => {
              const filter = prev.filter((obj) => obj.message !== "");
              return [
                ...filter,
                {
                  from: "assistant",
                  message: data?.data?.message.message,
                },
              ];
            });
            // setSelectedConvo({ ...data?.data?.conversation });
            setLoadingMessage(false);
            setAnimate(true);
            if (cId !== data?.data?.conversation._id)
              navigate(`/${data?.data?.conversation._id}`);
          }, 100);
          const deduct = totalGenerates - 1;
          localStorage.setItem("generates", JSON.stringify(deduct));
        }
      } catch {
        setTimeout(() => {
          // setConversation((prev) => [{ ...data?.data?.conversation }, ...prev]);
          setMessages((prev) => {
            const filter = prev.filter((obj) => obj.message !== "");
            return [
              ...filter,
              {
                from: "assistant",
                message: "Something went wrong!",
                error: true,
              },
            ];
          });
          // setSelectedConvo({ ...data?.data?.conversation });
          setLoadingMessage(false);
          setAnimate(true);
          // navigate(`/${data?.data?.conversation._id}`);
        }, 100);
        const deduct = totalGenerates - 1;
        localStorage.setItem("generates", JSON.stringify(deduct));
      }
    }
  };

  // const handleKeyDown = async (e) => {
  //   if (e.key === "Enter") {
  //     if (!e.shiftKey) {
  //       console.log("clicked");
  //       // const { data } = await generateResponse(value, selectedConvo?._id);
  //       // if (data.message === "successful") {
  //       //   setConversation((prev) => [{ ...data?.data?.conversation }, ...prev]);
  //       //   setMessages((prev) => [...prev, { ...data?.data?.message }]);
  //       //   setSelectedConvo({ ...data?.data?.conversation });
  //       // }
  //       if (textAreaRef.current) {
  //         textAreaRef.current.value = ""; // Reset the value of the textarea
  //         textAreaRef.current.rows = 1; // Reset the rows to 1
  //       }
  //     }
  //   }
  // };

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  return (
    <>
      {reachedLimit ? (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: isMobile ? (isMobile2 ? "10px" : "12px") : "16px",
            backgroundColor: "rgba(255, 235, 235, 0.8)", // Light red background
            border: "1px solid rgba(255, 0, 0, 0.5)", // Red border
            borderRadius: isMobile ? (isMobile2 ? "4px" : "6px") : "8px", // Rounded corners
            maxWidth: isMobile ? (isMobile2 ? "200px" : "300px") : "400px", // Constrain width
            margin: isMobile
              ? isMobile2
                ? "8px auto"
                : "12px auto"
              : "16px auto", // Centered horizontally
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)", // Subtle shadow
          }}
        >
          <Button
            disableRipple
            sx={{
              minWidth: "unset",
              padding: 0,
              marginBottom: isMobile ? (isMobile2 ? "4px" : "6px ") : "8px", // Space between icon and text
              backgroundColor: "transparent",
              "&:hover": {
                backgroundColor: "transparent", // Prevent hover effect
              },
            }}
          >
            <PiWarningCircle
              size={isMobile ? (isMobile2 ? "16px" : "24px") : "32px"}
              color="rgba(255, 0, 0, 0.8)"
            />
          </Button>
          <Typography
            sx={{
              textAlign: "center",
              color: "rgba(150, 0, 0, 0.9)", // Dark red text
              fontSize: isMobile ? (isMobile2 ? "10px" : "12px") : "14px",
              fontWeight: "bold",
            }}
          >
            Messages exceed the limit. Please create a new conversation to
            continue.
          </Typography>
        </Box>
      ) : generates === 0 ? (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: isMobile ? (isMobile2 ? "10px" : "12px") : "16px",
            backgroundColor: "rgba(255, 235, 235, 0.8)", // Light red background
            border: "1px solid rgba(255, 0, 0, 0.5)", // Red border
            borderRadius: isMobile ? (isMobile2 ? "4px" : "6px") : "8px", // Rounded corners
            maxWidth: isMobile ? (isMobile2 ? "200px" : "300px") : "400px", // Constrain width
            margin: isMobile
              ? isMobile2
                ? "8px auto"
                : "12px auto"
              : "16px auto", // Centered horizontally
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)", // Subtle shadow
          }}
        >
          <Button
            disableRipple
            sx={{
              minWidth: "unset",
              padding: 0,
              marginBottom: isMobile ? (isMobile2 ? "4px" : "6px ") : "8px", // Space between icon and text
              backgroundColor: "transparent",
              "&:hover": {
                backgroundColor: "transparent", // Prevent hover effect
              },
            }}
          >
            <PiWarningCircle
              size={isMobile ? (isMobile2 ? "16px" : "24px") : "32px"}
              color="rgba(255, 0, 0, 0.8)"
            />
          </Button>
          <Typography
            sx={{
              textAlign: "center",
              color: "rgba(150, 0, 0, 0.9)", // Dark red text
              fontSize: isMobile ? (isMobile2 ? "10px" : "12px") : "14px",
              fontWeight: "bold",
            }}
          >
            Generates exceed the limit. Come back tomorrow or contact the admin.
          </Typography>
        </Box>
      ) : (
        <Box
          sx={{
            width: isMobile ? (isMobile2 ? "90%" : "70%") : "60%",
            height: "auto",
            backgroundColor: "#f0f0f0",
            borderRadius: "12px",
            boxSizing: "border-box",
            padding: isMobile
              ? isMobile2
                ? "4px 32px 4px 0px"
                : "6px 48px 6px 0px"
              : "8px 56px 8px 0px",
            position: "relative",
          }}
        >
          <TextField
            inputRef={textAreaRef}
            onKeyDown={handleKeyDown}
            multiline
            value={value}
            onChange={handleChange}
            maxRows={4}
            placeholder="Type your message..."
            variant="outlined"
            sx={{
              width: "100%",
              borderRadius: "12px",
              "& textarea": {
                resize: "none",
                overflowY: "auto",
                fontSize: isMobile ? (isMobile2 ? "12px" : "14px") : "16px",
              },
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: "rgba(40, 0, 80, 0.5)",
                },
                "&:hover fieldset": {
                  borderColor: "rgba(40, 0, 80, 0.7)",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "rgba(40, 0, 80, 1)", // Optional: Adjust focused border
                },
              },
              "& .MuiOutlinedInput-root.Mui-focused": {
                boxShadow: "none", // Removes box shadow on focus
                borderColor: "transparent", // Makes border transparent on focus
              },
              "& .MuiOutlinedInput-notchedOutline": {
                border: "none", // Optional: Remove border entirely if preferred
              },
            }}
          />
          {value !== "" && (
            <Box
              sx={{
                position: "absolute",
                right: "12px",
                bottom: "14px",
                background:
                  "radial-gradient(circle, rgba(40,0,80,1) 30%, rgba(0,0,0,1) 90%)",
                borderRadius: "50%", // Makes the Box circular
                padding: isMobile ? (isMobile2 ? "6px" : "8px") : "10px", // Adds space around the icon
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
              }}
            >
              <IoSendOutline
                size={isMobile ? (isMobile2 ? "14px" : "16px") : "18px"}
                color="white"
              />
            </Box>
          )}
        </Box>
      )}
    </>
  );
}

export default MessageInput;

MessageInput.propTypes = {
  created: propTypes.bool,
  selectedConvo: propTypes.object,
  setConversation: propTypes.func,
  setSelectedConvo: propTypes.func,
  setMessages: propTypes.func,
  setAnimate: propTypes.func,
  setLoadingMessage: propTypes.func,
  messages: propTypes.array,
  viewRef: propTypes.any,
  reachedLimit: propTypes.bool,
  generates: propTypes.number,
  isMobile: propTypes.any,
  isMobile2: propTypes.any,
  loadingMessage: propTypes.bool,
};
