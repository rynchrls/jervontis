import { Box, Drawer, useMediaQuery } from "@mui/material";
// import SideHeader from "./sidebar/sideheader";
import CreateConvo from "./create-convo";
import ConversationList from "./conversation-list";
import SideFooter from "./sidebar/sidefooter";
import MainHeader from "./main-layout/mainheader";
import ChatContainer from "./main-layout/chatContainer";
import MessageInput from "./main-layout/messageinput";
import MainFooter from "./main-layout/mainfooter";
import { useEffect, useRef, useState } from "react";
import { fetchMessages } from "../api/connectToBE";
import { MdKeyboardDoubleArrowDown } from "react-icons/md";
import { useParams } from "react-router-dom";

function HomePage() {
  const totalGenerates = JSON.parse(localStorage.getItem("generates"));
  const [generates, setGenerates] = useState(0);

  useEffect(() => {
    if (totalGenerates === null) {
      localStorage.setItem("generates", JSON.stringify(20));
      setGenerates(20);
    } else {
      setGenerates(totalGenerates);
    }
  }, [totalGenerates]);

  const [conversations, setConversations] = useState([]);
  const [selectedConvo, setSelectedConvo] = useState({});
  const [messages, setMessages] = useState([]);
  const [created, setCreated] = useState(false);
  const [animate, setAnimate] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState(false);
  const viewRef = useRef(null);
  const convoRef = useRef(null);
  const messagesEndRef = useRef(null);
  const [fetchedMessage, setFetchedMessages] = useState(false);
  const [reachedLimit, setReachedLimit] = useState(false);

  const { cId } = useParams();

  // useEffect(() => {
  //   const fetch = async () => {
  //     setFetchedMessages(true);
  //     const { data } = await fetchMessages(selectedConvo?._id);
  //     if (data.message === "successful") {
  //       setMessages(data?.data?.message);
  //       setFetchedMessages(false);
  //     }
  //   };
  //   if (Object.keys(selectedConvo)?.length > 0) {
  //     fetch();
  //   }
  // }, [selectedConvo]);

  useEffect(() => {
    const fetch = async () => {
      setFetchedMessages(true);
      const { data } = await fetchMessages(cId);
      if (data.message === "successful") {
        setMessages(data?.data?.message);
        setFetchedMessages(false);
      }
    };
    if (cId) {
      fetch();
    }
  }, [cId]);

  const scrollDown = () => {
    if (messagesEndRef.current) {
      setTimeout(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
      }, 20); // Adding a slight delay to allow the DOM to update
    }
  };

  useEffect(() => {
    if (messages?.length === 30) {
      setReachedLimit(true);
    } else {
      setReachedLimit(false);
    }
  }, [messages]);

  // Responsiveness
  const [open, setOpen] = useState(false);
  const isMobile = useMediaQuery("(max-width: 966px)");
  const isMobile2 = useMediaQuery("(max-width: 704px)");
  const desktop1 = useMediaQuery("(max-width: 1300px)");

  const toggleDrawer = (open) => {
    setOpen(open);
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "start", // Horizontal alignment
        alignItems: "flex-start", // Align to the top of the container
        height: "100vh", // Full viewport height
        width: "100%",
        position: "relative",
      }}
    >
      {/* Sidebar */}
      {!isMobile && (
        <Box
          sx={{
            width: "260px", // Fixed width for the sidebar
            height: "100vh", // Ensure sidebar takes full viewport height
            position: "sticky", // Make the sidebar sticky
            top: 0, // Stick the sidebar to the top of its container
            zIndex: 10, // Ensure it stays above other content
          }}
        >
          <Box
            sx={{
              backgroundColor: "rgba(40,0,80,0.03)",
              height: "100%", // Sidebar will take full height
              width: "100%",
              boxSizing: "border-box",
              padding: "1rem 0rem 0rem 0rem",
              display: "flex",
              flexDirection: "column",
              gap: "2rem",
            }}
          >
            {/* <SideHeader /> */}
            <CreateConvo
              setConversations={setConversations}
              setSelectedConvo={setSelectedConvo}
              setMessages={setMessages}
              setCreated={setCreated}
              setReachedLimit={setReachedLimit}
              setOpen={setOpen}
            />
            <Box
              ref={convoRef}
              sx={{
                flexGrow: 1, // Take up available space
                width: "100%",
                height: "100%",
                overflowY: "auto", // Enables vertical scrolling
                "&::-webkit-scrollbar": {
                  width: "8px", // Set the width of the scrollbar
                },
                "&::-webkit-scrollbar-thumb": {
                  backgroundColor: "rgba(40, 0, 80, 0.5)", // Color of the scrollbar thumb
                  borderRadius: "4px", // Round the thumb corners
                },
                "&::-webkit-scrollbar-track": {
                  backgroundColor: "rgba(0, 0, 0, 0.1)", // Color of the scrollbar track
                },
              }}
            >
              <ConversationList
                conversation={conversations}
                setConversation={setConversations}
                selectedConvo={selectedConvo}
                setSelectedConvo={setSelectedConvo}
                setReachedLimit={setReachedLimit}
                messages={messages}
                setMessages={setMessages}
                setOpen={setOpen}
              />
              <div ref={convoRef}></div>
            </Box>
            <Box sx={{ width: "100%" }}>
              <SideFooter />
            </Box>
          </Box>
        </Box>
      )}
      {isMobile && (
        <Drawer
          anchor="left"
          open={open}
          onClose={() => toggleDrawer(false)}
          sx={{
            "& .MuiDrawer-paper": {
              width: "230px", // Set the width of the drawer
            },
          }}
        >
          <Box
            sx={{
              width: "100%", // Fixed width for the sidebar
              height: "100vh", // Ensure sidebar takes full viewport height
              position: "sticky", // Make the sidebar sticky
              top: 0, // Stick the sidebar to the top of its container
              zIndex: 10, // Ensure it stays above other content
            }}
          >
            <Box
              sx={{
                backgroundColor: "rgba(40,0,80,0.03)",
                height: "100%", // Sidebar will take full height
                width: "100%",
                boxSizing: "border-box",
                padding: "1rem 0rem 0rem 0rem",
                display: "flex",
                flexDirection: "column",
                gap: isMobile ? "1rem" : "2rem",
              }}
            >
              {/* <SideHeader isMobile={isMobile} /> */}
              <CreateConvo
                isMobile={isMobile}
                setConversations={setConversations}
                setSelectedConvo={setSelectedConvo}
                setMessages={setMessages}
                setCreated={setCreated}
                setReachedLimit={setReachedLimit}
                setOpen={setOpen}
              />
              <Box
                ref={convoRef}
                sx={{
                  flexGrow: 1, // Take up available space
                  width: "100%",
                  height: "100%",
                  overflowY: "auto", // Enables vertical scrolling
                  "&::-webkit-scrollbar": {
                    width: "8px", // Set the width of the scrollbar
                  },
                  "&::-webkit-scrollbar-thumb": {
                    backgroundColor: "rgba(40, 0, 80, 0.5)", // Color of the scrollbar thumb
                    borderRadius: "4px", // Round the thumb corners
                  },
                  "&::-webkit-scrollbar-track": {
                    backgroundColor: "rgba(0, 0, 0, 0.1)", // Color of the scrollbar track
                  },
                }}
              >
                <ConversationList
                  conversation={conversations}
                  setConversation={setConversations}
                  selectedConvo={selectedConvo}
                  setSelectedConvo={setSelectedConvo}
                  setReachedLimit={setReachedLimit}
                  messages={messages}
                  isMobile={isMobile}
                  setOpen={setOpen}
                />
                <div ref={convoRef}></div>
              </Box>
              <Box sx={{ width: "100%" }}>
                <SideFooter isMobile={isMobile} />
              </Box>
            </Box>
          </Box>
        </Drawer>
      )}
      {/* Main Content */}
      <Box
        sx={{
          flexGrow: 1,
          height: "100%",
          display: "flex",
          flexDirection: "column",
          overflowY: "auto", // Enable scrolling for the main content area
          position: "relative",
        }}
      >
        <MainHeader
          generates={generates}
          isMobile={isMobile}
          setOpen={setOpen}
        />
        <ChatContainer
          messages={messages}
          animate={animate}
          setAnimate={setAnimate}
          loadingMessage={loadingMessage}
          viewRef={viewRef}
          fetchedMessage={fetchedMessage}
          desktop1={desktop1}
          isMobile2={isMobile2}
        />
        <Box
          sx={{
            width: "100%",
            height: "auto",
            position: "sticky",
            bottom: 25,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "white",
            zIndex: 1,
            boxSizing: "border-box",
            paddingBottom: "24px",
          }}
        ></Box>
        <Box
          sx={{
            width: "100%",
            height: "auto",
            position: "sticky",
            bottom: 25,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "white",
            zIndex: 1,
            boxSizing: "border-box",
            paddingBottom: "24px",
            flexDirection: "column",
          }}
        >
          <MessageInput
            created={created}
            selectedConvo={selectedConvo}
            setConversation={setConversations}
            setSelectedConvo={setSelectedConvo}
            setMessages={setMessages}
            setAnimate={setAnimate}
            setLoadingMessage={setLoadingMessage}
            messages={messages}
            viewRef={viewRef}
            reachedLimit={reachedLimit}
            generates={generates}
            isMobile={isMobile}
            isMobile2={isMobile2}
            loadingMessage={loadingMessage}
          />
        </Box>
        <Box
          sx={{
            width: "100%",
            height: "auto",
            position: "sticky",
            bottom: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1,
            boxSizing: "border-box",
            paddingBottom: "12px",
            backgroundColor: "white",
          }}
        >
          <MainFooter />
        </Box>
        {messages?.length > 4 && (
          <Box
            // display="inline-flex"
            // alignItems="center"
            // justifyContent="center"
            // border="1px solid #ddd" // Adds a magenta border
            // borderRadius="50%" // Makes it circular
            // padding="8px" // Adds padding to ensure the icon fits nicely
            // width="40px" // Set width for a consistent size
            // height="40px" // Set height to make it a circle
            onClick={scrollDown}
            sx={{
              position: "sticky",
              bottom: isMobile2 ? "86%" : "80%",
              left: isMobile2 ? "85%" : "90%",
              zIndex: 4,
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              border: "1px solid #ddd", // Adds a magenta border
              borderRadius: "50%", // Makes it circular
              padding: isMobile2 ? "6px" : "8px", // Adds padding to ensure the icon fits nicely
              width: isMobile2 ? "32px" : "40px", // Set width for a consistent size
              height: isMobile2 ? "32px" : "40px",
              backgroundColor: "white",
              cursor: "pointer",
              boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.2)", // Adds a soft shadow
            }}
          >
            <MdKeyboardDoubleArrowDown
              size={isMobile2 ? "24px" : "32px"}
              color="magenta"
            />
          </Box>
        )}
        <div ref={messagesEndRef}></div>
      </Box>
    </Box>
  );
}

export default HomePage;
