import React from "react";
import { useNavigate } from "react-router-dom";

function Logout() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
    console.log("inlogout");
  };
  return (
    <button type="submit" onClick={handleLogout}>
      Logout
    </button>
  );
}

export default Logout;
