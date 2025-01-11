// import { Box, Typography } from "@mui/material";
// import propTypes from "prop-types";
// import { FaBrain } from "react-icons/fa";

// function Message({ data }) {
//   return (
//     <Box
//       sx={{
//         backgroundColor: data.from === "assistant" ? "transparent" : "#f0f0f0",
//         borderRadius: "12px",
//         boxSizing: "border-box",
//         padding: "12px 24px",
//         width: "auto",
//         height: "auto",
//         position: "relative",
//       }}
//     >
//       <Typography
//         variant="body1"
//         sx={{
//           fontSize: "14px",
//           letterSpacing: "0.25px",
//         }}
//       >
//         {data.message.charAt(0).toUpperCase() + data.message.slice(1)}
//       </Typography>
//       {data.from === "assistant" && (
//         <Box
//           sx={{
//             position: "absolute",
//             left: "-40px",
//             bottom: "1px",
//             background:
//               "radial-gradient(circle, rgba(40,0,80,1) 30%, rgba(0,0,0,1) 90%)",
//             padding: "8px",
//             boxSizing: "border-box",
//             borderRadius: "50%",
//           }}
//         >
//           <FaBrain size={"14px"} color="white" />
//         </Box>
//       )}
//     </Box>
//   );
// }

// export default Message;

// Message.propTypes = {
//   data: propTypes.object,
// };

import { Alert, Box, Button, Snackbar, Typography } from "@mui/material";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { solarizedlight } from "react-syntax-highlighter/dist/esm/styles/prism";
import propTypes from "prop-types";
import { FaBrain } from "react-icons/fa";
import { useEffect, useState } from "react";
import AnimationIcon from "../animation";

// const MessageBox = ({ data, isLast }) => {
//   const [openSnackbar, setOpenSnackbar] = useState(false);

//   const handleCloseSnackbar = () => {
//     setOpenSnackbar(false); // Close the snackbar
//   };
//   // const formatContent = () => {
//   //   const codeBlockRegex = /```([\s\S]*?)```/g; // Detect fenced code blocks
//   //   const inlineCodeRegex = /`([^`]+)`/g; // Detect inline code
//   //   const urlRegex = /(https?:\/\/[^\s]+)/g; // Detect URLs

//   //   let parts = data.message.split(codeBlockRegex); // Split by fenced code blocks

//   //   return parts.map((part, index) => {
//   //     if (index % 2 !== 0) {
//   //       // Code block (odd index)
//   //       return (
//   //         <Box
//   //           key={index}
//   //           className="code-block"
//   //           sx={{
//   //             backgroundColor: "#f5f5f5", // Light gray background for container
//   //             borderRadius: "8px", // Rounded corners
//   //             padding: "16px", // Padding inside the code block
//   //             marginBottom: "16px", // Space below the code block
//   //             overflowX: "auto", // Add horizontal scrolling if the content is long
//   //           }}
//   //         >
//   //           <SyntaxHighlighter
//   //             language="bash"
//   //             style={solarizedlight}
//   //             customStyle={{
//   //               backgroundColor: "transparent", // Make background transparent to show container's background
//   //               padding: "0px", // Remove padding that the SyntaxHighlighter might add
//   //               borderRadius: "8px", // Rounded corners for the code block
//   //               fontSize: "1rem", // Font size for better readability
//   //               lineHeight: "1.5", // Line height for better spacing
//   //             }}
//   //           >
//   //             {part.trim()}
//   //           </SyntaxHighlighter>
//   //           {/* Snackbar for toast */}
//   //           <Snackbar
//   //             open={openSnackbar}
//   //             autoHideDuration={2000} // Duration of the snackbar before it disappears (in ms)
//   //             onClose={handleCloseSnackbar} // Close the snackbar when it times out or is manually closed
//   //             anchorOrigin={{
//   //               vertical: "top", // Positioning vertically at the top
//   //               horizontal: "right", // Positioning horizontally at the right
//   //             }}
//   //           >
//   //             <Alert severity="success" sx={{ width: "100%" }}>
//   //               Code copied!
//   //             </Alert>
//   //           </Snackbar>
//   //           <Button onClick={() => copyToClipboard(part)}>Copy</Button>
//   //         </Box>
//   //       );
//   //     } else {
//   //       // Non-code block (even index)
//   //       return (
//   //         <Box key={index}>
//   //           {part.split("\n\n").map((paragraph, i) => (
//   //             <Typography key={i} paragraph>
//   //               {paragraph.split("\n").map((line, j) => (
//   //                 <Typography
//   //                   sx={{ fontSize: "13px" }}
//   //                   key={j}
//   //                   dangerouslySetInnerHTML={{
//   //                     __html: line
//   //                       .replace(urlRegex, (url) => {
//   //                         // Extract the hostname/domain name from the URL
//   //                         const urlObj = new URL(url);
//   //                         const hostname = urlObj.hostname;

