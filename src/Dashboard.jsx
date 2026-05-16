import React, { useState, useEffect } from "react";
import Logout from "./Logout";
import { refreshAccessToken } from "./auth";

function Dashboard() {
  const [user, setUser] = useState("");

  const loadUser = async () => {
    let accessToken = localStorage.getItem("accessToken");

    try {
      // try getting user
      let res = await fetch("https://dummyjson.com/auth/me", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      // token expired
      if (res.status === 401) {
        console.log("Access token expired");

        // refresh token
        accessToken = await refreshAccessToken();

        // retry request
        res = await fetch("https://dummyjson.com/auth/me", {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        const data = await res.json();

        setUser(data);
        console.log("data from loaduser", data);
      }
    } catch (err) {
      console.log("error from fetching user", err);
    }
  };

  useEffect(() => {
    loadUser();
    console.log("load user called");
  }, []);
  return (
    <div>
      Welcome user {user.firstName}
      {user && (
        <>
          <h2>{user.firstName}</h2>
          <p>{user.email}</p>
        </>
      )}
      <Logout />
    </div>
  );
}

export default Dashboard;
