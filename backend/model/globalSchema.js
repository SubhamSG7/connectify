import mongoose from "mongoose";

const globalSchema = mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    reqired: [true, "You are Logged Out Please Login Again"],
    ref: "User",
  },
  message: {
    type: String,
    reqired: [true, "Message cannot be empty"],
  },
});

const GlobalMessage = mongoose.model("globalmessages", globalSchema);
export default GlobalMessage;
