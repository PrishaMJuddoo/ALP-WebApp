<<<<<<< Updated upstream
import React, { Fragment, useState } from "react";
import Nav from "../components/NavBar";
import Header from "../components/Header";
import { useNavigate } from "react-router-dom"; // Import useNavigate

function Login() {
=======
import React, { Fragment, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import logo from "../assets/ALPLogo.png"; // Adjust the path to your logo

const Login = ({ setToken, setRoleId }) => {
>>>>>>> Stashed changes
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginMessage, setLoginMessage] = useState("");
  const BASE_URL = "http://healthworker.amritacreate.org/LeveledBooks/api/";
  const navigate = useNavigate();

  const handleChangeUsername = (e) => {
    setUsername(e.target.value);
  };

  const handleChangePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${BASE_URL}/login/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

<<<<<<< Updated upstream
      console.log("Response status:", response.status); // Log the status code

      if (response.status == 200) {
        const data = await response.json();
        console.log("Response status:", data.message);
        if (data.success == 1) {
          setLoginMessage("Login Successful");
          navigate("/"); // Navigate to landing page (dashboard) on successful login
=======
      if (response.status === 200) {
        const data = response.data;
        if (data.success === 1) {
          setLoginMessage("Login Successful");
          setToken(data.token);
          setRoleId(data.role_id);
          localStorage.setItem('token', data.token);
          localStorage.setItem('role_id', data.role_id);

          if (data.role_id === "1") {
            navigate('/admin');
          } else if (data.role_id === "2") {
            navigate('/teacher');
          }
>>>>>>> Stashed changes
        } else {
          setLoginMessage("Login Failed: Invalid credentials");
        }
      } else {
        const errorMessage = await response.text();
        setLoginMessage(`Login Failed: ${errorMessage}`);
      }
    } catch (error) {
      console.error("Error:", error);
      setLoginMessage("Login Failed: An error occurred");
    }
  };

  const title = "Amrita Accelerated Learning Program";
  const [displayedTitle, setDisplayedTitle] = useState("");
  const [currentCharIndex, setCurrentCharIndex] = useState(0);

  useEffect(() => {
    if (currentCharIndex < title.length) {
      const timeoutId = setTimeout(() => {
        setDisplayedTitle((prev) => prev + title[currentCharIndex]);
        setCurrentCharIndex((prev) => prev + 1);
      }, 70);
      return () => clearTimeout(timeoutId);
    }
  }, [currentCharIndex]);

  return (
    <Fragment>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-6">
            <div className="p-5">
              <div className="text-center">
                <img src={logo} alt="Program Logo" style={{ maxWidth: "200px", marginBottom: "20px" }} />
                <h1 className="h4 mb-4" style={{ color: "navy", textShadow: "2px 2px 5px rgba(0, 0, 0, 0.3)" }}>
                  {displayedTitle}
                </h1>
              </div>
              <form className="user" onSubmit={handleSubmit}>
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control form-control-user"
                    value={username}
                    onChange={handleChangeUsername}
                    placeholder="Enter Username"
                  />
                </div>
                <div className="form-group">
                  <input
                    type="password"
                    className="form-control form-control-user"
                    value={password}
                    onChange={handleChangePassword}
                    placeholder="Enter Password"
                  />
                </div>
                <button
                  type="submit"
                  className="btn btn-primary btn-user btn-block"
                >
                  Login
                </button>
              </form>
              <p>{loginMessage}</p>
              <hr />
              <div className="text-center">
                <a className="small" href="forgot-password.html">
                  Forgot Password?
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default Login;
