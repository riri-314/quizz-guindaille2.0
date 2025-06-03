import { useNavigate } from "react-router-dom";
import Logos from "../components/Logos";

export default function DesoulerQuestion() {
  const navigate = useNavigate();

  return (
    <div style={{}}>

      <div
        style={{
          backgroundColor: "white",
          borderRadius: "1.5rem",
          maxWidth: "330px",
          width: "100%",
          overflow: "hidden",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
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
          {[
            "Boire un café bien serré.",
            "Prendre une douche froide.",
            "Attendre et laisser le corps éliminer l'alcool.",
          ].map((text, idx) => {
            const letter = String.fromCharCode(65 + idx);
            return (
              <div
                key={letter}
                onClick={() => navigate("/score")}
                style={{
                  border: "2px solid #ec4899",
                  borderRadius: "999px",
                  padding: "0.75rem 1rem",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.75rem",
                }}
              >
                <span
                  style={{
                    border: "2px solid #3b82f6",
                    borderRadius: "999px",
                    padding: "0.25rem 0.75rem",
                    fontWeight: "bold",
                    color: "#3b82f6",
                  }}
                >
                  {letter}
                </span>
                <span >{text}</span>
              </div>
            );
          })}
        </div>
      </div>

<Logos/>
    </div>
  );
}
