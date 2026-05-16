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
      console.log(result.accessToken);
      localStorage.setItem("token", result.accessToken);
      navigate("/Dashboard");
    } catch (err) {
      console.log("err", err);
    }
  };

  return (
    <div>
      <div className="loginComponent">
        <form onSubmit={handleSubmit}>
          <label>
            Username:
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </label>
          <br />
          <label>
            Password:
            <input
              type="password"
              value={pass}
              onChange={(e) => setPass(e.target.value)}
            />
          </label>
          <br />
          <p>{errormsg}</p>
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
}

export default Login;
