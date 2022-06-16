import React from "react";
import { A } from "hookrouter";

function SideNav() {
  return (
    <div className="ui fluid raised card chatbox">
      <div className="content">
        <div className="ui inverted vertical menu">
          <A href="/" className="item">
            Messages
          </A>
          <A href="/users" className="item">
            Friends
          </A>
        </div>
      </div>
    </div>
  );
}

export default SideNav;
