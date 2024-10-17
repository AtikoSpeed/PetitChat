import { useContext } from "react";
import { Username } from "./App";

export default function Login() {
  const [username, setUsername] = useContext(Username);

  return (
    <>
      <div>
        <h1>Enter your username</h1>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setUsername(e.target.submittedUsername.value);
            console.log(username);
          }}
        >
          <input type="text" id="submittedUsername" name="submittedUsername" />
          <button type="submit">Start chatting!</button>
        </form>
      </div>
    </>
  );
}