//   //                         return `<a href="${url}" target="_blank" style="color: #0073e6;">${hostname}</a>`; // Display only the hostname
//   //                       })
//   //                       .replace(
//   //                         inlineCodeRegex,
//   //                         (match, code) =>
//   //                           `<code style="background-color: #f4f4f4; padding: 0.2rem 0.4rem; border-radius: 3px;">${code}</code>` // Style inline code
//   //                       ),
//   //                   }}
//   //                 />
//   //               ))}
//   //             </Typography>
//   //           ))}
//   //         </Box>
//   //       );
//   //     }
//   //   });
//   // };

//   const formatContent = () => {
//     const codeBlockRegex = /```([\s\S]*?)```/g; // Detect fenced code blocks
//     const inlineCodeRegex = /`([^`]+)`/g; // Detect inline code
//     const urlRegex = /(https?:\/\/[^\s]+)/g; // Detect URLs

//     let parts = data?.message.split(codeBlockRegex); // Split by fenced code blocks

//     return parts.map((part, index) => {
//       // Check if part is a code block (odd index)
//       if (index % 2 !== 0) {
//         return (
//           <Box
//             key={index}
//             className="code-block"
//             sx={{
//               backgroundColor: "#f5f5f5", // Light gray background for container
//               borderRadius: "8px", // Rounded corners
//               padding: "16px", // Padding inside the code block
//               marginBottom: "16px", // Space below the code block
//               overflowX: "auto", // Add horizontal scrolling if the content is long
//             }}
//           >
//             <SyntaxHighlighter
//               language="bash" // You can dynamically set this based on the content
//               style={solarizedlight}
//               customStyle={{
//                 backgroundColor: "transparent", // Make background transparent to show container's background
//                 padding: "0px", // Remove padding that the SyntaxHighlighter might add
//                 borderRadius: "8px", // Rounded corners for the code block
//                 fontSize: "1rem", // Font size for better readability
//                 lineHeight: "1.5", // Line height for better spacing
//               }}
//             >
//               {part.trim()}
//             </SyntaxHighlighter>
//             {/* Snackbar for toast */}
//             <Snackbar
//               open={openSnackbar}
//               autoHideDuration={2000} // Duration of the snackbar before it disappears (in ms)
//               onClose={handleCloseSnackbar} // Close the snackbar when it times out or is manually closed
//               anchorOrigin={{
//                 vertical: "top", // Positioning vertically at the top
//                 horizontal: "right", // Positioning horizontally at the right
//               }}
//             >
//               <Alert severity="success" sx={{ width: "100%" }}>
//                 Code copied!
//               </Alert>
//             </Snackbar>
//             <Button onClick={() => copyToClipboard(part)}>Copy</Button>
//           </Box>
//         );
//       }

//       // Non-code block (even index)
//       return (
//         <Box key={index}>
//           {part.split("\n\n").map((paragraph, i) => (
//             <Typography key={i} paragraph>
//               {paragraph.split("\n").map((line, j) => (
//                 <Typography
//                   sx={{ fontSize: "13px" }}
//                   key={j}
//                   dangerouslySetInnerHTML={{
//                     __html: line
//                       .replace(urlRegex, (url) => {
//                         try {
//                           // Check if the URL is valid before processing
//                           const urlObj = new URL(url); // This will throw an error if the URL is invalid
//                           const hostname = urlObj.hostname;
//                           return `<a href="${url}" target="_blank" style="color: #0073e6;">${hostname}</a>`;
//                         } catch (e) {
//                           // If URL is invalid, return the URL as plain text
//                           console.log(e.message);
//                           return url;
//                         }
//                       })
//                       .replace(
//                         inlineCodeRegex,
//                         (match, code) =>
//                           `<code style="background-color: #f4f4f4; padding: 0.2rem 0.4rem; border-radius: 3px;">${code}</code>` // Style inline code
//                       ),
//                   }}
//                 />
//               ))}
//             </Typography>
//           ))}
//         </Box>
//       );
//     });
//   };

//   const copyToClipboard = (text) => {
//     navigator.clipboard.writeText(text);
//     setOpenSnackbar(true); // Trigger the snackbar
//   };

