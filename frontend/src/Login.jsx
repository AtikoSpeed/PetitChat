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
          <label className="input input-bordered flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="h-4 w-4 opacity-70"
            >
              <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
            </svg>
            <input
              type="text"
              className="grow"
              id="submittedUsername"
              name="submittedUsername"
              placeholder="Username"
            />
          </label>
          <button type="submit" className="btn">
            Start chatting!
          </button>
        </form>
      </div>
    </>
  );
}
