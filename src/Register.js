import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import API_URL from "./config";

function Register() {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `${API_URL}/api/users/register`,
        user
      );

      alert("Registration Successful!");
      console.log(response.data);
      navigate("/login");
    } catch (error) {
    console.error(error);

    if (error.response) {
        console.log(error.response.data);
        alert(error.response.data);
    } else {
        alert("Server Error");
    }
  }
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg,#0d6efd,#6610f2)",
      }}
    >
      <div
        className="card shadow-lg border-0"
        style={{
          maxWidth: "450px",
          width: "100%",
          borderRadius: "20px",
        }}
      >
        <div className="card-body p-5">

          <div className="text-center mb-4">
            <i
              className="bi bi-person-plus-fill text-primary"
              style={{ fontSize: "60px" }}
            ></i>

            <h2 className="fw-bold mt-3">
              Create Account
            </h2>

            <p className="text-muted">
              Join Smart Study Assistant
            </p>
          </div>

          <form onSubmit={handleSubmit}>

            {/* Name */}

            <div className="mb-3">
              <label className="form-label fw-semibold">
                Full Name
              </label>

              <div className="input-group">

                <span className="input-group-text">
                  <i className="bi bi-person"></i>
                </span>

                <input
                  type="text"
                  className="form-control"
                  name="name"
                  placeholder="Enter your name"
                  value={user.name}
                  onChange={handleChange}
                  required
                />

              </div>
            </div>

            {/* Email */}

            <div className="mb-3">

              <label className="form-label fw-semibold">
                Email Address
              </label>

              <div className="input-group">

                <span className="input-group-text">
                  <i className="bi bi-envelope"></i>
                </span>

                <input
                  type="email"
                  className="form-control"
                  name="email"
                  placeholder="Enter your email"
                  value={user.email}
                  onChange={handleChange}
                  required
                />

              </div>

            </div>

            {/* Password */}

            <div className="mb-4">

              <label className="form-label fw-semibold">
                Password
              </label>

              <div className="input-group">

                <span className="input-group-text">
                  <i className="bi bi-lock"></i>
                </span>

                <input
                  type="password"
                  className="form-control"
                  name="password"
                  placeholder="Enter your password"
                  value={user.password}
                  onChange={handleChange}
                  required
                />

              </div>

            </div>

            {/* Register Button */}

            <button
              type="submit"
              className="btn btn-primary w-100 py-2 fw-bold"
            >
              Register
            </button>

          </form>

          <hr />

          <p className="text-center mb-0">
            Already have an account?{" "}
            <span
              className="text-primary fw-semibold"
              style={{ cursor: "pointer" }}
              onClick={() => navigate("/login")}
            >
              Login
            </span>
          </p>

        </div>
      </div>
    </div>
  );
}

export default Register;