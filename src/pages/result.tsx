import { useNavigate } from "react-router-dom";
import type { CSSProperties } from "react";
import universSante from "/univers-sante.png";
import guindaille from "/guindaille.png";
import arrowImage from "/arrow2.png";

export default function Score() {
  const navigate = useNavigate();

  const handleNext = () => {
    navigate("/next"); // remplace "/next" par la bonne route
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
    objectFit: "contain",
  };

  const logoImageStyleR: CSSProperties = {
    height: "40px",
    width: "auto",
    objectFit: "contain",
  };

  const titleStyle: CSSProperties = {
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

  const scoreStyle: CSSProperties = {
    fontFamily: "funny",
    color: "white",
    fontSize: "5rem",
    fontWeight: "bold",
    textShadow: "3px 3px 0px black",
    marginBottom: "2rem",
  };

  const buttonStyle: CSSProperties = {
    fontFamily: "funny",
    marginTop: "2rem",
    fontSize: "1.4rem",
    width: "16rem",
    height: "4rem",
    background: "linear-gradient(135deg,rgb(31, 160, 117), #34d399)",
    color: "white",
    fontWeight: "bold",
    padding: "0.75rem",
    //padding: "0.5rem 2rem",
    border: "none",
    borderRadius: "999px",
    boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
    cursor: "pointer",
    transition: "all 0.3s ease",
    zIndex: 10,
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
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
          textAlign: "center",
          position: "relative",
          color: "white",
          padding: "1rem",
        }}
      >
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
            zIndex: 10,
            transform: "scaleX(-1)",
          }}
        />

        <div style={titleStyle}>Ton score est de</div>
        <div style={scoreStyle}>
          12 <span style={{ fontSize: "3rem" }}>/</span> 15
        </div>

        <button
          style={buttonStyle}
          onClick={handleNext}
          onMouseOver={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
          onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
        >
          Suivant
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
    </>
  );
}
