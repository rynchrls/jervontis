const {
  fetchAllConversation,
  removeConversation,
} = require("../model/conversation");
const { fetchAllMessages, removeMessages } = require("../model/message");

const getAllConversation = async (req, res) => {
  const { userId } = req.query;
  const allConvo = await fetchAllConversation({
    user_id: userId,
  });

  res.status(200).json({
    message: "successful",
    data: { conversation: allConvo },
  });
};

const getAllMessage = async (req, res) => {
  const { userId, conversationId, page = 1 } = req.query;

  const limit = 30;
  let skip = limit * (Math.round(page) - 1);
  let paginate = { skip, limit };

  const allMessage = await fetchAllMessages(
    {
      user_id: userId,
      conversation_id: conversationId,
    },
    paginate
  );
  res.status(200).json({
    message: "successful",
    data: { message: allMessage },
  });
};

const delConversation = async (req, res) => {
  const { userId, conversationId } = req.query;

  await removeMessages({
    user_id: userId,
    conversation_id: conversationId,
  });

  await removeConversation({
    _id: conversationId,
    user_id: userId,
  });
  res.status(200).json({
    message: "successful",
    data: null,
  });
};

module.exports = { getAllConversation, getAllMessage, delConversation };
