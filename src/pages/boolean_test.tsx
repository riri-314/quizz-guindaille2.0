import { useState } from "react";
import testImage from "/logo.webp";
import universSante from "/univers-sante.png";
import guindaille from "/guindaille.png";
import arrowImage from "/arrow2.png";
import type { CSSProperties } from "react";
import { useNavigate } from "react-router-dom";

export default function BooleanPage() {
  const navigate = useNavigate();
  const [buttonState, setButtonState] = useState<"idle" | "loading" | "done">(
    "idle"
  );

  const handleClick = () => {
    if (buttonState !== "idle") return;
    setButtonState("loading");
    setTimeout(() => {
      setButtonState("done");
    }, 5000);
  };

  const loaderStyle: CSSProperties = {
    width: "2rem",
    height: "2rem",
    border: "4px solid white",
    borderTop: "4px solid #3b82f6",
    borderRadius: "50%",
    animation: "spin 1s linear infinite",
  };

  const buttonText = {
    idle: "Fait",
    loading: (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "1rem",
          justifyContent: "center",
        }}
      >
        <div style={loaderStyle}></div>
        <span>Chargement...</span>
      </div>
    ),
    done: "Validé 🎉",
  };

  const contentStyle: CSSProperties = {
    position: "relative",
    maxWidth: "400px",
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  };

  const bubbleStyle: CSSProperties = {
    width: "21rem",
    height: "21rem",
    position: "relative",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };

  const bubbleImageStyle: CSSProperties = {
    width: "100%",
    height: "100%",
    objectFit: "cover" as const,
    position: "absolute" as const,
    top: 0,
    left: 0,
    opacity: 0.2,
  };

  const textOverlayStyle: CSSProperties = {
    fontFamily: "funny",
    position: "relative",
    zIndex: 1,
    color: "white",
    fontWeight: "bold",
    fontSize: "1.4rem",
    lineHeight: 1.5,
    padding: "1rem",
    textShadow: "3px 3px 0px black",
  };

  const buttonStyle: CSSProperties = {
    fontFamily: "funny",
    marginTop: "2rem",
    fontSize: "1.4rem",
    width: "16rem",
    height: "4rem",
    background:
      buttonState === "done"
        ? "linear-gradient(135deg,rgb(31, 160, 117), #34d399)"
        : "linear-gradient(135deg, #3b82f6, #60a5fa)",
    color: "white",
    fontWeight: "bold",
    padding: "0.75rem",
    //padding: "0.5rem 2rem",
    border: "none",
    borderRadius: "999px",
    boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
    cursor: buttonState === "done" ? "default" : "pointer",
    transition: "all 0.3s ease",
  };

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

      <img
        src={arrowImage}
        alt="Retour"
        onClick={() => navigate("/picto")}
        style={{
          position: "absolute",
          top: "1rem",
          left: "1rem",
          height: "2.5rem",
          width: "auto",
          cursor: "pointer",
          zIndex: 10,
          transform: "scaleX(-1)",
        }}
      />

      <div style={contentStyle}>
        <div style={bubbleStyle}>
          <img
            src={testImage}
            alt="Recap illustration"
            style={bubbleImageStyle}
          />
          <div style={textOverlayStyle}>
            <p>
              À la fin de la soirée,
              <br />
              dis ce que t'as bu (quoi et combien).
              <br />
              Tu te souviens ? Bien joué.
              <br />
              Tu sais pas ?<br />
              Allez, prochaine fois on note !
            </p>
          </div>
        </div>

        <button
          style={buttonStyle}
          onClick={handleClick}
          disabled={buttonState !== "idle"}
        >
          {buttonText[buttonState]}
        </button>

        {buttonState === "done" && (
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
            onClick={() => navigate("/test")} // ← Change this if needed
          >
            Suivant →
          </div>
        )}
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
