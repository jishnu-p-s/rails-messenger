import React, { useEffect, useState } from "react";
import SideNav from "../components/SideNav";
import { getAllUsers } from "../helpers/apiRequest";
import { List } from "semantic-ui-react";
import { A } from "hookrouter";

function Users() {
  const [userList, setUserList] = useState([]);
  useEffect(() => {
    getAllUsers().then((res) => {
      if (res.success) {
        setUserList(res.data.users);
      }
    });
  }, []);
  return (
    <>
      <h4 className="ui center aligned medium icon header">
        <i className="circular orange coffee icon"></i>
        Friends
      </h4>
      <div className="ui two column grid">
        <div className="twelve wide column">
          {userList.map(({ username }) => (
            <List key={username} divided relaxed>
              <List.Item>
                <List.Icon
                  name="user circle"
                  size="large"
                  verticalAlign="middle"
                />
                <List.Content>
                  <List.Header as="a">
                    <A href={`/user/${username}`}> {username}</A>
                  </List.Header>
                </List.Content>
              </List.Item>
            </List>
          ))}
        </div>

        <div className="four wide column">
          <SideNav />
        </div>
      </div>
    </>
  );
}

export default Users;