//   return (
//     <Box
//       sx={{
//         backgroundColor: data.from === "assistant" ? "transparent" : "#f0f0f0",
//         borderRadius: "12px",
//         boxSizing: "border-box",
//         padding: "12px 24px",
//         width: "auto",
//         height: "auto",
//         position: "relative",
//       }}
//       className="message-box"
//     >
//       {data.from === "assistant" ? (
//         <Typography
//           variant="body1"
//           sx={{
//             fontSize: "14px",
//             letterSpacing: "0.25px",
//           }}
//         >
//           {formatContent()}
//         </Typography>
//       ) : (
//         <Typography
//           variant="body1"
//           sx={{
//             fontSize: "14px",
//             letterSpacing: "0.25px",
//           }}
//         >
//           {data?.message}
//         </Typography>
//       )}
//       {data.from === "assistant" && (
//         <Box
//           sx={{
//             position: "absolute",
//             left: "-40px",
//             top: "1px",
//             background:
//               "radial-gradient(circle, rgba(40,0,80,1) 30%, rgba(0,0,0,1) 90%)",
//             padding: "8px",
//             boxSizing: "border-box",
//             borderRadius: "50%",
//           }}
//         >
//           <FaBrain size={"14px"} color="white" />
//         </Box>
//       )}
//     </Box>
//   );
// };

