import useWebSocket from "react-use-websocket";
import { useContext, useEffect, useState } from "react";
import { Username } from "./App";

export default function Chat() {
  const [username] = useContext(Username);
  const WS_URL = "wss://atakan.tech:3000";

  const webSocket = useWebSocket(WS_URL, {
    share: true,
    queryParams: { username },
  });

  const [messages, setMessages] = useState([]);

  useEffect(() => {
    webSocket.lastJsonMessage ? setMessages(webSocket.lastJsonMessage) : "";
  }, [webSocket.lastJsonMessage]);

  return (
    <>
      <h1>{username} Chatting</h1>
      {messages.map((msg) => {
        console.log("msg logged ", msg);
        return (
          <div key={msg.msgId}>
            <p>
              <b>{msg.username}: </b>
              {msg.message}
            </p>
          </div>
        );
      })}
      <form
        className="join"
        onSubmit={(e) => {
          e.preventDefault();
          webSocket.sendJsonMessage(e.target.submitMessage.value);
          e.target.submitMessage.value = "";
        }}
      >
        <input
          type="text"
          className="input input-bordered join-item"
          id="submitMessage"
          name="submitMessage"
          placeholder="Type your message"
        />
        <button type="submit" className="btn join-item">
          Send
        </button>
      </form>
    </>
  );
}
