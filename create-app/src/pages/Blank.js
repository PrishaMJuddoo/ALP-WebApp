import React, { Fragment } from "react";
import Nav from "../components/AdminNavBar";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Logout from "../components/Logout";

function Blank() {
  return (
    <Fragment>
      <>
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
                <h1 className="h3 mb-4 text-gray-800">Blank Page</h1>
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

export default Blank;
