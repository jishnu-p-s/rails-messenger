import React, { useState, useEffect } from "react";
import { login } from "../helpers/apiRequest";
import { navigate } from "hookrouter";

function Login() {
  const [form, setform] = useState({ username: "", password: "" });
  const onSubmit = (e) => {
    e.preventDefault();
    login({ ...form }).then((res) => {
      if (res.data.session) {
        const { session_id, _csrf_token } = res.data.session;
        sessionStorage.setItem("session_id", session_id);
        sessionStorage.setItem("_csrf_token", _csrf_token);
        navigate("/");
        window.location.reload(false);
      }
    });
  };

  return (
    <>
      <h2 className="ui center aligned large header">
        Welcome to MessageMe - <em>a complete Chat App</em>
      </h2>

      <h4 className="ui center aligned medium icon header">
        <i className="circular orange power off tiny icon"></i>
        Log in to continue
      </h4>

      <div className="ui placeholder segment">
        <div className="ui two column very relaxed stackable grid">
          <div className="column">
            <form onSubmit={onSubmit} className="ui form">
              <div className="field">
                <label>Username</label>
                <div className="ui left icon input">
                  <input
                    value={form.username}
                    onChange={(e) =>
                      setform({ ...form, username: e.target.value })
                    }
                    type="text"
                    placeholder="Username"
                  />
                  <i className="user icon"></i>
                </div>
              </div>
              <div className="field">
                <label>Password</label>
                <div className="ui left icon input">
                  <input
                    value={form.password}
                    onChange={(e) =>
                      setform({ ...form, password: e.target.value })
                    }
                    type="password"
                    placeholder="Password"
                  />
                  <i className="lock icon"></i>
                </div>
              </div>
              <button type="submit" className="ui orange submit button">
                Login
              </button>
            </form>
          </div>
          <div className="middle aligned column">
            <button
              onClick={() => navigate("/signup")}
              className="ui big orange  button"
            >
              <i className="signup icon"></i>
              Sign Up
            </button>
          </div>
        </div>
        <div className="ui vertical divider">Or</div>
      </div>
    </>
  );
}

export default Login;
