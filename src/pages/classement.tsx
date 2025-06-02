import type { CSSProperties } from "react";
import universSante from "/univers-sante.png";
import guindaille from "/guindaille.png";

export default function Classement() {
  const scores = [
    { position: 1, name: "Kot centre" },
    { position: 2, name: "Kot 22" },
    { position: 3, name: "Seb" },
    { position: 4, name: "Kot textile" },
    { position: 5, name: "Marie" },
    { position: 6, name: "Fédé" },
    { position: 7, name: "Fédé" },
    { position: 8, name: "Fédé" },
    { position: 9, name: "Fédé" },
    { position: 10, name: "Fédé" },
    { position: 11, name: "Fédé" },
    { position: 12, name: "Fédé" },
    { position: 13, name: "Fédé" },
    { position: 14, name: "Fédé" },
    { position: 15, name: "Fédé" },
    { position: 16, name: "Fédé" },
    { position: 17, name: "Fédé" },
    { position: 18, name: "Fédé" },
    { position: 19, name: "Fédé" },
    { position: 20, name: "Fédé" },
  ];

  const titleStyle: CSSProperties = {
    fontFamily: "funny",
    marginBottom: "1.5rem",
    color: "white",
    fontWeight: "bold",
    fontSize: "2.5rem",
    padding: "1rem",
    textShadow: "3px 3px 0px black",
    textAlign: "center",
    paddingTop: "5rem",
  };


  const classementStyle: CSSProperties = {
    fontFamily: "funny",
    marginBottom: "1.5rem",
    color: "white",
    fontWeight: "bold",
    fontSize: "1.5rem",
    padding: "1rem",
    textAlign: "center",
    textWrap: "wrap",
  };

  const entryContainerStyle: CSSProperties = {
    display: "flex",
    alignItems: "center",
    marginBottom: "1rem",
    borderRadius: "12px",
    overflow: "hidden",
    boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
    background: "rgba(255,255,255,0.9)",
    transition: "transform 0.2s",
    fontFamily: "funny",
  };

  const positionStyle: CSSProperties = {
    backgroundColor: "#f72585",
    color: "white",
    padding: "0.75rem 1rem",
    fontWeight: "bold",
    fontSize: "1.2rem",
    minWidth: "3rem",
    textAlign: "center",
  };

  const nameStyle: CSSProperties = {
    backgroundColor: "white",
    color: "#333",
    padding: "0.75rem 1rem",
    flexGrow: 1,
    fontSize: "1.1rem",
    textAlign: "left",
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


  return (
    <div
      style={{
        height: "100vh",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        position: "relative",
        maxWidth: "100%",
      }}
    >
      <div style={titleStyle}>CLASSEMENT</div>
      <div style={classementStyle}>Ton classement 17/300</div>

      <div
        style={{
          position: "relative",
          flex: 1,
          width: "100%",
          maxWidth: "450px",
          overflowY: "auto",
          paddingBottom: "6rem", // Reserve space so the last item isn’t hidden behind logos
          marginBottom: "6rem",
          WebkitMaskImage:
            "linear-gradient(to bottom, black 60%, transparent 100%)",
          maskImage: "linear-gradient(to bottom, black 60%, transparent 100%)",
          WebkitMaskSize: "100% 100%",
          maskSize: "100% 100%",
        }}
      >
        {scores.map((entry) => (
          <div
            key={entry.position + "-" + entry.name}
            style={entryContainerStyle}
            onMouseOver={(e) =>
              (e.currentTarget.style.transform = "scale(1.02)")
            }
            onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
          >
            <div style={positionStyle}>{entry.position}</div>
            <div style={nameStyle}>{entry.name}</div>
          </div>
        ))}
      </div>

      {/* Fixed logos that never move */}
      <div
        style={{
          position: "fixed",
          bottom: "1rem",
          left: "1rem",
        }}
      >
        <img
          src={universSante}
          alt="Univers Santé logo"
          style={logoImageStyleL}
        />
      </div>
      <div
        style={{
          position: "fixed",
          bottom: "1.2rem",
          right: "1rem",
        }}
      >
        <img
          src={guindaille}
          alt="Guindaille 2.0 logo"
          style={logoImageStyleR}
        />
      </div>
    </div>
  );
}
