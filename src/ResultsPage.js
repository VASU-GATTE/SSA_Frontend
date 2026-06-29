import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import API_URL from "./config";

function ResultsPage() {
  const navigate = useNavigate();

  const [results, setResults] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/");
    }
  }, [navigate]);

  useEffect(() => {
    const email = localStorage.getItem("email");

    axios
      .get(`${API_URL}/upload/results/${email}`)
      .then((res) => {
        setResults(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const highestScore =
    results.length > 0
      ? Math.max(...results.map((r) => r.score))
      : 0;

  return (
    <div className="container py-5">

      {/* Page Header */}

      <div className="text-center mb-5">

        <h1 className="fw-bold">
          📊 Quiz Results
        </h1>

        <p className="text-muted">
          View your quiz history and track your learning progress.
        </p>

      </div>

      {/* Statistics */}

      {results.length > 0 && (

        <div className="row mb-5">

          <div className="col-md-4 mb-3">

            <div className="card border-0 shadow-sm text-center">

              <div className="card-body">

                <h6 className="text-muted">
                  Total Quizzes
                </h6>

                <h2 className="text-primary">
                  {results.length}
                </h2>

              </div>

            </div>

          </div>

          <div className="col-md-4 mb-3">

            <div className="card border-0 shadow-sm text-center">

              <div className="card-body">

                <h6 className="text-muted">
                  Highest Score
                </h6>

                <h2 className="text-success">
                  {highestScore}
                </h2>

              </div>

            </div>

          </div>

          <div className="col-md-4 mb-3">

            <div className="card border-0 shadow-sm text-center">

              <div className="card-body">

                <h6 className="text-muted">
                  Average Score
                </h6>

                <h2 className="text-warning">
                  {(
                    results.reduce((sum, r) => sum + r.score, 0) /
                    results.length
                  ).toFixed(1)}
                </h2>

              </div>

            </div>

          </div>

        </div>

      )}

      {/* Results Table */}

      {results.length === 0 ? (

        <div className="alert alert-info text-center">

          <h5>No Quiz Results Found</h5>

          <p className="mb-0">
            Take a quiz to see your results here.
          </p>

        </div>

      ) : (

        <div className="card border-0 shadow">

          <div className="card-header bg-primary text-white">

            <h5 className="mb-0">
              Quiz History
            </h5>

          </div>

          <div className="table-responsive">

            <table className="table table-hover table-striped align-middle mb-0">

              <thead className="table-dark">

                <tr>

                  <th>#</th>

                  <th>Email</th>

                  <th>Score</th>

                  <th>Total Questions</th>

                  <th>Percentage</th>

                  <th>Date</th>

                </tr>

              </thead>

              <tbody>

                {results.map((result, index) => (

                  <tr key={result.id}>

                    <td>{index + 1}</td>

                    <td>{result.userEmail}</td>

                    <td>

                      <span className="badge bg-success">

                        {result.score}

                      </span>

                    </td>

                    <td>{result.totalQuestions}</td>

                    <td>

                      {Math.round(
                        (result.score / result.totalQuestions) * 100
                      )}
                      %

                    </td>

                    <td>

                      {result.quizDate
                        ? new Date(result.quizDate).toLocaleString()
                        : "N/A"}

                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>

        </div>

      )}

      {/* Buttons */}

      <div className="text-center mt-5">

        <button
          className="btn btn-primary me-3"
          onClick={() => navigate("/noteslist")}
        >
          <i className="bi bi-journal-text me-2"></i>
          Take Another Quiz
        </button>

        <button
          className="btn btn-secondary"
          onClick={() => navigate("/dashboard")}
        >
          <i className="bi bi-house-fill me-2"></i>
          Dashboard
        </button>

      </div>

    </div>
  );
}

export default ResultsPage;