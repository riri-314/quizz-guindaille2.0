import { useNavigate } from "react-router-dom";
import type { CSSProperties } from "react";
import Logos from "../components/Logos";

export default function Hello() {
  const navigate = useNavigate();

  const handleGuest = () => {
    navigate("/guest");
  };


  const textTitleStyle: CSSProperties = {
    fontFamily: "funny",
    marginBottom: "2rem",
    color: "white",
    fontWeight: "bold",
    fontSize: "2.5rem",
    lineHeight: 1.5,
    padding: "1rem",
    textShadow: "3px 3px 0px black",
    textAlign: "center",
  };

  const backgroundWrapperStyle: CSSProperties = {
    position: "fixed",
    top: -100,
    left: 0,
    width: "200vw", // oversize to scroll
    height: "200vh",
    zIndex: 1,
    transform: "rotate(-12deg)",
    overflow: "hidden",
  };

  const scrollingTextContainerStyle: CSSProperties = {
    display: "flex",
    flexDirection: "column",
    gap: "0rem",
    animation: "scrollBackgroundText 15s linear infinite",
    whiteSpace: "nowrap",
  };

  const backgroundTextLineStyle: CSSProperties = {
    fontFamily: "noir",
    fontSize: "7rem",
    color: "transparent",
    WebkitTextStroke: "8px rgba(255, 255, 255, .05)",
    userSelect: "none",
  };

  return (
    <>
      <style>{`
        @keyframes scrollBackgroundText {
          0% { transform: translateX(-100vw); }
          100% { transform: translateX(0vw); }
        }
      `}</style>

      {/* Scrolling background text filling the screen */}
      <div style={backgroundWrapperStyle}>
        <div style={scrollingTextContainerStyle}>
          {Array.from({ length: 12 }).map((_, i) => (
            <div key={i} style={backgroundTextLineStyle}>
              GUINDAILLE 2.0 GUINDAILLE 2.0 GUINDAILLE 2.0
            </div>
          ))}
        </div>
      </div>

      {/* Foreground content */}
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
        <div style={textTitleStyle}>Bienvenue sur notre app !</div>

        <button
          onClick={handleGuest}
          style={{
            zIndex: 2,
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
            fontSize: "1.4rem",
            boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
            cursor: "pointer",
            transition: "transform 0.2s",
          }}
          onMouseOver={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
          onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
        >
          Commencer
        </button>

        <Logos />
      </div>
    </>
  );
}
