import type { CSSProperties } from "react";
import { FixedSizeList as List } from "react-window";
import universSante from "/univers-sante.png";
import guindaille from "/guindaille.png";
import { useNavigate, useLocation } from "react-router-dom";
import Arrow from "../components/Arrow";

export default function Classement() {
  const navigate = useNavigate();
  const location = useLocation();
  const { score, question } = location.state || {};

  const scores = Array.from({ length: 10000 }, (_, i) => ({
    position: i + 1,
    name: `Kot zddede ${i + 1}`,
  }));

  const handleNext = () => {
    navigate("/end"); // remplace "/next" par la bonne route
  };

  const titleStyle = {
    fontFamily: "funny",
    marginBottom: "1.5rem",
    color: "white",
    fontWeight: "bold",
    fontSize: "2.5rem",
    padding: "1rem",
    textShadow: "3px 3px 0px black",
    textAlign: "center",
    paddingTop: "5rem",
  } as const;

  const classementStyle = {
    fontFamily: "funny",
    marginBottom: "1.5rem",
    color: "white",
    fontWeight: "bold",
    fontSize: "1.5rem",
    padding: "1rem",
    textAlign: "center",
    textWrap: "wrap",
  } as const;

  const entryContainerStyle = {
    display: "flex",
    alignItems: "center",
    marginBottom: "1rem",
    overflow: "hidden",
    //    boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
    //    background: "rgba(255,255,255,0.9)",
    transition: "transform 0.2s",
    fontFamily: "funny",
  } as const;

  const positionStyle = {
    backgroundColor: "#f72585",
    color: "white",
    padding: "0.75rem 1rem",
    fontWeight: "bold",
    fontSize: "1.2rem",
    minWidth: "3rem",
    borderRadius: "12px 0 0 12px",
    textAlign: "center",
  } as const;

  const nameStyle = {
    backgroundColor: "white",
    color: "#333",
    padding: "0.75rem 1rem",
    flexGrow: 1,
    fontSize: "1.1rem",
    textAlign: "left",
    borderRadius: "0 12px 12px 0",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  } as const;

  const logoImageStyleL = {
    height: "50px",
    width: "auto",
    objectFit: "contain",
  } as const;

  const logoImageStyleR = {
    height: "40px",
    width: "auto",
    objectFit: "contain",
  } as const;

  const buttonStyle: CSSProperties = {
    fontFamily: "funny",
    marginTop: "0rem",
    fontSize: "1.4rem",
    width: "16rem",
    height: "5rem",
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
    marginBottom: "5.5rem",
  };

  const Row = ({ index, style }: { index: number; style: CSSProperties }) => {
    const entry = scores[index];
    return (
      <div
        style={{ ...entryContainerStyle, ...style }}
        onMouseOver={(e) => (e.currentTarget.style.transform = "scale(1.02)")}
        onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
      >
        <div style={positionStyle}>{entry.position}</div>
        <div style={nameStyle}>{entry.name}</div>
      </div>
    );
  };

  return (
    <>
      <Arrow
        path="/score"
        args={{
          state: {
            score: score,
            question: question,
          },
        }}
      />
      <div
        style={{
          height: "100vh",
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          position: "relative",
          maxWidth: "500px",
        }}
      >
        <div style={titleStyle}>CLASSEMENT</div>
        <div style={classementStyle}>Ton classement 17/300</div>

        <List
          height={500}
          itemCount={scores.length}
          itemSize={60}
          width={300}
          style={{
            WebkitMaskImage:
              "linear-gradient(to bottom, black 60%, transparent 100%)",
            maskImage:
              "linear-gradient(to bottom, black 60%, transparent 100%)",
            WebkitMaskSize: "60% 100%",
            maskSize: "60% 100%",
            marginBottom: "2rem",
          }}
        >
          {Row}
        </List>
        <button
          style={buttonStyle}
          onClick={handleNext}
          onMouseOver={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
          onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
        >
          Suivant
        </button>
        {/* Fixed logos that never move */}
        <div style={{ position: "fixed", bottom: "1rem", left: "1rem" }}>
          <img
            src={universSante}
            alt="Univers Santé logo"
            style={logoImageStyleL}
          />
        </div>
        <div style={{ position: "fixed", bottom: "1.2rem", right: "1rem" }}>
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
