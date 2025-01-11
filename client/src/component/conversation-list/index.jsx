import { Box, CircularProgress, Stack, Typography } from "@mui/material";
// import Conversation from "./conversation";
import notfound from "../../../public/notfound.png";
import Conversation from "./conversation";
import { useEffect, useState } from "react";
import propTypes from "prop-types";
import { fetchConversations } from "../../api/connectToBE";
import { useParams } from "react-router-dom";

function ConversationList({
  conversation,
  setConversation,
  selectedConvo,
  setSelectedConvo,
  setReachedLimit,
  messages,
  isMobile,
  setMessages,
  setOpen,
}) {
  const [loading, setLoading] = useState(true);
  const { cId } = useParams();

  useEffect(() => {
    const fetch = async () => {
      setLoading(true);
      const { data } = await fetchConversations();
      if (data?.message === "successful") {
        setConversation(data?.data.conversation);
        setLoading(false);
      }
    };
    fetch();
  }, [setConversation]);

  useEffect(() => {
    if (cId) {
      setSelectedConvo(() => {
        const filter = conversation?.find((data) => data._id === cId);
        return { ...filter };
      });
    }
  }, [cId, conversation, setSelectedConvo]);

  return (
    <Box
      sx={{
        padding: isMobile ? "0rem .5rem 0rem .5rem" : "0rem 1rem 0rem 1rem",
        height: "100%",
      }}
    >
      <Box>
        <Typography
          sx={{
            alignSelf: "flex-start", // Aligns to the start of the flex container
            width: "100%", // Ensures it spans the full width
            textAlign: "left", // Aligns text to the left
            fontWeight: "bold",
            fontSize: isMobile ? "12px" : "14px",
            color: "rgba(10, 0, 21, 0.8)",
            padding: "8px 0px",
          }}
        >
          Conversations
        </Typography>
      </Box>
      <Box
        sx={{
          height: conversation && conversation?.length > 0 ? "100" : "80%",
        }}
      >
        {conversation && conversation?.length > 0 ? (
          <Stack
            direction="column"
            alignItems="start"
            justifyContent="center"
            boxSizing="border-box"
          >
            {conversation &&
              conversation.map((data, idx) => (
                <Conversation
                  data={data}
                  key={idx}
                  selectedConvo={selectedConvo}
                  setSelectedConvo={setSelectedConvo}
                  setReachedLimit={setReachedLimit}
                  messages={messages}
                  isMobile={isMobile}
                  setConversation={setConversation}
                  setMessages={setMessages}
                  setOpen={setOpen}
                />
              ))}
          </Stack>
        ) : loading ? (
          <Box
            sx={{
              textAlign: "center",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxSizing: "border-box",
              flexDirection: "column",
              height: "90%",
            }}
          >
            <CircularProgress
              size={32} // Custom size (default is 40px)
              thickness={4} // Adjusts the thickness of the spinner
              color="secondary" // Can be primary, secondary, or inherit
            />
          </Box>
        ) : (
          <Box
            sx={{
              textAlign: "center",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxSizing: "border-box",
              flexDirection: "column",
              height: "90%",
            }}
          >
            <img
              src={notfound} // Use the correct path to your image
              alt="No Data"
              style={{
                width: "40px", // Adjust the size of the image
                height: "auto",
                marginBottom: "20px",
              }}
            />
            <Typography variant="body1" sx={{ fontWeight: "normal" }}>
              No Data Available
            </Typography>
          </Box>
        )}
      </Box>
    </Box>
  );
}

export default ConversationList;

ConversationList.propTypes = {
  conversation: propTypes.array,
  setConversation: propTypes.func,
  selectedConvo: propTypes.object,
  setSelectedConvo: propTypes.func,
  setReachedLimit: propTypes.func,
  messages: propTypes.array,
  isMobile: propTypes.any,
  setMessages: propTypes.func,
  setOpen: propTypes.func,
};
