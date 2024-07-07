import React, { useEffect, useState } from "react";
import { Button, Form, Input, message, Spin } from "antd";
import axios from "axios";
import "../resources/authentication.css";
import { Link, useNavigate } from "react-router-dom";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
export const API_URL = `${BACKEND_URL}/`;

function Login() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const onFinish = async (values) => {
    setLoading(true);
    try {
      const user = await axios.post(API_URL + "api/user/login", values);
      setLoading(false);
      message.success("Login successfull");
      localStorage.setItem("amalresume-user", JSON.stringify(user.data));
      navigate("/home");
    } catch (error) {
      setLoading(false);
      message.error("Login failed");
    }

    console.log(values);
  };

  useEffect(() => {
    if (localStorage.getItem("amalresume-user")) {
      navigate("/home");
    }
  });

  return (
    <div className="auth-parent">
      {loading && <Spin size="large" />}
      {/* <h1 className="brand">Amal's CV</h1> */}
      <Form layout="vertical" onFinish={onFinish}>
        <h1>Login</h1>
        <hr />
        <Form.Item name="username" label="Username">
          <Input />
        </Form.Item>
        <Form.Item name="password" label="Password">
          <Input type="password" />
        </Form.Item>

        <div className="d-flex align-items-center justify-content-between">
          <Link to="/register">Click Here to Register</Link>
          <Button type="primary" htmlType="submit">
            LOGIN
          </Button>
        </div>
      </Form>
    </div>
  );
}

export default Login;
