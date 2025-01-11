import axios from "axios";
const userId = JSON.parse(localStorage.getItem("userId"));

export const connectToBe = async () => {
  return await axios.get("/");
};

export const fetchConversations = async (page = 1) => {
  return await axios.get(`/bot/conversation?userId=${userId}&page=${page}`);
};

export const generateResponse = async (message, conversationId) => {
  return await axios.post("/bot", {
    message: message,
    conversationId,
    userId,
  });
};

export const fetchMessages = async (conversationId) => {
  return await axios.get(
    `/bot/message?userId=${userId}&conversationId=${conversationId}`
  );
};

export const delConvo = async (conversationId) => {
  return await axios.patch(
    `/bot/remove?userId=${userId}&conversationId=${conversationId}`
  );
};
