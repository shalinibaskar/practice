import React from "react";

const menu = ["Home", "about", "help"];
const listItems = menu.map((item) => <li>{item}</li>);

function Header() {
  return (
    <div>
      <ul>{listItems}</ul>
    </div>
  );
}

export default Header;
