import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import API_URL from "./config";

function NotesList() {
    const [files, setFiles] = useState([]);
    const [summary, setSummary] = useState("");
    const [loadingSummaryId, setLoadingSummaryId] = useState(null);
    const [loadingQuizId, setLoadingQuizId] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            navigate("/");
        }
    }, [navigate]);

    useEffect(() => {
        const email = localStorage.getItem("email");
        axios.get(`${API_URL}/upload/my-notes/${email}`)
            .then((res) => {
                setFiles(res.data);
            })
            .catch((err) => {
                console.error("Failed to fetch notes:", err);
            });
    }, []);

    const getSummary = async (noteId) => {
        setLoadingSummaryId(noteId);
        setSummary("");
        try {
            const res = await axios.post(`${API_URL}/upload/generate-summary/${noteId}`)
            setSummary(res.data);
        } catch (err) {
            setSummary("Failed to generate summary. Try again.");
        }
        setLoadingSummaryId(null);
    };

    const generateQuiz = async (noteId) => {
        setLoadingQuizId(noteId);
        try {
            const res = await axios.post(
                `${API_URL}/upload/generate-quiz/${noteId}`
            );
            navigate("/quiz", {
                state: { questions: res.data }
            });
        } catch (err) {
            alert("Failed to generate quiz. Try again.");
        }
        setLoadingQuizId(null);
    };

    return (
  <div className="container py-5">

    <div className="d-flex justify-content-between align-items-center mb-4">

      <div>
        <h2 className="fw-bold">
          📚 My Study Notes
        </h2>

        <p className="text-muted">
          View your uploaded notes, generate AI summaries, and create quizzes.
        </p>
      </div>

      <button
        className="btn btn-primary"
        onClick={() => navigate("/upload")}
      >
        <i className="bi bi-upload me-2"></i>
        Upload Notes
      </button>

    </div>

    {files.length === 0 ? (

      <div className="alert alert-info">
        No notes uploaded yet.
      </div>

    ) : (

      <div className="row">

        {files.map((file) => (

          <div className="col-lg-6 mb-4" key={file.id}>

            <div className="card shadow-sm border-0 h-100">

              <div className="card-body">

                <div className="d-flex align-items-center mb-3">

                  <i
                    className="bi bi-file-earmark-pdf-fill text-danger me-3"
                    style={{ fontSize: "45px" }}
                  ></i>

                  <div>

                    <h5 className="mb-1">
                      {file.fileName}
                    </h5>

                    <small className="text-muted">
                      Uploaded Study Material
                    </small>

                  </div>

                </div>

                <div className="d-grid gap-2">

                  <button
                    className="btn btn-outline-primary"
                    onClick={() =>
                      window.open(
                        `${API_URL}/upload/view/${file.fileName}`,
                        "_blank"
                      )
                    }
                  >
                    <i className="bi bi-eye-fill me-2"></i>
                    View Note
                  </button>

                  <button
                    className="btn btn-success"
                    disabled={loadingSummaryId === file.id}
                    onClick={() => getSummary(file.id)}
                  >
                    {loadingSummaryId === file.id ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2"></span>
                        Generating...
                      </>
                    ) : (
                      <>
                        <i className="bi bi-stars me-2"></i>
                        Generate AI Summary
                      </>
                    )}
                  </button>

                  <button
                    className="btn btn-warning text-white"
                    disabled={loadingQuizId === file.id}
                    onClick={() => generateQuiz(file.id)}
                  >
                    {loadingQuizId === file.id ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2"></span>
                        Generating...
                      </>
                    ) : (
                      <>
                        <i className="bi bi-patch-question-fill me-2"></i>
                        Generate Quiz
                      </>
                    )}
                  </button>

                  <button
                    className="btn btn-info text-white"
                    onClick={() => navigate("/result")}
                  >
                    <i className="bi bi-bar-chart-fill me-2"></i>
                    Quiz Results
                  </button>

                </div>

              </div>

            </div>

          </div>

        ))}

      </div>

    )}

    {summary && (

      <div className="card shadow mt-5 border-0">

        <div className="card-header bg-primary text-white">

          <h4 className="mb-0">
            🤖 AI Generated Summary
          </h4>

        </div>

        <div className="card-body">

          <p style={{ whiteSpace: "pre-wrap" }}>
            {summary}
          </p>

        </div>

      </div>

    )}

  </div>
);
}

export default NotesList;