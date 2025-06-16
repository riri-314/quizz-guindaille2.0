import Logos from "../components/Logos";
import { useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState, type CSSProperties } from "react";

export default function DesoulerQuestion() {
  const navigate = useNavigate();
  const location = useLocation();
  const { quiz, start } = location.state || {};
  const [answered, setAnswered] = useState<boolean>(false);
  const [correct, setCorrect] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);
  const [question, setQuestion] = useState<number>(0);
  const [title, setTitle] = useState<string>("");
  const [questions, setQuestions] = useState<any[]>([]);
  const [nbQUestions, setNbQuestions] = useState<number>(0);
  const [helpText, setHelpText] = useState<string>("");

  useEffect(() => {
    try {
      const ans = quiz.questions;
      setNbQuestions(ans.length);
      setQuestions(ans[question].answers);
      setTitle(quiz.questions[question].text);
      setHelpText(quiz.questions[question].help || ""); // Set help text if available
    } catch (error) {
      console.error("Error in DesoulerQuestion component:", error);
      navigate("/error");
    }
  }, []);

  const handleClick = (correct: boolean) => {
    if (answered) return; // Prevent multiple clicks after answering
    if (correct) {
      setScore(score + 1);
    }
    setCorrect(correct);
    setAnswered(true);
  };

  const nextQuestion = () => {
    setAnswered(false);
    setCorrect(false);
    setQuestion(question + 1); // Increment the question index
    if (question >= nbQUestions - 1) {
      navigate("/score", {
        state: {
          score: score,
          question: question + 1,
          timeDiff: new Date().getTime() - start.getTime(),
        },
      });
    } else {
      setQuestions(quiz.questions[question + 1].answers);
      setTitle(quiz.questions[question + 1].text);
      setHelpText(quiz.questions[question + 1].help || ""); // Set help text if available

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

    const textExplainStyle: CSSProperties = {
    fontFamily: "funny",
    marginBottom: "0rem",
    color: "white",
    fontWeight: "bold",
    fontSize: "0.8rem",
    paddingLeft: "1rem",
    paddingRight: "1rem",
    lineHeight: 1.5,
    textAlign: "center",
    animation: "fadeInUp 0.8s ease-out forwards",
  };

  //    <div style={answered ? { height: "93vh" } : {}}>
  return (
    <>
      <div style={{paddingBottom: "5rem", maxWidth: "600px"}}>
        {answered && (
          <>
          <div style={textTitleStyle}>{!correct ? "Faux ❌ " : "Juste ✅"}</div>
          <div style={textExplainStyle}>{helpText}</div>
          </>
        )}

        <br />
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
            {title}
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
            {questions.map((answer: any, idx: any) => {
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
            onClick={() => nextQuestion()}
          >
            Suivant →
          </div>
        )}
      </div>
      <Logos />
    </>
  );
}
