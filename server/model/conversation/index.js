const Conversation = require("./conversation.schema");

const fetchAllConversation = async (where) => {
  return await Conversation.find(where).lean().sort({ createdAt: -1 });
};

const newConversation = async (data) => {
  return await Conversation.create(data);
};
const removeConversation = async (where) => {
  return await Conversation.deleteOne(where);
};

module.exports = { fetchAllConversation, newConversation, removeConversation };
