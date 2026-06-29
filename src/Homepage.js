import React from "react";
import { useNavigate } from "react-router-dom";

function Homepage() {
  const navigate = useNavigate();

  return (
    <>
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary shadow-sm">
        <div className="container">
          <a className="navbar-brand fw-bold" href="/">
            📚 Smart Study Assistant
          </a>

          <div className="ms-auto">
            <button
              className="btn btn-outline-light me-2"
              onClick={() => navigate("/login")}
            >
              Login
            </button>

            <button
              className="btn btn-light text-primary fw-semibold"
              onClick={() => navigate("/register")}
            >
              Register
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section
        className="d-flex align-items-center"
        style={{
          minHeight: "90vh",
          background:
            "linear-gradient(135deg,#0d6efd,#6610f2)",
        }}
      >
        <div className="container">
          <div className="row align-items-center">

            {/* Left Side */}
            <div className="col-lg-6 text-white">

              <span className="badge bg-light text-primary mb-3 p-2">
                AI Powered Learning Platform
              </span>

              <h1 className="display-4 fw-bold">
                Learn Smarter,
                <br />
                Not Harder.
              </h1>

              <p className="lead mt-4">
                Organize your notes, generate AI-powered summaries,
                create quizzes, and track your learning progress —
                all in one place.
              </p>

              <div className="mt-4">

                <button
                  className="btn btn-light btn-lg me-3 px-4"
                  onClick={() => navigate("/register")}
                >
                  Get Started
                </button>

                <button
                  className="btn btn-outline-light btn-lg px-4"
                  onClick={() => navigate("/login")}
                >
                  Login
                </button>

              </div>

            </div>

            {/* Right Side */}
            <div className="col-lg-6 text-center mt-5 mt-lg-0">

              <div className="card shadow-lg border-0 rounded-4">
                <div className="card-body p-5">

                  <i
                    className="bi bi-mortarboard-fill text-primary"
                    style={{ fontSize: "80px" }}
                  ></i>

                  <h3 className="mt-4">
                    Smart Study Assistant
                  </h3>

                  <p className="text-muted">
                    Your personal AI companion for
                    efficient learning and productivity.
                  </p>

                </div>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-5 bg-light">

        <div className="container">

          <h2 className="text-center fw-bold mb-5">
            Why Choose Us?
          </h2>

          <div className="row g-4">

            <div className="col-md-4">
              <div className="card h-100 border-0 shadow-sm text-center">
                <div className="card-body">

                  <i
                    className="bi bi-journal-richtext text-primary"
                    style={{ fontSize: "50px" }}
                  ></i>

                  <h4 className="mt-3">
                    Smart Notes
                  </h4>

                  <p className="text-muted">
                    Store and organize your study material
                    efficiently.
                  </p>

                </div>
              </div>
            </div>

            <div className="col-md-4">
              <div className="card h-100 border-0 shadow-sm text-center">
                <div className="card-body">

                  <i
                    className="bi bi-stars text-warning"
                    style={{ fontSize: "50px" }}
                  ></i>

                  <h4 className="mt-3">
                    AI Summaries
                  </h4>

                  <p className="text-muted">
                    Generate concise summaries instantly
                    using AI.
                  </p>

                </div>
              </div>
            </div>

            <div className="col-md-4">
              <div className="card h-100 border-0 shadow-sm text-center">
                <div className="card-body">

                  <i
                    className="bi bi-bar-chart-fill text-success"
                    style={{ fontSize: "50px" }}
                  ></i>

                  <h4 className="mt-3">
                    Track Progress
                  </h4>

                  <p className="text-muted">
                    Monitor your study performance
                    and improve daily.
                  </p>

                </div>
              </div>
            </div>

          </div>

        </div>

      </section>

      {/* Footer */}
      <footer className="bg-dark text-white py-4">
        <div className="container text-center">

          <h5>Smart Study Assistant</h5>

          <p className="text-white-50">
            Empowering students with AI-driven learning.
          </p>

          <small>
            © 2026 Smart Study Assistant. All Rights Reserved.
          </small>

        </div>
      </footer>
    </>
  );
}

export default Homepage;