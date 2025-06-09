import { Form, Input, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import Spinner from "../components/Spinner";
import styles from "../styles/login.module.css";

const Login = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const submitHandler = async (values) => {
    try {
      setLoading(true);
      const { data } = await axios.post("/api/v1/users/login", values);
      setLoading(false);
      message.success("Login successfully");
      localStorage.setItem(
        "user",
        JSON.stringify({ ...data.user, password: "" })
      );
      navigate("/");
    } catch (error) {
      setLoading(false);
      message.error("Something went wrong");
      console.log(error);
    }
  };

  useEffect(() => {
    if (localStorage.getItem("user")) {
      navigate("/");
    }
  }, [navigate]);

  return (
    <div className={styles.loginPage}>
      {loading && <Spinner />}
      <div className={styles.loginContainer}>
        <Form layout="vertical" onFinish={submitHandler} className={styles.loginForm}>
          <h1>Login Form</h1>

          <Form.Item label="Email" name="email">
            <Input type="email" required />
          </Form.Item>
          <Form.Item label="Password" name="password">
            <Input type="password" required />
          </Form.Item>
          <div className={styles.loginActions}>
            <Link to="/register">Not a user? Click here to register!</Link>
            <button className={styles.loginBtn}>Login</button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default Login;
