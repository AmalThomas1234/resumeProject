import React from "react";
import "./../resources/defaultLayout.css";
import { useNavigate, Link } from "react-router-dom";
import { Button, Dropdown, Menu } from "antd";
import { UserOutlined } from "@ant-design/icons";

function DefaultLayout(props) {
  const user = JSON.parse(localStorage.getItem("amalresume-user"));
  const navigate = useNavigate();

  const menu = (
    <Menu>
      <Menu.Item>
        <Link to="/home">Home</Link>
      </Menu.Item>
      <Menu.Item>
        <Link to="/profile">Profile</Link>
      </Menu.Item>
      <Menu.Item
        onClick={() => {
          localStorage.removeItem("amalresume-user");
          navigate("/login");
        }}
      >
        <span>Logout</span>
      </Menu.Item>
    </Menu>
  );

  return (
    <div className="layout">
      <div className="header">
        <h1 onClick={() => navigate("/home")} style={{ cursor: "pointer" }}>
          AMAL CV
        </h1>
        <Dropdown overlay={menu} placement="bottomLeft">
          <Button icon={<UserOutlined />}>{user.username}</Button>
        </Dropdown>
      </div>
      <div className="content">{props.children}</div>
    </div>
  );
}

export default DefaultLayout;
