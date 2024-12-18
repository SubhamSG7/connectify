import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  connectWebSocket,
  disconnectWebSocket,
  sendMessage,
  setUserMessage,
} from "../Slices/ChatSlice.jsx";
import { BiSolidSend } from "react-icons/bi";
import ChatWrapper from "./ChatWrapper.jsx";

function Global() {
  const { userMessage, connected, responseMessage, error } = useSelector(
    (state) => state.chatSlice
  );
  const dispatch = useDispatch();
  console.log(error);
  console.log(responseMessage);
  useEffect(() => {
    dispatch(connectWebSocket());
    return () => {
      dispatch(disconnectWebSocket());
    };
  }, [dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (userMessage.trim()) {
      dispatch(sendMessage(userMessage));
      dispatch(setUserMessage(""));
    }
  };

  return (
    <div className="w-[75%] h-[42vh] sm:h-[65vh] m-auto">
      <div className="w-[90%] h-[80%] bg-gradient-to-r from-green-50 to-[#E5D9F2]">
        <ChatWrapper />
      </div>
      <form className="flex h-[20%]" onSubmit={handleSubmit}>
        <textarea
          name="message"
          className="w-[90%] p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-[#FEFFA7] resize-none hover:ring-[#001A6E]"
          value={userMessage}
          onChange={(e) => dispatch(setUserMessage(e.target.value))}
        ></textarea>
        <button
          type="submit"
          className={`w-[10%] h-full flex justify-center items-center rounded-lg ${
            userMessage.length === 0
              ? "cursor-not-allowed bg-gray-300"
              : "cursor-pointer hover:bg-green-300"
          }`}
          disabled={userMessage.length === 0}
        >
          <BiSolidSend className="h-1/2 w-1/2" />
        </button>
      </form>
    </div>
  );
}

export default Global;
