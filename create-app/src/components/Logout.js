import { Link } from "react-router-dom";

function Logout() {
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
            Select "Log out" below if you want to logout.
          </div>
          <div className="modal-footer">
            <button
              className="btn btn-secondary"
              type="button"
              data-dismiss="modal"
            >
              Cancel
            </button>
<<<<<<< Updated upstream
            <Link to="/Login" className="btn btn-primary">
              Logout
            </Link>
=======
            <button className="btn btn-primary" onClick={handleSignOut}>
              Log Out
            </button>
            {window.localStorage.setItem("redirectPath", location.pathname)}
>>>>>>> Stashed changes
          </div>
        </div>
      </div>
    </div>
  );
}
export default Logout;
