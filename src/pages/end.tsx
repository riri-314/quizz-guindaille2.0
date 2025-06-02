import { useNavigate } from "react-router-dom";
import type { CSSProperties } from "react";
import universSante from "/univers-sante.png";
import guindaille from "/guindaille.png";

export default function End() {
  const navigate = useNavigate();

  const insta = () => {
    window.open("https://www.instagram.com/guindaille2.0/", "_blank");
  };

  const SimpleText = () => {
    navigate("/choice");
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
        color: "white",
        padding: "1rem",
        textAlign: "center",
      }}
    >



      <button
        onClick={insta}
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
        Tu veux en savoir plus sur la guindaille 2.0 ? 
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
        Retour à l'accueil
      </button>

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
