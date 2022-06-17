import React, { useEffect, useState } from "react";
import { getMessages, getUser, postMessage } from "../helpers/apiRequest";
import { isEmptyOrSpaces } from "../helpers/functions";
import MessagesChannel from "channels/messages_channel";
import "channels";
import SideNav from "../components/SideNav";

function Home({ username }) {
  const [data, setdata] = useState([]);
  const [msg, setmsg] = useState("");
  const [group, setgroup] = useState(null);
  const [loading, setloading] = useState(false);
  useEffect(() => {
    getUser(username).then((res) => {
      setgroup(res.data.group || "NIL");
    });
  }, []);
  useEffect(() => {
    if (!group) {
      return;
    }
    if (group !== "NIL") {
      getMessages(group);
    }
  }, [group]);
  useEffect(() => {
    if (!group) {
      return;
    }
    MessagesChannel.received = (response) => {
      if (Number(group) === Number(response.group_id)) {
        setdata(response?.messages ?? []);
      }
    };
  }, [group]);
  useEffect(() => {
    const messageList = document.getElementById("messages");
    messages.scrollTo(0, messageList.scrollHeight + 23);
  }, [data]);
  const sendMessage = (e) => {
    e.preventDefault();
    if (!isEmptyOrSpaces(msg) && !loading) {
      setmsg("");
      setloading(true);
      postMessage({ body: msg, group_id: group }).then(() => {
        setloading(false);
      });
    }
  };
  return (
    <>
      <h4 className="ui center aligned medium icon header">
        <i className="circular orange coffee icon"></i>
        Say Something
      </h4>

      <div className="ui two column grid">
        <div className="twelve wide column">
          <div className="ui fluid raised card chatbox">
            <div id="messages" className="content">
              <div className="ui feed">
                {data.map((message) => (
                  <div key={message.id} className="event">
                    <div
                      style={{
                        backgroundColor:
                          username === message.username
                            ? "lightgreen"
                            : "lightgray",
                      }}
                      className="content ui segment"
                    >
                      <div
                        className={`summary ${
                          username === message?.username ? "left" : "right"
                        } aligned`}
                      >
                        <em>{message?.username} </em>:{` ${message.body}`}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="extra content">
              <form onSubmit={sendMessage} className="ui reply form">
                <div className="field">
                  <div className="ui fluid icon input">
                    <input
                      value={msg}
                      onChange={(e) => setmsg(e.target.value)}
                      type="text"
                      placeholder="Enter a message..."
                    />
                    <button
                      disabled={loading}
                      className="ui icon button"
                      type="submit"
                    >
                      <i className="inverted orange edit icon"></i>
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>

        <div className="four wide column">
          <SideNav />
        </div>
      </div>
    </>
  );
}

export default Home;
