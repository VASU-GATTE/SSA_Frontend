import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

function Dashboard() {
  const navigate = useNavigate();

  const name = localStorage.getItem("name");
  const email = localStorage.getItem("email");

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/");
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("email");
    localStorage.removeItem("name");

    navigate("/");
  };

  return (
    <>
      {/* Navbar */}

      <nav className="navbar navbar-expand-lg navbar-dark bg-primary shadow">
        <div className="container">

          <span className="navbar-brand fw-bold">
            📚 Smart Study Assistant
          </span>

          <button
            className="btn btn-outline-light"
            onClick={handleLogout}
          >
            <i className="bi bi-box-arrow-right me-2"></i>
            Logout
          </button>

        </div>
      </nav>

      {/* Dashboard */}

      <div className="container py-5">

        {/* Welcome */}

        <div className="mb-5">

          <h2 className="fw-bold">
            Welcome back, {name} 👋
          </h2>

          <p className="text-muted">
            Manage your notes, quizzes and learning progress from one place.
          </p>

        </div>

        <div className="row">

          {/* Left */}

          <div className="col-lg-8">

            <div className="row g-4">

              <div className="col-md-4">
                <div className="card border-0 shadow-sm text-center h-100">

                  <div className="card-body">

                    <i
                      className="bi bi-upload text-primary"
                      style={{ fontSize: "45px" }}
                    ></i>

                    <h5 className="mt-3">
                      Upload Notes
                    </h5>

                    <p className="text-muted">
                      Add new study material.
                    </p>

                    <button
                      className="btn btn-primary w-100"
                      onClick={() => navigate("/upload")}
                    >
                      Upload
                    </button>

                  </div>

                </div>
              </div>

              <div className="col-md-4">
                <div className="card border-0 shadow-sm text-center h-100">

                  <div className="card-body">

                    <i
                      className="bi bi-journal-text text-success"
                      style={{ fontSize: "45px" }}
                    ></i>

                    <h5 className="mt-3">
                      My Notes
                    </h5>

                    <p className="text-muted">
                      View all uploaded notes.
                    </p>

                    <button
                      className="btn btn-success w-100"
                      onClick={() => navigate("/noteslist")}
                    >
                      View Notes
                    </button>

                  </div>

                </div>
              </div>

              <div className="col-md-4">
                <div className="card border-0 shadow-sm text-center h-100">

                  <div className="card-body">

                    <i
                      className="bi bi-bar-chart-fill text-warning"
                      style={{ fontSize: "45px" }}
                    ></i>

                    <h5 className="mt-3">
                      Results
                    </h5>

                    <p className="text-muted">
                      Check quiz performance.
                    </p>

                    <button
                      className="btn btn-warning text-white w-100"
                      onClick={() => navigate("/result")}
                    >
                      View Results
                    </button>

                  </div>

                </div>
              </div>

            </div>

            {/* Quick Actions */}

            <div className="card shadow-sm border-0 mt-5">

              <div className="card-body">

                <h4 className="fw-bold mb-4">
                  Quick Actions
                </h4>

                <div className="d-flex flex-wrap gap-3">

                  <button
                    className="btn btn-outline-primary"
                    onClick={() => navigate("/upload")}
                  >
                    <i className="bi bi-cloud-upload me-2"></i>
                    Upload Notes
                  </button>

                  <button
                    className="btn btn-outline-success"
                    onClick={() => navigate("/noteslist")}
                  >
                    <i className="bi bi-book me-2"></i>
                    Browse Notes
                  </button>

                  <button
                    className="btn btn-outline-warning"
                    onClick={() => navigate("/result")}
                  >
                    <i className="bi bi-award me-2"></i>
                    Results
                  </button>

                </div>

              </div>

            </div>

          </div>

          {/* Right */}

          <div className="col-lg-4 mt-4 mt-lg-0">

            <div className="card border-0 shadow-sm">

              <div className="card-body text-center">

                <i
                  className="bi bi-person-circle text-primary"
                  style={{ fontSize: "80px" }}
                ></i>

                <h4 className="mt-3">
                  {name}
                </h4>

                <p className="text-muted">
                  {email}
                </p>

                <hr />

                <div className="text-start">

                  <p>
                    <strong>Role:</strong> Student
                  </p>

                  <p>
                    <strong>Status:</strong>

                    <span className="badge bg-success ms-2">
                      Active
                    </span>
                  </p>

                  <p>
                    <strong>Platform:</strong>

                    Smart Study Assistant
                  </p>

                </div>

              </div>

            </div>

          </div>

        </div>

      </div>
    </>
  );
}

export default Dashboard;