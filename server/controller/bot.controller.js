const { HfInference } = require("@huggingface/inference");
const { generateTitle } = require("../helper/generateTitle");
const { newConversation } = require("../model/conversation");
const { newMessage } = require("../model/message");
const client = new HfInference(`${process.env.HUGGING_FACE_KEY}`);

const getBotResponse = async (req, res) => {
  const { userId, message, conversationId = null } = req.body;
  try {
    const chatCompletion = await client.chatCompletion({
      model: "HuggingFaceH4/zephyr-7b-beta",
      messages: [
        {
          role: "user",
          content: message,
        },
      ],
      max_tokens: 1000,
    });

    // console.log(chatCompletion.choices[0].message);
    if (!conversationId) {
      const getTitle = await generateTitle(message);
      const createConvo = await newConversation({
        user_id: userId,
        title: getTitle,
      });
      await newMessage({
        user_id: userId,
        conversation_id: createConvo?._id,
        message: message,
        from: "user",
      });
      const botMessage = await newMessage({
        user_id: userId,
        conversation_id: createConvo?._id,
        message: chatCompletion.choices[0].message.content,
        from: "assistant",
      });
      res.status(200).json({
        message: "successful",
        data: {
          conversation: createConvo,
          message: botMessage,
        },
      });
    } else {
      await newMessage({
        user_id: userId,
        conversation_id: conversationId,
        message: message,
        from: "user",
      });
      const botMessage = await newMessage({
        user_id: userId,
        conversation_id: conversationId,
        message: chatCompletion.choices[0].message.content,
        from: "assistant",
      });
      res.status(200).json({
        message: "successful",
        data: {
          message: botMessage,
        },
      });
    }
  } catch {
    res
      .status(400)
      .json({ message: "unsuccessful", error: "Something went wrong!" });
  }
};

const generateImageResponse = async (req, res) => {
  const data = "Astronaut riding a horse";
  try {
    const response = await fetch(
      "https://api-inference.huggingface.co/models/stabilityai/stable-diffusion-xl-base-1.0",
      {
        headers: {
          Authorization: `Bearer ${process.env.HUGGING_FACE_KEY}`,
          "Content-Type": "application/json",
        },
        method: "POST",
        body: { inputs: data },
      }
    );
    const result = await response.blob();
    console.log(result);
  } catch (error) {
    console.error("Error fetching completion:", error);
    res.status(500).json({ error: "Something went wrong!" });
  }
};

module.exports = { getBotResponse, generateImageResponse };
