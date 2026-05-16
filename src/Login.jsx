import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function Login() {
  const [name, setName] = useState("");
  const [pass, setPass] = useState("");
  // const [data, setData] = useState([]);
  const [errormsg, setErrormsg] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      //logging in and geting a token
      const response = await fetch("https://dummyjson.com/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: name,
          password: pass,
          expiresInMins: 30, // optional, defaults to 60
        }),
        credentials: "include", // Include cookies (e.g., accessToken) in the request
      });

      const result = await response.json();
      if (!response.ok) {
        setErrormsg(result.message);
        throw new Error(result.message);
      }

      // setData(result);
      console.log("name", result);
      localStorage.setItem("token", result.accessToken);
      localStorage.setItem("refreshToken", result.refreshToken);
      navigate("/Dashboard");
    } catch (err) {
      console.log("err", err);
    }
  };

  return (
    <div>
      <h1 class="text-3xl font-bold underline">Hello world!</h1>
      <div className="LoginWrapper">
        <form onSubmit={handleSubmit}>
          <div>
            <label
              for="first_name"
              class="block mb-2.5 text-sm font-medium text-heading"
            >
              Username
            </label>
            <input
              type="text"
              id="first_name"
              class="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body"
              placeholder="Username"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div>
            <label
              for="first_name"
              class="block mb-2.5 text-sm font-medium text-heading"
            >
              Password
            </label>
            <input
              type="text"
              id="first_name"
              class="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body"
              placeholder="Password"
              value={pass}
              onChange={(e) => setPass(e.target.value)}
              required
            />
          </div>

          <p>{errormsg}</p>
          <button
            class="bg-sky-500 hover:bg-sky-700 px-5 py-2 m-5 rounded-md"
            type="submit"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
