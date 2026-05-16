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
    <button
      class="bg-sky-500 hover:bg-sky-700 px-5 py-2 m-5 rounded-md"
      type="submit"
      onClick={handleLogout}
    >
      Logout
    </button>
  );
}

export default Logout;
