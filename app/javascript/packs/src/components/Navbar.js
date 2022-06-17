import React from "react";
import { A } from "hookrouter";
import { logout } from "../helpers/apiRequest";
import useAuth from "../helpers/useAuthContext";

function Navbar() {
  const { user } = useAuth();
  return (
    <div className="ui small inverted menu">
      <div className="ui container">
        <A href="/users" className="item">
          Chatroom
        </A>
        <a className="item">Messages</a>
        <div className="right menu">
          {user ? (
            <>
              <p
                style={{
                  color: "white",
                  height: "100%",
                  display: "grid",
                  alignItems: "center",
                }}
              >
                {user}
              </p>
              <A
                href="#"
                onClick={() => {
                  logout().then(() => {
                    sessionStorage.removeItem("session_id");
                    sessionStorage.removeItem("_csrf_token");
                    window.location.reload(false);
                  });
                }}
                className="item"
              >
                Log out
              </A>
            </>
          ) : (
            <>
              <A href="/login" className="item">
                Log in
              </A>
              <div className="item">
                <A href="/signup" className="ui primary button">
                  Sign Up
                </A>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Navbar;
