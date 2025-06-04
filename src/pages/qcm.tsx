import Logos from "../components/Logos";
import { useNavigate } from "react-router-dom";
import { useState, type CSSProperties } from "react";

export default function DesoulerQuestion() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);
  const [answered, setAnswered] = useState<boolean>(false);
  const [correct, setCorrect] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);
  const [question, setQuestion] = useState<number>(0);

  const answers1 = [
    { text: "Boire un café bien serré.", correct: false },
    { text: "Prendre une douche froide.", correct: false },
    { text: "Attendre et laisser le corps éliminer l'alcool.", correct: true },
  ];

  const answers2 = [
    { text: "Boire un café bien serré.", correct: false },
    { text: "Prendre une douche froide.", correct: false },
    { text: "Attendre et laisser le corps éliminer l'alcool.", correct: true },
  ];
  const answers3 = [
    { text: "Boire un café bien serré.", correct: false },
    { text: "Prendre une douche froide.", correct: false },
    { text: "Attendre et laisser le corps éliminer l'alcool.", correct: true },
  ];

  const ans = [answers1, answers2, answers3];
  const answers = ans[question];

  const loaderStyle: CSSProperties = {
    width: "2rem",
    height: "2rem",
    border: "4px solid white",
    borderTop: "4px solid #3b82f6",
    borderRadius: "50%",
    animation: "spin 1s linear infinite",
  };

  const handleClick = (correct: boolean) => {
    if (answered) return; // Prevent multiple clicks after answering
    console.log("Clicked on", correct ? "correct" : "incorrect", "answer");
    setLoading(true);

    //setTimeout(() => {
    if (correct) {
      setScore(score + 1);
    }
    setCorrect(correct);
    setAnswered(true);
    setLoading(false);
    //}, 200);
  };

  const nextQuestion = () => {
    setLoading(false);
    setAnswered(false);
    setCorrect(false);
    setQuestion(question + 1); // Increment the question index
    if (question >= ans.length - 1) {
      navigate("/score", {
        state: {
          score: score,
          question: question + 1,
        },
      });
    }
  };

  const textTitleStyle: CSSProperties = {
    fontFamily: "funny",
    marginBottom: "0rem",
    color: "white",
    fontWeight: "bold",
    fontSize: "2.5rem",
    lineHeight: 1.5,
    padding: "1rem",
    textShadow: "3px 3px 0px black",
    textAlign: "center",
    animation: "fadeInUp 0.8s ease-out forwards",
  };

  return (
    <div>
      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
      {answered && (
        <div style={textTitleStyle}>{!correct ? "Faux ❌" : "Juste ✅"}</div>
      )}

      <div
        style={{
          backgroundColor: "white",
          borderRadius: "1.5rem",
          maxWidth: "330px",
          width: "100%",
          overflow: "hidden",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
          margin: "0 auto",
        }}
      >
        <div
          style={{
            backgroundColor: "#3498db",
            color: "white",
            padding: "1.2rem",
            lineHeight: 1.5,
            fontWeight: "bold",
            fontFamily: "funny",
          }}
        >
          Quel est le meilleur moyen de dessouler rapidement après une soirée
          bien arrosée ?
        </div>
        <div
          style={{
            padding: "1.25rem",
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
            color: "black",
          }}
        >
          {answers.map((answer, idx) => {
            const letter = String.fromCharCode(65 + idx);
            return (
              <div
                key={letter}
                onClick={() => handleClick(answer.correct)}
                style={{
                  border: "2px solid #ec4899",
                  borderRadius: "999px",
                  padding: "0.75rem 1rem",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.75rem",
                  cursor: "pointer",
                }}
              >
                {loading ? (
                  <>
                    <div style={loaderStyle}></div>
                    <span>{answer.text}</span>
                  </>
                ) : (
                  <>
                    <span
                      style={{
                        border: answered ? "none" : "2px solid #3b82f6",
                        borderRadius: "999px",
                        padding: "0.25rem 0.75rem",
                        fontWeight: "bold",
                        color: "#3b82f6",
                      }}
                    >
                      {!answered ? letter : answer.correct ? "✔️" : "❌"}
                    </span>
                    <span>{answer.text}</span>
                  </>
                )}
              </div>
            );
          })}
        </div>
      </div>
      {answered && (
        <div
          style={{
            fontFamily: "funny",
            marginTop: "1rem",
            fontSize: "1rem",
            fontWeight: "bold",
            color: "#fff",
            animation: "fadeInUp 0.8s ease-out forwards",
            cursor: "pointer",
          }}
          onClick={() => nextQuestion()} // ← Change this if needed
        >
          Suivant →
        </div>
      )}
      <Logos />
    </div>
  );
}
