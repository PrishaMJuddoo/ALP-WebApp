import React, { Fragment } from "react";
import Nav from "../components/NavBar";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Logout from "../components/Logout";

function Other() {
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
        <title>SB Admin 2 - Other Utilities</title>
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
              <Header></Header>
              {/* End of Topbar */}
              {/* Begin Page Content */}
              <div className="container-fluid">
                {/* Page Heading */}
                <h1 className="h3 mb-1 text-gray-800">Other Utilities</h1>
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
                  <div className="col-lg-6">
                    {/* Overflow Hidden */}
                    <div className="card mb-4">
                      <div className="card-header py-3">
                        <h6 className="m-0 font-weight-bold text-primary">
                          Overflow Hidden Utilty
                        </h6>
                      </div>
                      <div className="card-body">
                        Use <code>.o-hidden</code> to set the overflow property
                        of any element to hidden.
                      </div>
                    </div>
                    {/* Progress Small */}
                    <div className="card mb-4">
                      <div className="card-header py-3">
                        <h6 className="m-0 font-weight-bold text-primary">
                          Progress Small Utility
                        </h6>
                      </div>
                      <div className="card-body">
                        <div className="mb-1 small">Normal Progress Bar</div>
                        <div className="progress mb-4">
                          <div
                            className="progress-bar"
                            role="progressbar"
                            style={{ width: "75%" }}
                            aria-valuenow={75}
                            aria-valuemin={0}
                            aria-valuemax={100}
                          />
                        </div>
                        <div className="mb-1 small">Small Progress Bar</div>
                        <div className="progress progress-sm mb-2">
                          <div
                            className="progress-bar"
                            role="progressbar"
                            style={{ width: "75%" }}
                            aria-valuenow={75}
                            aria-valuemin={0}
                            aria-valuemax={100}
                          />
                        </div>
                        Use the <code>.progress-sm</code> class along with{" "}
                        <code>.progress</code>
                      </div>
                    </div>
                    {/* Dropdown No Arrow */}
                    <div className="card mb-4">
                      <div className="card-header py-3">
                        <h6 className="m-0 font-weight-bold text-primary">
                          Dropdown - No Arrow
                        </h6>
                      </div>
                      <div className="card-body">
                        <div className="dropdown no-arrow mb-4">
                          <button
                            className="btn btn-secondary dropdown-toggle"
                            type="button"
                            id="dropdownMenuButton"
                            data-toggle="dropdown"
                            aria-haspopup="true"
                            aria-expanded="false"
                          >
                            Dropdown (no arrow)
                          </button>
                          <div
                            className="dropdown-menu"
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
                        Add the <code>.no-arrow</code> class alongside the{" "}
                        <code>.dropdown</code>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-6">
                    {/* Roitation Utilities */}
                    <div className="card">
                      <div className="card-header py-3">
                        <h6 className="m-0 font-weight-bold text-primary">
                          Rotation Utilities
                        </h6>
                      </div>
                      <div className="card-body text-center">
                        <div className="bg-primary text-white p-3 rotate-15 d-inline-block my-4">
                          .rotate-15
                        </div>
                        <hr />
                        <div className="bg-primary text-white p-3 rotate-n-15 d-inline-block my-4">
                          .rotate-n-15
                        </div>
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

export default Other;
