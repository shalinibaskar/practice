import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function Login() {
  const [name, setName] = useState("");
  const [pass, setPass] = useState("");
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
      <div class="m-10">
        <form onSubmit={handleSubmit} class="w-1/2 mx-auto">
          <div class="flex flex-start mb-3 gap-3">
            <label
              for="first_name"
              class="block text-sm font-medium text-heading text-right w-1/2 justify-end mt-2"
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
          <div class="flex flex-start gap-3">
            <label
              for="first_name"
              class="block mb-2.5 text-sm font-medium text-heading text-right w-1/2 justify-end mt-2"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              class="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body"
              placeholder="Password"
              value={pass}
              onChange={(e) => setPass(e.target.value)}
              required
            />
          </div>

          <p>{errormsg}</p>
          <button
            class="inline-block text-center bg-sky-500 hover:bg-sky-700 px-5 py-2 mt-5 rounded-md cursor-pointer text-white"
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
