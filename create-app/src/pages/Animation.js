import React, { Fragment } from "react";
import Nav from "../components/NavBar";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Logout from "../components/Logout";

function Animation() {
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
        <title>SB Admin 2 - Animation Utilities</title>
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
        {/* Page Wrapper */}
        <div id="wrapper">
          {/* Sidebar */}
          <Nav></Nav>
          {/* End of Sidebar */}
          {/* Content Wrapper */}
          <div id="content-wrapper" className="d-flex flex-column">
            {/* Main Content */}
            <div id="content">
              {/* Topbar */}
              <Header></Header> {/* End of Topbar */}
              {/* Begin Page Content */}
              <div className="container-fluid">
                {/* Page Heading */}
                <h1 className="h3 mb-1 text-gray-800">Animation Utilities</h1>
                <p className="mb-4">
                  Bootstrap's default utility classes can be found on the
                  official{" "}
                  <a href="https://getbootstrap.com/docs">
                    Bootstrap Documentation
                  </a>{" "}
                  page. The custom utilities below were created to extend this
                  theme past the default utility classes built into Bootstrap's
                  framework.
                </p>
                {/* Content Row */}
                <div className="row">
                  {/* Grow In Utility */}
                  <div className="col-lg-6">
                    <div className="card position-relative">
                      <div className="card-header py-3">
                        <h6 className="m-0 font-weight-bold text-primary">
                          Grow In Animation Utilty
                        </h6>
                      </div>
                      <div className="card-body">
                        <div className="mb-3">
                          <code>.animated--grow-in</code>
                        </div>
                        <div className="small mb-1">
                          Navbar Dropdown Example:
                        </div>
                        <nav className="navbar navbar-expand navbar-light bg-light mb-4">
                          <a className="navbar-brand" href="#">
                            Navbar
                          </a>
                          <ul className="navbar-nav ml-auto">
                            <li className="nav-item dropdown">
                              <a
                                className="nav-link dropdown-toggle"
                                href="#"
                                id="navbarDropdown"
                                role="button"
                                data-toggle="dropdown"
                                aria-haspopup="true"
                                aria-expanded="false"
                              >
                                Dropdown
                              </a>
                              <div
                                className="dropdown-menu dropdown-menu-right animated--grow-in"
                                aria-labelledby="navbarDropdown"
                              >
                                <a className="dropdown-item" href="#">
                                  Action
                                </a>
                                <a className="dropdown-item" href="#">
                                  Another action
                                </a>
                                <div className="dropdown-divider" />
                                <a className="dropdown-item" href="#">
                                  Something else here
                                </a>
                              </div>
                            </li>
                          </ul>
                        </nav>
                        <p className="mb-0 small">
                          Note: This utility animates the CSS transform
                          property, meaning it will override any existing
                          transforms on an element being animated! In this
                          theme, the grow in animation is only being used on
                          dropdowns within the navbar.
                        </p>
                      </div>
                    </div>
                  </div>
                  {/* Fade In Utility */}
                  <div className="col-lg-6">
                    <div className="card position-relative">
                      <div className="card-header py-3">
                        <h6 className="m-0 font-weight-bold text-primary">
                          Fade In Animation Utilty
                        </h6>
                      </div>
                      <div className="card-body">
                        <div className="mb-3">
                          <code>.animated--fade-in</code>
                        </div>
                        <div className="small mb-1">
                          Navbar Dropdown Example:
                        </div>
                        <nav className="navbar navbar-expand navbar-light bg-light mb-4">
                          <a className="navbar-brand" href="#">
                            Navbar
                          </a>
                          <ul className="navbar-nav ml-auto">
                            <li className="nav-item dropdown">
                              <a
                                className="nav-link dropdown-toggle"
                                href="#"
                                id="navbarDropdown"
                                role="button"
                                data-toggle="dropdown"
                                aria-haspopup="true"
                                aria-expanded="false"
                              >
                                Dropdown
                              </a>
                              <div
                                className="dropdown-menu dropdown-menu-right animated--fade-in"
                                aria-labelledby="navbarDropdown"
                              >
                                <a className="dropdown-item" href="#">
                                  Action
                                </a>
                                <a className="dropdown-item" href="#">
                                  Another action
                                </a>
                                <div className="dropdown-divider" />
                                <a className="dropdown-item" href="#">
                                  Something else here
                                </a>
                              </div>
                            </li>
                          </ul>
                        </nav>
                        <div className="small mb-1">
                          Dropdown Button Example:
                        </div>
                        <div className="dropdown mb-4">
                          <button
                            className="btn btn-primary dropdown-toggle"
                            type="button"
                            id="dropdownMenuButton"
                            data-toggle="dropdown"
                            aria-haspopup="true"
                            aria-expanded="false"
                          >
                            Dropdown
                          </button>
                          <div
                            className="dropdown-menu animated--fade-in"
                            aria-labelledby="dropdownMenuButton"
                          >
                            <a className="dropdown-item" href="#">
                              Action
                            </a>
                            <a className="dropdown-item" href="#">
                              Another action
                            </a>
                            <a className="dropdown-item" href="#">
                              Something else here
                            </a>
                          </div>
                        </div>
                        <p className="mb-0 small">
                          Note: This utility animates the CSS opacity property,
                          meaning it will override any existing opacity on an
                          element being animated!
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* /.container-fluid */}
            </div>
            {/* End of Main Content */}
            {/* Footer */}
            <Footer></Footer>
            {/* End of Footer */}
          </div>
          {/* End of Content Wrapper */}
        </div>
        {/* End of Page Wrapper */}
        {/* Scroll to Top Button*/}
        <a className="scroll-to-top rounded" href="#page-top">
          <i className="fas fa-angle-up" />
        </a>
        {/* Logout Modal*/}
        <Logout></Logout>
        {/* Bootstrap core JavaScript*/}
        {/* Core plugin JavaScript*/}
        {/* Custom scripts for all pages*/}
      </>
    </Fragment>
  );
}

export default Animation;
