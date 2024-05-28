import React, { Fragment } from "react";
import Nav from "../components/AdminNavBar";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Logout from "../components/Logout";

function Border() {
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
        <title>SB Admin 2 - Border Utilities</title>
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
                <h1 className="h3 mb-1 text-gray-800">Border Utilities</h1>
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
                  {/* Border Left Utilities */}
                  <div className="col-lg-6">
                    <div className="card mb-4 py-3 border-left-primary">
                      <div className="card-body">.border-left-primary</div>
                    </div>
                    <div className="card mb-4 py-3 border-left-secondary">
                      <div className="card-body">.border-left-secondary</div>
                    </div>
                    <div className="card mb-4 py-3 border-left-success">
                      <div className="card-body">.border-left-success</div>
                    </div>
                    <div className="card mb-4 py-3 border-left-info">
                      <div className="card-body">.border-left-info</div>
                    </div>
                    <div className="card mb-4 py-3 border-left-warning">
                      <div className="card-body">.border-left-warning</div>
                    </div>
                    <div className="card mb-4 py-3 border-left-danger">
                      <div className="card-body">.border-left-danger</div>
                    </div>
                    <div className="card mb-4 py-3 border-left-dark">
                      <div className="card-body">.border-left-dark</div>
                    </div>
                  </div>
                  {/* Border Bottom Utilities */}
                  <div className="col-lg-6">
                    <div className="card mb-4 py-3 border-bottom-primary">
                      <div className="card-body">.border-bottom-primary</div>
                    </div>
                    <div className="card mb-4 py-3 border-bottom-secondary">
                      <div className="card-body">.border-bottom-secondary</div>
                    </div>
                    <div className="card mb-4 py-3 border-bottom-success">
                      <div className="card-body">.border-bottom-success</div>
                    </div>
                    <div className="card mb-4 py-3 border-bottom-info">
                      <div className="card-body">.border-bottom-info</div>
                    </div>
                    <div className="card mb-4 py-3 border-bottom-warning">
                      <div className="card-body">.border-bottom-warning</div>
                    </div>
                    <div className="card mb-4 py-3 border-bottom-danger">
                      <div className="card-body">.border-bottom-danger</div>
                    </div>
                    <div className="card mb-4 py-3 border-bottom-dark">
                      <div className="card-body">.border-bottom-dark</div>
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

export default Border;
