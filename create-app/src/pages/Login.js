import React, { Fragment, useState } from "react";
import Nav from "../components/NavBar";
import Header from "../components/Header";
import { useNavigate } from "react-router-dom"; // Import useNavigate

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginMessage, setLoginMessage] = useState("");
  const BASE_URL = "http://healthworker.amritacreate.org/LeveledBooks/api/";
  const navigate = useNavigate(); // Initialize useNavigate

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

      console.log("Response status:", response.status); // Log the status code

      if (response.status == 200) {
        const data = await response.json();
        console.log("Response status:", data.message);
        if (data.success == 1) {
          setLoginMessage("Login Successful");
          navigate("/"); // Navigate to landing page (dashboard) on successful login
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

  return (
    <Fragment>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-6">
            <div className="card o-hidden border-0 shadow-lg my-5">
              <div className="card-body p-0">
                <div className="p-5">
                  <div className="text-center">
                    <h1 className="h4 text-gray-900 mb-4">Welcome Back!</h1>
                  </div>
                  <form className="user" onSubmit={handleSubmit}>
                    {/* Username input */}
                    <div className="form-group">
                      <input
                        type="text"
                        className="form-control form-control-user"
                        value={username}
                        onChange={handleChangeUsername}
                        placeholder="Enter Username"
                      />
                    </div>
                    {/* Password input */}
                    <div className="form-group">
                      <input
                        type="password"
                        className="form-control form-control-user"
                        value={password}
                        onChange={handleChangePassword}
                        placeholder="Enter Password"
                      />
                    </div>
                    {/* Submit button */}
                    <button type="submit" className="btn btn-primary btn-user btn-block">
                      Login
                    </button>
                  </form>
                  {/* Display login message */}
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
        </div>
      </div>
    </Fragment>
  );
}

export default Login;