const MessageBox = ({
  data,
  isLast,
  animate,
  loadingMessage,
  desktop1,
  isMobile2,
}) => {
  const [typedContent, setTypedContent] = useState("");
  const [typingIndex, setTypingIndex] = useState(0);

  const [openSnackbar, setOpenSnackbar] = useState(false);

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false); // Close the snackbar
  };

  useEffect(() => {
    if (isLast && data?.message && animate) {
      const typingInterval = setInterval(() => {
        if (typingIndex < data?.message?.length) {
          setTypedContent((prev) => prev + data?.message[typingIndex]);
          setTypingIndex((prev) => prev + 1);
        } else {
          clearInterval(typingInterval);
        }
      }, 10); // Adjust typing speed here
      return () => clearInterval(typingInterval);
    } else if (!animate || !isLast) {
      // If not the last message, display the entire message immediately
      setTypedContent(data?.message);
    }
  }, [isLast, data?.message, typingIndex, animate]);

  const renderFormattedContent = () => {
    const codeBlockRegex = /```([\s\S]*?)```/g;
    const inlineCodeRegex = /`([^`]+)`/g; // Detect inline code
    const urlRegex = /(https?:\/\/[^\s]+)/g; // Detect URLs
    const parts = data?.message.split(codeBlockRegex);

    let renderedContent = [];
    let currentIndex = 0;

    for (let index = 0; index < parts.length; index++) {
      const part = parts[index];

      if (currentIndex >= typedContent.length) break;

      if (index % 2 === 0) {
        // Plain text
        const textToShow = part.slice(
          0,
          Math.max(0, typedContent.length - currentIndex)
        );
        currentIndex += part.length;

        if (textToShow.trim()) {
          renderedContent.push(
            <Box key={index} sx={{ lineHeight: isMobile2 ? "1.4" : "1.6" }}>
              {textToShow.split("\n\n").map((paragraph, i) => (
                <Typography
                  key={i}
                  sx={{
                    fontSize: isMobile2 ? "11px" : "13px",
                    margin: 0, // Removes unwanted margin
                    padding: 0, // Ensures no padding is added
                    lineHeight: isMobile2 ? "1.6" : "1.8", // Adjust line height for better readability
                    whiteSpace: "pre-wrap", // Ensures white space and line breaks are respected
                  }}
                >
                  {paragraph.split("\n").map((line, j) => (
                    <Typography
                      sx={{
                        fontSize: isMobile2 ? "11px" : "13px",
                        margin: 0, // Removes unwanted margin
                        padding: 0, // Ensures no padding is added
                        lineHeight: isMobile2 ? "1.6" : "1.8", // Adjust line height for better readability
                      }}
                      key={j}
                      dangerouslySetInnerHTML={{
                        __html: line
                          .replace(urlRegex, (url) => {
                            try {
                              // Validate the URL
                              const urlObj = new URL(url);
                              const hostname = urlObj.hostname;
                              return `<a href="${url}" target="_blank" style="color: #0073e6;">${hostname}</a>`;
                            } catch (e) {
                              console.log(e.message);
                              return url; // Return plain text if invalid
                            }
                          })
                          .replace(
                            inlineCodeRegex,
                            (match, code) =>
                              `<code style="background-color: #f4f4f4; padding: 0.2rem 0.4rem; border-radius: 3px;">${code}</code>`
                          ),
                      }}
                    />
                  ))}
                </Typography>
              ))}
            </Box>
          );
        }
      } else {
        // Code block
        const codeToShow = part.slice(
          0,
          Math.max(0, typedContent.length - currentIndex)
        );
        currentIndex += part.length;
        if (codeToShow.trim()) {
          renderedContent.push(
            <Box
              key={index}
              className="code-block"
              sx={{
                backgroundColor: "#f5f5f5", // Light gray background for container
                borderRadius: isMobile2 ? "6px" : "8px", // Rounded corners
                padding: isMobile2 ? "12px" : "16px", // Padding inside the code block
                marginBottom: isMobile2 ? " 12px" : "16px", // Space below the code block
                overflowX: "auto", // Add horizontal scrolling if the content is long
              }}
            >
              <SyntaxHighlighter
                language="bash" // You can dynamically set this based on the content
                style={solarizedlight}
                customStyle={{
                  backgroundColor: "transparent", // Make background transparent to show container's background
                  padding: "0px", // Remove padding that the SyntaxHighlighter might add
                  borderRadius: isMobile2 ? "6px" : "8px", // Rounded corners for the code block
                  fontSize: isMobile2 ? "0.8rem" : "1rem", // Font size for better readability
                  lineHeight: isMobile2 ? "1.4" : "1.5", // Line height for better spacing
                  width: desktop1 ? (isMobile2 ? "250px" : "450px") : "auto",
                }}
              >
                {codeToShow}
              </SyntaxHighlighter>
              {/* Snackbar for toast */}
              <Snackbar
                open={openSnackbar}
                autoHideDuration={2000} // Duration of the snackbar before it disappears (in ms)
                onClose={handleCloseSnackbar} // Close the snackbar when it times out or is manually closed
                anchorOrigin={{
                  vertical: "top", // Positioning vertically at the top
                  horizontal: "right", // Positioning horizontally at the right
                }}
              >
                <Alert
                  severity="success"
                  sx={{ width: "100%", fontSize: isMobile2 ? "12px" : "16px" }}
                >
                  Code copied!
                </Alert>
              </Snackbar>
              <Button onClick={() => copyToClipboard(part)} sx={{fontSize: isMobile2 ? '8px' : '14px'}}>Copy</Button>
            </Box>
          );
        }
      }
    }

    const copyToClipboard = (text) => {
      navigator.clipboard.writeText(text);
      setOpenSnackbar(true); // Trigger the snackbar
    };

    return renderedContent;
  };

  return (
    <Box
      sx={{
        backgroundColor: data.from === "assistant" ? "transparent" : "#f0f0f0",
        borderRadius: isMobile2 ? "10px" : "12px",
        padding: isMobile2 ? "8px 16px" : "12px 24px",
        position: "relative",
        width:
          data?.from === "assistant"
            ? loadingMessage
              ? "auto"
              : data.error
              ? "auto"
              : "100%"
            : "auto",
        height: "auto",
        whiteSpace: "pre-wrap", // Allow long lines to wrap
        wordWrap: "break-word", // Break long words to wrap long lines
        overflowWrap: "break-word", // For extra compatibility with breaking long words
        border: data.error && "1px solid rgba(255, 0, 0, 0.5)", // Red border
        color: data.error && "rgba(150, 0, 0, 0.9)", // Dark red text
      }}
      className="message-box"
    >
      {loadingMessage && isLast && data?.message === "" ? (
        <AnimationIcon />
      ) : (
        renderFormattedContent()
      )}
      {data?.from === "assistant" && (
        <Box
          sx={{
            position: "absolute",
            left: isMobile2 ? "-25px" : "-40px",
            top: "1px",
            background:
              "radial-gradient(circle, rgba(40,0,80,1) 30%, rgba(0,0,0,1) 90%)",
            padding: isMobile2 ? "4px" : "8px",
            borderRadius: "50%",
          }}
        >
          <FaBrain size={isMobile2 ? "8px" : "14px"} color="white" />
        </Box>
      )}
    </Box>
  );
};

export default MessageBox;

// export default MessageBox;

MessageBox.propTypes = {
  data: propTypes.object,
  isLast: propTypes.bool,
  animate: propTypes.bool,
  setAnimate: propTypes.func,
  loadingMessage: propTypes.bool,
  desktop1: propTypes.any,
  isMobile2: propTypes.any,
};
