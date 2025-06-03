import { useNavigate } from "react-router-dom";
import type { CSSProperties } from "react";
import Logos from "../components/Logos";

export default function Error() {
  const navigate = useNavigate();

  const SimpleText = () => {
    navigate("/");
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
      <div style={textTitleStyle}>Une erreur est survenue 😿</div>

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

        <Logos/>
    </div>
  );
}
