import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import API_URL from "./config";

function Login() {
  const [user, setUser] = useState({
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

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        `${API_URL}/api/users/login`,
        user
      );

      alert("Login Successful!");

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("name", res.data.name);
      localStorage.setItem("email", user.email);

      navigate("/dashboard");
    } catch (error) {
      console.log(error);
      alert("Invalid Email or Password");
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
          maxWidth: "420px",
          width: "100%",
          borderRadius: "20px",
        }}
      >
        <div className="card-body p-5">

          {/* Logo */}

          <div className="text-center mb-4">

            <i
              className="bi bi-mortarboard-fill text-primary"
              style={{ fontSize: "60px" }}
            ></i>

            <h2 className="fw-bold mt-3">
              Welcome Back
            </h2>

            <p className="text-muted">
              Login to Smart Study Assistant
            </p>

          </div>

          <form onSubmit={handleLogin}>

            {/* Email */}

            <div className="mb-3">

              <label className="form-label fw-semibold">
                Email Address
              </label>

              <div className="input-group">

                <span className="input-group-text">
                  <i className="bi bi-envelope-fill"></i>
                </span>

                <input
                  type="email"
                  name="email"
                  className="form-control"
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
                  <i className="bi bi-lock-fill"></i>
                </span>

                <input
                  type="password"
                  name="password"
                  className="form-control"
                  placeholder="Enter your password"
                  value={user.password}
                  onChange={handleChange}
                  required
                />

              </div>

            </div>

            {/* Remember Me & Forgot Password */}

            <div className="d-flex justify-content-between mb-4">

              <div className="form-check">

                <input
                  className="form-check-input"
                  type="checkbox"
                  id="remember"
                />

                <label
                  className="form-check-label"
                  htmlFor="remember"
                >
                  Remember Me
                </label>

              </div>

              <span
                className="text-primary"
                style={{ cursor: "pointer" }}
              >
                Forgot Password?
              </span>

            </div>

            {/* Login Button */}

            <button
              type="submit"
              className="btn btn-primary w-100 py-2 fw-bold"
            >
              Login
            </button>

          </form>

          <hr />

          <p className="text-center mb-0">

            Don't have an account?{" "}

            <span
              className="text-primary fw-semibold"
              style={{ cursor: "pointer" }}
              onClick={() => navigate("/register")}
            >
              Register Now
            </span>

          </p>

        </div>
      </div>
    </div>
  );
}

export default Login;