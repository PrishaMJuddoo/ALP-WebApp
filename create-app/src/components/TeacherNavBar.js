import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/ALPLogo.png";

function TeacherNav() {
  return (
    <div>
      <ul
        className="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion"
        id="accordionSidebar"
      >
        {/* Sidebar - Brand */}
        <Link
          to="/teacher"
          className="sidebar-brand d-flex align-items-center justify-content-center"
        >
          <div className="sidebar-brand-icon rotate-n-0">
            <img src={logo} alt="ALP Logo" style={{ width: "70px", height: "auto" }} />
          </div>
          <div className="sidebar-brand-text mx-3">Amrita LionCub</div>
        </Link>
        {/* Divider */}
        <hr className="sidebar-divider my-0" />
        {/* Nav Item - Dashboard */}
        <li className="nav-item active">
          <Link to="/teacher" className="nav-link">
            <i className="fas fa-fw fa-tachometer-alt" />
            <span>Dashboard</span>
          </Link>
        </li>
        {/* Divider */}
        <hr className="sidebar-divider" />
        {/* Heading */}
        <div className="sidebar-heading">Interface</div>
        {/* Nav Item - Classes */}
        <li className="nav-item">
          <Link to="/teacher/classes" className="nav-link">
            <i className="fas fa-fw fa-user" />
            <span>Class</span>
          </Link>
        </li>
        {/* Divider */}
        <hr className="sidebar-divider" />
        {/* Heading */}
        <div className="sidebar-heading">Addons</div>
        {/* Nav Item - Pages Collapse Menu */}
        <li className="nav-item">
          <Link
            className="nav-link collapsed"
            to="#"
            data-toggle="collapse"
            data-target="#collapsePages"
            aria-expanded="true"
            aria-controls="collapsePages"
          >
            <i className="fas fa-fw fa-folder" />
            <span>Pages</span>
          </Link>
          <div
            id="collapsePages"
            className="collapse"
            aria-labelledby="headingPages"
            data-parent="#accordionSidebar"
          >
            <div className="bg-white py-2 collapse-inner rounded">
              <h6 className="collapse-header">Login Screens:</h6>
              <Link to="/Login" className="collapse-item">
                Login
              </Link>
              <Link to="/Register" className="collapse-item">
                Register
              </Link>
              <Link to="/ForgotPassword" className="collapse-item">
                Forgot Password
              </Link>
              <div className="collapse-divider" />
              <h6 className="collapse-header">Other Pages:</h6>
              <Link to="/Error" className="collapse-item">
                404 Page
              </Link>
              <Link to="/Blank" className="collapse-item">
                Blank Page
              </Link>
            </div>
          </div>
        </li>
        {/* Divider */}
        <hr className="sidebar-divider d-none d-md-block" />
        {/* Sidebar Toggler (Sidebar) */}
        <div className="text-center d-none d-md-inline">
          <button className="rounded-circle border-0" id="sidebarToggle" />
        </div>
      </ul>
    </div>
  );
}

export default TeacherNav;
