import React, { Fragment } from "react";
import Nav from "../components/NavBar";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Logout from "../components/Logout";

function Error() {
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
        <title>SB Admin 2 - Charts</title>
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
                <h1 className="h3 mb-2 text-gray-800">Charts</h1>
                <p className="mb-4">
                  Chart.js is a third party plugin that is used to generate the
                  charts in this theme. The charts below have been customized -
                  for further customization options, please visit the{" "}
                  <a
                    target="_blank"
                    href="https://www.chartjs.org/docs/latest/"
                  >
                    official Chart.js documentation
                  </a>
                  .
                </p>
                {/* Content Row */}
                <div className="row">
                  <div className="col-xl-8 col-lg-7">
                    {/* Area Chart */}
                    <div className="card shadow mb-4">
                      <div className="card-header py-3">
                        <h6 className="m-0 font-weight-bold text-primary">
                          Area Chart
                        </h6>
                      </div>
                      <div className="card-body">
                        <div className="chart-area">
                          <canvas id="myAreaChart" />
                        </div>
                        <hr />
                        Styling for the area chart can be found in the
                        <code>/js/demo/chart-area-demo.js</code> file.
                      </div>
                    </div>
                    {/* Bar Chart */}
                    <div className="card shadow mb-4">
                      <div className="card-header py-3">
                        <h6 className="m-0 font-weight-bold text-primary">
                          Bar Chart
                        </h6>
                      </div>
                      <div className="card-body">
                        <div className="chart-bar">
                          <canvas id="myBarChart" />
                        </div>
                        <hr />
                        Styling for the bar chart can be found in the
                        <code>/js/demo/chart-bar-demo.js</code> file.
                      </div>
                    </div>
                  </div>
                  {/* Donut Chart */}
                  <div className="col-xl-4 col-lg-5">
                    <div className="card shadow mb-4">
                      {/* Card Header - Dropdown */}
                      <div className="card-header py-3">
                        <h6 className="m-0 font-weight-bold text-primary">
                          Donut Chart
                        </h6>
                      </div>
                      {/* Card Body */}
                      <div className="card-body">
                        <div className="chart-pie pt-4">
                          <canvas id="myPieChart" />
                        </div>
                        <hr />
                        Styling for the donut chart can be found in the
                        <code>/js/demo/chart-pie-demo.js</code> file.
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
        {/* Page level plugins */}
        {/* Page level custom scripts */}
      </>
    </Fragment>
  );
}

export default Error;
