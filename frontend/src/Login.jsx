import { useContext } from "react";
import { Username } from "./App";

export default function Login() {
  const [username, setUsername] = useContext(Username);

  return (
    <>
      <div>
        <h1>Bonjour</h1>
      </div>
    </>
  );
}
