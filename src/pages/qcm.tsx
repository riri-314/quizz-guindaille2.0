import { useNavigate } from "react-router-dom";
import type { CSSProperties } from "react";
import universSante from "/univers-sante.png";
import guindaille from "/guindaille.png";
import arrowImage from "/arrow2.png";

export default function DesoulerQuestion() {
  const navigate = useNavigate();

  const logoLeftStyle: CSSProperties = {
    position: "absolute",
    bottom: "1rem",
    left: "1rem",
  };

  const logoRightStyle: CSSProperties = {
    position: "absolute",
    bottom: "1.5rem",
    right: "1rem",
  };

  const logoImageStyleL: CSSProperties = {
    height: "50px",
    width: "auto",
    objectFit: "contain" as const,
  };

  const logoImageStyleR: CSSProperties = {
    height: "40px",
    width: "auto",
    objectFit: "contain" as const,
  };

  return (
    <div style={{}}>
      <img
        src={arrowImage}
        alt="Retour"
        onClick={() => navigate("/choice")}
        style={{
          position: "absolute",
          top: "1rem",
          left: "1rem",
          height: "2.5rem",
          width: "auto",
          cursor: "pointer",
          transform: "scaleX(-1)",
        }}
      />

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

      <div style={logoLeftStyle}>
        <img
          src={universSante}
          alt="Univers Santé logo"
          style={logoImageStyleL}
        />
      </div>
      <div style={logoRightStyle}>
        <img
          src={guindaille}
          alt="Guindaille 2.0 logo"
          style={logoImageStyleR}
        />
      </div>
    </div>
  );
}
