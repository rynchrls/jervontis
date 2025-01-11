const express = require("express");
const botRoute = express.Router();

const {
  getBotResponse,
  generateImageResponse,
} = require("../controller/bot.controller");
const {
  getAllConversation,
  getAllMessage,
  delConversation,
} = require("../controller/conversation.controller");

botRoute.post("/", getBotResponse);

botRoute.get("/text-to-image", generateImageResponse);

botRoute.get("/conversation", getAllConversation);
botRoute.get("/message", getAllMessage);
botRoute.patch("/remove", delConversation);

module.exports = botRoute;
