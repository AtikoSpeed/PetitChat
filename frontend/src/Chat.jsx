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
    webSocket.lastJsonMessage
      ? setMessages([...messages, webSocket.lastJsonMessage])
      : "";
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [webSocket.lastJsonMessage]);

  return (
    <>
      <h1>{username} Chatting</h1>
      {messages.map((msg) => {
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
        onSubmit={(e) => {
          e.preventDefault();
          webSocket.sendJsonMessage(e.target.submitMessage.value);
          e.target.submitMessage.value = "";
        }}
      >
        <input type="text" id="submitMessage" name="submitMessage" />
        <button type="submit">Send</button>
      </form>
    </>
  );
}
