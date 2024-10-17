import { useState, createContext } from "react";
import "./App.css";
import Login from "./Login";
import Chat from "./Chat";

export const Username = createContext();

function App() {
  const [username, setUsername] = useState("");

  if (username) {
    console.log(username);
    return (
      <Username.Provider value={[username, setUsername]}>
        <Chat />
      </Username.Provider>
    );
  } else {
    return (
      <Username.Provider value={[username, setUsername]}>
        <Login />
      </Username.Provider>
    );
  }
}

export default App;
