const Message = require("./message.schema");

const fetchAllMessages = async (what, { skip, limit }) => {
  return await Message.find(what)
    .sort({ createdAt: 1 })
    .skip(skip)
    .limit(limit);
};

const newMessage = async (what) => {
  return await Message.create(what);
};

const removeMessages = async (where) => {
  return await Message.deleteMany(where);
};

module.exports = {
  fetchAllMessages,
  newMessage,
  removeMessages,
};
