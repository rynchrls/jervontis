const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema(
  {
    user_id: {
      type: String,
    },
    conversation_id: {
      type: mongoose.Schema.Types.ObjectId,
    },
    message: {
      type: mongoose.Schema.Types.Mixed,
    },
    from: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);
messageSchema.index({ conversation_id: 1 });

module.exports = mongoose.model("Message", messageSchema);
