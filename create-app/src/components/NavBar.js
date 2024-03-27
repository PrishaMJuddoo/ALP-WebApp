import { Link } from "react-router-dom";

function Nav() {
  return (
    <div>
      <ul
        className="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion"
        id="accordionSidebar"
      >
        {/* Sidebar - Brand */}

        <Link
          to="/"
          className="sidebar-brand d-flex align-items-center
          justify-content-center"
        >
          <div className="sidebar-brand-icon rotate-n-15">
            <i className="fas fa-laugh-wink" />
          </div>
          <div className="sidebar-brand-text mx-3">Amrita Create</div>
        </Link>
        {/* Divider */}
        <hr className="sidebar-divider my-0" />
        {/* Nav Item - Dashboard */}
        <Link to="/">
          <li className="nav-item active">
            <a className="nav-link">
              <i className="fas fa-fw fa-tachometer-alt" />
              <span>Dashboard</span>
            </a>
          </li>
        </Link>
        {/* Divider */}
        <hr className="sidebar-divider" />
        {/* Heading */}
        <div className="sidebar-heading">Interface</div>
        {/* Nav Item - Pages Collapse Menu */}
        <li className="nav-item">
          <a
            className="nav-link collapsed"
            href="#"
            data-toggle="collapse"
            data-target="#collapseTwo"
            aria-expanded="true"
            aria-controls="collapseTwo"
          >
            <i className="fas fa-fw fa-cog" />
            <span>Components</span>
          </a>
          <div
            id="collapseTwo"
            className="collapse"
            aria-labelledby="headingTwo"
            data-parent="#accordionSidebar"
          >
            <div className="bg-white py-2 collapse-inner rounded">
              <h6 className="collapse-header">Custom Components:</h6>
              <Link to="/Buttons" className="collapse-item">
                Buttons
              </Link>
              <Link to="/Cards" className="collapse-item">
                Cards
              </Link>
            </div>
          </div>
        </li>
        {/* Nav Item - Utilities Collapse Menu */}
        <li className="nav-item">
          <a
            className="nav-link collapsed"
            href="#"
            data-toggle="collapse"
            data-target="#collapseUtilities"
            aria-expanded="true"
            aria-controls="collapseUtilities"
          >
            <i className="fas fa-fw fa-wrench" />
            <span>Utilities</span>
          </a>
          <div
            id="collapseUtilities"
            className="collapse"
            aria-labelledby="headingUtilities"
            data-parent="#accordionSidebar"
          >
            <div className="bg-white py-2 collapse-inner rounded">
              <h6 className="collapse-header">Custom Utilities:</h6>
              <Link to="/Color" className="collapse-item">
                Colours
              </Link>
              <Link to="/Border" className="collapse-item">
                Borders
              </Link>
              <Link to="/Animation" className="collapse-item">
                Animations
              </Link>
              <Link to="/Other" className="collapse-item">
                Other
              </Link>
            </div>
          </div>
        </li>
        {/* Divider */}
        <hr className="sidebar-divider" />
        {/* Heading */}
        <div className="sidebar-heading">Addons</div>
        {/* Nav Item - Pages Collapse Menu */}
        <li className="nav-item">
          <a
            className="nav-link collapsed"
            href="#"
            data-toggle="collapse"
            data-target="#collapsePages"
            aria-expanded="true"
            aria-controls="collapsePages"
          >
            <i className="fas fa-fw fa-folder" />
            <span>Pages</span>
          </a>
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
        {/* Nav Item - Charts */}
        <li className="nav-item">
          <Link to="/Charts" className="nav-link">
            <i className="fas fa-fw fa-chart-area" />
            <span>Charts</span>
          </Link>
        </li>
        {/* Nav Item - Tables */}
        <li className="nav-item">
          <Link to="/Tables" className="nav-link">
            <i className="fas fa-fw fa-chart-area" />
            <span>Tables</span>
          </Link>
        </li>
        {/* Divider */}
        <hr className="sidebar-divider d-none d-md-block" />
        {/* Sidebar Toggler (Sidebar) */}
        <div className="text-center d-none d-md-inline">
          <button className="rounded-circle border-0" id="sidebarToggle" />
        </div>
        {/* Sidebar Message */}
        <div className="sidebar-card d-none d-lg-flex">
          <img
            className="sidebar-card-illustration mb-2"
            src="img/undraw_rocket.svg"
            alt="..."
          />
          <p className="text-center mb-2">
            <strong>SB Admin Pro</strong> is packed with premium features,
            components, and more!
          </p>
          <a
            className="btn btn-success btn-sm"
            href="https://startbootstrap.com/theme/sb-admin-pro"
          >
            Upgrade to Pro!
          </a>
        </div>
      </ul>
    </div>
  );
}
export default Nav;
