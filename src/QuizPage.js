  import { useLocation, useNavigate } from "react-router-dom";
  import { useState, useEffect } from "react";
  import axios from "axios";
  import API_URL from "./config";

  function QuizPage() {
    const navigate = useNavigate();
    const location = useLocation();

    const rawText = location.state?.questions || "";

    const [questions, setQuestions] = useState([]);
    const [answers, setAnswers] = useState({});

    const [showModal, setShowModal] = useState(false);
    const [score, setScore] = useState(0);

    useEffect(() => {
      const token = localStorage.getItem("token");

      if (!token) {
        navigate("/");
      }
    }, [navigate]);

    useEffect(() => {
      if (!rawText) return;

      const blocks = rawText.trim().split(/\n{2,}/);

      const parsed = [];

      blocks.forEach((block) => {
        const lines = block.trim().split("\n");

        const questionLine = lines.find((l) => l.startsWith("Q:"));
        const optionA = lines.find((l) => l.startsWith("A)"));
        const optionB = lines.find((l) => l.startsWith("B)"));
        const optionC = lines.find((l) => l.startsWith("C)"));
        const optionD = lines.find((l) => l.startsWith("D)"));
        const answerLine = lines.find((l) => l.startsWith("Answer:"));

        if (
          questionLine &&
          optionA &&
          optionB &&
          optionC &&
          optionD &&
          answerLine
        ) {
          const correctLetter = answerLine.replace("Answer:", "").trim();

          const optionMap = {
            A: optionA.replace("A)", "").trim(),
            B: optionB.replace("B)", "").trim(),
            C: optionC.replace("C)", "").trim(),
            D: optionD.replace("D)", "").trim(),
          };

          parsed.push({
            question: questionLine.replace("Q:", "").trim(),
            optionA: optionMap.A,
            optionB: optionMap.B,
            optionC: optionMap.C,
            optionD: optionMap.D,
            answer: optionMap[correctLetter],
          });
        }
      });

      setQuestions(parsed);
    }, [rawText]);

    const submitQuiz = async () => {
      if (Object.keys(answers).length < questions.length) {
        alert("Please answer all questions.");
        return;
      }

      let finalScore = 0;

      questions.forEach((q, index) => {
        if (answers[index] === q.answer) {
          finalScore++;
        }
      });

      const email = localStorage.getItem("email");

      try {
        await axios.post(`${API_URL}/upload/save-result`, {
          userEmail: email,
          score: finalScore,
          totalQuestions: questions.length,
        });

        setScore(finalScore);
        setShowModal(true);

      } catch (error) {
        console.error(error);
        alert("Failed to save quiz result.");
      }
    };

    if (!rawText) {
      return (
        <div className="container mt-5">
          <div className="alert alert-warning">
            No quiz found. Please generate one first.
          </div>
        </div>
      );
    }

    if (questions.length === 0) {
      return (
        <div className="container mt-5 text-center">
          <div className="spinner-border text-primary"></div>
          <p className="mt-3">Loading Quiz...</p>
        </div>
      );
    }

    return (
      <div className="container py-5">

        <div className="text-center mb-5">
          <h1 className="fw-bold">
            🧠 AI Generated Quiz
          </h1>

          <p className="text-muted">
            Test your understanding of your uploaded notes.
          </p>
        </div>

        {/* Progress */}

        <div className="mb-5">

          <div className="d-flex justify-content-between">

            <span>Answered</span>

            <span>
              {Object.keys(answers).length} / {questions.length}
            </span>

          </div>

          <div className="progress mt-2">

            <div
              className="progress-bar progress-bar-striped progress-bar-animated"
              style={{
                width: `${
                  (Object.keys(answers).length / questions.length) * 100
                }%`,
              }}
            ></div>

          </div>

        </div>

        {questions.map((q, index) => (

          <div className="card shadow border-0 mb-4" key={index}>

            <div className="card-body">

              <h5 className="fw-bold">

                <span className="badge bg-primary me-2">
                  {index + 1}
                </span>

                {q.question}

              </h5>

              <hr />

              {[q.optionA, q.optionB, q.optionC, q.optionD].map(
                (option, i) => (

                  <div
                    className="form-check border rounded p-3 mb-3"
                    key={i}
                  >

                    <input
                      className="form-check-input"
                      type="radio"
                      id={`q${index}${i}`}
                      name={`q${index}`}
                      checked={answers[index] === option}
                      value={option}
                      onChange={() =>
                        setAnswers({
                          ...answers,
                          [index]: option,
                        })
                      }
                    />

                    <label
                      className="form-check-label ms-2"
                      htmlFor={`q${index}${i}`}
                    >
                      {option}
                    </label>

                  </div>

                )
              )}

            </div>

          </div>

        ))}

        <div className="text-center mt-5">

          <button
            className="btn btn-success btn-lg px-5"
            onClick={submitQuiz}
          >
            <i className="bi bi-check-circle-fill me-2"></i>

            Submit Quiz

          </button>

        </div>

        {/* Bootstrap Modal */}

        {showModal && (
          <div
            className="modal fade show"
            style={{
              display: "block",
              background: "rgba(0,0,0,.5)",
            }}
          >
            <div className="modal-dialog modal-dialog-centered">

              <div className="modal-content">

                <div className="modal-header bg-success text-white">

                  <h5 className="modal-title">
                    🎉 Quiz Completed
                  </h5>

                </div>

                <div className="modal-body text-center">

                  <h2 className="text-success">

                    {score} / {questions.length}

                  </h2>

                  <h4 className="mt-3">

                    {Math.round((score / questions.length) * 100)}%

                  </h4>

                  <hr />

                  <p>

                    ✅ Correct :
                    <strong> {score}</strong>

                  </p>

                  <p>

                    ❌ Wrong :
                    <strong> {questions.length - score}</strong>

                  </p>

                  <p>

                    {score === questions.length
                      ? "🏆 Outstanding!"
                      : score >= questions.length * 0.8
                      ? "🌟 Excellent Work!"
                      : score >= questions.length * 0.6
                      ? "👍 Good Job!"
                      : "📚 Keep Practicing!"}

                  </p>

                </div>

                <div className="modal-footer justify-content-center">

                  <button
                    className="btn btn-primary"
                    onClick={() => navigate("/result")}
                  >
                    View Results
                  </button>

                  <button
                    className="btn btn-secondary"
                    onClick={() => navigate("/dashboard")}
                  >
                    Dashboard
                  </button>

                </div>

              </div>

            </div>
          </div>
        )}
      </div>
    );
  }

  export default QuizPage;