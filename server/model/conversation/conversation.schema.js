const mongoose = require("mongoose");

const conversationSchema = new mongoose.Schema(
  {
    user_id: {
      type: String,
    },
    title: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("conversation", conversationSchema);
