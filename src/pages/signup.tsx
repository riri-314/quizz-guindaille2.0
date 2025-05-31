import { useState } from "react";
import { useNavigate } from "react-router-dom";
import type { CSSProperties } from "react";
import universSante from "/univers-sante.png";
import guindaille from "/guindaille.png";
import arrowImage from "/arrow2.png";

export default function SignupPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [buttonState, setButtonState] = useState<"idle" | "loading" | "done">(
    "idle"
  );
  const handleSignup = () => {
    if (!email || !password) {
      setError("Veuillez remplir tous les champs.");
      return;
    }
    if (buttonState !== "idle") return;
    setButtonState("loading");
    setTimeout(() => {
      setButtonState("done");
      console.log("Logged in with", email, password);
      navigate("/choice");
    }, 2000);
    setError("");
    // Fake login logic
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
    idle: "Se connecter",
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
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        padding: "2rem",
        fontFamily: "sans-serif",
        color: "white",
        textAlign: "center",
      }}
    >
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
        onClick={() => navigate("/hello")}
        style={{
          position: "absolute",
          top: "1rem",
          left: "1rem",
          height: "2.5rem",
          width: "auto",
          cursor: "pointer",
          zIndex: 999,
          transform: "scaleX(-1)",
        }}
      />
      <h1
        style={{
          fontFamily: "funny",

          fontSize: "2.5rem",
          fontWeight: "bold",
          marginBottom: "2rem",
          textShadow: "2px 2px 4px black",
        }}
      >
        Créer son compte
      </h1>
      <div
        style={{
          width: "16rem",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <input
          type="username"
          placeholder="Surnom"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{
            padding: "0.75rem",
            marginBottom: "1rem",
            width: "100%",
            maxWidth: "300px",
            borderRadius: "8px",
            border: "none",
            outline: "none",
            boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
          }}
        />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{
            padding: "0.75rem",
            marginBottom: "1rem",
            width: "100%",
            maxWidth: "300px",
            borderRadius: "8px",
            border: "none",
            outline: "none",
            boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
          }}
        />

        <input
          type="password"
          placeholder="Mot de passe"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{
            padding: "0.75rem",
            marginBottom: "1rem",
            width: "100%",
            maxWidth: "300px",
            borderRadius: "8px",
            border: "none",
            outline: "none",
            boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
          }}
        />

        {error && (
          <div
            style={{
              color: "#f87171",
              marginBottom: "1rem",
              maxWidth: "300px",
              width: "100%",
              fontSize: "0.9rem",
              textAlign: "center",
              wordWrap: "break-word",
            }}
          >
            {error}
          </div>
        )}
        <button
          onClick={handleSignup}
          disabled={buttonState !== "idle"}
          style={{
            fontFamily: "funny",

            background: "linear-gradient(135deg, #3b82f6, #60a5fa)",
            color: "white",
            padding: "0.75rem 1.5rem",
            borderRadius: "999px",
            border: "none",
            marginBottom: "0.75rem",
            width: "100%",
            maxWidth: "300px",
            fontWeight: "bold",
            fontSize: "1rem",
            boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
            cursor: buttonState === "done" ? "default" : "pointer",
            transition: "transform 0.2s",
          }}
          onMouseOver={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
          onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
        >
          {buttonText[buttonState]}
        </button>
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
