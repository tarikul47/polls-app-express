const { Schema, model } = require("mongoose");

// Poll Schema
const PollSchema = new Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  totalVote: Number,
  options: {
    type: [
      {
        name: String,
        vote: Number,
      },
    ],
  },
});

// Poll Model
const Poll = model("Poll", PollSchema);

// export here
module.exports = Poll;
