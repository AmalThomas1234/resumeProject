import React, { useEffect, useState } from "react";
import { Button, Form, Input, message, Spin } from "antd";
import axios from "axios";
import "../resources/authentication.css";
import { Link, useNavigate } from "react-router-dom";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
export const API_URL = `${BACKEND_URL}/`;

function Register() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const onFinish = async (values) => {
    setLoading(true);
    try {
      await axios.post(API_URL + "api/user/register", values);
      setLoading(false);
      message.success("Registration successfull");
    } catch (error) {
      setLoading(false);
      message.error("Registration failed");
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
      {/* <h1 className="brand">Amal's CV</h1> */}
      {loading && <Spin size="large" />}
      <Form layout="vertical" onFinish={onFinish}>
        <h1>Register</h1>
        <hr />
        <Form.Item name="username" label="Username">
          <Input />
        </Form.Item>
        <Form.Item name="password" label="Password">
          <Input type="password" />
        </Form.Item>
        <Form.Item name="cpassword" label="Confirm Password">
          <Input type="password" />
        </Form.Item>
        <div className="d-flex align-items-center justify-content-between">
          <Link to="/login">Click Here to Login</Link>
          <Button type="primary" htmlType="submit">
            Register
          </Button>
        </div>
      </Form>
    </div>
  );
}

export default Register;
