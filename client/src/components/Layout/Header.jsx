import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { message } from "antd";
import "../../styles/header.css";
import "../../styles/mode.css";
import { FaSun, FaMoon, FaRegUserCircle } from "react-icons/fa";

const Header = () => {
  const [loginUser, setLoginUser] = useState("");

  const [mode, setMode] = useState("light-mode");

  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      setLoginUser(user);
    }
  }, []);

  const change = () => {
    if (mode === "light-mode") {
      setMode("dark-mode");
    } else {
      setMode("light-mode");
    }
  };
  useEffect(() => {
    document.querySelector("body").className = mode;
  }, [mode]);

  const logoutHandler = () => {
    localStorage.removeItem("user");
    message.success("Logout Successfully");
    navigate("/login");
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg ${mode}">
        <div className="container-fluid">
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarTogglerDemo01"
            aria-controls="navbarTogglerDemo01"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
            <Link className="navbar-brand" to="/">
              Expense Management
            </Link>
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item d-flex align-items-center me-3">
                <div
                  className="icon"
                  onClick={change}
                  style={{ cursor: "pointer" }}
                >
                  {mode === "light-mode" ? (
                    <FaSun size={22} />
                  ) : (
                    <FaMoon size={22} />
                  )}
                </div>
              </li>

              <li className="nav-item d-flex align-items-center me-3 cursor-pointer">
                <div className="d-flex align-items-center gap-2">
                  <FaRegUserCircle size={20} />
                  <span>{loginUser && loginUser.name}</span>
                </div>
              </li>

              <li className="nav-item d-flex align-items-center">
                <button className="btn btn-danger" onClick={logoutHandler}>
                  Logout
                </button>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;
