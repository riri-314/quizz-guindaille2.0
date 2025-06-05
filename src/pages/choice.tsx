import { useNavigate } from "react-router-dom";
import { type CSSProperties } from "react";
import Arrow from "../components/Arrow";
import Logos from "../components/Logos";
import { useData } from "../provider/dataProvider";

export default function Choice() {
  const navigate = useNavigate();
  const { data } = useData();

  const selectedQuiz = () => {
    if (!data?.quizzdata) {
      // should not happen, but just in case
      navigate("/error");
      return;
    }

    const allQuizzes = Object.values(data.quizzdata);
    if (allQuizzes.length === 0) {
      // No quizzes available, navigate to error page, should not happen, but just in case
      navigate("/error");
      return;
    }

    const now = new Date();
    const validQuizzes = allQuizzes.filter((quiz: any) => {
      const start = quiz.start?.toDate?.() ?? new Date(quiz.start);
      const stop = quiz.stop?.toDate?.() ?? new Date(quiz.stop);
      return start <= now && now <= stop;
    });

    const selectedQuiz: any = (
      validQuizzes.length > 0 ? validQuizzes : allQuizzes
    )[
      Math.floor(
        Math.random() *
          (validQuizzes.length > 0 ? validQuizzes.length : allQuizzes.length)
      )
    ];

    //setQuiz(selectedQuiz);

    //console.log("Selected quiz:", selectedQuiz);
    //console.log("Selected quiz, questions:", selectedQuiz.questions);
    //console.log("question index:", question);
    //console.log("Selected quiz, selected question:", selectedQuiz.questions[2]);
    return selectedQuiz;
  };

  const QCM = () => {
    navigate("/qcm", {
      state: {
        quiz: selectedQuiz(),
        start: new Date(),
      },
    });
  };

  const SimpleText = () => {
    navigate("/picto");
  };

  const textTitleStyle: CSSProperties = {
    fontFamily: "funny",
    // position: "absolute", // ❌ remove this line
    marginBottom: "2rem", // ✅ space below the title
    color: "white",
    fontWeight: "bold",
    fontSize: "2.5rem",
    lineHeight: 1.5,
    padding: "1rem",
    textShadow: "3px 3px 0px black",
    textAlign: "center",
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        color: "white",
        padding: "1rem",
        textAlign: "center",
      }}
    >
      <Arrow path="/guest" />

      <div style={textTitleStyle}>Fait un choix !</div>

      <button
        onClick={QCM}
        style={{
          fontFamily: "funny",
          background: "linear-gradient(135deg, #3b82f6, #60a5fa)",
          color: "white",
          padding: "0.85rem 1.75rem",
          borderRadius: "999px",
          border: "none",
          marginBottom: "0.75rem",
          width: "100%",
          maxWidth: "320px",
          fontWeight: "bold",
          fontSize: "1rem",
          boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
          cursor: "pointer",
          transition: "transform 0.2s",
        }}
        onMouseOver={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
        onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
      >
        Teste toi pour savoir si tu es un pro de la guindaille 2.0
      </button>

      <div
        style={{
          fontFamily: "funny",
          margin: "0.5rem 0",
          fontSize: "0.9rem",
          fontWeight: "bold",
          backgroundColor: "rgba(255, 255, 255, 0.1)",
          padding: "0.25rem 1rem",
          borderRadius: "999px",
          boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
        }}
      >
        ou
      </div>

      <button
        onClick={SimpleText}
        style={{
          fontFamily: "funny",
          marginTop: "0.75rem",
          background: "linear-gradient(135deg,rgb(31, 160, 117), #34d399)",
          color: "white",
          padding: "0.85rem 1.75rem",
          borderRadius: "999px",
          border: "none",
          width: "100%",
          maxWidth: "320px",
          fontWeight: "bold",
          fontSize: "1rem",
          boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
          cursor: "pointer",
          transition: "transform 0.2s",
        }}
        onMouseOver={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
        onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
      >
        Prouve que tu es le meilleur guindailleur 2.0
      </button>

      <Logos />
    </div>
  );
}
