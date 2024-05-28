import React, { Fragment } from "react";
import Nav from "../components/NavBar";
import Header from "../components/Header";

function ForgotPassword() {
  return (
    <Fragment>
      <>
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />
        <meta name="description" content="" />
        <meta name="author" content="" />
        <title>SB Admin 2 - Forgot Password</title>
        {/* Custom fonts for this template*/}
        <link
          href="vendor/fontawesome-free/css/all.min.css"
          rel="stylesheet"
          type="text/css"
        />
        <link
          href="https://fonts.googleapis.com/css?family=Nunito:200,200i,300,300i,400,400i,600,600i,700,700i,800,800i,900,900i"
          rel="stylesheet"
        />
        {/* Custom styles for this template*/}
        <link href="css/sb-admin-2.min.css" rel="stylesheet" />
        <div className="container">
          {/* Outer Row */}
          <div className="row justify-content-center">
            <div className="col-xl-10 col-lg-12 col-md-9">
              <div className="card o-hidden border-0 shadow-lg my-5">
                <div className="card-body p-0">
                  {/* Nested Row within Card Body */}
                  <div className="row">
                    <div className="col-lg-6 d-none d-lg-block bg-password-image" />
                    <div className="col-lg-6">
                      <div className="p-5">
                        <div className="text-center">
                          <h1 className="h4 text-gray-900 mb-2">
                            Forgot Your Password?
                          </h1>
                          <p className="mb-4">
                            We get it, stuff happens. Just enter your email
                            address below and we'll send you a link to reset
                            your password!
                          </p>
                        </div>
                        <form className="user">
                          <div className="form-group">
                            <input
                              type="email"
                              className="form-control form-control-user"
                              id="exampleInputEmail"
                              aria-describedby="emailHelp"
                              placeholder="Enter Email Address..."
                            />
                          </div>
                          <a
                            href="login.html"
                            className="btn btn-primary btn-user btn-block"
                          >
                            Reset Password
                          </a>
                        </form>
                        <hr />
                        <div className="text-center">
                          <a className="small" href="register.html">
                            Create an Account!
                          </a>
                        </div>
                        <div className="text-center">
                          <a className="small" href="login.html">
                            Already have an account? Login!
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Bootstrap core JavaScript*/}
        {/* Core plugin JavaScript*/}
        {/* Custom scripts for all pages*/}
      </>
    </Fragment>
  );
}

export default ForgotPassword;
