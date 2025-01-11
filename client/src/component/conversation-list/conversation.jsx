import { Stack, Typography } from "@mui/material";
// import { SlOptions } from "react-icons/sl";
import propTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { FaTrash } from "react-icons/fa";
import { delConvo } from "../../api/connectToBE";

function Conversation({
  data,
  selectedConvo,
  setSelectedConvo,
  setReachedLimit,
  messages,
  isMobile,
  setConversation,
  setMessages,
  setOpen,
}) {
  const maxLength = 20; // Maximum length for display
  const navigate = useNavigate();

  const truncateText = (text, maxLength) => {
    return text?.length > maxLength ? text?.slice(0, maxLength) + "..." : text;
  };

  const selectConversation = () => {
    setSelectedConvo({ ...data });
    setOpen(false);
    navigate(`/${data?._id}`, { replace: true });
    if (messages?.length === 30) {
      setReachedLimit(true);
    } else {
      setReachedLimit(false);
    }
  };

  const remove = async (convoId) => {
    const { data } = await delConvo(convoId);
    if (data?.message === "successful") {
      setConversation((prev) => {
        if (selectedConvo?._id === convoId) {
          setSelectedConvo({});
          setMessages([]);
          navigate(`/`, { replace: true });
          const filter = prev.filter((data) => data._id !== convoId);
          return [...filter];
        } else {
          const filter = prev.filter((data) => data._id !== convoId);
          return [...filter];
        }
      });
    }
  };

  return (
    <Stack
      onClick={selectConversation}
      direction="row"
      alignItems="center"
      justifyContent="space-between"
      gap={2}
      sx={{
        width: isMobile ? "90%" : "210px",
        height: "auto",
        padding: isMobile ? "10px 10px 10px 6px" : "12px 12px 12px 8px",
        borderRadius: "8px",
        cursor: "pointer",
        "&:hover": {
          backgroundColor: "rgba(40,0,80,0.07)",
        },
        backgroundColor:
          data?.title === selectedConvo?.title
            ? "rgba(40,0,80,0.05)"
            : "transparent",
      }}
    >
      <Typography
        variant="body1"
        sx={{
          fontSize: isMobile ? "12px" : "14px",
          fontWeight: "normal",
          letterSpacing: "0.25px",
        }}
      >
        {truncateText(data?.title, maxLength)}
      </Typography>
      <FaTrash
        onClick={() => remove(data._id)}
        size={"12px"}
        color="rgba(40,0,80,0.6)"
      />
    </Stack>
  );
}

export default Conversation;

Conversation.propTypes = {
  data: propTypes.object,
  selectedConvo: propTypes.object,
  setSelectedConvo: propTypes.func,
  setReachedLimit: propTypes.func,
  messages: propTypes.array,
  isMobile: propTypes.any,
  setConversation: propTypes.func,
  setMessages: propTypes.func,
  setOpen: propTypes.func,
};
