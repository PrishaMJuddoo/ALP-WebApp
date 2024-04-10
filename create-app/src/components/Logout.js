import { Link, useLocation, useNavigate } from "react-router-dom";

function Logout() {
  const location = useLocation();
  const navigate = useNavigate();

  const handleSignOut = () => {
    // Perform sign-out logic here, e.g., clear authentication token from local storage
    console.log("Signing out...");
    window.localStorage.removeItem("isLoggedIn");
    navigate("/login");
  };
  return (
    <div
      className="modal fade"
      id="logoutModal"
      tabIndex={-1}
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">
              Ready to Leave?
            </h5>
            <button
              className="close"
              type="button"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">×</span>
            </button>
          </div>
          <div className="modal-body">
            Select "Logout" below if you are ready to end your current session.
          </div>
          <div className="modal-footer">
            <button
              className="btn btn-secondary"
              type="button"
              data-dismiss="modal"
            >
              Cancel
            </button>
            <button className="btn btn-primary" onClick={handleSignOut}>
              Sign Out
            </button>
            {window.localStorage.setItem("redirectPath", location.pathname)}
          </div>
        </div>
      </div>
    </div>
  );
}
export default Logout;
