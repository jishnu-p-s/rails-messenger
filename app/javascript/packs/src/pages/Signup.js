import React, { useState } from "react";
import { signup } from "../helpers/apiRequest";

function Signup() {
  const initForm = { username: "", password: "", confirm: "" };
  const [form, setform] = useState(initForm);
  const [errors, seterrors] = useState([]);
  const onSubmit = (e) => {
    e.preventDefault();
    signup({ users: form }).then((res) => {
      if (res.data.success) {
        setform(initForm);
      } else {
        seterrors(res.data.msg);
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
        Signup
      </h4>
      {errors.length > 0 && (
        <div
          style={{ backgroundColor: "#ffcccb", position: "relative" }}
          className="ui message"
        >
          <div className="header">Errors</div>
          <button
            className="ui button secondary"
            onClick={() => seterrors([])}
            style={{ position: "absolute", top: 2, right: 2 }}
          >
            <i class="window close icon"></i>
          </button>
          <ul className="list">
            {errors.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      )}

      <div className="ui placeholder segment">
        <form onSubmit={onSubmit} className="ui form">
          <div className="field">
            <label>Username</label>
            <div className="ui left icon input">
              <input
                value={form.username}
                onChange={(e) => setform({ ...form, username: e.target.value })}
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
                onChange={(e) => setform({ ...form, password: e.target.value })}
                type="password"
                placeholder="Password"
              />
              <i className="lock icon"></i>
            </div>
          </div>
          <div className="field">
            <label>Confirm Password</label>
            <div className="ui left icon input">
              <input
                value={form.confirm}
                onChange={(e) => setform({ ...form, confirm: e.target.value })}
                type="password"
                placeholder="Confirm"
              />
              <i className="lock icon"></i>
            </div>
          </div>
          <button type="submit" className="ui orange submit button">
            Signup
          </button>
        </form>
      </div>
    </>
  );
}

export default Signup;
