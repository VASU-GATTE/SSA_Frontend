import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import API_URL from "./config";

function UploadNotes() {
  const navigate = useNavigate();

  const email = localStorage.getItem("email");

  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/");
    }
  }, [navigate]);

  const handleUpload = async () => {
    if (!file) {
      alert("Please select a file first.");
      return;
    }

    const formData = new FormData();

    formData.append("file", file);
    formData.append("email", email);

    setUploading(true);

    try {
      const res = await axios.post(
        `${API_URL}/upload/upload`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      alert(res.data);

      setFile(null);

      document.getElementById("fileInput").value = "";

    } catch (err) {
      console.error(err);
      alert("Upload Failed");
    }

    setUploading(false);
  };

  return (
    <div
      className="container py-5"
      style={{ maxWidth: "700px" }}
    >

      <div className="card border-0 shadow-lg">

        <div className="card-body p-5">

          <div className="text-center mb-4">

            <i
              className="bi bi-cloud-arrow-up-fill text-primary"
              style={{ fontSize: "70px" }}
            ></i>

            <h2 className="fw-bold mt-3">
              Upload Study Notes
            </h2>

            <p className="text-muted">
              Upload your PDF or TXT files and let AI generate summaries and quizzes.
            </p>

          </div>

          <div className="mb-4">

            <label className="form-label fw-semibold">
              Select File
            </label>

            <input
              id="fileInput"
              type="file"
              accept=".pdf,.txt"
              className="form-control"
              onChange={(e) => setFile(e.target.files[0])}
            />

          </div>

          {file && (

            <div className="alert alert-success">

              <i className="bi bi-file-earmark-text-fill me-2"></i>

              <strong>Selected File:</strong>

              <br />

              {file.name}

              <br />

              <small>

                {(file.size / 1024).toFixed(2)} KB

              </small>

            </div>

          )}

          <div className="d-grid gap-3">

            <button
              className="btn btn-primary btn-lg"
              onClick={handleUpload}
              disabled={uploading}
            >

              {uploading ? (
                <>
                  <span className="spinner-border spinner-border-sm me-2"></span>
                  Uploading...
                </>
              ) : (
                <>
                  <i className="bi bi-cloud-upload-fill me-2"></i>
                  Upload Notes
                </>
              )}

            </button>

            <button
              className="btn btn-outline-primary"
              onClick={() => navigate("/noteslist")}
            >

              <i className="bi bi-journal-text me-2"></i>

              View My Notes

            </button>

            <button
              className="btn btn-outline-secondary"
              onClick={() => navigate("/dashboard")}
            >

              <i className="bi bi-house-fill me-2"></i>

              Back to Dashboard

            </button>

          </div>

          <hr className="my-4" />

          <div>

            <h5 className="fw-bold">
              Supported File Types
            </h5>

            <ul className="text-muted">

              <li>PDF Documents (.pdf)</li>

              <li>Text Files (.txt)</li>

              <li>Maximum file size as configured by the server</li>

            </ul>

          </div>

        </div>

      </div>

    </div>
  );
}

export default UploadNotes;